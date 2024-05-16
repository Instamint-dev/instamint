interface Result {
    id: number
    link : string
    image: string
    place: string
    type: string
    username: string
}
interface ResultsData {
    results: Result[]
}
export default ResultsData