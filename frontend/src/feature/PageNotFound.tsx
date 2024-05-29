import Navbar from "./navbar/navbar.tsx"

const PageNotFound = () => (
    <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
            <img src={"https://instamintkami.blob.core.windows.net/instamint/404-error-404.gif"} alt={"404 Page not found"} className="max-w-full max-h-full"/>
        </div>
    </>
)

export default PageNotFound