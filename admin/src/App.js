import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Auth from "./components/auth/Auth";
import { RequireAuth } from "./components/auth/RequireAuth";
import React from "react";
import Hotel from "./pages/hotel/Hotel";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import Room from "./pages/room/Room";
import Transaction from "./pages/transaction/Transaction";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index={true} path="/" element={<Auth />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <RequireAuth>
                            <Dashboard />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/admin/dashboard/hotels"
                    element={
                        <RequireAuth>
                            <Hotel />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/admin/dashboard/rooms"
                    element={
                        <RequireAuth>
                            <Room />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/admin/dashboard/newHotel"
                    element={
                        <RequireAuth>
                            <NewHotel />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/admin/dashboard/newHotel/:hotelId"
                    element={
                        <RequireAuth>
                            <NewHotel />
                        </RequireAuth>
                    }
                />

                <Route
                    path="/admin/dashboard/newRoom"
                    element={
                        <RequireAuth>
                            <NewRoom />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/admin/dashboard/newRoom/:roomId"
                    element={
                        <RequireAuth>
                            <NewRoom />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/admin/dashboard/transactions"
                    element={
                        <RequireAuth>
                            <Transaction />
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
