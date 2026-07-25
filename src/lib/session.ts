import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { UserSession } from '@/types/auth';

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'leaddesk_mini_production_jwt_secret_key_2026_safe'
);

const COOKIE_NAME = 'leaddesk_session';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Encrypts user session object into JWT string
 */
export async function encryptSession(payload: UserSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

/**
 * Decrypts JWT string back to user session payload
 */
export async function decryptSession(token: string): Promise<UserSession | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return payload as unknown as UserSession;
  } catch {
    return null;
  }
}

/**
 * Creates HTTP-only session cookie for authenticated user
 */
export async function createSession(user: { id: string; email: string; name: string }): Promise<void> {
  const expiresAt = Date.now() + SESSION_DURATION;
  const sessionData: UserSession = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: 'admin',
    expiresAt,
  };

  const token = await encryptSession(sessionData);
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(expiresAt),
    path: '/',
  });
}

/**
 * Retrieves and verifies current user session from cookies
 */
export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;
  return await decryptSession(token);
}

/**
 * Destroys session cookie on logout
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
