'use client';

import React, { useState } from 'react';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [preference, setPreference] = useState<string>('');
  const [searchDeals, setSearchDeals] = useState<boolean>(false);
  const [results, setResults] = useState<any[]>([]); // Store search results

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Location: ', location);
    console.log('Preference: ', preference);
    let query = '';

    if (location !== '') {
      if (preference === '') {
        query = `Here is an article about the hottest food in or near ${location}`;
      }
      else {
        query = `Here is an article about the hottest ${preference} food in or near ${location}`;
      }

      if (searchDeals) {
        query += ' with great deals and promotions!';
      }
      else {
        query += '.';
      }

      try {
        const response = await axios.post('/api/search/', { query });
        setResults(response.data);  // Store results in state
        console.log(response.data); // Log results to console for now
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto bg-white p-12 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-700">What&apos;s Hot?</h1>
        <h2 className="text-center mb-4">Find the hottest food places near you</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Enter your location" 
              value={location} 
              onChange={(e) => {
                setLocation(e.target.value)
              }}
              className="w-full p-4 rounded border border-gray-300 hover:border-orange-500 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Food preference (optional)" 
              value={preference} 
              onChange={(e) => {
                setPreference(e.target.value)
              }}
              className="w-full p-4 rounded border border-gray-300 hover:border-orange-500 focus:border-orange-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              checked={searchDeals} 
              onChange={e => setSearchDeals(e.target.checked)}
              className="mr-2"
            />
            <label className="text-gray-700">Search for food deals/promotions?</label>
          </div>
          <button type="submit" className="w-full bg-[#FFA500] text-white p-2 rounded hover:opacity-80 hover:bg-orange-600 focus:outline-none focus:bg-orange-600">
            Search
          </button>
        </form>
        {/* Display the search results below the form */}
        {results.length > 0 && (
          <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Search Results:
          </h3>
          <ul>
            {results.map((result, index) => (
              <li key={index} className="mb-6 border-b pb-4 last:border-0">
                {result.title && <h4 className="text-xl font-bold mb-2">{result.title}</h4>}
                {result.url && <a href={result.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Read more</a>}
                {result.extract && 
                  <div 
                    className="mt-2 font-light content-box overflow-hidden" 
                    style={{ maxHeight: '100px' }} 
                    dangerouslySetInnerHTML={{ __html: result.extract }} 
                  />
                }
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
}

export default HomePage;