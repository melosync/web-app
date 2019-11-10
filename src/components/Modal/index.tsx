import React, { ReactNode } from "react";
import { Dialog, Typography, DialogContent, Box } from "@material-ui/core";

import Styles from "./Modal.module.scss";

type Props = {
  children?: ReactNode;
  title?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const Modal: React.FC<Props> = ({ setOpen, open, children, title }) => {
  return (
    <Dialog
      onClose={() => setOpen(false)}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
    >
      <div className={Styles.AddMusic}>
        <Typography variant="h4" component="h4">
          {title}
        </Typography>
      </div>
      <Box p={2.5}>
        <DialogContent>{children}</DialogContent>
      </Box>
    </Dialog>
  );
};

export default Modal;
