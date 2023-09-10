import React, { useContext, useState } from "react"
import { DateRange } from "react-date-range"
import { format } from "date-fns"

import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import styled from "./SearchTools.module.scss"
import { SearchContext } from "../../context/SearchContext"
import useHTTP from "../../hook/useHTTP"

const SearchTools = () => {
    const { dispatch } = useContext(SearchContext)
    const [destination, setDestination] = useState("")

    const { sendRequest } = useHTTP()
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ])

    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]:
                    operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }

    const searchHandler = (event) => {
        event.preventDefault()
        const { startDate, endDate } = date[0]
        const dates = {
            startDate: new Date(startDate).toLocaleDateString("en-US"),
            endDate: new Date(endDate).toLocaleDateString("en-US"),
        }

        dispatch({
            type: "SEARCH",
            payload: { destination: destination.trim(), dates, options },
        })
        sendRequest({
            url: `http://localhost:5000/api/hotel/hotels`,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: { destination: destination.trim(), dates, options },
        })
    }

    return (
        <div className={styled.search} style={{ margin: "0.5rem 0" }}>
            <form className={`flex flex__between`} onSubmit={searchHandler}>
                <div>
                    <div className="flex" style={{ alignItems: "center" }}>
                        <i className="fa fa-bed"></i>
                        <input
                            placeholder="Where are you going?"
                            type="search"
                            name="searching"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                    <div
                        className={`flex col-sm-2 ${styled.adult} ${styled.headerSearchItem}`}
                        style={{ alignItems: "center" }}>
                        <i className="fa fa-calendar"></i>
                        <span
                            onClick={() => setOpenDate(!openDate)}
                            className={styled.headerSearchText}>{`${format(
                            date[0].startDate,
                            "MM/dd/yyyy"
                        )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openDate && (
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => setDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                className={styled.date}
                            />
                        )}
                    </div>
                    <div className={`flex flex__between ${styled.adult}`}>
                        <div className="headerSearchItem">
                            <i className="fa fa-user-plus"></i>
                            <span
                                onClick={() => setOpenOptions(!openOptions)}
                                className="headerSearchText">{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                            {openOptions && (
                                <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">
                                            Adult
                                        </span>
                                        <div className="optionCounter">
                                            <button
                                                type="button"
                                                disabled={options.adult <= 1}
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption("adult", "d")
                                                }>
                                                -
                                            </button>
                                            <span className="optionCounterNumber">
                                                {options.adult}
                                            </span>
                                            <button
                                                type="button"
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption("adult", "i")
                                                }>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">
                                            Children
                                        </span>
                                        <div className="optionCounter">
                                            <button
                                                type="button"
                                                disabled={options.children <= 0}
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption(
                                                        "children",
                                                        "d"
                                                    )
                                                }>
                                                -
                                            </button>
                                            <span className="optionCounterNumber">
                                                {options.children}
                                            </span>
                                            <button
                                                type="button"
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption(
                                                        "children",
                                                        "i"
                                                    )
                                                }>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button
                                                type="button"
                                                disabled={options.room <= 1}
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption("room", "d")
                                                }>
                                                -
                                            </button>
                                            <span className="optionCounterNumber">
                                                {options.room}
                                            </span>
                                            <button
                                                type="button"
                                                className="optionCounterButton"
                                                onClick={() =>
                                                    handleOption("room", "i")
                                                }>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button className={styled.submitted} type="submit">
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchTools
