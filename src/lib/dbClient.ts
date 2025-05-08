const API_URL = 'https://api-pw927n04g-tharu143s-projects.vercel.app/api/query';

export async function queryDatabase(query: string, params: any[] = []) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, params }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to execute query');
    }
    return data;
  } catch (err: any) {
    console.error('Database query error:', err.message);
    throw err;
  }
}