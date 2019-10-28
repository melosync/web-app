import React, { useState } from "react";
import { Container, Divider, Typography, Fab } from "@material-ui/core";
import YouTube from "react-youtube";
import "./index.scss";
import AddIcon from "@material-ui/icons/Add";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { MusicItem } from "../../types/MusicItem";

import AddUrlDialog from "./AddUrlDialog";

const opts = {
  playerVars: {
    autoplay: 1 as 1,
  },
};

const Home: React.FC = () => {
  const [youtubePlayer, setyoutubePlayer] = useState();
  const [AddUrlDialogopen, setAddUrlDialogOpen] = useState(false);

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
      event.target.loadVideoById((next as any).id);
    }
  };

  const onReady = (event: { target: any }): void => {
    setyoutubePlayer(event.target);
    event.target.pauseVideo();
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
          onClick={() => setAddUrlDialogOpen(true)}
        >
          <AddIcon />
        </Fab>
      </div>
      <List>
        {playlist.map(m => (
          <div key={m.url}>
            <ListItem>
              <ListItemText primary={m.url} secondary="Added by Guillaume" />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <AddUrlDialog
        open={AddUrlDialogopen}
        setOpen={setAddUrlDialogOpen}
        youtubePlayer={youtubePlayer}
        playlist={playlist}
        setPlaylist={setPlaylist}
      />
    </Container>
  );
};

export default Home;
