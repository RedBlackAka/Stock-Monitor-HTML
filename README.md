# Stock-Monitor-HTML
A simple HTML page displaying stock information, designed for use with a dedicated monitor on a Raspberry Pi.
It uses Javascript to retrieve stock information from the Alpha Vantage API.
The information is refreshed once an hour, in order to stay within the limit of Alpha Vantage's free API. Default ticker here is NVDA.

Additionally, it has a real time clock that is synced with Google's time server once an hour.

An API key is required. Alpha Vantage offers paid and free keys with up to 25 API calls a day here: https://www.alphavantage.co/support/#api-key

Make sure to read their terms of service.

<img width="1436" alt="Screenshot 2024-01-15 at 12 15 16" src="https://github.com/RedBlackAka/Stock-Monitor-HTML/assets/140876408/95bbefbc-9ad7-46f7-bd66-0cefcf96e4ca">
