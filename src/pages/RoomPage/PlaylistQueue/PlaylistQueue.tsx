import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

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
        {items.map((item: RoomPlaylistItem) => (
          <div key={item.uuid}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={item.title} src={item.img} />
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
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
