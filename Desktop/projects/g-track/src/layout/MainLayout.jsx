import React from "react";
import { Images } from "../assets/Index";
import NavLinks from "./NavLinks";
import { store } from "../Redux/store";
import { Provider } from "react-redux";
import { useTranslation } from "react-i18next";
import Header from "./Header";

function MainLayout({ children }) {
  const { t, i18n } = useTranslation();
  return (
    <div
      className={`flex h-screen bg-gray-100 
      ${ i18n.language == 'ar' ? 'flex-row-reverse' : 'flex-row'}
    `}
    >
      {/* sidebar */}
      <div className="hidden md:flex flex-col  w-64 bg-[#D0EDF3]  overflow-y-auto">
        <div className="flex flex-col flex-1">
          <div className="flex items-start justify-start my-4 ml-6 ">
            <img
              src={Images.Gs1Logo}
              alt="logo"
              className=" w-ful h-20 object-contain"
            />
          </div>
          <NavLinks />
        </div>
      </div>
      {/* Main content */}
      <section className="flex flex-col flex-1 overflow-y-auto">
       <Header/>
        <main className="p-4">{children}</main>
      </section>
    </div>
  );
}

export default MainLayout;
