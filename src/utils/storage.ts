import { supabase } from '../lib/supabase';

export const uploadFile = async (
  file: File,
  bucket: string = 'pdfs'
): Promise<string> => {
  try {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      console.error('Upload error:', error);
      throw new Error('Erro ao fazer upload do arquivo. Por favor, tente novamente.');
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      throw new Error('Erro ao gerar URL pública do arquivo');
    }

    return urlData.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Erro ao fazer upload do arquivo. Por favor, tente novamente.');
  }
};

export const downloadFile = async (url: string, originalFileName: string): Promise<void> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = originalFileName;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download error:', error);
    throw new Error('Erro ao baixar o arquivo. Por favor, tente novamente.');
  }
};