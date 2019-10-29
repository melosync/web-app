import React, { useState } from "react";
import YouTube from "react-youtube";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";

import { MusicItem } from "../../types/MusicItem";

import "./index.scss";
import AddUrlDialog from "./AddUrlDialog";

const opts = {
  playerVars: {
    autoplay: 1 as 1,
  },
};

const Home: React.FC = () => {
  const [youtubePlayer, setyoutubePlayer] = useState();
  const [addUrlDialogopen, setAddUrlDialogOpen] = useState(false);

  const [current, setcurrent] = useState<MusicItem>({
    id: "PJ_zomNMK_s",
    url: "https://www.youtube.com/watch?v=PJ_zomNMK_s",
  });
  const [playlist, setPlaylist] = useState<MusicItem[]>([
    { id: "p2-vkAR1dNU", url: "https://www.youtube.com/watch?v=p2-vkAR1dNU" },
  ]);

  const onMusicEnd = (event: { target: any }): void => {
    if (playlist.length > 0) {
      const next = playlist[0];
      playlist.splice(0, 1);
      setPlaylist(playlist);
      setcurrent(next);
      event.target.loadVideoById(next.id);
    }
  };

  const onReady = (event: { target: any }): void => {
    setyoutubePlayer(event.target);
    event.target.pauseVideo();
  };

  return (
    <Container className="HomeContainer">
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
          onClick={() => setAddUrlDialogOpen(true)}
        >
          <AddIcon />
        </Fab>
      </div>
      <List>
        {playlist.map((m, idx) => (
          <div key={`${m.url}${idx}`}>
            <ListItem>
              <ListItemText primary={m.url} secondary="Added by Guillaume" />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <AddUrlDialog
        open={addUrlDialogopen}
        setOpen={setAddUrlDialogOpen}
        youtubePlayer={youtubePlayer}
        playlist={playlist}
        setPlaylist={setPlaylist}
      />
    </Container>
  );
};

export default Home;
