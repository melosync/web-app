import React from "react";

import RoomMember from "../../../types/RoomMember";

interface Props {
  members: RoomMember[];
}

const MemberList: React.FC<Props> = props => {
  const { members } = props;

  return (
    <div>
      {members.map(m => (
        <div style={{ border: "solid 1px white" }} key={m.id}>
          <p>
            Id:
            {m.id}
            <br />
            Name:
            {m.name}
            <br />
            Status:
            {m.isConnected ? "connected" : "offline"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MemberList;
