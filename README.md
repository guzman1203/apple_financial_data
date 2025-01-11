# Apple Financial Dashboard App

 The App fetches annual income statements for AAPL (Apple) and allows users to filter, sort, and analyze key metrics.
 This financial data app uses data from a single API endpoint. 
 
 For example, API Endpoint to Use:
 https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=<api_key>
 
 You can obtain a free API key from Financial Modeling Prep : https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements
 This endpoint returns the annual income statements for Apple Inc., and the response includes
 key financial data such as revenue, net income, gross profit, expenses, etc.
 
 ■ The Apple Financial Dashboard is a table that include the following columns:
 1. Date(e.g., "2024-09-28")
 2. Revenue
 3. Net Income
 4. Gross Profit
 5. EPS(Earnings Per Share)
 6. Operating Income

 ■ Apply Filters button allows users to filter the data using the following criteria:
 1. Date Range: Filter results between specific years (e.g., 2020–2024).
 2. Revenue: Filter rows where Revenue falls within a user-specified range.
 3. Net Income: Filter rows where Net Income falls within a user-specified range.

 ■ Sorting, by clicking the column header, allows users to sort the table by:
 1. Date(ascending/descending).
 2. Revenue(ascending/descending).
 3. Net Income (ascending/descending).
    
 ■ The App is mobile-friendly and looks good on both desktop and mobile devices.
 

 ■ Technical Requirements:
 1. Frontend: Using React(JavaScript). Styling implemented with TailwindCSS.

 2. Backend: Using Python with Flask.
     a. Fetch data from the API.
     b. Handle filtering and sorting based on user requests.
     c. Expose an endpoint for the frontend to fetch filtered data.
    
 4. App deployed on Render, with link: https://apple-financial-data-frontend.onrender.com/
