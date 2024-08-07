import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
// import Typography from '@mui/material/Typography';
import "../SingleContent/SingleContent.css";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./ContentModal.css";
import Carousel from "../Carousel/Carousel";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function ContentModal({ children, media_type, id }) {
  //Receiving <SingleContent/> component(or Card component) as a children
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [content, setContent] = React.useState([]);
  const [video, setVideo] = React.useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    );
    // console.log(data);
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  React.useEffect(() => {
    fetchData();
    fetchVideo();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div onClick={handleOpen} className="media">
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              width: "90%",
              height: "80%",
              backgroundColor: "#39445a",
              border: "1px solid #282c34",
              borderRadius: 10,
              color: "white",
              boxShadow:
                "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)",
              padding: "8px 8px 24px",
              position: "absolute", //so that <Box/> can overlap on its parent container i.e <Fade/> component
              outline: "white ridge",
            }}
          >
            {content && (
              <div className="ContentModal">
                {/*Portrait image*/}
                <img
                  alt={content.title || content.name}
                  className="ContentModal__portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                />

                {/*Landscape image */}
                <img
                  alt={content.title || content.name}
                  className="ContentModal__landscape"
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                />

                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.title || content.name}(
                    {(
                      content.release_date ||
                      content.first_air_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>

                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
