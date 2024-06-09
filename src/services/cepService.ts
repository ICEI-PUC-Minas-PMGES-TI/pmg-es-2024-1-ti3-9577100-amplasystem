import axios from 'axios';

export interface CepData {
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
}

export const fetchCepData = async (cep: string): Promise<CepData | null> => {
  if (cep.length !== 8) {
    return null;
  }

  try {
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (res.data.erro) {
      return null;
    }
    return {
      cep: res.data.cep || '',
      estado: res.data.uf || '',
      cidade: res.data.localidade || '',
      bairro: res.data.bairro || '',
      rua: res.data.logradouro || '',
    };
  } catch (error) {
    console.error('Erro ao buscar o CEP', error);
    return null;
  }
};