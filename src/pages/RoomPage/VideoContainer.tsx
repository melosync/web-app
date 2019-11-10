import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

import RoomPlaylistItem from "../../types/RoomPlaylistItem";

import Styles from "./RoomPage.module.scss";

const YOUTUBE_PLAYER_OPTIONS = {
  playerVars: {
    autoplay: 1 as 1,
  },
};

interface Props {
  item: RoomPlaylistItem;
  play: boolean;
  playFrom: number;
  onPlay: () => void;
  onPause: () => void;
  onEnd: () => void;
}

const VideoContainer: React.FC<Props> = props => {
  const { item, play, onPlay, onPause, onEnd } = props;

  const [youtubePlayer, setYoutubePlayer] = useState();

  const onReady = (event: { target: any }): void => {
    setYoutubePlayer(event.target);
    event.target.playVideo();
  };

  useEffect(() => {
    if (youtubePlayer) {
      if (play) {
        youtubePlayer.playVideo();
      } else {
        youtubePlayer.pauseVideo();
      }
    }
  }, [play, youtubePlayer, item.uuid]);

  return (
    <div>
      <YouTube
        videoId={item.videoId}
        className={Styles.ytPlayer}
        opts={YOUTUBE_PLAYER_OPTIONS}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onEnd={onEnd}
      />
    </div>
  );
};

export default VideoContainer;
