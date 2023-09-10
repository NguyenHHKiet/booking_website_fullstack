import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const Nav = () => {
    const { user } = React.useContext(AuthContext);

    return (
        <nav>
            <i className="bx bx-menu toggle-sidebar"></i>
            <form action="#">
                <div className="form-group">
                    <input type="text" placeholder="Search..." />
                    <i className="bx bx-search icon"></i>
                </div>
            </form>
            <Link to="#" className="nav-link">
                <i className="bx bxs-bell icon"></i>
                <span className="badge">5</span>
            </Link>
            <Link to="#" className="nav-link">
                <i className="bx bxs-message-square-dots icon"></i>
                <span className="badge">8</span>
            </Link>
            <span className="divider"></span>
            <div className="profile" title="Check-in">
                {user.fullName}
            </div>
        </nav>
    );
};

export default Nav;
