import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const SongList = ({ songList,setBgColor }) => {
  return (
    <Box>
  <List sx={{ width: "100%", color: "white",fontFamily:"Inter" }}>
    {songList?.map((item) => {
      return (
        <ListItem key={item?.id} onClick={()=>setBgColor(item?.accent)}>
          <ListItemAvatar>
            <Avatar>
              <img src={`data:image/jpeg;base64,${item?.cover}`} alt="uploaded document" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item?.artist}
            secondary={item?.name}
            secondaryTypographyProps={{ sx: { color: 'lightgray',opacity:"0.6",fontFamily:"Inter" } }} // Change 'lightgray' to your desired color
          />
        </ListItem>
      );
    })}
  </List>
</Box>

  );
};

export default SongList;
