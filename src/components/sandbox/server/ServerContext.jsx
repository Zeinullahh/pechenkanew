"use client";
import { createContext, useContext } from 'react';
export const ServerContext = createContext(null);
export const StageContext = createContext(null);
export const useServerSandbox = () => useContext(ServerContext);
export const localQuery = (data, refetch = () => {}) => ({ data, refetch, isLoading: false, error: null });
