import React, { useState, useEffect } from 'react';

export default function QuoteOfTheDay() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://zenquotes.io/api/today')}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.contents) {
          try {
            const parsed = JSON.parse(data.contents);
            if (parsed && parsed.length > 0) {
              setQuote(parsed[0]);
            }
          } catch (e) {
            console.error("Error parsing quote data", e);
          }
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
