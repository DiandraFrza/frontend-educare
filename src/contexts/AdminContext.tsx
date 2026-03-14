"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AdminContextType {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      fetchUser(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem("admin_token");
        setToken(null);
      }
    } catch {
      localStorage.removeItem("admin_token");
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login gagal");
    }

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("admin_token", data.token);
  }, []);

  const logout = useCallback(async () => {
    if (token) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch { /* ignore */ }
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem("admin_token");
  }, [token]);

  return (
    <AdminContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}

// Helper for authenticated API calls
export function useAdminApi() {
  const { token } = useAdmin();

  const apiFetch = useCallback(
    async (endpoint: string, options: RequestInit = {}) => {
      const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          "Accept": "application/json",
          Authorization: `Bearer ${token}`,
          ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
          ...options.headers,
        },
      });
      return res;
    },
    [token]
  );

  return apiFetch;
}
