import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FC, useMemo } from "react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton: FC<LoadingButtonProps> = ({ children, isLoading, sx, ...rest }) => {
  const buttonContent = useMemo(() => {
    if (isLoading) {
      return <CircularProgress size={20} sx={{ color: "white" }} />;
    }

    return children;
  }, [children, isLoading]);

  return (
    <Button sx={{ height: 36, ...sx }} {...rest}>
      {buttonContent}
    </Button>
  );
};

export default LoadingButton;
