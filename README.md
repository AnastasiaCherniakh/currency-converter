# 💱 Currency Converter

A **modern and user-friendly** currency converter that allows users to convert between different currencies using real-time exchange rates.

## 🔗 Live Demo

[**Try it here**](https://currency-coverter-app.netlify.app/)

## ⚡ Features 

- **Real-time exchange rates** using the ExchangeRate API
- **Searchable currency dropdowns** for easy selection (powered by Choices.js)
- **Swap button** to quickly switch between selected currencies
- **Input validation** and helpful error handling
- **Secure API requests** via Netlify serverless functions
- **Clean, responsive** design

## 🛠️ Tech Stack

- **Languages:** HTML, CSS, JavaScript
- **Libraries:** Choices.js
- **API:** ExchangeRate API
- **Serverless Backend:** Netlify functions

## 📝 How it works

1. The **frontend** triggers to **Netlify serverless functions**, which securely fetch exchange data from ExchangeRate API.
2. The **API key** is hidden and never exposed to the client.
3. The **user interface** updates dynamically based on the fetched data, allowing seamless conversions.

## 📸 Screenshots


**Start Screen** 
![Start Screen](/assets/images/start-screen.png)

**Conversion Result** 
![Conversion Result Screen](/assets/images/conversion-screen.png)

## 💡 Why I Built This

I created this project to strengthen my vanilla JavaScript skills while building something useful and visually clean. I wanted to explore how to work with third-party APIs securely, practice dynamic UI updates, and improve my understanding of how to handle user inputs and error handling in real-time applications.

---

Thanks for checking it out! 😊