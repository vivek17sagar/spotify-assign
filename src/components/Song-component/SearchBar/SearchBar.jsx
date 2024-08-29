import { Box, InputAdornment, TextField } from "@mui/material";
import Vector from "../../../assets/Vector.png";
import './SearchBar.css'

const SearchBar = ({ filterSongSearch }) => {
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleChange = debounce((val) => {
    filterSongSearch(val.target.value);
  }, 500);

  return (
    <Box
      sx={{
        fontFamily: "Inter",
        opacity: "0.6",
        color: "white",
        // height: "100vh",
      }}
    >
      <TextField
        id="outlined-basic"
        placeholder="Search Song, Artist"
        variant="outlined"
        className="searchBar"
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <img src={Vector} />
            </InputAdornment>
          ),
          sx: {
            "input::placeholder": {
              color: "white",
            },
            input: {
              // height: "40px",
              // width: "100%",
              color: "white",
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF14", 
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
