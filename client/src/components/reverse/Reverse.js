import React, { useContext, useEffect, useState } from "react"
import { redirect, useNavigate } from "react-router-dom"
import { DateRange } from "react-date-range"
import { AuthContext } from "../../context/AuthContext"
import useHTTP from "../../hook/useHTTP"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"

const Reverse = ({ rooms, id }) => {
    const [selectedRooms, setSelectedRooms] = useState([])
    const { user } = useContext(AuthContext)
    const { sendRequest } = useHTTP()
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false)
    const [username, setUsername] = useState(null)
    const [phone, setPhone] = useState(null)
    const [cardNumber, setCardNumber] = useState(null)
    const [payment, setPayment] = useState(null)
    const [roomNumbers, setRoomNumbers] = useState(null)

    useEffect(() => {
        sendRequest(
            {
                url: `http://localhost:5000/api/hotel/getBookedRoom/${id}`,
            },
            setRoomNumbers
        )
    }, [sendRequest, id])

    const handleSubmit = (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (username && phone && cardNumber && payment) {
            if (!user) {
                return navigate("/auth?model=signup")
            } else {
                sendRequest({
                    url: `http://localhost:5000/api/hotel/booking`,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: {
                        email: user?.email,
                        username,
                        phone,
                        cardNumber,
                        totalBill,
                        selectedRooms,
                        dates: date,
                        payment,
                        hotel: id,
                    },
                })
                return navigate("/dashboard/transaction")
            }
        }

        setValidated(true)
    }

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ])

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime())
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
        return diffDays
    }

    const days = dayDifference(date[0].endDate, date[0].startDate) + 1

    // const expiration = new Date()
    // expiration.setDate(date[0].startDate.getDate() + days - 1)
    // console.log("expiration", expiration.toISOString())

    const isAvailable = (room) => {
        return roomNumbers?.roomNumbers?.includes(room)
    }

    const handleSelect = (e, price, id) => {
        const checked = e.target.checked
        const selected = { room: Number(e.target.value), price, id }
        setSelectedRooms(
            checked
                ? (prev) => [...prev, selected]
                : (prev) => prev.filter((item) => item.room !== selected.room)
        )
    }

    const totalPrice = selectedRooms.reduce((acc, room) => {
        return acc + room.price
    }, 0)
    const totalBill = totalPrice * days

    return (
        <>
            <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="py-3">
                <div style={{ display: "flex", gap: "3rem" }}>
                    <div>
                        <h3>Dates</h3>
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                        />
                    </div>
                    <div>
                        <h3>Reserve Info</h3>

                        <Row className="mb-3">
                            <Form.Group>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    value={username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>@</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        required
                                        readOnly
                                        value={user?.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a email.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Phone Number"
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid phone number.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Identity Card Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Identity Card Number"
                                    required
                                    onChange={(e) =>
                                        setCardNumber(e.target.value)
                                    }
                                    value={cardNumber}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Identity Card Number.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    </div>
                </div>

                <div style={{ display: "inline-block" }}>
                    <div>
                        <h3>Select Rooms</h3>
                        <ul
                            style={{
                                display: "flex",
                                gap: "5rem",
                                margin: "1rem 0",
                                flexWrap: "wrap",
                            }}>
                            {rooms.map((item, index) => (
                                <li
                                    key={index}
                                    style={{
                                        display: "flex",
                                        gap: "5rem",
                                    }}>
                                    <div>
                                        <h4>{item.title}</h4>
                                        <p>
                                            {date[0].startDate.toLocaleDateString(
                                                "en-US",
                                                options
                                            )}
                                        </p>
                                        <small>
                                            Max people:{" "}
                                            <strong>{item.maxPeople}</strong>
                                        </small>
                                        <br />
                                        <big>
                                            <strong>${item.price}</strong>
                                        </big>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "0.5rem",
                                        }}>
                                        {item.roomNumbers.map((room) => (
                                            <Form.Group key={room}>
                                                <small>{room}</small>
                                                <Form.Check
                                                    required={
                                                        selectedRooms.length ===
                                                        0
                                                    }
                                                    id={room}
                                                    value={room}
                                                    onChange={(e) =>
                                                        handleSelect(
                                                            e,
                                                            item.price,
                                                            item._id
                                                        )
                                                    }
                                                    disabled={isAvailable(room)}
                                                    feedbackType="invalid"
                                                />
                                            </Form.Group>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Total Bill: ${totalBill}</h3>
                        <div
                            style={{
                                display: "flex",
                                gap: "2rem",
                                flexWrap: "wrap",
                            }}>
                            <select
                                name="payment"
                                id="payment"
                                onChange={(e) => setPayment(e.target.value)}
                                style={{
                                    width: "20rem",
                                    height: "3rem",
                                    borderRadius: "0.25rem",
                                    backgroundColor: "whitesmoke",
                                }}>
                                <option disabled selected>
                                    Select Payment Method
                                </option>
                                <option value="Cash">Cash</option>
                                <option value="Credit Card">Credit Card</option>
                            </select>
                            <Button
                                type="submit"
                                className="reserve"
                                style={{
                                    cursor: "pointer",
                                    height: "3rem",
                                    width: "20rem",
                                }}>
                                Reserve Now!
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default Reverse
