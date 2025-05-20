import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        
      </label>

      {/* Input + Icon wrapper */}
      <div className="relative">
        <input
          onChange={onChange}
          value={value}
          type={isShowPassword ? "text" : "password"}
          
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={placeholder || "Password"}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer">
          {isShowPassword ? (
            <FaRegEye size={20} onClick={toggleShowPassword} />
          ) : (
            <FaRegEyeSlash size={20} onClick={toggleShowPassword} />
          )}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;

