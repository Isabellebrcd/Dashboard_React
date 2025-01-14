import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Admin/styles.css";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faUser} from '@fortawesome/free-solid-svg-icons';
import logo_entreprise from "../assets/Logo.png";
import icon from "../assets/Icon.png"
import iconBlanc from "../assets/Icon_blanc.png"

import PeopleByCountry from "./Composants/personnesParPays.jsx";
import HousesBySize from "./Composants/tailleMaisons.jsx";
import MoyenneCapteursPers from "./Composants/moyenneCapteursPers.jsx";

const Maisons = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [dataUsers, setDataUsers] = useState([]);

    useEffect(() => {

        const fetchDataForUsers = async () => {

            const sensorsDataObject = {};

            for (const user of users) {
                sensorsDataObject[user.userID] = await fetchUserSensors(user.userID);
            }

            setDataUsers(sensorsDataObject);
            console.log("Coucou fetch : ", sensorsDataObject);
        };

        fetchDataForUsers();
    }, [users]);


    useEffect(() => {
        handleAllUsers();
    }, []);

    const fetchUserSensors = async (userID) => {
        try {
            const response = await fetch(`http://localhost:3001/client/${userID}/sensors`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error("Échec de la requête :", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        }
    };


    const handleAllUsers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/admin-getprofils`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data.tabs);


            } else {
                console.error("Échec de la requête des utilisateurs :", response.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        }

    };

    return (
        <>
            <div>
                <PeopleByCountry users={users}/>
                <HousesBySize users={users}/>
                <MoyenneCapteursPers dataUsers={{users, dataUsers}}/>
            </div>
        </>
    );
};

const MenuItem = ({imageSrc, text, text2, onClick, isOverview}) => (
    <div className={`MenuItem ${isOverview ? 'maisonsItem' : 'otherItems'}`} onClick={onClick}>
        <img style={{width: "9%", height: '9%', marginRight: "5%"}} src={imageSrc} alt={text}/>
        <span style={{
            fontSize: "14px",
            color: "#592602",
            fontWeight: "500",
            lineHeight: 2,
            wordWrap: 'break-word',
            marginLeft: '2%',
        }}
        >{text}</span>

        <span style={{
            fontSize: "14px",
            color: "#FFF7F2",
            fontWeight: "500",
            lineHeight: 2,
            wordWrap: 'break-word',
            marginLeft: '2%',
        }}
        >{text2}</span>
    </div>
);


const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="Sidebar">
            <div>
                <img
                    src={logo_entreprise}
                    alt="logo"

                    style={{
                        width: "100%",
                        height: "75%",
                    }}
                />
            </div>
            <p className="dashboardText">
                Dashboard
            </p>
            <div className="Menu">
                <MenuItem imageSrc={icon} text="Overview" onClick={() => navigate("/admin")}/>
                <MenuItem imageSrc={iconBlanc} text2="Statistiques Utilisateurs" onClick={() => navigate("/admin/statistiques")}
                          isOverview/>
            </div>
            <div style={{marginTop: 'auto', marginBottom: '3%'}}>
                <button className='seDeconnecter' onClick={() => navigate("/")}>
                    Se Déconnecter
                </button>
            </div>
        </div>
    );
};

const Header = () => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="Header">
            <div style={{position: 'relative', display: 'flex', alignItems: 'center',}}>
                <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                        position: 'absolute',
                        left: '3%',
                        color: '#592602',
                    }}
                />
                <input
                    type="text"
                    placeholder="Search..."
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{
                        background: '#FFF7F2',
                        borderRadius: 8,
                        color: '#592602',
                        paddingLeft: '20%',
                        width: '20vw',
                        border: isFocused ? '2px solid #592602' : '1px solid #592602',
                        outline: 'none',

                    }}
                />
            </div>
            <div>
                <button className="buttonProfil">
                    <FontAwesomeIcon
                        icon={faUser}
                        style={{
                            color: '#FFF7F2',
                            cursor: 'pointer',
                            fontSize: "2vw",
                        }}
                    />
                </button>
            </div>
        </div>
    );
};

export default () => (
    <div style={{display: 'flex', marginLeft: '200px', flexDirection: 'column'}}>
        <Header/>
        <Maisons/>
        <Sidebar/>
    </div>
);
