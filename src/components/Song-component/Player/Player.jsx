import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import "./player.css";
import group from "../../../assets/Group7.png";
import vector1 from "../../../assets/Vector1.png";
import vector2 from "../../../assets/Vector2.png";
import pause from "../../../assets/pause.png"; 
import prev from "../../../assets/prev.png"; 
import vector3 from "../../../assets/Vector3.png"; 
import playercd from "../../../assets/playercd.jpg"; 
const Player = ({ song, index, setSong, songList,handleResponsive }) => {
  const [songDuration, setSongDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); 
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef(null);
  const volumeTimeoutRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      setSongDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    if (audio) {
      setIsPlaying(true);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [song]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (event) => {
    const newTime = event.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    setShowVolumeSlider(true);
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 2000); // Hide slider after 2 seconds
  };

  const handleVolumeClick = () => {
    if (isMuted) {
      setVolume(1); // Set volume to max when unmuting
      audioRef.current.volume = 1;
    } else {
      setVolume(0); // Set volume to 0 when muting
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    setShowVolumeSlider(true);
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 2000); // Hide slider after 2 seconds
  };

  const handlePrevious = () => {
    if (index > 0) {
      setSong(index - 1);
    }
  };

  const handleNext = () => {
    if (index < songList.length - 1) {
      setSong(index + 1);
    }
  };

  function secondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  }


  return (
    <Box
      sx={{
        color: "white",
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>
        <audio ref={audioRef} src={song} style={{ width: "100%" }} autoPlay />
        <Box sx={{ marginTop: 2 }}>
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "700",
              fontFamily: "Inter",
              lineHeight: "24px",
            }}
          >
            {songList[index]?.artist}
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              fontFamily: "Inter",
              lineHeight: "24px",
              opacity: "60%",
            }}
          >
            {songList[index]?.name}
          </Typography>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <div
          className="playerCover"
           
          >
            <img
              src={songList[index]?.cover ? songList[index]?.cover : playercd} 
              alt="uploaded document"
              style={{ width: "100%" }}
            />
          </div>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <div className="player-slider">
            <input
              type="range"
              className="slider"
              id="progress"
              min="0"
              max={songDuration}
              value={currentTime}
              onChange={handleSliderChange}
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Inter",
              margin: "0px",
              padding: "0px",
            }}
          >
            <p>{secondsToMinutes(Math.floor(currentTime))}</p>
            <p>{secondsToMinutes(Math.floor(songDuration))}</p>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            <img
              src={group}
              alt="group Icon"
              onClick={()=>handleResponsive("visible")}
              style={{ cursor: "pointer" }}
            />
            <img
              src={prev}
              alt="Previous Icon"
              onClick={handlePrevious}
              style={{ cursor: "pointer" }}
            />
            <img
              src={isPlaying ? pause : vector1}
              alt={isPlaying ? "Pause Icon" : "Play Icon"}
              onClick={handlePlayPause}
              style={{ cursor: "pointer" }}
            />
            <img
              src={vector2}
              alt="Next Icon"
              onClick={handleNext}
              style={{ cursor: "pointer" }}
            />
            <Box
              sx={{ position: "relative", display: "inline-block" }}
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => {
                volumeTimeoutRef.current = setTimeout(() => {
                  setShowVolumeSlider(false);
                }, 2000); // Hide slider after 2 seconds
              }}
            >
              <img
                src={vector3}
                alt="Volume Icon"
                onClick={handleVolumeClick}
                style={{ cursor: "pointer" }}
              />
              {showVolumeSlider && (
                <input
                  type="range"
                  className="volume-slider"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: "100px",
                    position: "absolute",
                    bottom: "30px",
                    right: "0",
                    opacity: "0.8",
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Player;
