/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
} */

// Import necessary modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Helmet } from 'react-helmet';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    revenue: { min: '', max: '' },
    netIncome: { min: '', max: '' },
  });
  const [sort, setSort] = useState({ column: '', direction: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=KaRGb55gHi9wkGtPjEftgw5mQI0iGsqX'
        );
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = data;

    // Filter by date range
    if (filters.dateRange.start && filters.dateRange.end) {
      filtered = filtered.filter((item) => {
        const year = parseInt(item.date.split('-')[0], 10);
        return (
          year >= parseInt(filters.dateRange.start, 10) &&
          year <= parseInt(filters.dateRange.end, 10)
        );
      });
    }

    // Filter by revenue range
    if (filters.revenue.min || filters.revenue.max) {
      filtered = filtered.filter((item) => {
        const revenue = parseFloat(item.revenue);
        return (
          (!filters.revenue.min || revenue >= parseFloat(filters.revenue.min)) &&
          (!filters.revenue.max || revenue <= parseFloat(filters.revenue.max))
        );
      });
    }

    // Filter by net income range
    if (filters.netIncome.min || filters.netIncome.max) {
      filtered = filtered.filter((item) => {
        const netIncome = parseFloat(item.netIncome);
        return (
          (!filters.netIncome.min ||
            netIncome >= parseFloat(filters.netIncome.min)) &&
          (!filters.netIncome.max ||
            netIncome <= parseFloat(filters.netIncome.max))
        );
      });
    }

    setFilteredData(filtered);
  };

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

  const getCurrencySymbol = () => {
    return new Intl.NumberFormat(navigator.language, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })
      .formatToParts(0)
      .find((part) => part.type === 'currency').value;
  };

  const renderSortArrow = (column) => {
    if (sort.column === column) {
      return sort.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>ValueGlance Fin.Data</title>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
        />
      </Helmet>
      <h1 className="text-2xl font-bold text-center mb-4">
        Financial Data Table
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
