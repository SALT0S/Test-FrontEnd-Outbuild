'use server';

interface getCommentsResponse {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export async function getComments(limit = 5, offset = 0): Promise<getCommentsResponse[]> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_start=${offset}`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getTotalComments(): Promise<getCommentsResponse[]> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments`, {
      cache: 'no-cache',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
