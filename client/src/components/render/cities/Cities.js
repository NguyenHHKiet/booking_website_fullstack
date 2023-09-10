import React from "react"
import styled from "./Cities.module.scss"

const Cities = ({ cities }) => {
    return (
        <ul className={`py-1 ${styled.cities}`}>
            {cities?.map((city) => (
                <li key={city.name}>
                    <figure>
                        <img src={city.image} alt={city.name} />
                        <figcaption>
                            {city.name} <br />
                            {city.qty} properties
                        </figcaption>
                    </figure>
                </li>
            ))}
        </ul>
    )
}

export default Cities
