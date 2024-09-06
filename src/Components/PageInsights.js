import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PageInsights = ({ pageId, accessToken }) => {
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState({
    since: '2024-01-01',
    until: '2024-12-31'
  });

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get(`https://graph.facebook.com/${pageId}/insights`, {
          params: {
            access_token: accessToken,
            metric: 'page_fans,page_engaged_users,page_impressions,page_reactions',
            since: dateRange.since,
            until: dateRange.until,
            period: 'total'
          }
        });
        setInsights(response.data.data);
      } catch (error) {
        setError('Failed to fetch insights.');
        console.error('Error fetching insights:', error);
      }
    };

    if (pageId && accessToken) {
      fetchInsights();
    }
  }, [pageId, accessToken, dateRange]);

  return (
    <div>
      <h2>Page Insights</h2>
      {error && <p>{error}</p>}
      {insights ? (
        <div>
          <p>Total Followers: {insights.find(i => i.name === 'page_fans')?.values[0]?.value}</p>
          <p>Total Engagement: {insights.find(i => i.name === 'page_engaged_users')?.values[0]?.value}</p>
          <p>Total Impressions: {insights.find(i => i.name === 'page_impressions')?.values[0]?.value}</p>
          <p>Total Reactions: {insights.find(i => i.name === 'page_reactions')?.values[0]?.value}</p>
        </div>
      ) : (
        <p>Loading insights...</p>
      )}
    </div>
  );
};

export default PageInsights;
