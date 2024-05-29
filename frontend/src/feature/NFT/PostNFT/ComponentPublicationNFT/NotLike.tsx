const NotLike = ({ onClick,numberOfLike }: { onClick: () => void ,numberOfLike:number|undefined}) => (
    <button className="flex items-center focus:outline-none" onClick={onClick}>
        <img src="https://instamintkami.blob.core.windows.net/instamint/NotLike.svg" alt="Not Like" className="h-8 w-8 text-black-500" />
        <span className="text-sm text-gray-500 ml-2">{numberOfLike}</span>
    </button>
)

export default NotLike