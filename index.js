document.addEventListener('DOMContentLoaded', function() {
    const accessKey = '050c07ef2955cbb68e1b9189de17b94c';
    const apiUrl = `https://api.marketstack.com/v1/tickers?access_key=${accessKey}`;

    // Fetch data from the API using Promises
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('data-container').innerHTML = `<p class="text-danger">Error fetching data: ${error.message}</p>`;
        });
});

/**
 * Display the fetched data on the webpage
 * @param {Object} data - The data fetched from the API
 */
function displayData(data) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    // Assuming data.data is an array of tickers
    if (data.data && data.data.length > 0) {
        data.data.forEach(ticker => {
            const dataCard = document.createElement('div');
            dataCard.className = 'col-12 col-md-6 col-lg-4 data-card';

            dataCard.innerHTML = `
                <h3>${ticker.name} (${ticker.symbol})</h3>
                <p><strong>Stock Exchange:</strong> ${ticker.stock_exchange.name}</p>
                <p><strong>Currency:</strong> ${ticker.currency}</p>
                <p><strong>Market Capitalization:</strong> ${ticker.market_capitalization}</p>
            `;

            dataContainer.appendChild(dataCard);
        });
    } else {
        dataContainer.innerHTML = '<p>No data available.</p>';
    }
}
