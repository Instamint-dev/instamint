const Like = ({ onClick,numberOfLike }: { onClick: () => void ,numberOfLike:number|undefined}) => (
    <button className="flex items-center focus:outline-none" onClick={onClick}>
        <img src="https://instamintkami.blob.core.windows.net/instamint/Like.svg" alt="Like" className="h-8 w-8 text-black-500" />
        <span className="text-sm text-green-600 ml-2">{numberOfLike}</span>
    </button>
)

export default Like