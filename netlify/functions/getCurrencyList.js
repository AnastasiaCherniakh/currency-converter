// Fetch the list of supported currencies
exports.handler = async function() {
    try {
        const apiKey = process.env.API_KEY;
        const response = await fetch (`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ currencyList: data.supported_codes })
        };
    }catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch currency list' })
        };
    }
}