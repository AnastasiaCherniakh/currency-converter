// Fetch API key from the serverless function and returns it
async function getApiKey() {
    const response = await fetch('/.netlify/functions/getApiKey');
    const data = await response.json();
    return data.apiKey;
}

// Fetch exchange rates from the API
async function getExchangeRate(currencyDropdownFrom, currencyDropdownTo) {
    try {
        const apiKey = await getApiKey();
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currencyDropdownFrom}`);

        if(!response.ok) {
            throw new Error("Failed to fetch data from the API. Please try again later.");
        }

        const data = await response.json();
        console.log(data);
        return data.conversion_rates[currencyDropdownTo]; // Return exchange rate
    }
    catch(error) {
        console.error("API Error:", error);
        throw error;
    }

}


// Covert one currency to another
async function convertCurrency() {
    let currencyDropdownFrom = document.getElementById("currencyDropdownFrom").value;
    let currencyDropdownTo = document.getElementById("currencyDropdownTo").value;
    let amount = document.getElementById('amount').value;

    //Clear any previous error message
    document.getElementById('error-message').textContent = "";
    document.getElementById('error-message').style.visibility = 'hidden';

    if(isNaN(amount) || amount === '' || amount <= 0) {
        document.getElementById('error-message').textContent = 'Please enter a valid amount';
        document.getElementById('error-message').style.visibility = 'visible';
        return;
    }
    
    try {
        let rate = await getExchangeRate(currencyDropdownFrom, currencyDropdownTo); //Fetch exchange rate
        let convertedAmount = (amount * rate).toFixed(4);
        // Calculate the result
        document.querySelector('.original-amount').textContent = `${amount} ${currencyDropdownFrom} =`;
        document.querySelector('.converted-amount').textContent = `${convertedAmount} ${currencyDropdownTo}`

        document.getElementById('result').classList.add('show');
    } catch(error) {
        document.getElementById('result').textContent = `Error fetching exchange rates.`
    }
}

document.getElementById('convertButton').addEventListener('click', convertCurrency);

// Fetch the list of currencies from the API
async function fetchCurrencyList() {
    try {
        const apiKey = await getApiKey();
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
        const data = await response.json();
        return data.supported_codes; // Return the supported codes
    } catch(error) {
        console.log('Failed to fetch currencies: ', error);
        return [];
    }
}

// Populate the dropdown with the currency list
const populateDropdown = (currencies, dropdownElement)=> {
    currencies.forEach(([code, name]) => { // Populate the dropdown elements
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${name}`;
        dropdownElement.appendChild(option);
    });
}

let choicesFrom;
let choicesTo;

// Initialize both dropdowns
async function initDropdown() { 
    const currencies = await fetchCurrencyList(); // Fetch currency list
    const dropdownFrom = document.getElementById("currencyDropdownFrom");
    const dropdownTo = document.getElementById("currencyDropdownTo");

    // Populate the dropdowns
    populateDropdown(currencies, dropdownFrom); 
    populateDropdown(currencies, dropdownTo);

   // Initialize the Choices library
    choicesFrom = new Choices(dropdownFrom, {
        placeholder: true,
        searchEnabled: true,
    });

    choicesTo = new Choices(dropdownTo, {
        placeholder: true,
        searchEnabled: true,
    });

    // Set initial values using Choices API
    choicesFrom.setChoiceByValue("USD");
    choicesTo.setChoiceByValue("EUR");
};

initDropdown();

//Switch the selected values between the 'from' and 'to' currency dropdowns
const switchCurrencies = () => {
    
    // Get current values from the dropdowns
    const fromValue = choicesFrom.getValue(true);
    const toValue = choicesTo.getValue(true);

    //Swap the dropdowns values
    choicesFrom.setChoiceByValue(toValue);
    choicesTo.setChoiceByValue(fromValue);

}

document.getElementById('switch-currency').addEventListener('click', switchCurrencies);


