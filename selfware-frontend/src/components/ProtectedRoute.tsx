'use client';

import React, { useEffect, useState } from 'react';
import { getToken, isTokenValid, logoutUser } from '@/utils/auth-utils';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true); // Token is valid
    } else {
      logoutUser(); // Redirect to sign-in if token is invalid/expired
    }
  }, []);

  if (!isAuthenticated) {
    return null; // While redirecting, render nothing
  }

  return <>{children}</>;
}
