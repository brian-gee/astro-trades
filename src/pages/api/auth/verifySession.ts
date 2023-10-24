import type { APIRoute } from 'astro';
import { app } from '../../../firebase/server';
import { getAuth } from 'firebase-admin/auth';

export const GET: APIRoute = async ({ request, cookies }) => {
  const auth = getAuth(app);

  // Get the session cookie value from the request
  const sessionCookie = cookies.get('session')?.value;

  if (!sessionCookie) {
    return new Response('No session cookie found', { status: 401 });
  }

  // Verify the session cookie
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    return new Response(JSON.stringify({ uid: decodedClaims.uid }), {
      status: 200,
    });
  } catch (error) {
    return new Response('Invalid session cookie', { status: 401 });
  }
};
