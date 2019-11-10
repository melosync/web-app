import { Box, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";

import Modal from "../../../components/Modal";
import YoutubeSearch from "../../../components/YoutubeSearch";
import YoutubeApiItem from "../../../types/YoutubeApiItem";

import Styles from "./SearchMusicButton.module.scss";

interface Props {
  onMusicSelected: (item: YoutubeApiItem) => void;
}

const SearchMusicButton: React.FC<Props> = props => {
  const { onMusicSelected } = props;

  const [addUrlDialogOpen, setAddUrlDialogOpen] = useState(false);
  return (
    <div>
      <div className={Styles.NextLabel}>
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
