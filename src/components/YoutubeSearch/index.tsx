/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { TextField, Box, Button, Grid } from "@material-ui/core";

import { useYoutubeApi } from "../../services/YoutubeApi";
import VideoItem from "../VideoItem";
import YoutubeApiItem from "../../types/YoutubeApiItem";

import styles from "./YoutubeSearch.module.scss";

type Props = {
  onSelect: Function;
};

const YoutubeSearch: React.FC<Props> = ({ onSelect }) => {
  const [searchInput, setSearchInput] = useState("");
  const [videoItems, setVideoItems] = useState([] as YoutubeApiItem[]);
  const ytApi = useYoutubeApi();

  const addClicked = async (
    e: React.SyntheticEvent<any, Event>
  ): Promise<void> => {
    e.preventDefault();
    const items = await ytApi.search(searchInput);
    setVideoItems(items);
  };

  return (
    <div>
      <form>
        <div className={styles.searchFormTop}>
          <TextField
            autoFocus
            id="name"
            type="text"
            required
            fullWidth
            label="Search"
            value={searchInput}
            onChange={e => {
              setSearchInput(e.target.value);
            }}
          />
          <Box m={0.5}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="primary"
              onClick={addClicked}
            >
              Search
            </Button>
          </Box>
        </div>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {videoItems.map(i => {
                return (
                  <div
                    key={i.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => onSelect(i)}
                  >
                    <VideoItem title={i.title} img={i.img} />
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </div>
      </form>
    </div>
  );
};

export default YoutubeSearch;
