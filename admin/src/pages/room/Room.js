import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import useHTTP from "../../hook/useHTTP";

const Room = () => {
    const [dashboard, setDashboard] = useState(null);
    const { isLoading, sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest(
            { url: `http://localhost:5000/api/admin/rooms` },
            setDashboard
        );
    }, [sendRequest]);

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "title", headerName: "Title", width: 240 },
        { field: "desc", headerName: "Description", width: 300 },
        { field: "price", headerName: "Price", width: 90 },
        { field: "maxPeople", headerName: "Max People", width: 120 },
        {
            field: "action",
            headerName: "Action",
            width: 100,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.preventDefault();
                    let text =
                        "Press a button delete hotel!\nEither OK or Cancel.";
                    if (window.confirm(text) === true) {
                        sendRequest(
                            {
                                url: `http://localhost:5000/api/admin/rooms/delete`,
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: { roomID: params.id },
                            },
                            (data) => {
                                window.location.reload();
                            }
                        );
                    } else {
                        console.log("You canceled!");
                    }
                };

                return (
                    <button onClick={onClick} title="Delete">
                        Delete
                    </button>
                );
            },
        },
        {
            field: "editor",
            headerName: "Editor",
            width: 80,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <Link
                        to={`/admin/dashboard/newRoom/${params.id}`}
                        title="Editor">
                        Edit
                    </Link>
                );
            },
        },
    ];

    const rows = dashboard
        ? dashboard?.rooms?.map((item, index) => ({
              id: item._id,
              title: item.title,
              desc: item.desc,
              price: item.price,
              maxPeople: item.maxPeople,
          }))
        : [];

    return (
        <Layout>
            <main>
                <div className="data">
                    <div className="content-data" style={{ overflowX: "auto" }}>
                        <div className="head">
                            <h3>Rooms</h3>
                            <Link
                                to="/admin/dashboard/newRoom"
                                style={{
                                    border: "1px solid green",
                                    padding: "0.25rem 0.5rem",
                                    borderRadius: "0.25rem",
                                    color: "green",
                                    backgroundColor: "white",
                                }}>
                                Add New
                            </Link>
                        </div>
                        <div style={{ height: 400, width: "100%" }}>
                            {isLoading ? (
                                "Loading..."
                            ) : (
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                page: 0,
                                                pageSize: 8,
                                            },
                                        },
                                    }}
                                    checkboxSelection
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default Room;
