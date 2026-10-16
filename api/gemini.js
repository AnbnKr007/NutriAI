// api/gemini.js
// Vercel Serverless Function — Keeps GEMINI_API_KEY strictly on the server.

export default async function handler(req, res) {
    // Allow CORS for local preview if needed
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: { message: 'Method Not Allowed. Use POST.' } });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({
            error: {
                message: 'Server configuration error: GEMINI_API_KEY is missing in Vercel Environment Variables.'
            }
        });
    }

    try {
        const {
            contents,
            systemInstruction,
            generationConfig = {},
            useSearch = false,
            model = 'gemini-3.1-flash-lite'
        } = req.body || {};

        if (!contents) {
            return res.status(400).json({ error: { message: 'Missing "contents" in request body.' } });
        }

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

        const buildPayload = (enableSearchTool, forceJsonMime) => {
            const payload = { contents };
            if (systemInstruction) {
                payload.systemInstruction = systemInstruction;
            }
            payload.generationConfig = { ...generationConfig };
            if (!forceJsonMime) {
                delete payload.generationConfig.responseMimeType;
            }
            if (enableSearchTool) {
                payload.tools = [{ googleSearch: {} }];
            }
            return payload;
        };

        // Attempt 1: With requested configuration (including Google Search grounding if requested)
        let response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey
            },
            body: JSON.stringify(buildPayload(useSearch, true))
        });

        let data = await response.json();

        // Fallback A: Some API tiers reject googleSearch + responseMimeType: "application/json" together.
        // Retry with Google Search enabled but without forcing MIME type (JSON is still enforced by prompt).
        if (!response.ok && useSearch) {
            response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey
                },
                body: JSON.stringify(buildPayload(true, false))
            });
            data = await response.json();
        }

        // Fallback B: If Google Search tool itself is restricted on the key/model, retry standard JSON mode.
        if (!response.ok && useSearch) {
            response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': apiKey
                },
                body: JSON.stringify(buildPayload(false, true))
            });
            data = await response.json();
        }

        return res.status(response.status).json(data);
    } catch (error) {
        console.error('Vercel Proxy Error:', error);
        return res.status(500).json({
            error: { message: `Serverless Proxy Error: ${error.message}` }
        });
    }
}
