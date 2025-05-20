import React from "react";
import { MdOutlineInbox } from "react-icons/md";

const EmptyTasks = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg mx-auto max-w-md">
      <div className="animate-bounce mb-6 text-indigo-400">
        <MdOutlineInbox className="text-9xl" />
      </div>
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-3">No Tasks Found</h2>
      <p className="text-indigo-600 text-lg max-w-xs text-center">
        Looks like you don't have any tasks yet. Start by adding a new task to stay productive!
      </p>
    </div>
  );
};

export default EmptyTasks;

