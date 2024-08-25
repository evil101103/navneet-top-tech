import React, { useState } from 'react';

const ApiGetRequest: React.FC = () => {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch('https://vs160816svc363862.mock.blazemeter.com/api/1.0.0/questionpaper', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(`Error: ${(err as Error).message}`);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
        <h2>Error:</h2>
        <pre>{error}</pre>
      </div>
    </div>
  );
};

export default ApiGetRequest;
