import { useEffect, useMemo, useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import RenderHomePage from "../../components/render/RenderHomePage"
import Subscribe from "../../components/subscribe/Subscribe"
import Footer from "../../components/footer/Footer"
import useHTTP from "../../hook/useHTTP"

import HOTEL_LIST from "../../data/hotel_list.json"
import TYPES from "../../data/type.json"
import NAVBAR from "../../data/navBar.json"
import FOOTER from "../../data/footer.json"

const Home = () => {
    const { isError, isLoading, sendRequest } = useHTTP()
    const [data, setData] = useState(null)
    const [isHome, setIsHome] = useState(null)

    const [navBar, setNavBar] = useState(NAVBAR)
    const [footer, setFooter] = useState(FOOTER)

    useEffect(() => {
        window.scrollTo(0, 0)
        sendRequest({ url: `http://localhost:5000/api/hotel/hotels` }, setData)
    }, [sendRequest])

    return (
        <>
            <Navbar navBar={navBar} />
            {isLoading ? (
                "Loading..."
            ) : (
                <>
                    <RenderHomePage
                        cities={data?.cities}
                        hotelList={data?.hotelList}
                        types={data?.types}
                    />
                    <Subscribe />
                </>
            )}
            <Footer footer={footer} />
        </>
    )
}

export default Home
