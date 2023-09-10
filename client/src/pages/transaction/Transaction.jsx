import React, { useContext, useEffect, useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import Subscribe from "../../components/subscribe/Subscribe"
import Footer from "../../components/footer/Footer"
import Spinner from "react-bootstrap/Spinner"

import NAVBAR from "../../data/navBar.json"
import FOOTER from "../../data/footer.json"
import useHTTP from "../../hook/useHTTP"
import RenderTransactionPage from "../../components/render/RenderTransactionPage"
import { AuthContext } from "../../context/AuthContext"

const Transaction = () => {
    const [navBar] = useState(NAVBAR)
    const [footer] = useState(FOOTER)
    const { isLoading, sendRequest } = useHTTP()
    const [transition, setTransition] = useState(null)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
        sendRequest(
            {
                url: `http://localhost:5000/api/user/transition`,
                headers: { Authentication: user._id },
            },
            setTransition
        )
    }, [sendRequest, user])

    if (isLoading) return <Spinner animation="border" />

    return (
        <>
            <Navbar navBar={navBar} choice={false} />
            <RenderTransactionPage transition={transition} />
            <Subscribe />
            <Footer footer={footer} />
        </>
    )
}

export default Transaction
