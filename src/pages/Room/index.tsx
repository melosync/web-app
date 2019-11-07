import React, { useState } from "react";
import YouTube from "react-youtube";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";

import { MusicItem } from "../../types/MusicItem";

import AddUrlDialog from "./AddUrlDialog";
import Styles from "./Room.module.scss";

const opts = {
  playerVars: {
    autoplay: 1 as 1,
  },
};

const Room: React.FC = () => {
  const [youtubePlayer, setYoutubePlayer] = useState();
  const [addUrlDialogOpen, setAddUrlDialogOpen] = useState(false);

  const [current, setCurrent] = useState<MusicItem>({
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
      setCurrent(next);
      event.target.loadVideoById(next.id);
    }
  };

  const onReady = (event: { target: any }): void => {
    setYoutubePlayer(event.target);
    event.target.pauseVideo();
  };

  return (
    <Container className={Styles.RoomContainer}>
      <YouTube
        videoId={current.id}
        className={Styles.ytPlayer}
        opts={opts}
        onEnd={onMusicEnd}
        onReady={onReady}
      />
      <div className={Styles.NextLabel}>
        <Typography variant="h3" component="h3" gutterBottom>
          Next in playlist
        </Typography>
        <Box ml={1}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setAddUrlDialogOpen(true)}
          >
            <AddIcon />
          </Fab>
        </Box>
      </div>
      <List>
        {playlist.map((musicItem, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`${musicItem.url}${idx}`}>
            <ListItem>
              <ListItemText
                primary={musicItem.url}
                secondary="Added by Guillaume"
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <AddUrlDialog
        open={addUrlDialogOpen}
        setOpen={setAddUrlDialogOpen}
        youtubePlayer={youtubePlayer}
        playlist={playlist}
        setPlaylist={setPlaylist}
      />
    </Container>
  );
};

export default Room;
