import { API_KEY } from './config.js';

// Fetches exchange rates from the API
async function getExchangeRate(currencyDropdownFrom, currencyDropdownTo) {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyDropdownFrom}`);
    const data = await response.json();
    console.log(data);
    return data.conversion_rates[currencyDropdownTo]; // Return exchange rate

}


// Coverts one currency to another
async function convertCurrency() {
    let currencyDropdownFrom = document.getElementById("currencyDropdownFrom").value;
    let currencyDropdownTo = document.getElementById("currencyDropdownTo").value;
    let amount = document.getElementById('amount').value;
    
    try {
        let rate = await getExchangeRate(currencyDropdownFrom, currencyDropdownTo); //Fetch exchange rate
        let convertedAmount = (amount * rate).toFixed(3);
        // Calculate the result
        document.getElementById('result').textContent = `${currencyDropdownFrom} ${amount} * ${currencyDropdownTo} ${rate} = ${convertedAmount}`
    } catch(error) {
        document.getElementById('result').textContent = `Error fetching exchange rates.`
    }
}

document.getElementById('convertButton').addEventListener('click', convertCurrency);

// Fetches the list of currencies from the API
async function fetchCurrencyList() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
        const data = await response.json();
        return data.supported_codes; // Return the supported codes
    } catch(error) {
        console.log('Failed to fetch currencies: ', error);
        return [];
    }
}

// Populates the dropdown with the currency list
const populateDropdown = (currencies, dropdownElement)=> {
    currencies.forEach(([code, name]) => { // Populate the dropdown elements
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${name}`;
        dropdownElement.appendChild(option);
    });
}

// Initializes both dropdowns
async function initDropdown() { 
    const currencies = await fetchCurrencyList(); // Fetch currency list
    const dropdownFrom = document.getElementById("currencyDropdownFrom");
    const dropdownTo = document.getElementById("currencyDropdownTo");

    // Populate the dropdowns
    populateDropdown(currencies, dropdownFrom); 
    populateDropdown(currencies, dropdownTo);

   // Initialize the Choices library
    const choicesFrom = new Choices(dropdownFrom, {
        placeholder: true,
        searchEnabled: true,
    });

    const choicesTo = new Choices(dropdownTo, {
        placeholder: true,
        searchEnabled: true,
    });

    // Set initial values using Choices API
    choicesFrom.setChoiceByValue("USD");
    choicesTo.setChoiceByValue("EUR");
};

initDropdown();


