import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableData from "../../components/dashboard/tableData/TableData";
import useHTTP from "../../hook/useHTTP";
import Layout from "../../components/layout/Layout";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const { isLoading, sendRequest } = useHTTP();

    useEffect(() => {
        sendRequest({ url: `http://localhost:5000/api/admin` }, setDashboard);
    }, [sendRequest]);

    return (
        <Layout>
            <main>
                <h1 className="title">Dashboard</h1>
                <ul className="breadcrumbs">
                    <li>
                        <Link to="#">Home</Link>
                    </li>
                    <li className="divider">/</li>
                    <li>
                        <Link to="#" className="active">
                            Dashboard
                        </Link>
                    </li>
                </ul>
                <div className="info-data">
                    <div className="card">
                        <div className="head">
                            <div>
                                <p>User</p>
                                <h2>{dashboard?.qtyUser}</h2>
                            </div>
                            <i className="bx bx-trending-up icon"></i>
                        </div>
                    </div>
                    <div className="card">
                        <div className="head">
                            <div>
                                <p>Orders</p>
                                <h2>{dashboard?.qtyOrders}</h2>
                            </div>
                            <i className="bx bx-trending-down icon down"></i>
                        </div>
                    </div>
                    <div className="card">
                        <div className="head">
                            <div>
                                <p>Earings</p>
                                <h2>$ {dashboard?.earings}</h2>
                            </div>
                            <i className="bx bx-trending-up icon"></i>
                        </div>
                    </div>
                    <div className="card">
                        <div className="head">
                            <div>
                                <p>Balance</p>
                                <h2>$ {dashboard?.earings}</h2>
                            </div>
                            <i className="bx bx-trending-up icon"></i>
                        </div>
                    </div>
                </div>

                <TableData
                    isLoading={isLoading}
                    transition={dashboard?.transition}
                />
            </main>
        </Layout>
    );
};

export default Dashboard;
