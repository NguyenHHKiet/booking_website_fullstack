import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import useHTTP from "../../hook/useHTTP";
import { useParams } from "react-router-dom";

const NewHotel = () => {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [validated, setValidated] = useState(false);
    const { sendRequest } = useHTTP();
    const [featured, setFeatured] = useState(false);
    const [data, setData] = useState(null);
    const { hotelId } = useParams();

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const selected = e.target.value;
        setSelectedRooms(
            checked
                ? (prev) => [...prev, selected]
                : (prev) => prev.filter((item) => item !== selected)
        );
    };

    useEffect(() => {
        sendRequest(
            {
                url: `http://localhost:5000/api/admin/hotels/newHotel/${
                    hotelId ?? "newHotel"
                }`,
            },
            (results) => {
                setData(results);
                setSelectedRooms(results.hotel.rooms);
            }
        );
    }, [sendRequest, hotelId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            const data = new FormData(event.currentTarget);
            sendRequest({
                url: "http://localhost:5000/api/admin/hotels/newHotel",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: {
                    id: hotelId,
                    name: data.get("name"),
                    type: data.get("type"),
                    city: data.get("city"),
                    address: data.get("address"),
                    distance: data.get("distance"),
                    title: data.get("title"),
                    desc: data.get("description"),
                    cheapestPrice: +data.get("price"),
                    image: data.get("image"),
                    featured,
                    rooms: selectedRooms,
                },
            });
            window.location.reload();
        }

        setValidated(true);
    };

    return (
        <Layout>
            <main>
                <h3
                    style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                    }}>
                    Add New Hotel
                </h3>
                <div className="data">
                    <div className="content-data" style={{ width: "100%" }}>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Name"
                                        name="name"
                                        defaultValue={data?.hotel?.name}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="type"
                                        name="type"
                                        defaultValue={data?.hotel?.type}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="City"
                                        required
                                        name="city"
                                        defaultValue={data?.hotel?.city}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Address"
                                        required
                                        name="address"
                                        defaultValue={data?.hotel?.address}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>
                                        Distance from CIty Center
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Distance from CIty Center"
                                        required
                                        name="distance"
                                        defaultValue={data?.hotel?.distance}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        required
                                        name="title"
                                        defaultValue={data?.hotel?.title}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Description"
                                        required
                                        name="description"
                                        defaultValue={data?.hotel?.desc}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Price"
                                        required
                                        name="price"
                                        defaultValue={
                                            data?.hotel?.cheapestPrice
                                        }
                                    />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" name="image" />
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Featured</Form.Label>
                                    <Form.Select
                                        id="featured"
                                        selected={data?.hotel?.featured}
                                        onChange={(e) =>
                                            setFeatured(e.target.value)
                                        }>
                                        <option value="false">No</option>
                                        <option value="true">True</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Rooms</Form.Label>
                                {data && (
                                    <Form.Group>
                                        {data.rooms?.map((room, index) => (
                                            <Form.Check
                                                key={room._id}
                                                required={
                                                    selectedRooms.length === 0
                                                }
                                                defaultChecked={selectedRooms.includes(
                                                    room._id
                                                )}
                                                id={room._id}
                                                value={room._id}
                                                onChange={(e) =>
                                                    handleSelect(e)
                                                }
                                                feedbackType="invalid"
                                                label={room.title}
                                            />
                                        ))}
                                    </Form.Group>
                                )}
                            </Form.Group>
                            <Button type="submit">Send</Button>
                        </Form>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default NewHotel;
