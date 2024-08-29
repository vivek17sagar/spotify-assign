import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import SkeletonTypography from "../../Skleleton/SkeletonTypography";
import "./SongList.css";

const SongList = ({ songList, handleColor, setSong, active }) => {
  const [durations, setDurations] = useState([]);

  useEffect(() => {
    const loadDurations = () => {
      songList.forEach((item, index) => {
        const audio = new Audio(item?.url);

        audio.addEventListener("loadedmetadata", () => {
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
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleClick = (accent, index) => {
    handleColor(accent);
    setSong(index);
  };

  return (
    <Box>
      <List
        sx={{
          width: "100%",
          color: "white",
          fontFamily: "Inter",
          height: "70vh",
        }}
      >
        {active === 0 ? (
          songList.length < 1 ? (
            <SkeletonTypography />
          ) : (
            songList?.map((item, index) => (
              <ListItem
                key={item?.id}
                onClick={() => handleClick(item?.accent, index)}
                className="list"
              >
                <ListItemAvatar>
                  <Avatar>
                    <img
                      src={item?.cover} // Assuming the cover is still in base64 format
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
                  {durations[index]
                    ? `${formatDuration(durations[index])}`
                    : ""}
                </Box>
              </ListItem>
            ))
          )
        ) : (
          songList?.map(
            (item, index) =>
              index % 2 == 0 && (
                <ListItem
                  key={item?.id}
                  onClick={() => handleClick(item?.accent, index)}
                  className="list"
                >
                  <ListItemAvatar>
                    <Avatar>
                      <img
                        src={item?.cover} // Assuming the cover is still in base64 format
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
                    {durations[index]
                      ? `${formatDuration(durations[index])}`
                      : ""}
                  </Box>
                </ListItem>
              )
          )
        )}
      </List>
    </Box>
  );
};

export default SongList;
