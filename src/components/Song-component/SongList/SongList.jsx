import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

const SongList = ({ songList, setBgColor, setSong }) => {
  const [durations, setDurations] = useState([]);

  useEffect(() => {
    const loadDurations = () => {
      songList.forEach((item, index) => {
        const audio = new Audio(item?.url); 

        audio.addEventListener('loadedmetadata', () => {
          setDurations((prevDurations) => {
            const newDurations = [...prevDurations];
            newDurations[index] = audio.duration;
            return newDurations;
          });
        });

        audio.load();
      });
    };

    loadDurations();
  }, [songList]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleClick = (accent,index) => {
    console.log("working")
    setBgColor(accent)
    setSong(index)
  }
  console.log(songList)
  return (
    <Box>
      <List sx={{ width: "100%", color: "white", fontFamily: "Inter" }}>
        {songList?.map((item, index) => (
          <ListItem key={item?.id} onClick={()=>handleClick(item?.accent,index)}>
            <ListItemAvatar>
              <Avatar>
                <img
                  src={`data:image/jpeg;base64,${item?.cover}`}  // Assuming the cover is still in base64 format
                  alt="uploaded document"
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item?.artist}
              secondary={`${item?.name}`}
              secondaryTypographyProps={{
                sx: {
                  color: "lightgray",
                  opacity: "0.6",
                  fontFamily: "Inter",
                },
              }}
            />
            <Box>
            {durations[index] ? `${formatDuration(durations[index])}` : ''}
              </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SongList;
