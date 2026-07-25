'use server';

import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
import { User } from '@/models/User';
import { LoginSchema, LoginInput } from '@/schemas/auth.schema';
import { createSession, destroySession, getSession } from '@/lib/session';
import { ApiResponse } from '@/types/api';
import { UserSession } from '@/types/auth';

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@leaddesk.com';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AdminPassword123!';

/**
 * Ensures at least one admin account exists in database for immediate testing
 */
export async function ensureAdminUserCreated() {
  await connectToDatabase();
  const existingUser = await User.findOne({ email: DEFAULT_ADMIN_EMAIL.toLowerCase() });

  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, salt);

    await User.create({
      name: 'LeadDesk Administrator',
      email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      role: 'admin',
    });
  }
}

/**
 * Server Action: Authenticate Admin User
 */
export async function loginAction(data: LoginInput): Promise<ApiResponse<UserSession>> {
  try {
    const parsed = LoginSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: 'Please provide a valid email and password.',
      };
    }

    const { email, password } = parsed.data;

    await connectToDatabase();
    await ensureAdminUserCreated();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return {
        success: false,
        error: 'Invalid credentials. User does not exist.',
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Invalid credentials. Password incorrect.',
      };
    }

    await createSession({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    const session: UserSession = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: 'admin',
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    return {
      success: true,
      message: 'Logged in successfully',
      data: session,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Authentication failed',
    };
  }
}

/**
 * Server Action: Logout Admin User
 */
export async function logoutAction(): Promise<ApiResponse<null>> {
  await destroySession();
  return { success: true, message: 'Logged out successfully' };
}

/**
 * Server Action: Get Active Session
 */
export async function getCurrentUserAction(): Promise<ApiResponse<UserSession | null>> {
  const session = await getSession();
  return {
    success: true,
    data: session,
  };
}
