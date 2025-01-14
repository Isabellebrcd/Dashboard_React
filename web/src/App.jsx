import "./App.css";

import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Login from "./Login.jsx";
import Admin from "./Admin/Admin.jsx";
import Client from "./Client/Client.jsx";
import Maisons from "./Admin/AdminMaisons.jsx"
import Humidity from "./Client/ClientHumidity.jsx"
import Temperature from "./Client/ClientTemperature.jsx"
import Pollution from "./Client/ClientPollution.jsx"

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Login />}
                    />
                    <Route
                        exact
                        path="/admin"
                        element={<Admin />}
                    />
                    <Route
                        exact
                        path="/admin/statistiques"
                        element={<Maisons />}
                    />
                    <Route
                        exact
                        path="/client"
                        element={<Client />}
                    />
                    <Route
                        exact
                        path="/client/humidity"
                        element={<Humidity />}
                    />
                    <Route
                        exact
                        path="/client/temperature"
                        element={<Temperature />}
                    />
                    <Route
                        exact
                        path="/client/pollution"
                        element={<Pollution />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;