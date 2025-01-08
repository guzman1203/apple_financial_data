# Apple_Financial_Data_Analysis

 Objective:
 Build a financial data filtering app using data from a single API endpoint. The app will fetch
 annual income statements for AAPL (Apple) and allow users to filter and analyze key metrics.
 
 API Endpoint to Use:
 https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=<api_
 key>
 
 You can obtain a free API key from Financial Modeling Prep : https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements
 This endpoint returns the annual income statements for Apple Inc., and the response includes
 key financial data such as revenue, net income, gross profit, and expenses.
 
 Requirements:
 1. Fetch and Display Data:
 ○ Fetch the data from the API endpoint and display it in a table.
 ○ Include the following columns in the table:
     ■ Date(e.g., "2024-09-28")
     ■ Revenue
     ■ Net Income
     ■ GrossProfit
     ■ EPS(Earnings Per Share)
     ■ Operating Income

 2. Filtering:
 ○ Allow users to filter the data using the following criteria:
     ■ DateRange: Filter results between specific years (e.g., 2020–2024).
     ■ Revenue: Filter rows where Revenue falls within a user-specified range.
     ■ Net Income: Filter rows where Net Income falls within a user-specified
     range.

 3. Sorting:
 ○ Allow users to sort the table by:
     ■ Date(ascending/descending).
     ■ Revenue(ascending/descending).
     ■ Net Income (ascending/descending).
    
 4. Responsive Design:
 ○ Ensure the app is mobile-friendly and looks good on both desktop and mobile
 devices.

 Technical Requirements:
 1. Frontend:
 ○ UseReact(JavaScript or TypeScript).
 ○ Styling should be implemented with TailwindCSS.

 2. Backend (Optional):
 ○ If you wish to filter data on the server side instead of the frontend, implement a
 simple backend using Python (Flask or FastAPI).
 ○ The backend should:
     ■ Fetch data from the API.
     ■ Handle filtering and sorting based on user requests.
     ■ Exposeanendpoint for the frontend to fetch filtered data.
    
 3. Deployment:
 ○ Deploy using Vercel, Netlify, GitHub Pages, AWS or any service you prefe