import { FC } from "react";
import { Toaster, ToasterProps } from "react-hot-toast";

const Toast: FC<ToasterProps> = (props) => {
  return <Toaster position="top-center" {...props} />;
};

export default Toast;
