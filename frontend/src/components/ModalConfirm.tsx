
interface ModalConfirmProps {
    show: boolean;
    onClose: (value: boolean) => void
    onConfirm:  (value: boolean) => void
    title: string;
    message: string;

}

const ModalConfirm = ({ show, onClose, onConfirm, title, message }:ModalConfirmProps) => {
    return (
        <div className={`fixed inset-0 z-50 overflow-auto bg-smoke-light flex ${show ? "" : "hidden"}`}>
            <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
                <header className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <button className="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={() => onClose(false)}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </header>
                <div className="mt-6">
                    <p>{message}</p>
                    <div className="mt-6">
                        <button
                            onClick={() => {onConfirm(true);onClose(false)}}
                            className="w-full px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm