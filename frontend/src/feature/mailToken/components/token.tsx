import React from "react"
import { Link } from "react-router-dom"
import CustomButton from "../../../components/CustomButton"
import CustomInput from "../../../components/CustomInput"
import CustomLabelForm from "../../../components/CustomLabelForm"
import { useTranslation } from "react-i18next"
function TokenInvalid() {
  const { t } = useTranslation()

  return (
    <div className="flex items-center flex-col">
      <h1>{t("Token is invalid")}</h1>
      <Link to="/forgot-password">
        <p className="text-blue-500">{t("Re-send email")}</p>
      </Link>
    </div>
  )
}

function TokenValid({
  formData,
  handleChange,
  handleSubmit,
  checkPassword,
  fielCheck,
}: {
  formData: { R_PASSWORD: string, password: string }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  checkPassword: {
    length: boolean
    maj: boolean
    min: boolean
    special: boolean
    same: boolean
  }
  fielCheck: string
}) {
  const { t } = useTranslation()

  return (
    <div className="flex justify-center mt-8">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={handleSubmit}>
        <h1 className="font-bold flex justify-center">{t("New Password")}</h1>
        <div className="my-2">
          <CustomLabelForm htmlFor="password">{t("Password")}</CustomLabelForm>
          <CustomInput
            disabled={false}
            type="password"
            id="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            placeholder={t("Password")}
          />
        </div>
        <div className="my-2">
          <CustomLabelForm htmlFor="r-password">{t("Repeat password")}</CustomLabelForm>
          <CustomInput
            disabled={false}
            type="password"
            id="r-password"
            name="R_PASSWORD"
            value={formData.R_PASSWORD || ""}
            onChange={handleChange}
            placeholder={t("Repeat password")}
          />
        </div>
        <div className="my-2">
          <CustomButton value={t("Sign up")} type="submit" />
        </div>
        <div className="my-2">
          <AboutPassword checkPassword={checkPassword} />
          {fielCheck && <p className="text-red-500">{fielCheck}</p>}
        </div>
      </form>
    </div>
  )
}

function AboutPassword({
  checkPassword,
}: {
  checkPassword: {
    length: boolean
    maj: boolean
    min: boolean
    special: boolean
    same: boolean
  }
}) {
  const { t } = useTranslation()

  return (
    <div>
      <ul>
        <li className={checkPassword.length ? "text-green-500" : "text-red-500"}>
          {t("At least 10 characters")}
        </li>
        <li className={checkPassword.maj ? "text-green-500" : "text-red-500"}>
          {t("At least one uppercase letter")}
        </li>
        <li className={checkPassword.min ? "text-green-500" : "text-red-500"}>
          {t("At least one lowercase letter")}
        </li>
        <li className={checkPassword.special ? "text-green-500" : "text-red-500"}>
          {t("At least one special character")}
        </li>
        <li className={checkPassword.same ? "text-green-500" : "text-red-500"}>
          {t("Same password")}
        </li>
      </ul>
    </div>
  )
}
export { TokenInvalid, TokenValid }