import { CircularProgress, Box, Typography } from "@mui/joy";

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      <Typography level="h4" sx={{ mt: 2 }}>
        Carregando...
      </Typography>
    </Box>
  );
};

export default LoadingComponent;
