import { Box } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import SearchBar from "./SearchBar/SearchBar";
import SongList from "./SongList/SongList";
import { useEffect, useState } from "react";
import axios from "axios";
import './Songs.css';
import Player from "./Player/Player";

export const Songs = ({ handleColor }) => {
  const [songList, setSongList] = useState([]);
  const [song, setSong] = useState();
  const [active, setActive] = useState(0);
  const [filterSong, setFilterSong] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const filterSongSearch = (param) => {
    const getSearchSong = songList.filter((item) => {
      const art = item.artist.toUpperCase();
      const nam = item.name.toUpperCase();
      const searchParam = param.toUpperCase();
      return art.includes(searchParam) || nam.includes(searchParam);
    });

    setFilterSong(getSearchSong);
  };

  function convertToBase64(arrayBuffer) {
    const binaryString = Array.from(new Uint8Array(arrayBuffer))
      .map((byte) => String.fromCharCode(byte))
      .join("");
    return `data:image/jpeg;base64,${btoa(binaryString)}`;
  }

  const handleResponsive = () => {
    setIsVisible((prev) => !prev); 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songsResponse = await axios.get(
          "https://cms.samespace.com/items/songs"
        );
        const songs = songsResponse?.data?.data || [];

        const coverRequests = songs.map((item) =>
          axios.get(`https://cms.samespace.com/assets/${item?.cover}`, {
            responseType: "arraybuffer",
          })
        );

        const coverResponses = await Promise.all(coverRequests);

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
  }, []);

  useEffect(() => {
    setFilterSong(songList);
  }, [songList]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Box className={`songListContainer ${isVisible ? "show" : ""}`}>
        <Sidebar active={active} setActive={setActive} isVisible={isVisible} setIsVisible={setIsVisible}/>
        <SearchBar filterSongSearch={filterSongSearch} />
        <SongList
          songList={filterSong}
          handleColor={handleColor}
          setSong={setSong}
          active={active}
        />
      </Box>
      <Box className={`playerContainer ${isVisible ? "hide" : ""}`}>
        <Player
          song={songList[song]?.url}
          index={song}
          setSong={setSong}
          songList={songList}
          handleResponsive={handleResponsive}
        />
      </Box>
    </Box>
  );
};
