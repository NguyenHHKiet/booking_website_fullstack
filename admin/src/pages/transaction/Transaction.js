import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import useHTTP from "../../hook/useHTTP";
import { DataGrid } from "@mui/x-data-grid";

const Transaction = () => {
    const [dashboard, setDashboard] = useState(null);
    const { isLoading, sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest({ url: `http://localhost:5000/api/admin` }, setDashboard);
    }, [sendRequest]);

    function transformDate(date) {
        return new Date(date).toLocaleDateString();
    }

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

    const rows = dashboard
        ? dashboard?.transition?.map((item, index) => {
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
          })
        : [];

    return (
        <Layout>
            <main>
                <div className="data">
                    <div className="content-data" style={{ overflowX: "auto" }}>
                        <div className="head">
                            <h3>Transaction</h3>
                        </div>
                        <div style={{ height: 800, width: "100%" }}>
                            {isLoading ? (
                                "Loading..."
                            ) : (
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
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

export default Transaction;
