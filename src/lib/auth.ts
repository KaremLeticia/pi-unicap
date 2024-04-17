import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Função para renovar o token de acesso
async function refreshUserToken(): Promise<string | null> {
  try {
    const response = await axios.post<{ token: string }>('/api/refresh', null, {
      withCredentials: true, // Para enviar os cookies
    });

    const { token } = response.data;

    // Atualizar o token do usuário no localStorage
    localStorage.setItem('userToken', token);

    return token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    // Lidar com o erro aqui (por exemplo, redirecionar para a página de login)
    return null;
  }
}

// Função para verificar e renovar o token de acesso se necessário
export async function checkUserTokenValidity() {
  const userToken = localStorage.getItem('userToken');

  if (!userToken) {
    // Se o token de acesso não estiver presente, provavelmente o usuário não está autenticado
    // Lidar com isso aqui (por exemplo, redirecionar para a página de login)
    return;
  }

  // Verificar a validade do token de acesso
  const userTokenExp = getUserTokenExpiration(userToken);

  // Verificar se o token de acesso expirou
  if (Date.now() >= userTokenExp * 1000) {
    // Renovar o token de acesso
    await refreshUserToken();
  }
}

// Função auxiliar para extrair o tempo de expiração do token de acesso
function getUserTokenExpiration(userToken: string): number {
  const tokenPayload = userToken.split('.')[1];
  const decodedPayload = JSON.parse(atob(tokenPayload));
  return decodedPayload.exp;
}
