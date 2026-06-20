import React, { useState, useEffect } from 'react';

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/quote')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setQuote(data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch quote:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="quote-box loading">Loading inspiration...</div>;
  if (!quote) return null;

  return (
    <div className="quote-box">
      <div className="quote-text">“{quote.q}”</div>
      <div className="quote-author">— {quote.a}</div>
      <div className="quote-attr">
        Inspirational quotes provided by <a href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">ZenQuotes API</a>
      </div>
    </div>
  );
}
