import AspectRatio, { AspectRatioProps } from "@mui/joy/AspectRatio";

const AmplaLogo = (props: AspectRatioProps) => {
  const { sx, ...other } = props;
  return (
    <AspectRatio
      ratio="1"
      variant="plain"
      {...other}
      sx={[
        {
          width: 36,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <div>
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
      </div>
    </AspectRatio>
  );
};

export default AmplaLogo;
