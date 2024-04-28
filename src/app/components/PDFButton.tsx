import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import React from 'react';

const DownloadPDFButton = () => {
  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        // Remova esta linha, pois não é necessário definir o Content-Type
        // 'Content-Type': 'application/json'
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/getdata`, {
        headers: headers,
      });

      if (!response.ok) {
        throw new Error('Erro ao baixar o PDF');
      }

      // Extrai o conteúdo do arquivo como um objeto Blob
      const blob = await response.blob();

      // Cria uma URL temporária para o objeto Blob
      const url = window.URL.createObjectURL(blob);

      // Cria um link de download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rating_metrics_course.pdf`);

      // Dispara o clique automaticamente para iniciar o download
      link.click();

      // Revoga a URL temporária
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
    }
  };

  return (
    <Button onClick={handleDownloadPDF} className="bg-default hover:bg-default/50 text-white py-2 px-4 rounded w-full">
      <FileDown />
      Gerar relatório

    </Button>
  );
};

export default DownloadPDFButton;
