import React from 'react'
import i18ns from "../i18n";
import { I18nextProvider, useTranslation } from "react-i18next";
import LanguageSwitcher from '../switer';

export default function Header() {
    
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className={`p-2 pb- bg-[#D0EDF3]`}>
        <div
          className={`flex items-center ${
            i18n.language === "ar" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`flex items-center my-auto px-4 ${
              i18n.language === "ar" ? "justify-start" : "justify-end"
            }`}
          >
            <span className="w-full sm:w-auto ">
              <I18nextProvider i18n={i18ns}>
                <LanguageSwitcher />
              </I18nextProvider>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
