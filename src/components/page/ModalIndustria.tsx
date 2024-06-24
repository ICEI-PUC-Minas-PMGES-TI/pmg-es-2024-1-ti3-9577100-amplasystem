import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  Stack,
  ModalClose,
  FormHelperText,
  Select,
  Option,
  ModalOverflow,
  DialogActions,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "@mui/joy";
import { InfoOutlined, LocationOn } from "@mui/icons-material";
import { Industria } from "@/types/model/Industria";
import { formatCEP, formatCPFOrCNPJ, formatPhone } from "@/utils/format";
import { TipoContato } from "@/enums/TipoContato";

interface ModalIndustriaProps {
  open: boolean;
  onClose: () => void;
  industriaData: Industria;
  setIndustriaData: (industria: Industria) => void;
  errors: {
    nome: string;
    contatos: [];
  };
  handleSubmit: () => void;
}

const ModalIndustria: React.FC<ModalIndustriaProps> = ({
  open,
  onClose,
  industriaData,
  setIndustriaData,
  errors,
  handleSubmit,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <DialogTitle>Adicionar Indústria</DialogTitle>
        <Stack spacing={2}>
          <FormControl error={Boolean(errors.nome)}>
            <FormLabel>Nome fantasia</FormLabel>
            <Input
              value={industriaData.nome}
              onChange={(e) =>
                setIndustriaData({ ...industriaData, nome: e.target.value })
              }
            />
            {errors.nome && (
              <FormHelperText>
                <InfoOutlined />
                {errors.nome}
              </FormHelperText>
            )}
          </FormControl>
          <Tabs aria-label="Vertical tabs" orientation="vertical">
            <TabList>
              {Object.values(TipoContato).map((tipo, index) => (
                <Tab key={index}>{tipo}</Tab>
              ))}
            </TabList>
            {Object.values(TipoContato).map((_, index) => (
              <TabPanel key={index} value={index}>
                <Stack spacing={2}>
                  <FormControl error={Boolean(errors.contatos[index]?.nome)}>
                    <FormLabel>Nome</FormLabel>
                    <Input
                      value={industriaData.contatos[index]?.nome}
                      onChange={(e) =>
                        setIndustriaData({
                          ...industriaData,
                          contatos: industriaData.contatos.map((contato, i) =>
                            i === index
                              ? { ...contato, nome: e.target.value }
                              : contato
                          ),
                        })
                      }
                    />
                    {errors.contatos[index]?.nome && (
                      <FormHelperText>
                        <InfoOutlined />
                        {errors.contatos[index]?.nome}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    error={Boolean(errors.contatos[index]?.telefone)}
                  >
                    <FormLabel>Telefone</FormLabel>
                    <Input
                      value={formatPhone(
                        industriaData.contatos[index]?.telefone ?? ""
                      )}
                      onChange={(e) =>
                        setIndustriaData({
                          ...industriaData,
                          contatos: industriaData.contatos.map((contato, i) =>
                            i === index
                              ? { ...contato, telefone: e.target.value }
                              : contato
                          ),
                        })
                      }
                    />
                    {errors.contatos[index]?.telefone && (
                      <FormHelperText>
                        <InfoOutlined />
                        {errors.contatos[index]?.telefone}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={Boolean(errors.contatos[index]?.email)}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      value={industriaData.contatos[index]?.email}
                      onChange={(e) =>
                        setIndustriaData({
                          ...industriaData,
                          contatos: industriaData.contatos.map((contato, i) =>
                            i === index
                              ? { ...contato, email: e.target.value }
                              : contato
                          ),
                        })
                      }
                    />
                    {errors.contatos[index]?.email && (
                      <FormHelperText>
                        <InfoOutlined />
                        {errors.contatos[index]?.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Stack>
              </TabPanel>
            ))}
          </Tabs>
        </Stack>
        <DialogActions>
          <Button onClick={handleSubmit}>Adicionar</Button>
          <Button variant="plain" color="neutral" onClick={onClose}>
            Cancelar
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default ModalIndustria;
