import { useState } from "react";
import { Industria } from "@/types/model/Industria";
// import axios from "axios";
// import { validateEmail, validatePhone } from "@/utils/validate";

const useFormIndustria = () => {
  const [modalIndustria, setModalIndustria] = useState<boolean>(false);
  const [industriaData, setIndustriaData] = useState<Industria>({
    nome: "",
    contatos: [],
  });

  const [errors, setErrors] = useState({
      nome: "",
      contatos: [],
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
      nome: "",
      contatos: [],
    };

    if (!industriaData.nome) newErrors.nome = "Nome é obrigatório";

    // industriaData.contatos.forEach((contato, index) => {
    //   if (!contato.nome) {
    //     newErrors.contatos[index] = { ...newErrors.contatos[index], nome: "Nome é obrigatório" };
    //   }

    //   if (!validateEmail(contato.email)) {
    //     newErrors.contatos[index] = { ...newErrors.contatos[index], email: "Email inválido" };
    //   }

    //   if (!validatePhone(contato.telefone)) {
    //     newErrors.contatos[index] = { ...newErrors.contatos[index], telefone: "Telefone inválido" };
    //   }
    // });

    setErrors(newErrors);

    if (Object.values(newErrors).some((value) => value !== "")) {
      setSnackbar({ open: true, message: "Preencha os campos corretamente", color: "danger", anchorOrigin: { vertical: "top", horizontal: "center" } });
      return;
    }
  
    alert("Industria cadastrada com sucesso");

    setSnackbar({ open: true, message: "Industria cadastrada com sucesso", color: "success", anchorOrigin: { vertical: "top", horizontal: "center" } });

    setIndustriaData({
      nome: "",
      contatos: [],
    });
  }

  return {
    modalIndustria,
    setModalIndustria,
    industriaData,
    setIndustriaData,
    errors,
    handleModalSubmit,
    snackbar,
    handleSnackbarClose,
  };
}

export default useFormIndustria;