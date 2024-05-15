interface Result {
    id: number
    link : string | null
    image: string
    place: string
    type: string
    username: string | null
}
interface ResultsData {
    results: Result[]
}
export default ResultsData