import React, { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "./Navbar.module.scss"
import NavBarItem from "./NavBarItem"
import Header from "../header/Header"
import { AuthContext } from "../../context/AuthContext"

const Navbar = ({ navBar, choice = "true" }) => {
    const { user, dispatch } = useContext(AuthContext)

    return (
        <div className={styled.nav}>
            <div className={`container`}>
                <div className={`flex flex__between`}>
                    <h3>
                        <Link
                            to={"/"}
                            style={{ color: "white", textDecoration: "none" }}>
                            Booking Website
                        </Link>
                    </h3>
                    <div className={`flex ${styled.nav__gap}`}>
                        {!user ? (
                            <>
                                <Link
                                    to={"/auth?model=signup"}
                                    className={styled.nav__btn}>
                                    Register
                                </Link>
                                <Link
                                    to={"/auth?model=login"}
                                    className={styled.nav__btn}>
                                    Login
                                </Link>
                            </>
                        ) : (
                            <>
                                {user.email}
                                {user.isAdmin && (
                                    <Link
                                        to="/admin/dashboard"
                                        className={styled.nav__btn}>
                                        Admin Dashboard
                                    </Link>
                                )}
                                <Link
                                    to="/dashboard/transaction"
                                    className={styled.nav__btn}>
                                    Transitions
                                </Link>
                                <Link
                                    className={styled.nav__btn}
                                    onClick={() =>
                                        dispatch({ type: "LOGOUT" })
                                    }>
                                    Logout
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <NavBarItem items={navBar} />
                {choice ? <Header /> : ""}
            </div>
        </div>
    )
}

export default Navbar
