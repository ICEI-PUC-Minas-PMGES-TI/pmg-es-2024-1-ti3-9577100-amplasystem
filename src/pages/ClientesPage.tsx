import {
  Header,
  HeaderName,
  Content,
  Grid,
  Column,
  Button,
  TextInput,
  Form,
  Stack,
  PasswordInput,
  Heading,
} from '@carbon/react';
import {
  ArrowRight,
} from '@carbon/icons-react';

const LoginPage = () => {

  return (
    <>
      <Header aria-label="IBM Platform Name">
        <HeaderName href="#" prefix="TIS3">
          [Aplicações para cenários reais]
        </HeaderName>
      </Header>
      <Content>
        <Grid>
          <Column sm={4} md={{ span: 6, offset: 1 }} lg={{ span: 8, offset: 4 }}>
            <Form aria-label="Formulário login" className="login-form">
              <Stack gap={6}>
                <Heading>Efetue login no Amplasystem</Heading>
                <TextInput
                  id="email"
                  type="text"
                  labelText="Email"
                  required
                />

                <PasswordInput
                  id="senha"
                  labelText="Senha"
                  type="password"
                  required
                />

                <Button
                  type="submit"
                  renderIcon={ArrowRight}
                  style={{ width: '100%', maxWidth: '100%' }}
                >
                  Entrar
                </Button>
              </Stack>
            </Form>
          </Column>
        </Grid>
      </Content>
    </>
  );
};

export default LoginPage;
