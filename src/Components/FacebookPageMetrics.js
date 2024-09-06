import React, { useState, useEffect } from 'react';
import { Card, Form, Alert, Button } from 'react-bootstrap';
import { Users, ThumbsUp, Eye, Heart } from 'lucide-react';

const FacebookPageMetrics = ({ accessToken }) => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [pageMetrics, setPageMetrics] = useState(null);
  const [error, setError] = useState(null);
  const [since, setSince] = useState('');
  const [until, setUntil] = useState('');

  useEffect(() => {
    fetchPages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const fetchPages = async () => {
    try {
      const response = await fetch(`https://graph.facebook.com/v16.0/me/accounts?access_token=${accessToken}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      setPages(data.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
      setError('Failed to fetch pages. Please check your access token and try again.');
    }
  };

  const fetchPageMetrics = async (pageId, pageAccessToken) => {
    if (!since || !until) {
      setError('Please select both start and end dates.');
      return;
    }

    try {
      const pageResponse = await fetch(`https://graph.facebook.com/v16.0/${pageId}?fields=fan_count,followers_count&access_token=${pageAccessToken}`);
      const pageData = await pageResponse.json();
      if (pageData.error) throw new Error(pageData.error.message);

      const insightsResponse = await fetch(`https://graph.facebook.com/v16.0/${pageId}/insights?metric=page_fans,page_impressions,post_engaged_users,page_follows&period=day&since=${since}&until=${until}&access_token=${pageAccessToken}`);
      const insightsData = await insightsResponse.json();
      if (insightsData.error) throw new Error(insightsData.error.message);

      const aggregateMetrics = insightsData.data.reduce((acc, metric) => {
        const totalValue = metric.values.reduce((sum, value) => sum + value.value, 0);
        acc[metric.name] = totalValue;
        return acc;
      }, {});

      setPageMetrics({
        followers: pageData.fan_count || 0,
        impressions: aggregateMetrics.page_impressions || 0,
        engagement: aggregateMetrics.post_engaged_users || 0,
        reactions: aggregateMetrics.page_follows || 0,
      });
    } catch (error) {
      console.error('Error fetching page metrics:', error);
      setError('Failed to fetch page metrics. Please check permissions and try again.');
    }
  };

  const handlePageChange = (e) => {
    const pageId = e.target.value;
    setSelectedPage(pageId);
    setPageMetrics(null);
  };

  const handleFetchMetrics = () => {
    if (selectedPage) {
      const page = pages.find((p) => p.id === selectedPage);
      if (page?.access_token) {
        fetchPageMetrics(selectedPage, page.access_token);
      }
    } else {
      setError('Please select a page before fetching metrics.');
    }
  };

  const metricCards = [
    { title: 'Total Fans', value: pageMetrics?.followers, icon: Users },
    { title: 'Post Impressions', value: pageMetrics?.impressions, icon: Eye },
    { title: 'Post Engagement', value: pageMetrics?.engagement, icon: ThumbsUp },
    { title: 'Page Follows', value: pageMetrics?.reactions, icon: Heart }
  ];

  return (
    <div className="container mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form.Select onChange={handlePageChange} className="mb-4">
        <option value="">Select a Facebook Page</option>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>{page.name}</option>
        ))}
      </Form.Select>

      <div className="row mb-4">
        <div className="col-md-6">
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control 
              type="date" 
              value={since}
              onChange={(e) => setSince(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control 
              type="date" 
              value={until}
              onChange={(e) => setUntil(e.target.value)}
            />
          </Form.Group>
        </div>
      </div>

      <Button onClick={handleFetchMetrics} className="mb-4">Fetch Metrics</Button>

      {selectedPage && pageMetrics && (
        <div className="row">
          {metricCards.map((metric, index) => (
            <div key={index} className="col-md-3 mb-4">
              <Card className="h-100">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className="text-center mb-4">{metric.title}</Card.Title>
                  <div className="text-center">
                    {React.createElement(metric.icon, { size: 48, className: "mb-2" })}
                    <Card.Text className="h3">{metric.value}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacebookPageMetrics;