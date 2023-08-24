import type { APIRoute } from 'astro';
import { app } from '../../../firebase/server';
import { getAuth } from 'firebase-admin/auth';

export const get: APIRoute = async ({ request, cookies }) => {
  const auth = getAuth(app);

  // Get the session cookie value from the request
  const sessionCookie = cookies.get('session')?.value;

  if (!sessionCookie) {
    return {
      status: 401,
      body: 'No session cookie found',
    };
  }

  // Verify the session cookie
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    return {
      status: 200,
      body: JSON.stringify({ uid: decodedClaims.uid }),
    };
  } catch (error) {
    return {
      status: 401,
      body: 'Invalid session cookie',
    };
  }
};
