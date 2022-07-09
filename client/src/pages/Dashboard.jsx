import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Hello {user ? user.name : "Sir/Ma'am"}</h2>
        </>
    );
};

export default Dashboard;
