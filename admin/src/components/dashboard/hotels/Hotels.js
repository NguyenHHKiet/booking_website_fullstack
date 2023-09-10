import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useHTTP from "../../../hook/useHTTP";
import { Link } from "react-router-dom";

const Hotels = () => {
    const [dashboard, setDashboard] = useState(null);
    const { isLoading, sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest(
            { url: `http://localhost:5000/api/admin/hotels` },
            setDashboard
        );
    }, [sendRequest]);

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "name", headerName: "Name", width: 240 },
        { field: "type", headerName: "Type", width: 90 },
        { field: "title", headerName: "Title", width: 240 },
        { field: "city", headerName: "City", width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 80,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.preventDefault();
                    let text =
                        "Press a button delete hotel!\nEither OK or Cancel.";
                    if (window.confirm(text) === true) {
                        sendRequest(
                            {
                                url: `http://localhost:5000/api/admin/hotels/delete`,
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: { hotelID: params.id },
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
                        to={`/admin/dashboard/newHotel/${params.id}`}
                        title="Editor">
                        Edit
                    </Link>
                );
            },
        },
    ];

    const rows = dashboard
        ? dashboard?.hotels?.map((item, index) => ({
              id: item._id,
              name: item.name,
              type: item.type,
              title: item.title,
              city: item.city,
          }))
        : [];

    return (
        <main>
            <div className="data">
                <div className="content-data" style={{ overflowX: "auto" }}>
                    <div className="head">
                        <h3>Hotels</h3>
                        <Link
                            to="/admin/dashboard/newHotel"
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
    );
};

export default Hotels;
