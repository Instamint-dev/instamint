const Like = ({ onClick,numberOfLike }: { onClick: () => void ,numberOfLike:number|undefined}) => (
    <button className="flex items-center focus:outline-none" onClick={onClick}>
        <svg
            className="h-8 w-8 text-red-500"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="text-sm text-red-500 ml-2">{numberOfLike}</span>
    </button>
);

export default Like;