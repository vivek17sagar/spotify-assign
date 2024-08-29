
const TopTracks = () => {
  return (
    <Box>
    <List sx={{ width: "100%", color: "white", fontFamily: "Inter" }}>
      {/* {songList?.map((item, index) => (
        <ListItem
          key={item?.id}
          onClick={() => handleClick(item?.accent, index)}
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
            {durations[index] ? `${formatDuration(durations[index])}` : ""}
          </Box>
        </ListItem>
      ))} */}
    </List>
  </Box>
  )

export default TopTracks
