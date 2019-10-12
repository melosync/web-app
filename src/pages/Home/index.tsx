import React, { useState } from "react";
import {
  Container,
  Divider,
  Typography,
  Button,
  Fab,
  TextField,
  DialogContent,
} from "@material-ui/core";
import YouTube from "react-youtube";
import "./index.scss";
import AddIcon from "@material-ui/icons/Add";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
const opts = {
  playerVars: {
    autoplay: 1 as 1,
  },
};

interface MusicItem {
  id: string;
  url: string;
}

const Home: React.FC = () => {
  const [ytRef, setytRef] = useState();

  const [open, setOpen] = useState(false);
  const [newUrl, setnewUrl] = useState("");

  let [current, setcurrent] = useState<MusicItem>({
    id: "PJ_zomNMK_s",
    url: "https://www.youtube.com/watch?v=PJ_zomNMK_s",
  });
  let [playlist, setPlaylist] = useState<MusicItem[]>([
    { id: "p2-vkAR1dNU", url: "https://www.youtube.com/watch?v=p2-vkAR1dNU" },
  ]);
  

  let onMusicEnd = function(event: { target: any }) {
    console.log("onMusicEnd");
    if (playlist.length > 0) {
      let next = playlist[0];
      playlist.splice(0, 1);
      setPlaylist(playlist);
      setcurrent(next);
      event.target.loadVideoById((next as any).id);
    }
  };

  let onReady = function(event: { target: any }) {
    setytRef(event.target);
    // event.target.pauseVideo();
  };

  let getIdFromUrl = function(url: String) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return null;
    }
  };
  return (
    <Container style={{ width: "100%", marginTop: "30px", height: "60vh" }}>
      <YouTube
        videoId={current.id}
        className="yt-player"
        opts={opts}
        onEnd={onMusicEnd}
        onReady={onReady}
      />
      <div style={{ margin: "20px", display: "flex" }}>
        <Typography variant="h3" component="h3" gutterBottom>
          Next in playlist
        </Typography>
        <Fab
          color="primary"
          aria-label="add"
          style={{ marginLeft: "10px" }}
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Fab>
      </div>
      <List>
        {playlist.map((m, idx) => (
          <div key={idx}>
            <ListItem>
              <ListItemText primary={m.url} secondary="Added by Guillaume" />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth={true}
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
              onClick={e => {
                e.preventDefault();
                if (newUrl.length <= 0) return;
                let res = getIdFromUrl(newUrl);
                if (res === null) return;
                setnewUrl("");
                console.log(ytRef);
                
                if (playlist.length === 0 && ytRef.getCurrentTime() === ytRef.getDuration()) {
                  (ytRef as any).loadVideoById(res);
                } else {
                  playlist.push({ url: newUrl, id: res });
                  setPlaylist(playlist);
                }
              }}
              style={{ marginTop: "15px" }}
            >
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Home;
