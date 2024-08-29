import { Box } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import SearchBar from "./SearchBar/SearchBar";
import SongList from "./SongList/SongList";
import { useEffect, useState } from "react";
import axios from "axios";
import Player from "./Player/Player";

export const Songs = ({ handleColor }) => {
  const [songList, setSongList] = useState([]);
  const [song, setSong] = useState();
  const [active, setActive] = useState(0);
  const [filterSong, setFilterSong] = useState([]);

  const filterSongSearch = (param) => {
    const getSearchSong = songList.filter((item) => {
      const art = item.artist.toUpperCase();
      const nam = item.name.toUpperCase();
      const searchParam = param.toUpperCase(); // Convert param to uppercase
      return art.includes(searchParam) || nam.includes(searchParam);
    });

    console.log(getSearchSong);
    setFilterSong(getSearchSong);
  };

  // Convert arrayBuffer to Base64 string
  function convertToBase64(arrayBuffer) {
    const binaryString = Array.from(new Uint8Array(arrayBuffer))
      .map((byte) => String.fromCharCode(byte))
      .join("");
    return `data:image/jpeg;base64,${btoa(binaryString)}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of songs
        const songsResponse = await axios.get(
          "https://cms.samespace.com/items/songs"
        );
        const songs = songsResponse?.data?.data || [];

        // Prepare requests to fetch cover images
        const coverRequests = songs.map((item) =>
          axios.get(`https://cms.samespace.com/assets/${item?.cover}`, {
            responseType: "arraybuffer", // Ensure we get binary data
          })
        );

        // Fetch all cover images in parallel
        const coverResponses = await Promise.all(coverRequests);

        // Convert cover images to Base64 and update the song list
        const modifiedSongs = songs.map((item, index) => {
          const base64Cover = convertToBase64(coverResponses[index].data);
          return { ...item, cover: base64Cover };
        });

        setSongList(modifiedSongs);
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Box>
        <Sidebar active={active} setActive={setActive} />
        <SearchBar filterSongSearch={filterSongSearch} />
        <SongList
          songList={filterSong}
          handleColor={handleColor}
          setSong={setSong}
          active={active}
        />
      </Box>
      <Box>
        <Player
          song={songList[song]?.url}
          index={song}
          setSong={setSong}
          songList={songList}
        />
      </Box>
    </Box>
  );
};
