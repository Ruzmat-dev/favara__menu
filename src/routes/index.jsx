import { BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "../pages/home"
import Wishlist from "../pages/wishlist"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/wishlist" element={<Wishlist/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter