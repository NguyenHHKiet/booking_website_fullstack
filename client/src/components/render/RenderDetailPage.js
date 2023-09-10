import React, { useState } from "react"
import styled from "./RenderDetailPage.module.scss"
import Reverse from "../reverse/Reverse"

const RenderDetailPage = ({ detail }) => {
    const [enteredBook, setEnteredBook] = useState(false)

    return (
        <div className={`container ${styled.detail}`}>
            <div style={{ paddingTop: "2rem" }}>
                <div className={`${styled.detail__header}`}>
                    <div>
                        <h2>{detail.title}</h2>
                        <span style={{ fontSize: "0.85rem" }}>
                            <i
                                style={{
                                    fontSize: "1rem",
                                    marginRight: "0.25rem",
                                }}
                                className="fa fa-map-marker"></i>{" "}
                            {detail.address}
                        </span>
                        <p className="lightblue">
                            Excellent location - {detail.distance}m from center
                        </p>
                        <p className="green">
                            Book a stay over ${detail.cheapestPrice} at this
                            property and get a free airport taxi
                        </p>
                    </div>
                    <button className="reserve" type="button">
                        Reserve or Book Now!
                    </button>
                </div>
                <div className={`${styled.detail__images} py-1`}>
                    {detail.photos.map((item, index) => (
                        <img key={index} src={item} alt={item} loading="lazy" />
                    ))}
                </div>
                <div className={`${styled.detail__footer} py-3`}>
                    <div>
                        <h2 style={{ marginBottom: "1rem" }}>{detail.title}</h2>
                        <p
                            style={{
                                fontSize: "0.85rem",
                                fontWeight: "500",
                                opacity: "80%",
                            }}>
                            {detail.desc}
                        </p>
                    </div>
                    <div
                        className={styled.credit}
                        style={{ backgroundColor: "#EBF3FF" }}>
                        <h3 style={{ opacity: "60%" }}>
                            Perfect for a 9-night stay!
                        </h3>
                        <p style={{ opacity: "80%" }}>
                            Located in the real heart of Krakow, this property
                            has an excellent location score of 9.8!
                        </p>
                        <h2>
                            ${detail.cheapestPrice}{" "}
                            <span style={{ opacity: "60%" }}>(1 nights)</span>
                        </h2>
                        <button
                            className="reserve"
                            style={{ cursor: "pointer" }}
                            type="button"
                            onClick={() => setEnteredBook(true)}>
                            Reserve or Book Now!
                        </button>
                    </div>
                </div>
            </div>
            {enteredBook && <Reverse rooms={detail.rooms} id={detail._id} />}
        </div>
    )
}

export default RenderDetailPage
