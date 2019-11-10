import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Modal from "../../../components/Modal";
import YoutubeSearch from "../../../components/YoutubeSearch";
import YoutubeApiItem from "../../../types/YoutubeApiItem";

interface Props {
  onMusicSelected: (item: YoutubeApiItem) => void;
}

const SearchMusicButton: React.FC<Props> = props => {
  const { onMusicSelected } = props;

  const { t } = useTranslation();

  const [addUrlDialogOpen, setAddUrlDialogOpen] = useState(false);

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setAddUrlDialogOpen(true)}
        style={{ width: "130px" }}
      >
        {t("playlistAddItem")}
      </Button>
      <Modal
        title="Add Music"
        open={addUrlDialogOpen}
        setOpen={setAddUrlDialogOpen}
      >
        <YoutubeSearch onSelect={onMusicSelected} />
      </Modal>
    </div>
  );
};

export default SearchMusicButton;
