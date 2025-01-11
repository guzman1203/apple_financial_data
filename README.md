# Apple Financial Dashboard App

 The App fetches annual income statements for AAPL (Apple) and allows users to filter, sort, and analyze key metrics.
 This financial data app uses data from a single API endpoint. 
 
 For example, API Endpoint to Use:
 https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=<api_key>
 
 You can obtain a free API key from Financial Modeling Prep : https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements
 This endpoint returns the annual income statements for Apple Inc., and the response includes
 key financial data such as revenue, net income, gross profit, expenses, etc.
 
 1. The Apple Financial Dashboard is a table that include the following columns:
     ■ Date(e.g., "2024-09-28")
     ■ Revenue
     ■ Net Income
     ■ Gross Profit
     ■ EPS(Earnings Per Share)
     ■ Operating Income

 2. Apply Filters button allows users to filter the data using the following criteria:
     ■ Date Range: Filter results between specific years (e.g., 2020–2024).
     ■ Revenue: Filter rows where Revenue falls within a user-specified range.
     ■ Net Income: Filter rows where Net Income falls within a user-specified range.

 3. Sorting, by clicking the column header, allows users to sort the table by:
     ■ Date(ascending/descending).
     ■ Revenue(ascending/descending).
     ■ Net Income (ascending/descending).
    
 4. The App is mobile-friendly and looks good on both desktop and mobile devices.
 

 Technical Requirements:
 1. Frontend:
 ○ Using React(JavaScript).
 ○ Styling implemented with TailwindCSS.

 2. Backend:
 ○ Using Python with Flask.
 ○ The backend:
     ■ Fetch data from the API.
     ■ Handle filtering and sorting based on user requests.
     ■ Expose an endpoint for the frontend to fetch filtered data.
    
 3. App deployed on Render, with link: https://apple-financial-data-frontend.onrender.com/