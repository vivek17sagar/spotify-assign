import { Box, InputAdornment, TextField } from "@mui/material";
import Vector from "../../../assets/Vector.png";

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
  }, 500); // 300ms debounce delay

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
              height: "40x",
              width: "400px",
              color: "white",
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF14", // Light whitish background
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
