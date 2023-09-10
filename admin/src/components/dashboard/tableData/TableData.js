import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "user", headerName: "User", width: 130 },
    { field: "hotel", headerName: "Hotel", width: 230 },
    { field: "room", headerName: "Room", width: 90 },
    {
        field: "date",
        headerName: "Date",
        width: 160,
        valueGetter: (params) =>
            `${params.row.dateStart || ""} - ${params.row.dateEnd || ""}`,
    },
    { field: "price", headerName: "Price", width: 90 },
    { field: "payment", headerName: "Payment Method", width: 130 },
    { field: "status", headerName: "Status", width: 90 },
];

const TableData = ({ transition, isLoading }) => {
    let content;
    function transformDate(date) {
        return new Date(date).toLocaleDateString();
    }

    if (isLoading) content = "Loading...";

    if (transition) {
        const rows = transition?.map((item, index) => {
            return {
                id: item._id,
                user: item.user.fullName || "",
                hotel: item.hotel.name,
                room: item.room.map((i, index) => i.room).join(", "),
                price: item.price,
                payment: item.payment,
                status: item.status,
                dateStart: transformDate(item.dateStart),
                dateEnd: transformDate(item.dateEnd),
            };
        });

        content = (
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
        );
    }

    return (
        <div className="data">
            <div className="content-data" style={{ overflowX: "auto" }}>
                <div className="head">
                    <h3>Latest Transitions</h3>
                    <div className="menu">
                        <i className="bx bx-dots-horizontal-rounded icon"></i>
                    </div>
                </div>
                <div style={{ height: 400, width: "100%" }}>{content}</div>
            </div>
        </div>
    );
};

export default TableData;
