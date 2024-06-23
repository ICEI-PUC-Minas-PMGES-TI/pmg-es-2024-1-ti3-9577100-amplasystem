import { Box, Breadcrumbs, Link, Typography } from "@mui/joy";

type Breadcrumb = {
  text: string;
  href?: string;
  icon?: React.ElementType;
};

const CustomBreadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Breadcrumbs size="sm" aria-label="breadcrumbs" sx={{ pl: 0 }}>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          return isLast ? (
            <Typography
              key={breadcrumb.text}
              color="primary"
              fontWeight={500}
              fontSize={12}
            >
              {breadcrumb.text}
            </Typography>
          ) : (
            <Link
              key={breadcrumb.text}
              underline="hover"
              color="neutral"
              href={breadcrumb.href}
              fontSize={12}
              fontWeight={500}
            >
              {breadcrumb.icon && <breadcrumb.icon sx={{ mr: 0.5 }} />}
              {breadcrumb.text}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default CustomBreadcrumbs;
