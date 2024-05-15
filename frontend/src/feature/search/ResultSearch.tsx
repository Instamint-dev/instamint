import Result from "../../type/feature/search/result"
import { Link } from "react-router-dom"
const resultSearch = (data: Result) => {
    return (
        <div className="flex flex-col gap-4">
            {data.results.length > 0 ?
                data.results.map((result) => (
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <Link to={result.type === "minter" ? `/user/${result.link}` : `/nft/searchNFT/${result.link}`} className="block">
                            <img src={result.image} alt="image" className="w-24 h-auto rounded" />
                        </Link>
                        <div className="flex-grow">
                            <Link to={result.type === "minter" ? `/user/${result.link}` : `/nft/searchNFT/${result.link}`} className="text-lg font-bold no-underline text-black hover:underline">
                                <p>{result.place}</p>
                            </Link>
                            <p className="text-gray-600">{result.type}</p>
                            {result.username && <p className="text-gray-500">@{result.username}</p>}
                        </div>
                    </div>
                ))
                :
                <div className="flex items-center justify-center p-4 border rounded-lg">
                    <p>No results</p>
                </div>
            }
        </div>
    )
}

export default resultSearch