import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="relative w-80 max-w-sm">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search Notes"
        className="w-full pl-10 pr-10 py-2 border text-blue-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Clear button, shown only when there's text */}
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500"
          size={18}
        />
      )}

      {/* Search icon */}
      <FaSearch
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-black"
      />
    </div>
  )
}

export default SearchBar
