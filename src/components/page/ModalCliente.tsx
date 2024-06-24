import React from "react";
import {
  Button, FormControl, FormLabel, Input, Modal, ModalDialog, DialogTitle,
  DialogContent, Stack, ModalClose, FormHelperText, Select, Option, ModalOverflow,
  DialogActions
} from "@mui/joy";
import { InfoOutlined, LocationOn } from "@mui/icons-material";
import { Cliente } from "@/types/model/Cliente";
import { formatCEP, formatCPFOrCNPJ, formatPhone } from "@/utils/format";

interface ModalClienteProps {
  open: boolean;
  onClose: () => void;
  clienteData: Cliente;
  setClienteData: (cliente: Cliente) => void;
  errors: { cnpj: string; nomeFantasia: string; idVendedor: string; telefone: string; endereco: { cep: string; estado: string; cidade: string; bairro: string; rua: string; numero: string } };
  handleSubmit: () => void;
  vendedores: { id: number; nome: string }[];
  buscaCep: () => void;
}


const ModalCliente: React.FC<ModalClienteProps> = ({
  open, onClose, clienteData, setClienteData, errors, handleSubmit, vendedores, buscaCep
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverflow>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Adicionar cliente</DialogTitle>
          <DialogContent>
            Após inserir CEP, os dados de endereço serão preenchidos automaticamente
          </DialogContent>
          <Stack spacing={2}>
            <FormControl error={Boolean(errors.cnpj)}>
              <FormLabel>CPF/CNPJ</FormLabel>
              <Input
                value={formatCPFOrCNPJ(clienteData.cnpj)}
                onChange={(e) =>
                  setClienteData({ ...clienteData, cnpj: e.target.value })
                }
              />
              {errors.cnpj && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.cnpj}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.nomeFantasia)}>
              <FormLabel>Nome Fantasia</FormLabel>
              <Input
                value={clienteData.nomeFantasia}
                onChange={(e) =>
                  setClienteData({
                    ...clienteData,
                    nomeFantasia: e.target.value,
                  })
                }
              />
              {errors.nomeFantasia && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.nomeFantasia}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.idVendedor)}>
              <FormLabel>Vendedor</FormLabel>
              <Select
                value={clienteData.idVendedor}
                onChange={(_, newValue) =>
                  setClienteData({
                    ...clienteData,
                    idVendedor: newValue,
                  })
                }
              >
                {vendedores.map((vendedor) => (
                  <Option key={vendedor.id} value={vendedor.id}>
                    {vendedor.nome}
                  </Option>
                ))}
              </Select>
              {errors.idVendedor && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.idVendedor}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.telefone)}>
              <FormLabel>Telefone</FormLabel>
              <Input
                value={formatPhone(clienteData.telefone ?? '')}
                onChange={(e) =>
                  setClienteData({ ...clienteData, telefone: e.target.value })
                }
              />
              {errors.telefone && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.telefone}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.endereco.cep)}>
              <FormLabel>CEP</FormLabel>
              <Input
                startDecorator={
                  <Button
                    variant="solid" color="primary" startDecorator={<LocationOn />}
                    onClick={buscaCep}
                    sx={{
                      transform: 'translateX(-4px)',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  >
                    Buscar CEP
                  </Button>
                }
                value={formatCEP(clienteData.endereco?.cep ?? '')}
                onChange={(e) =>
                  setClienteData({
                    ...clienteData,
                    endereco: {
                      ...clienteData.endereco,
                      cep: e.target.value,
                    },
                  })
                }
              />
              {errors.endereco.cep && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.endereco.cep}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.endereco.estado)}>
              <FormLabel>Estado</FormLabel>
              <Input
                value={clienteData.endereco?.estado}
                onChange={(e) =>
                  setClienteData({
                    ...clienteData,
                    endereco: {
                      ...clienteData.endereco,
                      estado: e.target.value,
                    },
                  })
                }
              />
              {errors.endereco.estado && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.endereco.estado}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.endereco.cidade)}>
              <FormLabel>Cidade</FormLabel>
              <Input
                value={clienteData.endereco?.cidade}
                onChange={(e) =>
                  setClienteData({
                    ...clienteData,
                    endereco: {
                      ...clienteData.endereco,
                      cidade: e.target.value,
                    },
                  })
                }
              />
              {errors.endereco.cidade && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.endereco.cidade}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.endereco.bairro)}>
              <FormLabel>Bairro</FormLabel>
              <Input
                value={clienteData.endereco?.bairro}
                onChange={(e) =>
                  setClienteData({
                    ...clienteData,
                    endereco: {
                      ...clienteData.endereco,
                      bairro: e.target.value,
                    },
                  })
                }
              />
              {errors.endereco.bairro && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.endereco.bairro}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.endereco.rua)}>
              <FormLabel>Rua</FormLabel>
              <Input
                value={clienteData.endereco?.rua}
                onChange={(e) =>
                  setClienteData({
                    ...clienteData,
                    endereco: {
                      ...clienteData.endereco,
                      rua: e.target.value,
                    },
                  })
                }
              />
              {errors.endereco.rua && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.endereco.rua}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl error={Boolean(errors.endereco.numero)}>
              <FormLabel>Número</FormLabel>
              <Input
                value={clienteData.endereco?.numero?.toString()}
                onChange={(e) =>
                  setClienteData({
                    ...clienteData,
                    endereco: {
                      ...clienteData.endereco,
                      numero: Number(e.target.value),
                    },
                  })
                }
              />
              {errors.endereco.numero && (
                <FormHelperText>
                  <InfoOutlined />
                  {errors.endereco.numero}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Complemento (Opcional)</FormLabel>
              <Input
                value={clienteData.endereco?.complemento?.toString()}
                onChange={(e) =>
                  setClienteData({
                    ...clienteData,
                    endereco: {
                      ...clienteData.endereco,
                      complemento: e.target.value,
                    },
                  })
                }
              />
            </FormControl>
          </Stack>
          <DialogActions>
            <Button onClick={handleSubmit}>Adicionar</Button>
            <Button variant="plain" color="neutral" onClick={onClose}>
              Cancelar
            </Button>
          </DialogActions>
        </ModalDialog>
      </ModalOverflow>
    </Modal>
  );
};

export default ModalCliente;
