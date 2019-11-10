import React from "react";
import { RoomMemberMeta } from "../types";

interface Props {
  members: RoomMemberMeta[];
}

const MemberList: React.FC<Props> = props => {
  const { members } = props;

  return (
    <div>
      {members.map(m => (
        <div style={{ border: "solid 1px white" }} key={m.id}>
          <p>Id: {m.id}</p>
          <p>Name: {m.name}</p>
          <p>Status: {m.isConnected ? "connected" : "offline"}</p>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
