import Result from "../../type/feature/search/result"
import { Link } from "react-router-dom"
const resultSearch = (data: Result) => (
        <div className="flex flex-col gap-4">
            {data.results.length > 0 ?
                data.results.map((result) => (
                    <div key={`${result.link}.${result.id.toString()}`} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Link to={result.link} className="block">
                            <img src={result.image} alt="image" className="w-24 h-auto rounded" />
                        </Link>
                        <div className="flex-grow">
                            <Link to={result.link} className="text-lg font-bold no-underline text-black hover:underline">
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


export default resultSearch