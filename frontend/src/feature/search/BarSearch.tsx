import SEARCH_TYPE from "../../type/feature/search/search"
import defaultDataType from "../../type/feature/search/defaultData"
import { ChangeEvent } from "react"
const BarSearch = (formData: SEARCH_TYPE, handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, finalPlace: string[], defaultData: defaultDataType) => (
        <>
            <div className="flex flex-col items-center py-2">
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    value={formData.search}
                    onChange={handleInputChange}
                    className="form-input px-4 py-2 border border-gray-300 rounded-md shadow-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-4 py-2">
                    <select name="place" id="place" onChange={handleInputChange} className="appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
                        <option value="">Location</option>
                        {finalPlace.map((place) =>
                            <option key={place} value={place}>{place}</option>
                        )}
                    </select>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="user"
                            checked={formData.user}
                            onChange={handleInputChange}
                            className="toggle-checkbox"
                        />
                        <span>Minter</span>
                    </label>
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
                    {formData.nft && (
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="price"
                                checked={formData.price}
                                onChange={handleInputChange}
                                className="toggle-checkbox"
                            />
                            <span>Price</span>
                        </label>
                    )}
                </div>
                {formData.nft && formData.price && (
                    <div className="flex w-full justify-between items-center max-w-md">
                        <div className="flex flex-col items-center space-y-2">
                            <label className="text-xs font-semibold">Min</label>
                            <input
                                type="range"
                                name="minPrice"
                                min="0"
                                max={defaultData.maxPrice.toString()}
                                value={formData.minPrice.toString()}
                                onChange={handleInputChange}
                                className="range range-xs"
                            />
                            <span className="text-sm">{`$${formData.minPrice.toString()}`}</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <label className="text-xs font-semibold">Max</label>
                            <input
                                type="range"
                                name="maxPrice"
                                min="0"
                                max={defaultData.maxPrice.toString()}
                                value={formData.maxPrice.toString()}
                                onChange={handleInputChange}
                                className="range range-xs"
                            />
                            <span className="text-sm">{`$${formData.maxPrice.toString()}`}</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

export default BarSearch