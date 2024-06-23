import React, { useState } from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import FormHelperText from "@mui/joy/FormHelperText";
import { InfoOutlined } from "@mui/icons-material";

import ColorSchemeToggle from "@/components/util/ColorSchemeToggle";
import AmplaLogo from "@/components/common/AmplaLogo";

interface SignInFormElement extends HTMLFormElement {
  elements: HTMLFormControlsCollection & {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
  };
}

interface FormData {
  email: string;
  password: string;
  persistent: boolean;
}

interface FormErrors {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {
      email: "",
      password: "",
    };

    if (!data.email) {
      errors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email inválido";
    }

    if (!data.password) {
      errors.password = "Senha é obrigatória";
    }

    return errors;
  };

  const handleFormSubmit = (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData: FormData = {
      email: form.elements.email.value,
      password: form.elements.password.value,
      persistent: form.elements.persistent.checked,
    };

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (!formErrors.email && !formErrors.password) {
      alert(
        `Email: ${formData.email}\nPassword: ${formData.password}\nPersistent: ${formData.persistent}`
      );
    }
  };

  return (
    <>
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: theme.palette.background.body,
          boxShadow: theme.shadow.xl,
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{ gap: 2, display: "flex", alignItems: "center" }}
              component={Link}
            >
              <AmplaLogo />
              <Typography level="title-lg">Ampla System</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Faça login
                </Typography>
                <Typography level="body-sm">
                  Não tem uma conta?{" "}
                  <Link href="#suporte" level="title-sm">
                    Contate o suporte
                  </Link>
                </Typography>
              </Stack>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            />
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleFormSubmit}>
                <FormControl error={Boolean(errors.email)}>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" />
                  {errors.email && (
                    <FormHelperText>
                      <InfoOutlined />
                      {errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl error={Boolean(errors.password)}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                  {errors.password && (
                    <FormHelperText>
                      <InfoOutlined />
                      {errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      size="sm"
                      label="Lembrar de mim"
                      name="persistent"
                    />
                    <Link level="title-sm" href="recovery">
                      Esqueceu sua senha?
                    </Link>
                  </Box>
                  <Button type="submit" fullWidth>
                    Entrar
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Ampla System {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          background: theme.palette.background.surface,
        })}
      />
    </>
  );
};

export default LoginPage;
