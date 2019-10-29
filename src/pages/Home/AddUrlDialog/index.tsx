import React, { useState } from "react";
import {
  Dialog,
  Typography,
  DialogContent,
  TextField,
  Button,
} from "@material-ui/core";

import { MusicItem } from "../../../types/MusicItem";
import YoutubeHelper from "../../../helpers/YoutubeHelper";
import "./index.scss";

type AddUrlDialogProps = {
  youtubePlayer: any;
  playlist: MusicItem[];
  setPlaylist: React.Dispatch<React.SetStateAction<MusicItem[]>>;
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
      <div className="AddMusic">
        <Typography variant="h4" component="h4">
          Add Music
        </Typography>
      </div>
      <DialogContent style={{ padding: "25px" }}>
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
          <Button
            variant="contained"
            size="large"
            type="submit"
            color="primary"
            onClick={addUrlClicked}
            style={{ marginTop: "15px" }}
          >
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUrlDialog;
