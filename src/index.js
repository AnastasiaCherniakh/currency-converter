import { API_KEY } from './config.js';

async function getExchangeRate(fromCurrency, toCurrency) {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`);
    const data = await response.json();
    console.log(data);
    return data.conversion_rates[toCurrency];

}

async function convertCurrency() {
    let fromCurrency = document.getElementById("fromCurrency").value;
    console.log(`You chose ${fromCurrency}`)
    let toCurrency = document.getElementById("toCurrency").value;
    console.log(`You chose ${toCurrency}`)
    let amount = document.getElementById('amount').value;
    
    try {
        let rate = await getExchangeRate(fromCurrency, toCurrency);
        let convertedAmount = (amount * rate).toFixed(3);
        document.getElementById('result').textContent = `${fromCurrency} ${amount} * ${toCurrency} ${rate} = ${convertedAmount}`
    } catch(error) {
        document.getElementById('result').textContent = `Error fetching exchange rates.`
    }
}

document.getElementById('convertButton').addEventListener('click', convertCurrency);
