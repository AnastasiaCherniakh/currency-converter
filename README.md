# 💱 Currency Converter

A **modern and user-friendly** currency converter that allows users to convert between different currencies using real-time exchange rates.

## 🔗 Live Demo
[**Try it here**](https://currency-coverter-app.netlify.app/)

## ⚡ Features 
- **Real-time exchange rates** using the ExchangeRate API
- **Searchable currency dropdowns** for easy selection (powered by Choices.js)
- **Swap button** to quickly switch between selected currencies
- **Error handling** for invalid inputs
- **Secure API requests** through Netlify serverless functions

## 🛠️ Tech Stack
- **Front-end:** HTML, CSS, JavaScript
- **Libraries:** Choices.js
- **API:** ExchangeRate API
- **Serverless:** Netlify functions

## 📝 How it works
1. The **frontend** requests exchange rates and the currency list via **serverless functions**.
2. The **serverless functions** securely fetch the data from the ExchangeRate API, ensuring the API key remains hidden.
3. The **frontend** receives and displays the data dynamically.

## 🚀 Deployment & Setup 
This project is deployed on **Netlify** .

If you want to run it locally:
1. Clone the repository.
2. Install Netlify CLI for local development.
3. Set up environment variables.
4. Start local development server.