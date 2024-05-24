import React from "react"
import { useTranslation } from "react-i18next"
import Navbar from "../navbar/navbar"
import Sidebar from "../navbar/sidebar"
import CustomInput from "../../components/CustomButton"

const LanguageSwitcher: React.FC = () => {
  const { i18n,t } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="flex justify-center flex-col items-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h1>{t("Choose your language")}</h1>
          <CustomInput type="button" value="English" onClick={() => changeLanguage("en")} />
          <CustomInput type="button" value="Français" onClick={() => changeLanguage("fr")} />
          <CustomInput type="button" value="Español" onClick={() => changeLanguage("es")} />
        </div>
      </div>
    </>
  )
}

export default LanguageSwitcher
