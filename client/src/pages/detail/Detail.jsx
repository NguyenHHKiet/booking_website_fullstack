import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Subscribe from "../../components/subscribe/Subscribe"
import Footer from "../../components/footer/Footer"
import RenderDetailPage from "../../components/render/RenderDetailPage"
import useHTTP from "../../hook/useHTTP"

import NAVBAR from "../../data/navBar.json"
import FOOTER from "../../data/footer.json"

const Detail = () => {
    const { hotelID } = useParams()
    const [navBar] = useState(NAVBAR)
    const [footer] = useState(FOOTER)
    const [detail, setDetail] = useState(null)
    const { isLoading, sendRequest } = useHTTP()

    useEffect(() => {
        window.scrollTo(0, 0)
        sendRequest(
            { url: `http://localhost:5000/api/hotel/${hotelID}` },
            setDetail
        )
    }, [sendRequest, hotelID])

    if (isLoading) return "Loading..."

    return (
        <>
            <Navbar navBar={navBar} choice={false} />
            {!detail ? (
                "No found hotel!!"
            ) : (
                <RenderDetailPage detail={detail} />
            )}
            <Subscribe />
            <Footer footer={footer} />
        </>
    )
}

export default Detail
