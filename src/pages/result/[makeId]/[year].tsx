import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface VehicleModel {
  Model_Name: string;
}

const ResultPage: React.FC = () => {
  const router = useRouter();
  const { makeId, year, makeName } = router.query;
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModels = async () => {
      if (typeof makeId === 'string' && typeof year === 'string') {
        try {
          const url = `/api/models?makeId=${makeId}&year=${year}`;
          const response = await fetch(url);

          if (!response.ok) {
            console.error('Fetch error:', response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.Results && Array.isArray(data.Results)) {
            setModels(data.Results);
          } else {
            setModels([]);
          }
        } catch (err) {
          setError('Failed to fetch vehicle models. Please try again.');
          console.error('Fetch error:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchModels();
  }, [makeId, year]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-red-500">
        Vehicle Models for {makeName} in {year}
      </h1>
      <ul>
        {models.length > 0 ? (
          models.map((model) => (
            <li key={model.Model_Name} className="mb-2 text-red-500">
              {model.Model_Name}
            </li>
          ))
        ) : (
          <li>No models found for this make and year.</li>
        )}
      </ul>
    </div>
  );
};

//move to the separate component
export default function Page() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <ResultPage />
    </Suspense>
  );
}
