export const formatCEP = (cep: string): string => {
  cep = cep.replace(/[^\d]/g, '');
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

export const formatCPFOrCNPJ = (value: string): string => {
  value = value.replace(/[^\d]/g, '');
  if (value.length === 11) {
    return formatCPF(value);
  } else if (value.length === 14) {
    return formatCNPJ(value);
  } else {
    return value;
  }
};

const formatCPF = (cpf: string): string => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatCNPJ = (cnpj: string): string => {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const formatPhone = (phone: string): string => {
  phone = phone.replace(/[^\d]/g, '');
  if (phone.length === 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else if (phone.length === 11) {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    return phone;
  }
};

export const formatCurrency = (value: number, locale: string = 'pt-BR', currency: string = 'BRL'): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
};
