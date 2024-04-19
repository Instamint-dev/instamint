import Navbar from "./navbar/navbar"

const PageNotFound = () => {
    return (
        <> <Navbar />
            <div className="flex items-center flex-col">
                <h1>404 not found</h1>
                <p>The requested page could not be found.</p>
            </div>
        </>
    )
}

export default PageNotFound