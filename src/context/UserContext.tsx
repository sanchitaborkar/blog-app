// src/context/UserContext.tsx
'use client';

import authGuard from '@/lib/authGuard';
import { isPublicRoute } from '@/utils/constants';
import { usePathname, useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UserType = any;

const UserContext = createContext<{
  user: UserType | null;
  setUser: (u: UserType | null) => void;
} | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // optional: load user on app start
    async function load() {
      try {
        const res = await authGuard();
        console.log(4344, res, pathname);

        if (res?.authenticated) setUser(res.user);

        // when user 
        if (!isPublicRoute(pathname) && !res?.authenticated) {
          router.push('/sign-in')
        }

        if ((pathname === "/sign-in" || pathname === "/sign-up") && res?.authenticated) {
          router.push('/')
        }


      } catch (err) {
        setUser(null);
      }
    }
    load();
  }, [pathname, router]);

  console.log(878787, user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUserContext must be used inside UserProvider');
  return ctx;
}
