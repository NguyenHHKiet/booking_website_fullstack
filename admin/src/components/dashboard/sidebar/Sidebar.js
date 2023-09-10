import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const Sidebar = () => {
    const { dispatch } = React.useContext(AuthContext);

    return (
        <section id="sidebar">
            <Link to="/admin/dashboard" className="brand">
                <i className="bx bxs-smile icon"></i> AdminSite
            </Link>
            <ul className="side-menu">
                <li className="divider" data-text="main">
                    Main
                </li>
                <li>
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }>
                        <i className="bx bxs-dashboard icon"></i> Dashboard
                    </NavLink>
                </li>
                <li className="divider" data-text="main">
                    Lists
                </li>
                <li>
                    <NavLink
                        to="/admin/dashboard/users"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }>
                        <i className="bx bxs-inbox icon"></i> Users
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/dashboard/hotels"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }>
                        <i className="bx bxs-chart icon"></i> Hotels
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/dashboard/rooms"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }>
                        <i className="bx bxs-widget icon"></i> Rooms
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/dashboard/transactions"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }>
                        <i className="bx bxs-widget icon"></i> Transactions
                    </NavLink>
                </li>
                <li className="divider" data-text="table and forms">
                    New
                </li>
                <li>
                    <NavLink
                        to="/admin/dashboard/newHotel"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }>
                        <i className="bx bx-table icon"></i> New Hotel
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/dashboard/newRoom"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }>
                        <i className="bx bxs-notepad icon"></i> New Room
                    </NavLink>
                </li>
                <li className="divider" data-text="table and forms">
                    User
                </li>
                <li>
                    <Link to="/" onClick={() => dispatch({ type: "LOGOUT" })}>
                        <i className="bx bxs-notepad icon"></i> Logout
                    </Link>
                </li>
            </ul>
            <div className="ads">
                <div className="wrapper">
                    <Link to="#" className="btn-upgrade">
                        Upgrade
                    </Link>
                    <p>
                        Become Link <span>PRO</span> member and enjoy{" "}
                        <span>All Features</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Sidebar;
