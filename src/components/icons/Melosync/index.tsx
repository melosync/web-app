import React from "react";

import styles from "./Melosync.module.scss";
import MelosyncImage from "./melosync-logo.png";

const Melosync: React.FC<React.HTMLAttributes<HTMLImageElement>> = ({
  className,
}) => {
  const classes = [styles.Melosync, className].join(" ");

  return <img src={MelosyncImage} alt="Melosync" className={classes} />;
};

export default Melosync;
