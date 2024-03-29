import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG_URL } from "../utils/constants";

const GPTSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img className="h-screen object-cover w-screen" src={BG_URL} alt="Logo" />
      </div>
      <div>
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  );
};

export default GPTSearch;
