import React from "react"
import {addReport} from "../feature/NFT/PostNFT/service/ReportService.ts"
import ReportType from "../type/feature/report/ReportType.ts"

interface Params {
    setShowModalReport: (value: boolean) => void
    id?: number
    type: string
}



const ModalReport:React.FC<Params> = ({ setShowModalReport ,id,type}) => {
    const [success, setSuccess] = React.useState<string>("")
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const reasonInput = form.reason as HTMLInputElement | null

        if (reasonInput && reasonInput.value !== "") {
            const reason: string = reasonInput.value
            const report: ReportType = {
                message: reason,
                idEntity: id || -1,
                type
            }
           const response= await addReport(report)

            if (response) {
                setSuccess("Report sent")
                setTimeout(() => {
                    setSuccess("")
                    setShowModalReport(false)
                } , 1000)
            }
        }
    }


    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
                <header className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Report {type}</h2>
                    <button className="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => {setShowModalReport(false)}}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </header>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for reporting</label>
                        <textarea id="reason" name="reason" rows={3}
                                  className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"></textarea>
                    </div>
                    <div className="mt-6">
                        <button type="submit"
                                className="w-full px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            Send report
                        </button>
                        {success && <p className="text-green-500 text-center mt-2">{success}</p>}
                    </div>
                </form>
            </div>
        </div>
        )
}

export default ModalReport