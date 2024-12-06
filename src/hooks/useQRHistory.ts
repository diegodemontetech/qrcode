import { useState, useEffect, useCallback } from 'react';
import { SavedQRCode } from '../types/qr';
import { loadQRCodes } from '../utils/db';

export const useQRHistory = () => {
  const [savedQRCodes, setSavedQRCodes] = useState<SavedQRCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const codes = await loadQRCodes();
      setSavedQRCodes(codes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar histórico');
      setSavedQRCodes([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = useCallback((id: string) => {
    setSavedQRCodes((prev) => prev.filter((code) => code.id !== id));
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    savedQRCodes,
    isLoading,
    error,
    refreshHistory: loadHistory,
    handleDelete,
  };
};