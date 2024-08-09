import { createTheme, Pagination, ThemeProvider } from "@mui/material";
import React from "react";

//Creating custom theme or dark theme for <Pagination/> component
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CustomPagination = ({ setPage, numberOfPages = 10 }) => {
  const handlePageChange = (e) => {
    setPage(e.target.textContent); 
    window.scrollTo(0, 0); //scrolls the document or page to the top of window
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      {/*Applying custom theme to <Pagination/> component using <ThemeProvider/> component*/}
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numberOfPages}
          onChange={(e) => handlePageChange(e)}
          hideNextButton
          hidePrevButton
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;

