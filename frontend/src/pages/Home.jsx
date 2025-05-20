import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/Card/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EmptyTasks from "../components/Empaty";

Modal.setAppElement("#root");

const Home = () => {
  const navigate = useNavigate();

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  const [isSearch, setIsSearch] = useState(false);

  //----------------------------Kyu Add Kiya hai-------------------

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  //Get User Info--------------------------------------------------------------

  const getUserInfo = async () => {
    try {
      const res = await axios.get("https://taskmanger-backend-awlj.onrender.com/api/auth/getuser", {
        withCredentials: true, // include cookies (important if you're using auth cookies)
      });

      setUserInfo(res.data.user); // ✅ logs the response from the server
    } catch (err) {
      console.error(
        "Error fetching user info:",
        err.response?.data || err.message
      );
      navigate("/login");
    }
  };

  //Get All Notes---------------------------------------------------------------

  const getAllNotes = async () => {
    try {
      const res = await axios.get("https://taskmanger-backend-awlj.onrender.com/api/note/getnotes", {
        withCredentials: true, // include cookies for auth
      });

      // console.log("Fetched Notes:", res.data.notes);
      setAllNotes(res.data.notes); // or update state
      return res.data; // optionally return notes if needed
    } catch (err) {
      console.error(
        "Failed to fetch notes:",
        err.response?.data || err.message
      );
      return null;
    }
  };

  // Delete Notes-------------------------------------------------------------

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const res = await axios.delete(
        `https://taskmanger-backend-awlj.onrender.com/api/note/deletenote/${noteId}`,
        { withCredentials: true }
      );

      toast.success(res.data.message || "Note deleted successfully");
      getAllNotes();
    } catch (error) {
      toast.error("Failed to delete note ❌");
      console.error(
        "Failed to delete note:",
        error.response?.data || error.message
      );
    }
  };

  //Serach for A note---------------------------------------------------------

  const onSearchNotes = async (query) => {
    try {
      const res = await axios.get(
        "https://taskmanger-backend-awlj.onrender.com/api/note/searchnotes",
        {
          params: { query },
          withCredentials: true,
        }
      );

      if (res.data && res.data.notes) {
        setIsSearch(true);
        setAllNotes(res.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  //isPinned-------------------------------------------------------------------

  const updateIsPinned = async (data) => {
    const noteId = data._id;
    try {
      const res = await axios.put(
        `https://taskmanger-backend-awlj.onrender.com/api/note/pinnednotes/${noteId}`,
      { isPinned: !data.isPinned }, // ✅ request body
      { withCredentials: true }    // ✅ request config
      );

      //console.log("Note added:", res.data);
      toast.success(res.data.message || "pinned Note successful");
      getAllNotes();
    } catch (error) {
      console.error(
        "Failed to add note:",
        error.response?.data || error.message
      );
    }
  };


  // Logout user--------------------------------------------------------------------

 const useLogout = async () => {
  try {
    await axios.post("https://taskmanger-backend-awlj.onrender.com/api/auth/logout", {}, { withCredentials: true });
    toast.success("Logged out");
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
  }

  navigate("/login");
};

  // ✅ Call only once when component mounts
  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white">
      <Navbar
        userInfo={userInfo}
        onSearchNotes={onSearchNotes}
        handleClearSearch={handleClearSearch}
        useLogout={useLogout}
      />

      <div className="container mx-auto px-4">
        {/* Responsive grid: 1 column on small, 2 on medium, 3 on large */}
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {allNotes.map((item, index) => (
              <NoteCard
                key={item._id || index}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => {
                  updateIsPinned(item);
                }}
              />
            ))}
          </div>
        ) : isSearch ? (
          <div className="text-center mt-10 text-gray-500 text-lg">
            No notes found for your search.
          </div>
        ) : (
          <EmptyTasks />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 shadow-lg transition-all duration-200"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 50,
          },
        }}
        contentLabel=""
        className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] max-h-[90vh] bg-white rounded-xl mx-auto mt-14 p-6 overflow-y-auto shadow-xl outline-none"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </div>
  );
};

export default Home;
