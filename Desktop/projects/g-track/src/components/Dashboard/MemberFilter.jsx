import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { useTranslation } from "react-i18next";

function MemberFilter() {
  const [isOpen, setIsOpen] = useState(false);
  
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className="group relative cursor-pointer py-2 max-w-[280px]">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between rounded-lg shadow-md border bg-white px-4"
        >
          <HiOutlineUsers className="text-xl" />
          <buton className="menu-hover my-2 py-1.5 text-base font-medium text-black ">
            {t("Members Filter")}
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
          style={{ direction: i18n.language == "ar" ? "rtl" : "ltr" }}
        >
          <div className="flex items-center  px-3 border-b mt-3">
            <FaFilter className="text-gray-500 text-xl" />
            <input
              type="text"
              placeholder={t("Filter")}
              className="w-full border-none focus:outline-none border-gray-200 rounded-md p-1"
            />
          </div>
          {[
            {
              name: "Abdul Majid",
              Occupation: "Driver",
              Email: "abdul-majid@gmail.com",
            },
          ].map((member, index) => (
            <div className="flex w-full gap-2  items-center">
              <div className="flex items-center gap-1">
                <input
                  readOnly
                  tabIndex="-1"
                  type="checkbox"
                  id={`MemberFilter-${index}`}
                  className="appearance-none h-4 w-4 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
                />
                <CiUser className="text-2xl" />
              </div>
              <label
                key={member}
                htmlFor={`MemberFilter-${index}`}
                className="my-2 flex-grow cursor-pointer  border-b gap-2 border-gray-100 py-1 font-semibold text-gray-500 hover:text-black  "
              >
                <div className="flex justify-between items-center">
                  <h4>{member.name}</h4>
                  <h4>{member.Occupation}</h4>
                </div>
                <p tooltip={member.Email} className="text-sm">
                  {member.Email}
                </p>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberFilter;
