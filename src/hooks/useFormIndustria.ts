import { useState } from "react";
import { Industria } from "@/types/model/Industria";
import { validateEmail, validatePhone } from "@/utils/validate";
import { TipoContato } from "@/enums/TipoContato";

const useFormIndustria = () => {
  const [modalIndustria, setModalIndustria] = useState<boolean>(false);
  const [industriaData, setIndustriaData] = useState<Industria>({
    nome: "",
    contatos: [
      { id: null, nome: "", tipoContato: TipoContato.Comercial, telefone: "", email: "" },
      { id: null, nome: "", tipoContato: TipoContato.Financeiro, telefone: "", email: "" },
      { id: null, nome: "", tipoContato: TipoContato.Pagamento, telefone: "", email: "" },
      { id: null, nome: "", tipoContato: TipoContato.Logistica, telefone: "", email: "" },
    ],
  });

  const [errors, setErrors] = useState({
    nome: "",
    contatos: [
      { nome: "", telefone: "", email: "" },
      { nome: "", telefone: "", email: "" },
      { nome: "", telefone: "", email: "" },
      { nome: "", telefone: "", email: "" },
    ],
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "neutral" as "danger" | "neutral" | "primary" | "success" | "warning",
    anchorOrigin: { vertical: "top", horizontal: "center" } as { vertical: "top" | "bottom", horizontal: "left" | "center" | "right" },
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleModalSubmit = () => {
    const newErrors = {
      nome: "",
      contatos: industriaData.contatos.map(() => ({ nome: "", telefone: "", email: "" })),
    };

    if (!industriaData.nome) newErrors.nome = "Nome é obrigatório";

    (industriaData.contatos ?? []).forEach((contato) => {
      if (!contato.nome) {
        contato.nome = "Nome é obrigatório";
      }
      if (!validateEmail(contato.email)) {
        contato.email = "Email inválido";
      }
      if (!validatePhone(contato.telefone)) {
        contato.telefone = "Telefone inválido";
      }
    });

    setErrors(newErrors);

    const hasErrors = newErrors.nome || newErrors.contatos.some(contatoErrors => Object.keys(contatoErrors).some(key => contatoErrors[key] !== ""));

    if (hasErrors) {
      setSnackbar({ open: true, message: "Preencha os campos corretamente", color: "danger", anchorOrigin: { vertical: "top", horizontal: "center" } });
      return;
    }

    alert("Industria cadastrada com sucesso");

    setSnackbar({ open: true, message: "Industria cadastrada com sucesso", color: "success", anchorOrigin: { vertical: "top", horizontal: "center" } });

    setIndustriaData({
      nome: "",
      contatos: [
        { id: null, nome: "", tipoContato: TipoContato.Comercial, telefone: "", email: "" },
        { id: null, nome: "", tipoContato: TipoContato.Financeiro, telefone: "", email: "" },
        { id: null, nome: "", tipoContato: TipoContato.Pagamento, telefone: "", email: "" },
        { id: null, nome: "", tipoContato: TipoContato.Logistica, telefone: "", email: "" },
      ],
    });
  };

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
};

export default useFormIndustria;
