import { useState } from 'react'
import Navbar from '../navbar/navbar'
import SEARCH_TYPE from '../../type/feature/search/search'

const Search = () => {
    const [formData, setFormData] = useState<SEARCH_TYPE>({
        search: "",
        nft: false,
        user: false,
        price: 0,
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
        
    }

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 p-4">
                <div className="flex flex-col items-center space-y-4">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        value={formData.search}
                        onChange={handleInputChange}
                        className="form-input px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="nft"
                                checked={formData.nft}
                                onChange={handleInputChange}
                                className="toggle-checkbox"
                            />
                            <span>NFT</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="user"
                                checked={formData.user}
                                onChange={handleInputChange}
                                className="toggle-checkbox"
                            />
                            <span>User</span>
                        </label>
                        {formData.nft &&
                            <><input
                                type="range"
                                name="price"
                                min="0"
                                max="1000"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="range range-xs"
                            />
                                <span className="text-sm">{`$${formData.price}`}</span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search
