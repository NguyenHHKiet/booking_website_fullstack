import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import useHTTP from "../../hook/useHTTP";
import { useParams } from "react-router-dom";

const NewRoom = () => {
    const [validated, setValidated] = useState(false);
    const [data, setData] = useState(null);
    const [isHotel, setIsHotel] = useState(null);
    const { roomId } = useParams();

    const { sendRequest } = useHTTP();

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            const data = new FormData(event.currentTarget);
            sendRequest({
                url: "http://localhost:5000/api/admin/hotels/newRoom",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: {
                    id: roomId,
                    title: data.get("title"),
                    desc: data.get("description"),
                    price: +data.get("price"),
                    maxPeople: +data.get("maxPeople"),
                    roomNumbers: data
                        .get("rooms")
                        .split(/\s+/)
                        .map((item) => parseInt(item, 10)),
                    hotelID: isHotel,
                },
            });
            window.location.reload();
        }

        setValidated(true);
    };

    useEffect(() => {
        sendRequest(
            {
                url: `http://localhost:5000/api/admin/hotels/newRoom/${
                    roomId ?? "newRoom"
                }`,
            },
            setData
        );
    }, [sendRequest, roomId]);

    function joinRoom(array) {
        return array?.join(" ");
    }

    return (
        <Layout>
            <main>
                <h3
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                    }}>
                    Add New Room
                </h3>
                <div className="data">
                    <div className="content-data" style={{ width: "100%" }}>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        required
                                        name="title"
                                        defaultValue={data?.room?.title}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Description"
                                        required
                                        name="description"
                                        defaultValue={data?.room?.desc}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Price"
                                        required
                                        name="price"
                                        defaultValue={data?.room?.price}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Max People</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Max People"
                                        required
                                        name="maxPeople"
                                        defaultValue={data?.room?.maxPeople}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Rooms</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        required
                                        name="rooms"
                                        defaultValue={joinRoom(
                                            data?.room?.roomNumbers
                                        )}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Choose a hotel</Form.Label>
                                    {data && (
                                        <Form.Select
                                            id="hotel"
                                            onChange={(e) =>
                                                setIsHotel(e.target.value)
                                            }>
                                            <option value="" disabled selected>
                                                Select your hotel
                                            </option>
                                            {data.hotels?.map((hotel) => (
                                                <option
                                                    key={hotel._id}
                                                    id={hotel._id}
                                                    value={hotel._id}
                                                    feedbacktype="invalid">
                                                    {hotel.title}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    )}
                                </Form.Group>
                            </Row>

                            <Button type="submit">Send</Button>
                        </Form>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default NewRoom;
