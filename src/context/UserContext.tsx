// src/context/UserContext.tsx
'use client';

import { getUserDetails } from '@/actions/user';
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserType = any;

const UserContext = createContext<{
  user: UserType | null;
  setUser: (u: UserType | null) => void;
} | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    // optional: load user on app start
    async function load() {
      try {
        const res = await getUserDetails();
        if (res?.success) setUser(res.user);
      } catch (err) {
        setUser(null);
      }
    }
    load();
  }, []);

  console.log(878787,user)

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
