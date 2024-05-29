import { useState, useEffect, ChangeEvent } from "react"
import Navbar from "../navbar/navbar"
import SEARCH_TYPE from "../../type/feature/search/search"
import defaultDataType from "../../type/feature/search/defaultData"
import { getDefaultData, search } from "./service/SearchService"
import ResultSearch from "./ResultSearch"
import Result from "../../type/feature/search/result"
import BarSearch from "./BarSearch"

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
        const fetchMaxPrice = async () => {
            try {
                const response: defaultDataType = await getDefaultData(formData.user, formData.nft)
                setDefaultData(response)
                const places = response.PLACE_NFT.concat(response.PLACE_USER).filter((place, index, self) => self.indexOf(place) === index)
                setPlace(places)
            } catch (error: unknown) {
                throw new Error(`Error when fetching max price`)
            }
        }
        void fetchMaxPrice()
    }, [formData.user, formData.nft])

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData }
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
            } else {
                newFormData.price = checked
            }

            void handleSend(newFormData)

            return newFormData
        })
    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData }
            switch (type) {
                case "checkbox":
                    handleCheckboxChange(name, (e.target as HTMLInputElement).checked)
                    break

                case "text":

                case "range":
                    handleTextOrRangeChange(name, value, newFormData)
                    break

                case "select-one":
                    newFormData.place = value
                    break
            }

            void handleSend(newFormData)

            return newFormData
        })
    }
    const handleTextOrRangeChange = (name: string, value: string, formDataChange: SEARCH_TYPE) => {
        switch (name) {
            case "search":
                formDataChange.search = value
                break

            case "minPrice":
                formDataChange.minPrice = parseInt(value, 10) > formDataChange.maxPrice ? formDataChange.maxPrice : parseInt(value, 10)
                break

            case "maxPrice":
                formDataChange.maxPrice = parseInt(value, 10) < formDataChange.minPrice ? formDataChange.minPrice : parseInt(value, 10)
                break
        }
    }
    const handleSend = async (data: SEARCH_TYPE) => {
        const formSearch = await search(data)
        setResult(formSearch)
    }

    return (
        <>
            <Navbar />
            <div className="bg-white-100 p-4">
                <BarSearch formData={formData} handleInputChange={handleInputChange} finalPlace={finalPlace} defaultData={defaultData} />
                <div>
                    <ResultSearch data={result} />
                </div>
            </div>
        </>
    )
}

export default Search
