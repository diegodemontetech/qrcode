import { supabase } from '../lib/supabase';
import { SavedQRCode } from '../types/qr';

export const loadQRCodes = async (): Promise<SavedQRCode[]> => {
  try {
    const { data, error } = await supabase
      .from('qrcodes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Load QR codes error:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Load QR codes error:', err);
    return [];
  }
};

export const saveQRCode = async (qrCode: Omit<SavedQRCode, 'id' | 'created_at'>) => {
  try {
    const { error } = await supabase
      .from('qrcodes')
      .insert([{
        ...qrCode,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Save QR code error:', error);
      throw new Error('Erro ao salvar QR code');
    }
  } catch (err) {
    console.error('Save QR code error:', err);
    throw err;
  }
};

export const deleteQRCode = async (id: string) => {
  try {
    const { error } = await supabase
      .from('qrcodes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete QR code error:', error);
      throw new Error('Erro ao deletar QR code');
    }
  } catch (err) {
    console.error('Delete QR code error:', err);
    throw err;
  }
};