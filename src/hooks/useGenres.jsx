//This useGenres() function is going to take selectedGenres state array as an input parameter and its going to return the comma separated id's of
//genre like 28,12,16
const useGenres = (selectedGeneres) => {
  if (selectedGeneres.length < 1) return "";
  const genreIds = selectedGeneres.map((genre) => genre.id);
  return genreIds.reduce((acc, curr) => acc + "," + curr);
  //OR
  //return genreIds.toString();//which also converts the array of ids i.e [28,12,16] into a string 28,12,16
};

export default useGenres;
