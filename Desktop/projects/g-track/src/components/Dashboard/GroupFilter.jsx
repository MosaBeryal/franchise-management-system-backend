import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { PiCreditCardThin } from "react-icons/pi";
function GroupFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("Group By Day");
 
  const options = ["Group By Day", "Group By Stop Type"];
  
  const handleSelect = (option) => {
    setSelectedGroup(option);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="group relative cursor-pointer py-2 max-w-[280px]">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between rounded-lg shadow-md border bg-white px-4"
        >
          <PiCreditCardThin className="text-2xl" />
          <buton className="menu-hover my-2 py-1.5 text-base font-medium text-black ">
            {selectedGroup}
          </buton>
          {isOpen ? (
            <IoChevronUp className="text-xl" />
          ) : (
            <IoChevronDown className="text-xl" />
          )}
        </div>
        <div
          className={`${
            isOpen ? "visiable " : "invisible"
          } absolute z-50 flex w-full flex-col bg-white py-1 px-3 text-gray-800 shadow-xl `}
        >
             {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="text-left w-full text-gray-800 hover:bg-gray-100 hover:text-black py-1 px-2"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupFilter;
