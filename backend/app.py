#===============================================================================================================
# Name        : App.py
# Author      : ValueGlance
# Version     : 01/10/2025
# Description : Backend implemented with Python + Flask to build a financial data filtering app using data 
#               from a single API endpoint.The app will fetch annual income statements for AAPL (Apple) 
#               and allow users to filter and analyze key metrics. Filtering data on the server side(backend). 
#==============================================================================================================
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# API Key and Base URL
API_KEY = "KaRGb55gHi9wkGtPjEftgw5mQI0iGsqX"
BASE_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey="

@app.route('/api/data', methods=['GET'])
def fetch_filtered_data():
    # Debug: Log received query parameters
    print(f"Received query parameters: {request.args}")

    start_year = request.args.get('start_year', type=int)
    end_year = request.args.get('end_year', type=int)
    
    min_revenue = request.args.get('min_revenue')
    max_revenue = request.args.get('max_revenue')
    
    min_netIncome = request.args.get('min_netIncome')
    max_netIncome = request.args.get('max_netIncome')
    
    sort_key = request.args.get('sort_key')
    sort_order = request.args.get('sort_order')

    # Parse query parameters, treating "undefined" as None 
    min_revenue = None if min_revenue == 'undefined' else float(min_revenue) if min_revenue else None
    max_revenue = None if max_revenue == 'undefined' else float(max_revenue) if max_revenue else None

    min_netIncome = None if min_netIncome == 'undefined' else float(min_netIncome) if min_netIncome else None
    max_netIncome = None if max_netIncome == 'undefined' else float(max_netIncome) if max_netIncome else None

    sort_key = None if sort_key == 'undefined' else sort_key
    sort_order = None if sort_order == 'undefined' else sort_order

    # Fetch and filter data from API
    response = requests.get(BASE_URL + API_KEY)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from API"}), 500

    data = response.json()

    # Filter data
    filtered_data = [
        item for item in data if (
            (not start_year or int(item['date'].split('-')[0]) >= start_year) and
            (not end_year or int(item['date'].split('-')[0]) <= end_year) and
            
            (not min_revenue or float(item['revenue']) >= min_revenue) and
            (not max_revenue or float(item['revenue']) <= max_revenue) and
            
            (not min_netIncome or float(item['netIncome']) >= min_netIncome) and
            (not max_netIncome or float(item['netIncome']) <= max_netIncome)
        )
    ]

    # Sort data
    if sort_key and sort_key in data[0]:
        filtered_data.sort(key=lambda x: x[sort_key], reverse=(sort_order == 'desc'))

    return jsonify(filtered_data)    

if __name__ == "__main__":
    app.run(debug=True)
