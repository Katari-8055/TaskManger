import React from "react";
import moment from "moment";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-all ease-in-out duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h6 className="text-lg font-semibold mb-1">{title}</h6>
          <span className="text-xs text-white/70">{moment(date).format("Do MMM YYYY")}</span>
        </div>
        <MdOutlinePushPin
          className={`text-xl cursor-pointer transition ${
            isPinned ? "text-yellow-300" : "text-white/40"
          } hover:scale-110`}
          onClick={onPinNote}
        />
      </div>

      {/* Content */}
      <p className="text-sm text-white/80 mb-4">{content?.slice(0, 100)}...</p>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-1 text-xs text-yellow-200 font-medium">
          {tags.map((item, index) => (
            <span key={index}>#{item}</span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <MdCreate
            className="text-white/80 hover:text-green-400 text-lg cursor-pointer transition"
            onClick={onEdit}
          />
          <MdDelete
            className="text-white/80 hover:text-red-400 text-lg cursor-pointer transition"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

