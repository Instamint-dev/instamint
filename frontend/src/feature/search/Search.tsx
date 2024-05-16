import { useState, useEffect,ChangeEvent } from "react"
import Navbar from "../navbar/navbar"
import SEARCH_TYPE from "../../type/feature/search/search"
import defaultDataType from "../../type/feature/search/defaultData"
import { getDefaultData, search } from "./service/SearchService"
import resultSearch from "./ResultSearch"
import Result from "../../type/feature/search/result"
import barSearch from "./BarSearch"
const Search = () => {
    const [defaultData, setDefaultData] = useState<defaultDataType>({ maxPrice: 0, PLACE_NFT: [""], PLACE_USER: [""] })
    const [finalPlace, setPlace] = useState<string[]>([""])
    const [result, setResult] = useState<Result>({ results: [] })
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
                const response: defaultDataType = await getDefaultData(formData.user, formData.nft)
                setDefaultData(response)
                const places = response.PLACE_NFT.concat(response.PLACE_USER).filter((place, index, self) => self.indexOf(place) === index)
                setPlace(places)
            }
            void fetchMaxPrice()
        } catch (error: unknown) {
            throw new Error(`Error when fetching max price`)
        }
    }, [formData.user, formData.nft])
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData }
            if (type === "checkbox") {
                const { checked } = e.target as HTMLInputElement
                if (name === "nft" || name === "user") {
                    if (!checked) {
                        if (prevFormData.nft && prevFormData.user) {
                            newFormData[name] = checked
                        } else {
                            const otherKey = name === "nft" ? "user" : "nft"
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
            } else if (type === "text" || type === "range") {
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
            else if (type === "select-one") {
                newFormData.place = value
            }

            void handleSend(newFormData)

            return newFormData
        })
    }
    const handleSend = async (data: SEARCH_TYPE) => {
        const formSearch = await search(data)        
        setResult(formSearch)        
    }

    return (
        <>
            <Navbar />
            <div className="bg-white-100 p-4">
                {barSearch(formData, handleInputChange, finalPlace,defaultData)}
                <div>
                    {resultSearch(result)}
                </div>
            </div>
        </>
    )
}
export default Search
