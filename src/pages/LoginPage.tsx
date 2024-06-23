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
import IconButton from "@mui/joy/IconButton";
import FormHelperText from "@mui/joy/FormHelperText";
import { InfoOutlined } from "@mui/icons-material";

import ColorSchemeToggle from "@/components/ColorSchemeToggle";

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
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="plain" color="neutral" size="sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M31.9576 5.46139e-06C34.2902 0.00592587 35.5112 2.615 35.5714 2.74793L63.8642 63.7075C61.4875 58.6195 55.8773 48.3203 45.8393 42.6372C39.7679 39.2008 34.5603 38.855 33.3393 38.796C26.2924 38.4503 21.0759 41.145 18.8304 42.3417C8.0625 48.0739 2.21429 59.0744 0 63.8079L28.2054 3.0434C28.9353 1.17304 30.3862 -0.00292423 31.9576 5.46139e-06ZM31.9859 18C32.7634 18.002 33.1704 18.858 33.1905 18.9017L40 34C39.7296 33.4227 39.6534 33.2401 39.5172 33.1612C39.2682 33.0169 38.8184 33.2193 36.6131 31.9903C34.5893 30.8627 32.8534 30.7493 32.4464 30.7299C30.0975 30.6165 28.3586 31.5007 27.6101 31.8934C25.2609 33.1244 24.7565 32.9811 24.4815 33.1706C24.3363 33.2706 24.255 33.4634 24 34C25.567 30.6768 26.4673 28.588 27.3676 26.4992C28.2679 24.4103 29.1682 22.3215 30.7351 18.9986C30.9784 18.3849 31.4621 17.999 31.9859 18Z"
                    fill="url(#paint0_linear_102_137)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_102_137"
                      x1="32"
                      y1="-8.94837e-07"
                      x2="44.2941"
                      y2="59.458"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#FF3D00" />
                      <stop offset="0.5" stopColor="#FF7300" />
                      <stop offset="0.99" stopColor="#FFC700" />
                    </linearGradient>
                  </defs>
                </svg>
              </IconButton>
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
