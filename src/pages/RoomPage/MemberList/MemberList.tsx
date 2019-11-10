import { Badge, Paper, Typography } from "@material-ui/core";
import React from "react";

import RoomMember from "../../../types/RoomMember";

import Styles from "./MemberList.module.scss";

interface Props {
  members: RoomMember[];
}

const MemberList: React.FC<Props> = props => {
  const { members } = props;

  return (
    <div className={Styles.userItemContainer}>
      {members.map(m => (
        <div key={m.id}>
          <Paper className={Styles.userItem}>
            <Badge color={m.isConnected ? "primary" : "error"} variant="dot">
              <Typography noWrap variant="h6">
                {m.name}
              </Typography>
            </Badge>
          </Paper>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
