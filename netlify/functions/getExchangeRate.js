//Fetch exchange rates for a given currency
exports.handler = async function(event) {
    try {
        const apiKey = process.env.API_KEY;
        const params = event.queryStringParameters;
        const baseCurrency = params.base || "USD";

        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ exchangeRates: data.conversion_rates })
        };
    }catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data" })
        };
    }
}