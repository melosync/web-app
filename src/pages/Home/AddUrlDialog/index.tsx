import React, { useState } from "react";
import {
  Dialog,
  Typography,
  DialogContent,
  TextField,
  Button,
} from "@material-ui/core";

import { MusicItem } from "../../../types/MusicItem";
import getIdFromUrl from "../../../helpers/getIdFromUrl";

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
  const [newUrl, setnewUrl] = useState("");

  function AddUrlClicked(e: React.SyntheticEvent<any, Event>): void {
    e.preventDefault();
    if (newUrl.length <= 0) return;
    const res = getIdFromUrl(newUrl);
    if (res === null) return;
    setnewUrl("");
    if (
      playlist.length === 0 &&
      youtubePlayer.getCurrentTime() === youtubePlayer.getDuration()
    ) {
      (youtubePlayer as any).loadVideoById(res);
    } else {
      playlist.push({ url: newUrl, id: res });
      setPlaylist(playlist);
    }
  }
  return (
    <Dialog
      onClose={() => setOpen(false)}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
    >
      <Typography variant="h4" component="h4" style={{ margin: "20px" }}>
        Add Music
      </Typography>
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
              setnewUrl(e.target.value);
            }}
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            color="primary"
            onClick={AddUrlClicked}
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
