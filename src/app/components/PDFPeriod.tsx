import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DownloadPDFPeriod = () => {
  const [periodId, setPeriodId] = useState('');
  const [loadingPeriod, setLoadingPeriod] = useState(false);
  const [errorPeriod, setErrorPeriod] = useState('');

  const handleDownloadPDF = async () => {
    setLoadingPeriod(true);
    try {
      const token = localStorage.getItem('userToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/admin/capturedata/${periodId}`, {
        headers: headers,
        responseType: 'blob', // Indica que a resposta será um blob (arquivo)
      });

      // Cria uma URL temporária para o objeto Blob
      const url = window.URL.createObjectURL(response.data);

      // Cria um link de download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `rating_metrics_period_${periodId}.pdf`);

      // Dispara o clique automaticamente para iniciar o download
      link.click();

      // Revoga a URL temporária
      window.URL.revokeObjectURL(url);
      setErrorPeriod('');
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
      setErrorPeriod('Erro ao baixar o PDF. Por favor, tente novamente.');
    }
    setLoadingPeriod(false);
  };

  return (
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">
        Relatório por período
      </legend>
      <div className="grid gap-3">
        <Label htmlFor="periodId" className="block text-sm font-medium text-gray-700">ID do período</Label>
        <Input id="periodId" type="text" placeholder="Ex: 123456" value={periodId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPeriodId(e.target.value)}
          className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
        />
      </div>
      <Button onClick={handleDownloadPDF} disabled={loadingPeriod}>
        <FileDown className="mr-2" />
        {loadingPeriod ? 'Gerando relatório...' : 'Gerar relatório'}
      </Button>
      {errorPeriod && <p className="text-red-500">{errorPeriod}</p>}
    </fieldset>
  );
};

export default DownloadPDFPeriod;
