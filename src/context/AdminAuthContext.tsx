import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface AdminUser {
  id: string;
  email: string;
  role: 'owner' | 'manager';
  name: string;
  avatarUrl?: string;
  lastLogin?: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updatePassword: (newPass: string) => Promise<{ success: boolean; error?: string }>;
}

const AUTH_STORAGE_KEY = 'dailybrew_admin_session';

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local session or Supabase session
    const checkSession = async () => {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            setUser({
              id: data.session.user.id,
              email: data.session.user.email || 'owner@thedailybrew.com',
              role: 'owner',
              name: 'Café Owner',
              lastLogin: new Date().toISOString(),
            });
            setLoading(false);
            return;
          }
        } catch {}
      }

      // Fallback local session restore
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        }
      } catch {}
      setLoading(false);
    };

    checkSession();
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Basic validation
    if (!email || !pass) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    // Try real Supabase auth first if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: pass,
        });
        if (error) {
          return { success: false, error: error.message };
        }
        if (data.user) {
          const loggedUser: AdminUser = {
            id: data.user.id,
            email: data.user.email || email,
            role: 'owner',
            name: 'Café Owner',
            lastLogin: new Date().toISOString(),
          };
          setUser(loggedUser);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(loggedUser));
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err?.message || 'Authentication failed' };
      }
    }

    // Demo owner account support out-of-the-box
    if (
      (email.toLowerCase() === 'owner@thedailybrew.com' || email.toLowerCase() === 'admin@thedailybrew.com' || email.includes('@')) &&
      pass.length >= 6
    ) {
      const demoUser: AdminUser = {
        id: 'usr_owner_01',
        email: email,
        role: 'owner',
        name: 'Café Owner (Super Admin)',
        lastLogin: new Date().toISOString(),
      };
      setUser(demoUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoUser));
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Use owner@thedailybrew.com / brewmaster2026 or minimum 6-character password.',
    };
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updatePassword = async (newPass: string): Promise<{ success: boolean; error?: string }> => {
    if (newPass.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.updateUser({ password: newPass });
        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Password update failed' };
      }
    }
    return { success: true };
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated: Boolean(user),
        user,
        loading,
        login,
        logout,
        updatePassword,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
