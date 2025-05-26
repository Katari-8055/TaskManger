import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import Taginput from "../components/Inputs/Taginput";
import axios from "axios";
import { toast } from "react-toastify";

const AddEditNotes = ({getAllNotes, noteData, type, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []); // tags as array

  const [error, setError] = useState(null);

  //Add Note-------------------------------------------------------------------
  const addNewNote = async () => {
  try {
    const res = await axios.post(
      "https://taskmanger-backend-awlj.onrender.com/api/note/addnotes",
      { title, content, tags },
      {
        withCredentials: true, // Send auth cookie
      }
    );

    //console.log("Note added:", res.data);
    toast.success(res.data.message || "Note Added successful");
    getAllNotes();
    onClose(); // ✅ log or use it
    // Optionally clear fields or refresh notes
    // setTitle(""); setContent(""); setTags([]); // etc.

  } catch (error) {
    console.error("Failed to add note:", error.response?.data || error.message);
  }
};


  //Edit Note----------------------------------------------------------

  const editNote = async () => {
  const noteId = noteData?._id; // ✅ Safe optional chaining

  try {
    const res = await axios.put(
      `https://taskmanger-backend-awlj.onrender.com/api/note/editnotes/${noteId}`, // ✅ Added `/`
      { title, content, tags },
      {
        withCredentials: true, // ✅ Keeps cookies (like JWT)
      }
    );

    //console.log("Note updated:", res.data); // ✅ Corrected message
    toast.success(res.data.message || "Note Edited successful");
    getAllNotes(); // ✅ Refresh notes list
    onClose();     // ✅ Close modal

    // Optional: Clear form
    // setTitle(""); setContent(""); setTags([]);
  } catch (error) {
    console.error("Failed to update note:", error.response?.data || error.message);
  }
};


  const handleAddNote = () =>{
    if(!title){
      setError("Please Enter The Title")
      return;
    }

    if(!content){
      setError("Enater The Content")
      return;
    }

    setError(null);

    if(type==="edit"){
      editNote();
    }else{
      addNewNote();
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-md relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 rounded-full bg-white border border-gray-300 hover:bg-red-100 hover:border-red-400 transition-colors"
        aria-label="Close"
        type="button"
      >
        <MdClose className="text-gray-600 hover:text-red-600 text-sm" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label text-sm font-semibold text-gray-700">TITLE</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="text-2xl text-slate-900 outline-none border-b border-gray-300 focus:border-blue-500 transition duration-200 p-1 bg-transparent"
          placeholder="Go To Gym At 4am"
        />
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <label className="input-label text-sm font-semibold text-gray-700">CONTENT</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-sm text-slate-900 outline-none bg-slate-50 rounded-lg p-3 border border-gray-200 focus:border-blue-500 transition duration-200"
          placeholder="Content"
          rows={10}
        />
      </div>

      <div className="mt-6">
        <label className="input-label text-sm font-semibold text-gray-700">TAGS</label>
        <Taginput tags={tags} setTags={setTags} />
      </div>

      {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

      <button className="w-full font-medium mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
      onClick={handleAddNote}
      >
       {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;


