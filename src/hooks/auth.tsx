import React, { useContext, createContext, useState, useEffect } from 'react';
import * as AuthSessions from 'expo-auth-session';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUser {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

interface IAuthContextData {
  user: IUser | null;
  isSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthResponse {
  token: string;
  user: IUser;
}

interface IAuthorizationResponse {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
}

export const AuthContext = createContext({} as IAuthContextData);

const CLIENT_ID = 'c33d3ef44b8854329a81';
const SCOPE = 'read:user';
const USER_STORAGE = '@mobile:user';
const TOKEN_STORAGE = '@mobile:token';

function AuthProvider({ children }: IAuthProvider) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [user, setUSer] = useState<IUser | null>(null);

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;

  async function signIn() {
    try {
      setIsSignIn(true);
      const authSessionResponse = (await AuthSessions.startAsync({
        authUrl,
      })) as IAuthorizationResponse;

      if (
        authSessionResponse.type === 'success' &&
        authSessionResponse.params.error !== 'access_denied'
      ) {
        const authResponse = await api.post<IAuthResponse>('/authenticate', {
          code: authSessionResponse.params.code,
        });

        const { user, token } = authResponse.data as IAuthResponse;

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUSer(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSignIn(false);
    }
  }

  async function signOut() {
    setUSer(null);
    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    async function loadUserStorageData() {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);

      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`;
        setUSer(JSON.parse(userStorage));
      }

      setIsSignIn(false);
    }

    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
