import React, { useEffect } from "react";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import Nav from "../../components/dashboard/nav/Nav";

const Layout = ({ children }) => {
    useEffect(() => {
        // SIDEBAR DROPDOWN
        const allDropdown = document.querySelectorAll(
            "#sidebar .side-dropdown"
        );
        const sidebar = document.getElementById("sidebar");

        // SIDEBAR COLLAPSE
        const toggleSidebar = document.querySelector("nav .toggle-sidebar");
        const allSideDivider = document.querySelectorAll("#sidebar .divider");

        const handleToggleSidebar = function () {
            sidebar.classList.toggle("hide");

            if (sidebar.classList.contains("hide")) {
                allSideDivider.forEach((item) => {
                    item.textContent = "-";
                });

                allDropdown.forEach((item) => {
                    const a = item.parentElement.querySelector("a:first-child");
                    a.classList.remove("active");
                    item.classList.remove("show");
                });
            } else {
                allSideDivider.forEach((item) => {
                    item.textContent = item.dataset.text;
                });
            }
        };
        toggleSidebar.addEventListener("click", handleToggleSidebar);

        const handleMouseLeave = function () {
            if (this.classList.contains("hide")) {
                allDropdown.forEach((item) => {
                    const a = item.parentElement.querySelector("a:first-child");
                    a.classList.remove("active");
                    item.classList.remove("show");
                });
                allSideDivider.forEach((item) => {
                    item.textContent = "-";
                });
            }
        };
        sidebar.addEventListener("mouseleave", handleMouseLeave);

        const handleMouseEnter = function () {
            if (this.classList.contains("hide")) {
                allDropdown.forEach((item) => {
                    const a = item.parentElement.querySelector("a:first-child");
                    a.classList.remove("active");
                    item.classList.remove("show");
                });
                allSideDivider.forEach((item) => {
                    item.textContent = item.dataset.text;
                });
            }
        };
        sidebar.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            // cleanup
            toggleSidebar.removeEventListener("click", handleToggleSidebar);
            sidebar.removeEventListener("mouseleave", handleMouseLeave);
            sidebar.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    return (
        <div>
            {/* <!-- SIDEBAR --> */}
            <Sidebar />
            {/* <!-- SIDEBAR --> */}

            {/* <!-- NAVBAR --> */}
            <section id="content">
                {/* <!-- NAVBAR --> */}
                <Nav />
                {/* <!-- NAVBAR --> */}

                {/* <!-- MAIN --> */}
                {children}
                {/* <!-- MAIN --> */}
            </section>
            {/* <!-- NAVBAR --> */}
        </div>
    );
};

export default Layout;
