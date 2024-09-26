import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacebookPagesDropdown = ({ accessToken, onPageSelect }) => {
  const [pages, setPages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get(`https://graph.facebook.com/me/accounts`, {
          params: {
            access_token: accessToken,
            fields: 'name,id'
          }
        });
        setPages(response.data.data);
      } catch (error) {
        setError('Failed to fetch pages.');
        console.error('Error fetching pages:', error);
      }
    };

    if (accessToken) {
      fetchPages();
    }
  }, [accessToken]);

  return (
    <div>
      <h2>Select a Page</h2>
      {error && <p>{error}</p>}
      <select onChange={(e) => onPageSelect(e.target.value)} defaultValue="">
        <option value="" disabled>Select a page</option>
        {pages.map(page => (
          <option key={page.id} value={page.id}>{page.name}</option>
        ))}
      </select>
    </div>
  );
};

export default FacebookPagesDropdown;
