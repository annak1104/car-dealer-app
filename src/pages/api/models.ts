import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { makeId, year } = req.query;

  if (typeof makeId !== 'string' || typeof year !== 'string') {
    console.error('Invalid parameters:', { makeId, year });
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error('Fetch error:', response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle models' });
  }
}
