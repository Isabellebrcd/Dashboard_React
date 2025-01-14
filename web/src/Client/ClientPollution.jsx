import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Admin.css";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faUser} from '@fortawesome/free-solid-svg-icons';
import logo_entreprise from "../assets/Logo.png";
import icon from "../assets/Icon.png"
import iconBlanc from "../assets/Icon_blanc.png"
import 'react-circular-progressbar/dist/styles.css';
import {ScatterChart, Scatter, XAxis, YAxis, Tooltip} from 'recharts';
import PollutionGauge from "./Composants/PollutionGauge.jsx";



const Pollution = () => {

    return (
        <>
        </>
    );
};



const AirPollutionAffichage = () => {
    const email = localStorage.getItem('email');
    const pswd = localStorage.getItem('pswd');

    const [aff, setAff] = useState(null);
    useEffect(() => {
        handleAirPollution();
    }, [])
    const handleAirPollution = async () => {
        try {
            console.log(email + " " + pswd);
            const type = "airPollution";
            const response = await fetch('http://localhost:3001/client/sensors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, pswd, type}),
            });
            if (response.ok) {
                const result = await response.json();
                setAff(result.tabs);
                console.log(result);
                // TODO : gérer la mise en action des valeurs
                console.log(result.tabs.length);
                console.log(result.tabs[0].measures.length);
                for (let i = 0; i < result.tabs[0].measures.length; i++) {
                    console.log(result.tabs[0].measures[i].value);
                }
                console.log(result.tabs[0].location);
            } else {
                console.error('Échec de la connexion humidité - else');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion humidité - catch', error);
        }
    };
    return (
        <>
            <div className="sensor-container">
                <div className="sensor-section">
                    <h2>Air Pollution</h2>
                    <div className="sensor-row">
                {aff &&
                    aff
                        .filter((sensor) => sensor.measures.length > 0) // Filtrer les capteurs sans mesure
                        .map((sensor, index) => (
                            <div key={index} className="sensor-rectangle">
                                <div className="location">Location : {sensor.location}</div>
                                <div className="graph-container">
                                    {sensor.measures.length === 1 ? (
                                        <PollutionGauge value={sensor.measures[0].value}/>
                                    ) : (
                                        <ScatterChart width={300} height={200} data={sensor.measures}>
                                            <XAxis dataKey="timestamp" stroke="#592602"/>
                                            <YAxis tick={{fill: '#592602'}} stroke="#592602"/>
                                            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                                            <Scatter dataKey="value" fill="#E56407"/>
                                        </ScatterChart>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`

                  .sensor-section {
                    width: 100%;
                    border: 2px solid #592602; 
                    border-radius: 8px; 
                    padding: 1%;
                  }

                  .sensor-section h2 {
                    color: #592602;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 10px;
                  }

                  .sensor-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                  }
                  
                  .sensor-container {
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                  }

                  .sensor-rectangle {
                    background-color: rgba(255, 250, 242, 0.70);
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.10);
                    border-radius: 16px;
                    flex: 1;
                    display: flex;
                    flex-direction: column; 
                    align-items: center;
                    margin: 10px;
                    padding: 10px;
                  }

                  .location {
                    font-weight: 600;
                    color: #592602;
                    font-size: 110%;
                  }

                  .graph-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex: 1;
                  }
                `}</style>
            </div>
        </>
    );
};

const MenuItem = ({imageSrc, text, text2, onClick, isOverview}) => (
    <div className={`MenuItem ${isOverview ? 'pollutionItem' : 'otherItems'}`} onClick={onClick}>
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
                <MenuItem imageSrc={icon} text="Overview" onClick={() => navigate("/client")}/>
                <MenuItem imageSrc={icon} text="Humidity" onClick={() => navigate("/client/humidity")}/>
                <MenuItem imageSrc={icon} text="Temperature" onClick={() => navigate("/client/temperature")}/>
                <MenuItem imageSrc={iconBlanc} text2="Pollution de l'air ambiant"
                          onClick={() => navigate("/client/pollution")} isOverview/>
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
        <AirPollutionAffichage/>
        <Pollution/>
        <Sidebar/>
    </div>
);
