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
//We need to provide <Pagination/> component a few properties like onChange which will be occurred whenever we changed the page and which is going
//to call a function called handlePageChange() which is responsible for updating the state page with that page no.
//So, whenever we change the page no. it sets the page state to the particular page no. that we have clicked using setPage() setter function and it
//should scroll back to the top of window
//So, handlePageChange() function is responsible for updating our page no. Whenever the page state(which stores page no.) changes for eg. page no.
//is 2 so its going to call the API again for page no. 2 to fetch the Movie or Tv series data for page 2.

//count is the no. of pages in pagination
//and numberOfPages is going to be the default value of 10 i.e By default, there is going to be 10 pages because mostly the API has like 500 to
//600 pages data
