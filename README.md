```markdown
# NutriAI 🌿
> **Intelligent, Personalised Food & Micronutrient Wellness Coach**  
> *Built on Indian Nutritional Data (INDB) with Real-Time Web Search Grounding via Google Gemini.*

[![Vercel Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![Gemini API](https://img.shields.io/badge/Powered%20By-Google%20Gemini%20Flash%20Lite-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![JavaScript](https://img.shields.io/badge/Frontend-Vanilla%20JS%20%2F%20HTML5%20%2F%20CSS3-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

```

## 🌟 Overview

**NutriAI** is an AI-powered dietary intelligence dashboard designed to eliminate guesswork around nutrition, especially for Indian regional cuisine and modern packaged foods. 

Whether you ask about staple homestyle dishes like *Rajma Chawal* and *Methi Paratha*, or modern branded snacks like *Maggi* and *Oreo Biscuits*, NutriAI cross-references verified food databases and live web search to deliver instant macronutrient calculations, clinical health condition triage, and complete micronutrient breakdowns.

---

## ✨ Key Features

- 👤 **Dynamic Biometric Profile Engine**
  - Calculates BMR, daily calorie targets, and target protein quotas using the **Mifflin-St Jeor formula** based on age, sex, weight, height, and activity level.
  - Automatically assesses BMI categories and customizes macronutrient distribution ratios.

- 🥗 **Dual-Layer Food Intelligence**
  - **Local INDB Database:** Verifies values against standard Indian Nutritional Data (INDB) for homestyle recipes.
  - **Live Web Grounding:** If a food or packaged item isn't in the database (e.g., instant noodles, biscuits, regional street foods), Gemini automatically searches the web to extract real-world nutritional label data.

- 🩺 **Personalized Health Condition Analysis**
  - Evaluates foods against user-selected health conditions: **Diabetes**, **Hypertension**, **Thyroid/Goitre**, **High Cholesterol**, **Lactose Intolerance**, and custom allergies.
  - Generates plain-language medical rationale explaining *why* a food is suitable, should be enjoyed in moderation, or definitely avoided.

- 🧬 **Technical Micronutrient Breakdown**
  - An expandable drawer and full modal detailing 20+ micro-parameters per 100g:
    - **Lipids & Glycemic Metrics:** Saturated fat, trans fat, cholesterol, glycemic index (GI).
    - **Minerals:** Sodium, potassium, calcium, iron, magnesium, phosphorus, zinc.
    - **Vitamins:** Vitamin A, C, D, B12, and Folate (B9).
    - *Graceful fallback*: Explicitly labels unverified fields as `Not Available`.

- 📊 **Real-Time Daily Intake Logger**
  - Track calories and protein against your daily targets with interactive progress bars that persist across sessions.

- 🔒 **Zero-Backend API Key Security**
  - Built with a Vercel Serverless Function (`/api/gemini.js`) that securely proxies API calls. Your `GEMINI_API_KEY` stays on the server and is never exposed in browser DevTools or client bundles.

- 🌓 **Modern UI/UX**
  - Light/Dark mode toggle, keyboard-navigable card selectors, quick-ask chips, and fluid responsive design.

---

## 🏗️ Architecture & Project Structure

```text
nutriai/
├── api/
│   └── gemini.js       # Vercel Serverless Function (Secures Gemini API key & handles Web Search)
├── data/
│   └── foods.json      # Indian food database with macros and standard unit weights
├── index.html          # Onboarding flows, profile dashboard, chat UI, & technical modal
├── script.js           # Client-side routing, BMR calculations, chat streaming, & local storage
├── style.css           # Design system tokens, dark theme, responsive grid, & cards
└── README.md

```

---

## 🚀 Getting Started

### 1. Prerequisites

* A free [Google AI Studio API Key](https://aistudio.google.com/).
* A [Vercel](https://vercel.com/) account (free tier works great).

### 2. Local Setup

```bash
# Clone the repository
git clone [https://github.com/your-username/nutriai.git](https://github.com/your-username/nutriai.git)
cd nutriai

# Option A: Run with Vercel CLI (Recommended to test Serverless Functions)
npm i -g vercel
vercel dev

# Option B: Run via standard static server (e.g., Live Server)
# Note: You will be prompted to enter a Gemini API key once in your local browser for testing.

```

### 3. Deploying to Vercel (30 Seconds)

1. Push your repository to **GitHub**.
2. Go to [Vercel](https://vercel.com/new) and **Import** your NutriAI repository.
3. In **Settings ➔ Environment Variables**, add:
* **Key:** `GEMINI_API_KEY`
* **Value:** `your_actual_gemini_api_key_here`


4. Click **Deploy**. Vercel will automatically build the `/api/gemini` serverless endpoint!

---

## 🔒 Safety & Medical Disclaimer

NutriAI offers general nutritional and lifestyle wellness suggestions based on available food science data. It incorporates an automated clinical triage filter to block acute red-flag medical symptoms and progressive diseases, reminding users to seek urgent professional care. NutriAI is **not** a substitute for clinical diagnosis, customized medical nutrition therapy (MNT), or physician care.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to expand the local INDB dish dataset or improve prompt grounding:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewFoodData`).
3. Commit your Changes (`git commit -m "Add new dishes to foods.json"`).
4. Push to the Branch (`git push origin feature/NewFoodData`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

```
