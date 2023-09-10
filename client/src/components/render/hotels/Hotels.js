import React from "react"
import styled from "./Hotels.module.scss"
import { Link } from "react-router-dom"

const Hotels = ({ hotelList }) => {
    return (
        <div className={`py-1`}>
            <h1 className={`py-1`}>Homes guests love</h1>
            <div className={`py-1`}>
                <ul className={styled["img-container"]}>
                    {hotelList?.map((item) => (
                        <li key={item.name} className={styled.cards}>
                            <Link to={`/detail/${item.id}`}>
                                <img src={item.image_url} alt={item.name} />
                                <div className={styled["card-typo"]}>
                                    <h3>{item.name}</h3>
                                    <p>{item.city}</p>
                                    <h4>Stating from ${item.price}</h4>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Hotels
