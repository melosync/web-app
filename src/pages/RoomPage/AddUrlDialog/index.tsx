import React, { useState } from "react";
import {
  Dialog,
  Typography,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@material-ui/core";

import YoutubeHelper from "../../../helpers/YoutubeHelper";

import Styles from "./AddUrlDialog.module.scss";

type AddUrlDialogProps = {
  youtubePlayer: any;
  playlist: any[];
  setPlaylist: React.Dispatch<React.SetStateAction<any[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const AddUrlDialog: React.FC<AddUrlDialogProps> = ({
  youtubePlayer,
  playlist,
  setPlaylist,
  setOpen,
  open,
}) => {
  const [newUrl, setNewUrl] = useState("");

  const addUrlClicked = (e: React.SyntheticEvent<any, Event>): void => {
    e.preventDefault();
    if (newUrl.length <= 0) {
      return;
    }
    const res = YoutubeHelper.getIdFromUrl(newUrl);
    if (res === null) {
      return;
    }
    setNewUrl("");
    if (
      playlist.length === 0 &&
      youtubePlayer.getCurrentTime() === youtubePlayer.getDuration()
    ) {
      (youtubePlayer as any).loadVideoById(res);
    } else {
      playlist.push({ url: newUrl, id: res });
      setPlaylist(playlist);
    }
  };
  return (
    <Dialog
      onClose={() => setOpen(false)}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
    >
      <div className={Styles.AddMusic}>
        <Typography variant="h4" component="h4">
          Add Music
        </Typography>
      </div>
      <Box p={2.5}>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              id="name"
              type="text"
              fullWidth
              label="Url"
              value={newUrl}
              onChange={e => {
                setNewUrl(e.target.value);
              }}
            />
            <Box mt={1.5}>
              <Button
                variant="contained"
                size="large"
                type="submit"
                color="primary"
                onClick={addUrlClicked}
              >
                Add
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AddUrlDialog;
