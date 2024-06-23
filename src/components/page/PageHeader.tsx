import { Box, Typography, Button } from "@mui/joy";
import { Action } from "@/types/common/Action";

const PageHeader = ({
  title,
  actions,
}: {
  title: string;
  actions: Action[];
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "start", sm: "center" },
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Typography level="h2" component="h1">
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        {actions.map((action, index) => (
          <Button
            key={index}
            color={action.color || "neutral"}
            startDecorator={action.icon ? action.icon : null}
            size={action.size || "sm"}
            variant={action.variant || "soft"}
            disabled={action.disabled}
            loading={action.loading}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default PageHeader;
