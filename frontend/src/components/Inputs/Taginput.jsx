import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const Taginput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed !== "" && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]); // Add new tag to array
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if inside a form
      addNewTag(); // ← call the function!
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center  gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-300"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-600"
              >
                <MdClose className="text-xs" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mt-3">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add Tags"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none flex-1"
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700 transition-all"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default Taginput;
