import React from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";

import RoomPlaylistItem from "../../../types/RoomPlaylistItem";
import RoomMember from "../../../types/RoomMember";

interface Props {
  items: RoomPlaylistItem[];
  userFromId: (id: string) => RoomMember;
}

const PlaylistQueue: React.FC<Props> = ({ items, userFromId }) => {
  return (
    <div>
      <List>
        {items.map(item => (
          <div key={item.uuid}>
            <ListItem>
              <ListItemText
                primary={item.videoId}
                secondary={`Added by ${userFromId(item.addedBy).name}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default PlaylistQueue;
