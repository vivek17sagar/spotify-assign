import { Box, InputAdornment, TextField } from "@mui/material"
import Vector from '../../../assets/Vector.png'

const SearchBar = () => {
  return (
    <Box sx={{fontFamily:"Inter",opacity:"0.6",color:"white"}}>
    <TextField
    id="outlined-basic"
    placeholder="Search Song, Artist"
    variant="outlined"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <img src={Vector}/>
        </InputAdornment>
      ),
      sx: {
        'input::placeholder': {
          color: 'white',
        },
        input: {
            height: '48px',
            width:"400px"
          },
      },
    }}
    sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#FFFFFF14', // Light whitish background
        }
      }}
  
   
  />
    </Box>
  )
}

export default SearchBar