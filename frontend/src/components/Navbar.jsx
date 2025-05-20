import React, { useState } from "react";
import ProfileInfo from "./Card/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

const Navbar = ({userInfo, onSearchNotes, handleClearSearch,useLogout}) => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('')

  const onLogout = () => {
    useLogout();
  };

  const handleSearch = () =>{
    if(searchQuery){
      onSearchNotes(searchQuery);
    }
    
  };

  const onClearSearch = () =>{
    setSearchQuery("")
    handleClearSearch();
  }

  return (
    <div className="bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-between px-6 py-2 drop-shadow-sm">
      <h2
      className="text-xl font-medium text-white py-2 cursor-pointer hover:text-blue-600 transition"
      onClick={() => navigate("/")}
    >
      Notes
    </h2>

      <SearchBar value={searchQuery}
      onChange={({target})=>{
        setSearchQuery(target.value);
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} useLogout={useLogout}/>
    </div>
  );
};

export default Navbar;
