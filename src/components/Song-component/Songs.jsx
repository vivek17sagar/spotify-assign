import { Box } from "@mui/material"
import Sidebar from "./Sidebar/Sidebar"
import SearchBar from "./SearchBar/SearchBar"
import SongList from "./SongList/SongList"
import { useEffect, useState } from "react"
import axios from 'axios';

export const Songs = ({setBgColor}) => {

    const[songList,setSongList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const songsResponse = await axios.get('https://cms.samespace.com/items/songs');
            const songs = songsResponse?.data?.data || [];
      
            const coverRequests = songs.map(item => 
              axios.get(`https://cms.samespace.com/assets/${item?.cover}`)
            );
            
            const coverResponses = await Promise.all(coverRequests);
      
            console.log(coverResponses); // You can do something with the cover images here
      
            const modifySongs = songs.map((item,index)=>{
                return {...item,cover: coverResponses[index]}
                })
                console.log(modifySongs)
            setSongList(modifySongs);
      
          } catch (error) {
            console.error('Error:', error);
          }
        };
      
        fetchData();
      }, []);
      
  return (
    <Box>
    <Sidebar/>
    <SearchBar/>
    <SongList songList={songList} setBgColor={setBgColor}/>
</Box>
  )
}