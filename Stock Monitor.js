document.addEventListener('DOMContentLoaded', function () {
      const apiKey = 'API_KEY';
      const ticker = 'NVDA';
      const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=${apiKey}`;

      // Fetch price
      const fetchAndRenderStockData = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          const timeSeries = data['Time Series (1min)'];
          const labels = Object.keys(timeSeries).reverse(); // Reverse to display in chronological order
          const prices = labels.map(label => parseFloat(timeSeries[label]['4. close']));
          const highs = labels.map(label => parseFloat(timeSeries[label]['2. high']));
          const lows = labels.map(label => parseFloat(timeSeries[label]['3. low']));

          document.getElementById('ticker').textContent = `${ticker}`;
          document.getElementById('latest').textContent = `$${prices[0]}`;
          document.getElementById(`high`).textContent = `$${Math.max(...highs).toFixed(3)}`;
          document.getElementById(`low`).textContent = `$${Math.min(...lows).toFixed(3)}`;

          const chart = window.myLine;
          chart.data.labels = labels;
          chart.data.datasets[0].data = prices;
          chart.update();
        } catch (error) {
          console.error('Error fetching stock data:', error);
        }
      };

      fetchAndRenderStockData();

      setInterval(fetchAndRenderStockData, 3600000);

      // Creating chart using Chart.js
      const ctx = document.getElementById('stockChart').getContext('2d');
      window.myLine = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Stock Prices',
            borderColor: '#eb052b',
            data: [],
          }],
        },
      });

      // Clock
      const updateClock = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        document.getElementById('clock').textContent = formattedTime;
      };

      // Synch with Google's time server
      const syncWithGoogleTime = async () => {
        try {
          const response = await fetch('https://www.googleapis.com');
          const serverTime = new Date(response.headers.get('date'));
          updateClock(serverTime);
        } catch (error) {
          console.error('Error syncing with Google Time Server:', error);
        }
      };

      updateClock();

      setInterval(updateClock, 1000);

      setInterval(syncWithGoogleTime, 3600000);
    });