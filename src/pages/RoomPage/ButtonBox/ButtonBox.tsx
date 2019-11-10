import React from "react";

import YoutubeApiItem from "../../../types/YoutubeApiItem";
import SearchMusicButton from "../SearchMusicButton/SearchMusicButton";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Styles from "./ButtonBox.module.scss";
import { useTranslation } from "react-i18next";

interface Props {
  onNext: () => void;
  onSearchSelected: (item: YoutubeApiItem) => void;
}

const ButtonBox: React.FC<Props> = props => {
  const { onNext, onSearchSelected } = props;

  const { t } = useTranslation();

  return (
    <Paper>
      <div className={Styles.ButtonBox}>
        <div className={Styles.ButtonSubBox}>
          <SearchMusicButton onMusicSelected={onSearchSelected} />
          <Button
            variant="contained"
            color="primary"
            onClick={onNext}
            style={{ width: "130px" }}
          >
            {t("playlistNextItem")}
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default ButtonBox;
