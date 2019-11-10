import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { useApi } from "../../services/api";
import { StateStore } from "../../store";
import TypeOfConnect from "../../store/utils/TypeOfConnect";

import Styles from "./Home.module.scss";

const withRedux = connect((state: StateStore) => {
  return { user: state.user };
});

type Props = TypeOfConnect<typeof withRedux>;

const Home: React.FC<Props> = props => {
  const { user } = props;

  const api = useApi();
  const history = useHistory();
  const { t } = useTranslation();

  const onCreateRoomClick = async (): Promise<void> => {
    try {
      // Create Room
      const res = await api.room.createRoom();

      // Go to room
      const roomUuid = res.data.room.uuid;
      history.push(`/rooms/${roomUuid}`);
    } catch (error) {
      // TODO: Provide real feedback
      console.error(error.response);
    }
  };

  return (
    <Container className={Styles.HomeContainer}>
      <h1>Melosync</h1>

      <Box marginTop={1} marginBottom={7}>
        <Typography>{t("homeCatchPhrase")}</Typography>
      </Box>

      {user.loggedIn ? (
        <Button color="primary" onClick={onCreateRoomClick}>
          {t("createRoom")}
        </Button>
      ) : (
        <Link to="/login">
          <Button color="primary">{t("loginButton")}</Button>
        </Link>
      )}
    </Container>
  );
};

export default withRedux(Home);
