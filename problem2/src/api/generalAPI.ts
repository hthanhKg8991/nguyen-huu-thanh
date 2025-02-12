const BASE_URL = 'https://api.apilayer.com/exchangerates_data';
const API_KEY = 'UsM128plNZo0YGbBcMoUWu1yCnlanuWn';

class GeneralAPI {
    // Hàm request chung
    static async request(endpoint: string, options = {}) {
        try {
            const response = await fetch(`${BASE_URL}/${endpoint}`, {
                headers: { 'apikey': API_KEY },
                ...options,
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    }

    static async getCurrencyList() {
        const response = await this.request('symbols');
        return response ? response.symbols : {};
    }

    static async convertCurrency(fromCurrency: string, toCurrency: string, amount: number) {
        const response = await this.request(`convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`);
        return response ? response.result : null;
    }
}

export default GeneralAPI;
