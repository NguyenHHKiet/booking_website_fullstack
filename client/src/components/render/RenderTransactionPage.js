import React from "react"
import Table from "react-bootstrap/Table"
import "./RenderTransactionPage.scss"

const RenderTransactionPage = ({ transition: { transition } }) => {
    function transformDate(date) {
        return new Date(date).toLocaleDateString()
    }
    let pad = "00"
    const id = (number) => pad.substring(0, pad.length - number.length) + number
    let content

    if (!transition) content = "Error loading"

    if (transition) {
        content = transition.map((item, index) => (
            <tr key={index}>
                <td>{id(`${index + 1}`)}</td>
                <td>{item.hotel.name}</td>
                <td>{item.room.map((i, index) => i.room).join(", ")}</td>
                <td>
                    {transformDate(item.dateStart)} -{" "}
                    {transformDate(item.dateEnd)}
                </td>
                <td>${item.price}</td>
                <td>{item.payment}</td>
                <td>
                    <span className={`is${item.status}`}>{item.status}</span>
                </td>
            </tr>
        ))
    }

    return (
        <div className="container py-5">
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Hotel</th>
                        <th>Room</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{content}</tbody>
            </Table>
        </div>
    )
}

export default RenderTransactionPage
