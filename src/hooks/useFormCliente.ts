import { useState } from "react";
import { Cliente } from "@/types/model/Cliente";

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

    if (Object.values(newErrors).some(error => error !== "")) return;

    alert(
      `CNPJ: ${clienteData?.cnpj}\n
      Nome Fantasia: ${clienteData?.nomeFantasia}\n
      Vendedor: ${clienteData?.idVendedor}\n
      Telefone: ${clienteData?.telefone}\n
      Endereço: ${clienteData?.endereco?.cep}, ${clienteData?.endereco?.estado}, ${clienteData?.endereco?.cidade}, ${clienteData?.endereco?.bairro}, ${clienteData?.endereco?.rua}, ${clienteData?.endereco?.numero}, ${clienteData?.endereco?.complemento}, cadastrado
      `
    );

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

  return {
    modalCliente,
    setModalCliente,
    clienteData,
    setClienteData,
    errors,
    handleModalSubmit,
  };
};

export default useFormCliente;
