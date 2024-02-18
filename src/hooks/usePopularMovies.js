import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {
  
    const dispatch = useDispatch();

    //Just a Memoization technique 
    const popularMovies = useSelector((store)=>store.movies.popularMovies);

  const getPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  // Here in useEffect you can also write only getPopularMovies();
  // But for Memoization you need to write the way written below

  useEffect(() => {
    !popularMovies && getPopularMovies();    
  }, []);

};

export default usePopularMovies;
