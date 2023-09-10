import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Detail from "./pages/detail/Detail"
import Search from "./pages/search/Search"
import Auth from "./pages/auth/Auth"
import Transaction from "./pages/transaction/Transaction"
import "./App.scss"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/detail/:hotelID" element={<Detail />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                    path="/dashboard/transaction"
                    element={<Transaction />}
                />
                {/* <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/dashboard/hotels" element={<Hotels />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App
