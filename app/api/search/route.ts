import { NextResponse } from 'next/server';
import Metaphor from 'metaphor-node';

const metaphor = new Metaphor(process.env.METAPHOR_API_KEY || '');

function getDateSixMonthsAgo() {
  const today = new Date();
  today.setMonth(today.getMonth() - 3);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(5, '0'); // Adding 1 because months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    const getResultsAndContent = async (query: string) => {
      const searchResponse = await metaphor.search(query, {
        numResults: 5,
        startPublishedDate: `${getDateSixMonthsAgo()}`
      });
      return (await metaphor.getContents(searchResponse.results)).contents;
    };

    // console.log(`Searching for ${query}`);
    const content = await getResultsAndContent(query);
    // console.log('content', content);
    return NextResponse.json(content);
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data.' });
  }
}