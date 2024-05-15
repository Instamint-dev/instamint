import { useState, useEffect } from 'react'
import Navbar from '../navbar/navbar'
import SEARCH_TYPE from '../../type/feature/search/search'
import defaultData from '../../type/feature/search/defaultData'
import { getDefaultData, search } from './service/SearchService'
const Search = () => {
    const [defaultData, setDefaultData] = useState<defaultData>({ maxPrice: 0, place_nft: [""], place_user: [""] })
    const [place, setPlace] = useState<string[]>([""])
    const [formData, setFormData] = useState<SEARCH_TYPE>({
        search: "",
        nft: true,
        user: true,
        price: false,
        minPrice: 0,
        maxPrice: 0,
        place: ""
    })
    useEffect(() => {
        try {
            const fetchMaxPrice = async () => {
                const response: defaultData = await getDefaultData(formData.user, formData.nft)
                setDefaultData(response)
                const places = response.place_nft.concat(response.place_user).filter((place, index, self) => self.indexOf(place) === index)
                setPlace(places)
            }
            fetchMaxPrice()
        } catch (error: unknown) {
            throw new Error(`Error when fetching max price`)
        }
    }, [formData.user, formData.nft])
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData }
            if (type === 'checkbox') {
                const { checked } = e.target as HTMLInputElement
                if (name === 'nft' || name === 'user') {
                    if (!checked) {
                        if (prevFormData.nft && prevFormData.user) {

                            newFormData[name] = checked
                        } else {
                            const otherKey = name === 'nft' ? 'user' : 'nft'
                            newFormData[name] = false
                            newFormData[otherKey] = true
                        }
                    } else {
                        newFormData[name] = checked
                    }
                }
                else {
                    newFormData.price = checked
                }
            } else if (type === 'text' || type === 'range') {
                switch (name) {
                    case "search":
                        newFormData.search = value
                        break
                    case "minPrice":
                        if (parseInt(value, 10) > formData.maxPrice) {
                            newFormData.minPrice = formData.maxPrice
                        } else {
                            newFormData.minPrice = parseInt(value, 10)
                        }
                        break
                    case "maxPrice":
                        if (parseInt(value, 10) < formData.minPrice) {
                            newFormData.maxPrice = formData.minPrice
                        } else {
                            newFormData.maxPrice = parseInt(value, 10)
                        }
                        break
                }
            }
            else if (type === 'select-one') {
                newFormData.place = value
            }
            handleSend(newFormData)
            return newFormData
        })
    }
    const handleSend = async (data: SEARCH_TYPE) => {
        const formSearch = await search(data)
        console.log(formSearch)
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
                        <select name="place" id="place" onChange={handleInputChange} className='appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'>
                            <option value="" selected>Location</option>
                            {place.map((place) => {
                                return (
                                    <option value={place}>{place}</option>
                                )
                            })}
                        </select>
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
                            <>
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
                            </>
                        }
                    </div>
                    {(formData.nft && formData.price) &&
                        <div className="flex w-full justify-between items-center max-w-md">
                            <div className="flex flex-col items-center space-y-2">
                                <label className="text-xs font-semibold">Min</label>
                                <input
                                    type="range"
                                    name="minPrice"
                                    min="0"
                                    max={defaultData.maxPrice}
                                    value={formData.minPrice}
                                    onChange={handleInputChange}
                                    className="range range-xs"
                                />
                                <span className="text-sm">{`$${formData.minPrice}`}</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <label className="text-xs font-semibold">Max</label>
                                <input
                                    type="range"
                                    name="maxPrice"
                                    min="0"
                                    max={defaultData.maxPrice}
                                    value={formData.maxPrice}
                                    onChange={handleInputChange}
                                    className="range range-xs"
                                />
                                <span className="text-sm">{`$${formData.maxPrice}`}</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default Search
