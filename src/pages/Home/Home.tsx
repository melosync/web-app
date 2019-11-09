import React from "react";
import Container from "@material-ui/core/Container";
import { Box, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import Styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <Container className={Styles.HomeContainer}>
      <h1>Impact Title</h1>
      <Box marginTop={10}>
        <Typography>
          Quae dum ita struuntur, indicatum est apud Tyrum indumentum regale
          textum occulte, incertum quo locante vel cuius usibus apparatum.
          ideoque rector provinciae tunc pater Apollinaris eiusdem nominis ut
          conscius ductus est aliique congregati sunt ex diversis civitatibus
          multi, qui atrocium criminum ponderibus urgebantur.
        </Typography>
      </Box>
      <Link to="/room">
        <Button color="primary">Create Room</Button>
      </Link>
    </Container>
  );
};

export default Home;
