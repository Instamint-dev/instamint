import { useTranslation } from "react-i18next"
import ModalRecoveryCodeProps from "../../type/feature/doubleAuth/modal_recovery_code"
import { useState } from "react"

const ModalRecoveryCode = ({ toggleModal, recoveryCode }: ModalRecoveryCodeProps) => {
    const { t } = useTranslation()
    const [copied, setCopied] = useState(Array(recoveryCode.length).fill(false))
    const handleCopy = async (index: number, code: string) => {
        await navigator.clipboard.writeText(code)
        const newCopiedState = copied.map((_, i) => i === index)
        setCopied(newCopiedState)
    }

    return (
        <div id="modal" tabIndex={0} aria-hidden="true" className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50">
            <div className="relative w-full max-w-md p-6 mx-auto mt-12 bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{t("Recovery code")}</h3>
                    <button onClick={toggleModal} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
                <div className="my-2">
                    <p>
                        <span>{t("Please save your recovery code in a safe place. You will need it to recover your account if you lose access to your device.")}</span>
                        <br />
                        <span className="text-red-500">{t("You can use each recovery code only once.")}</span>
                    </p>
                </div>
                <div className="my-2 space-y-2">
                    {recoveryCode.map((code, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <p className="font-mono text-sm text-gray-800">{code}</p>
                            <button
                                onClick={() => handleCopy(index, code)}
                                className={`mt-4 p-2 text-white ${copied[index] ? "bg-green-500" : "bg-blue-500"} rounded hover:bg-blue-700`}
                            >
                                {copied[index] ? t("Copied!") : t("Copy to Clipboard")}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ModalRecoveryCode
