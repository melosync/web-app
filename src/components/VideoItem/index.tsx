import React from "react";

import styles from "./VideoItem.module.scss";

type Props = {
  title: string;
  img: string;
};

const VideoItem: React.FC<Props> = props => {
  const { title, img } = props;
  return (
    <div className={styles.videoItemContainer}>
      <img className={styles.videoItemImg} src={img} alt={title} />
      <h4 className={styles.videoItemTitle}>{title}</h4>
    </div>
  );
};

export default VideoItem;
