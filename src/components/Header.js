import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguages } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email,  photoURL } = user;
        dispatch(addUser({ uid: uid, email: email,  photoURL: photoURL}));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsubscribe when component unmounts
    return () => unsubscribe();
  },[]);

  const handleLanguageChange = (e) => {
    dispatch(changeLanguages(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img
        className="w-44 mx-auto md:mx-0"
        src={LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex p-2 justify-between">
          { showGptSearch && <select className="p-2 m-2 bg-gray-900 text-white rounded-lg" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang)=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>}
          <button className="py-2 px-4 mx-4 my-2 bg-purple-700 hover:bg-purple-500 text-white font-semibold	 rounded-lg" onClick={handleGptSearchClick}>{ showGptSearch ? "HomePage" : "GPT Search"}</button>
          <img className="hidden md:block w-12 h-12" alt="userIcon" src={user?.photoURL} />
          <button className="font-bold text-white" onClick={handleSignOut}>
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
