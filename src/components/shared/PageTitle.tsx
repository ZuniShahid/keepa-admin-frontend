import Typography from "@mui/material/Typography";
import { FC } from "react";

interface PageTitleProps {
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return (
    <Typography mb={4} variant="h5">
      {title}
    </Typography>
  );
};

export default PageTitle;
