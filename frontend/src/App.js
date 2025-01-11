//===============================================================================================================
// Name        : App.js
// Author      : ValueGlance
// Version     : 01/07/2025
// Description : Frontend implemented with React + TailwindCSS to build a financial data filtering app using data 
//               from a single API endpoint. The app will fetch annual income statements for AAPL (Apple)
//               and allow users to filter and analyze key metrics.
//==============================================================================================================

// Import necessary modules
import React, { useState, useEffect, useCallback } from 'react';
//import axios from 'axios';
import './App.css';
import { Helmet } from 'react-helmet';

const App = () => {
  //const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    revenue: { min: '', max: '' },
    netIncome: { min: '', max: '' },
  });
  const [sort, setSort] = useState({ column: '', direction: '' });
  
  const BASE_URL = "https://apple-financial-data.onrender.com";

  // fetch data from a single API endpoint.
  // clean up the code and avoid re-creating the fetchData function on every render, memoize it using useCallback
  //useEffect(() => {
  const fetchData = useCallback(async () => {
    try {
        const API_URL = `${BASE_URL}/api/data?start_year=${filters.dateRange.start}&end_year=${filters.dateRange.end}&min_revenue=${filters.revenue.min}&max_revenue=${filters.revenue.max}&min_netIncome=${filters.netIncome.min}&max_netIncome=${filters.netIncome.max}&sort_key=${sort.column}&sort_order=${sort.direction}`;

        const response = await fetch(API_URL);

        const data = await response.json();
        setFilteredData(data);
		
    } catch (error) {
        console.error("Error fetching data from backend:", error);
    }
  }, [
    filters.dateRange.start,
    filters.dateRange.end,
    filters.revenue.min,
    filters.revenue.max,
    filters.netIncome.min,
    filters.netIncome.max,
    sort.column,
    sort.direction,
  ]);
  
  //});
  
  // define the filters to apply
  const applyFilters = async () => {
    try {
      const query = new URLSearchParams({
        start_year: filters.dateRange.start || undefined,
        end_year: filters.dateRange.end || undefined,
		
        min_revenue: filters.revenue.min || undefined,
        max_revenue: filters.revenue.max || undefined,
		
        min_netIncome: filters.netIncome.min || undefined,
        max_netIncome: filters.netIncome.max || undefined,
		
        sort_key: sort.column || undefined,
        sort_order: sort.direction || undefined,
      }).toString();

      const response = await fetch(`http://127.0.0.1:5000/api/data?${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const filteredData = await response.json();
      setFilteredData(filteredData);
    } catch (error) {
        console.error("Error applying filters:", error);
    }
  };
 
  // define the sorts to apply
  const applySort = (column) => {
    const direction = sort.direction === 'asc' ? 'desc' : 'asc';
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = parseFloat(a[column]) || a[column];
      const bValue = parseFloat(b[column]) || b[column];

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setSort({ column, direction });
    setFilteredData(sorted);
  };

  // get Currency Symbol from locale
  const getCurrencySymbol = () => {
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })
      .formatToParts(0)
      .find((part) => part.type === 'currency').value;
  };

  // render Sort Arrow to show the sort asc or desc
  const renderSortArrow = (column) => {
    if (sort.column === column) {
      return sort.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>ValueGlance Analysis</title>
        <link
          rel="icon"
          type="image/png"
          href="favicon.ico"
        />
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-4">
        Apple's Financial Dashboard 
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Date Range Filter */}
        <div>
          <label className="block text-sm font-medium">Date Range</label>
          <input
            type="number"
            placeholder="Start Year"
            value={filters.dateRange.start}
            onChange={(e) =>
              setFilters({
                ...filters,
                dateRange: { ...filters.dateRange, start: e.target.value },
              })
            }
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="number"
            placeholder="End Year"
            value={filters.dateRange.end}
            onChange={(e) =>
              setFilters({
                ...filters,
                dateRange: { ...filters.dateRange, end: e.target.value },
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        {/* Revenue Filter */}
        <div>
          <label className="block text-sm font-medium">Revenue Range ({getCurrencySymbol()})</label>
          <input
            type="number"
            placeholder="Min Revenue"
            value={filters.revenue.min}
            onChange={(e) =>
              setFilters({
                ...filters,
                revenue: { ...filters.revenue, min: e.target.value },
              })
            }
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="number"
            placeholder="Max Revenue"
            value={filters.revenue.max}
            onChange={(e) =>
              setFilters({
                ...filters,
                revenue: { ...filters.revenue, max: e.target.value },
              })
            }
            className="w-full border rounded p-2"
          />
        </div>

        {/* Net Income Filter */}
        <div>
          <label className="block text-sm font-medium">Net Income Range ({getCurrencySymbol()})</label>
          <input
            type="number"
            placeholder="Min Net Income"
            value={filters.netIncome.min}
            onChange={(e) =>
              setFilters({
                ...filters,
                netIncome: { ...filters.netIncome, min: e.target.value },
              })
            }
            className="w-full border rounded p-2 mb-2"
          />
          <input
            type="number"
            placeholder="Max Net Income"
            value={filters.netIncome.max}
            onChange={(e) =>
              setFilters({
                ...filters,
                netIncome: { ...filters.netIncome, max: e.target.value },
              })
            }
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="bg-blue-500 text-white rounded px-4 py-2 mb-4"
      >
        Apply Filters
      </button>

      <div className="overflow-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th
                onClick={() => applySort('date')}
                className="cursor-pointer border border-gray-300 p-2 text-center"
              >
                Date {renderSortArrow('date')}
              </th>
              <th
                onClick={() => applySort('revenue')}
                className="cursor-pointer border border-gray-300 p-2 text-right"
              >
                Revenue ({getCurrencySymbol()}) {renderSortArrow('revenue')}
              </th>
              <th
                onClick={() => applySort('netIncome')}
                className="cursor-pointer border border-gray-300 p-2 text-right"
              >
                Net Income ({getCurrencySymbol()}) {renderSortArrow('netIncome')}
              </th>
              <th className="border border-gray-300 p-2 text-right">
                Gross Profit ({getCurrencySymbol()})
              </th>
              <th className="border border-gray-300 p-2 text-right">EPS</th>
              <th className="border border-gray-300 p-2 text-right">
                Operating Income ({getCurrencySymbol()})
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 text-center">
                  {new Date(item.date).toLocaleDateString('en-US')}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {parseFloat(item.revenue).toLocaleString('en-US')}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {parseFloat(item.netIncome).toLocaleString('en-US')}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {parseFloat(item.grossProfit).toLocaleString('en-US')}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {parseFloat(item.eps).toLocaleString('en-US')}
                </td>
                <td className="border border-gray-300 p-2 text-right">
                  {parseFloat(item.operatingIncome).toLocaleString('en-US')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
