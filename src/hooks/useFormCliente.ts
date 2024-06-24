import { useState } from "react";
import { Cliente } from "@/types/model/Cliente";
import axios from "axios";

const useFormCliente = () => {
  const [modalCliente, setModalCliente] = useState<boolean>(false);
  const [clienteData, setClienteData] = useState<Cliente>({
    cnpj: "",
    nomeFantasia: "",
    idVendedor: null,
    telefone: "",
    endereco: {
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: null,
      complemento: null,
    },
  });

  const [errors, setErrors] = useState({
    cnpj: "",
    nomeFantasia: "",
    idVendedor: "",
    telefone: "",
    endereco: {
      cep: "",
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
    },
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    color: 'neutral' as 'danger' | 'neutral' | 'primary' | 'success' | 'warning',
    anchorOrigin: { vertical: 'top', horizontal: 'center' } as { vertical: 'top' | 'bottom', horizontal: 'left' | 'center' | 'right' }
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleModalSubmit = () => {
    const newErrors = {
      cnpj: "",
      nomeFantasia: "",
      idVendedor: "",
      telefone: "",
      endereco: {
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: "",
      },
    };

    if (!clienteData.cnpj) newErrors.cnpj = "CNPJ é obrigatório";
    if (!clienteData.nomeFantasia) newErrors.nomeFantasia = "Nome Fantasia é obrigatório";
    if (!clienteData.idVendedor) newErrors.idVendedor = "Vendedor é obrigatório";
    if (!clienteData.telefone) newErrors.telefone = "Telefone é obrigatório";
    if (!clienteData.endereco?.cep) newErrors.endereco.cep = "CEP é obrigatório";
    if (!clienteData.endereco?.estado) newErrors.endereco.estado = "Estado é obrigatório";
    if (!clienteData.endereco?.cidade) newErrors.endereco.cidade = "Cidade é obrigatório";
    if (!clienteData.endereco?.bairro) newErrors.endereco.bairro = "Bairro é obrigatório";
    if (!clienteData.endereco?.rua) newErrors.endereco.rua = "Rua é obrigatório";
    if (!clienteData.endereco?.numero) newErrors.endereco.numero = "Número é obrigatório";

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== "")) {
      setSnackbar({ open: true, message: 'Por favor, preencha todos os campos obrigatórios.', color: 'danger', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
      return;
    }

    alert(
      `CNPJ: ${clienteData?.cnpj}\n
      Nome Fantasia: ${clienteData?.nomeFantasia}\n
      Vendedor: ${clienteData?.idVendedor}\n
      Telefone: ${clienteData?.telefone}\n
      Endereço: ${clienteData?.endereco?.cep}, ${clienteData?.endereco?.estado}, ${clienteData?.endereco?.cidade}, ${clienteData?.endereco?.bairro}, ${clienteData?.endereco?.rua}, ${clienteData?.endereco?.numero}, ${clienteData?.endereco?.complemento}, cadastrado
      `
    );

    setSnackbar({ open: true, message: 'Cliente adicionado com sucesso!', color: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } });

    setClienteData({
      cnpj: "",
      nomeFantasia: "",
      idVendedor: null,
      telefone: "",
      endereco: {
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        numero: null,
        complemento: null,
      },
    });
  };

  const buscaCep = async () => {
    const rawCepValue = clienteData.endereco?.cep ?? '';
    const cepValue = rawCepValue.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cepValue.length === 8) {
      try {
        const res = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
        const data = res.data;
        setClienteData({
          ...clienteData,
          endereco: {
            ...clienteData.endereco,
            estado: data.uf,
            cidade: data.localidade,
            bairro: data.bairro,
            rua: data.logradouro,
          },
        });
        setSnackbar({ open: true, message: 'Endereço encontrado com sucesso!', color: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
      } catch (error) {
        setSnackbar({ open: true, message: 'Erro ao buscar o CEP.', color: 'danger', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
      }
    } else {
      setSnackbar({ open: true, message: 'CEP inválido.', color: 'warning', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
    }
  };

  return {
    modalCliente,
    setModalCliente,
    clienteData,
    setClienteData,
    errors,
    handleModalSubmit,
    buscaCep,
    snackbar,
    handleSnackbarClose
  };
};

export default useFormCliente;
