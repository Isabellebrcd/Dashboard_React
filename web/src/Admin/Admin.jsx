import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Admin.css";
import "./styles.css"

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faUser} from '@fortawesome/free-solid-svg-icons';
import logo_entreprise from "../assets/Logo.png";
import icon from "../assets/Icon.png"
import iconBlanc from "../assets/Icon_blanc.png"
import PopupComponent from "./Composants/PopUpUpdate.jsx";
import PopUpRegister from "./Composants/PopUpRegister.jsx";
import PopUpAdd from "./Composants/PopUpAdd.jsx";


const Admin = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [dataUsers, setDataUsers] = useState([]);


    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedDataUser, setSelectedDataUser] = useState(null);

    const [showPopup, setShowPopup] = useState(false);

    const [triggerEffect, setTriggerEffect] = useState(false);

    const handleModifierClick = (user, index) => {
        setSelectedUser(user);
        setSelectedDataUser(dataUsers[user.userID]);
        setShowPopup(true);
    };


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
    }, [users, triggerEffect]);


    useEffect(() => {
        handleAllUsers();
    }, []);

    function getCurrentDate() {
        const today = new Date();

        // Récupérer les composants de la date
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0, donc ajoute 1
        const year = today.getFullYear();

        // Formater la date
        return `${day}/${month}/${year}`;
    }

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


    const updateSensor = async (sensorId, strLoc) => {
        try {
            const response = await fetch(`http://localhost:3001/sensors/${sensorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    creationDate: getCurrentDate(),
                    location: strLoc,
                }),
            });

            if (response.ok) {
                const updatedSensor = await response.json();
                console.log('Capteur mis à jour :', updatedSensor);
            } else {
                console.error('Erreur lors de la mise à jour du capteur :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du capteur :', error);
        }
        setTriggerEffect((prev) => !prev);
    };

    const deleteSensor = async (sensorId) => {
        try {
            const response = await fetch(`http://localhost:3001/sensors/${sensorId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const deletedSensor = await response.json();
                console.log('Capteur supprimé :', deletedSensor);
            } else {
                console.error('Erreur lors de la suppression du capteur :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du capteur :', error);
        }
        setTriggerEffect((prev) => !prev);
    };

    const handleLocationSubmit = (sensorID, value) => {
        updateSensor(sensorID, value);
    };

    const handleModalClose = () => {
        // Actions à effectuer lors de la fermeture du modal
    };


    function registerUser(newUser) {
        // const newUser = {
        //     location: 'Paris',
        //     email: 'user@example.com',
        //     password: 'password123',
        //     role: 'client',
        //     personsInHouse: 4,
        //     houseSize: 'medium'
        // };

        fetch('http://localhost:3001/client/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('User registered:', data);
            })
            .catch(error => {
                console.error('Error registering user:', error);
            });
    }

    const createSensor = (location, userID) => {
        fetch(`http://localhost:3001/client/${userID}/sensors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                creationDate: getCurrentDate(),
                location: location,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Capteur créé :', data);
            })
            .catch(error => {
                console.error('Erreur lors de la création du capteur :', error);
            });
        setTriggerEffect((prev) => !prev);
    };


    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3001/client/delete/${userId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
            } else {
                console.error('Échec de la connexion - else');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <>

            <div>
                <PopUpRegister
                    onClose={handleModalClose}
                    onUserSubmit={(newUser) => registerUser(newUser)}
                />
            </div>

            <div className="Content1">
                {users.map((user, index) => (
                    <div key={user.userID} className="Rectangle Sensor">
                        <div>
                            <p className="location">{user.location}</p>
                            <p className="Maison">{user.houseSize} Maison de {user.personsInHouse} personnes</p>
                            <p className="ID">ID : {user.userID}</p>
                        </div>
                        <button className="Modifier" onClick={() => handleModifierClick(user, index)}>
                            Modifier
                        </button>
                        <button className="Modifier" onClick={() => deleteUser(user.userID)}>
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p className="Title2">Modifier l'utilisateur ID : {selectedUser.userID}</p>
                        {selectedDataUser.map((sensors) => (
                            <div key={sensors._id} className="sensor-container">
                                <p className="location2">{sensors.location}</p>
                                <div className="sensor-actions">
                                    <button className="Bouton" onClick={() => deleteSensor(sensors._id)}>Supprimer
                                    </button>
                                    <PopupComponent
                                        onClose={handleModalClose}
                                        onLocationSubmit={(value) => handleLocationSubmit(sensors._id, value)}/>
                                </div>

                            </div>
                        ))}
                        <div className="buttons-container">
                            <PopUpAdd
                                onClose={handleModalClose}
                                onLocationSubmit={(value) => createSensor(value, selectedUser.userID)}/>
                            <button className="Bouton" onClick={() => setShowPopup(false)}>Fermer</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

/*const Content = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleModifierClick = () => {
        setPopupOpen(true);
    };

    const handlePopupClose = () => {
        setPopupOpen(false);
    };

    return (
        <div>

            <div className="Content1">
                <div className="Rectangle Sensor">
                    <div>
                        <p className="loc">Location</p>
                        <p className="Maison">Grande Maison de 2 personnes</p>
                        <p className="ID">ID : 5ddb94c6fc13ae640c000014</p>
                    </div>
                    <button className="Modifier" onClick={handleModifierClick}>
                        Modifier
                    </button>
                </div>
                {/!* Pop-up *!/}
                {isPopupOpen && (
                    <div className="popup">
                        <div className="popup-content">
                            <div className="Content1">
                                <div className="Rectangle Sensor">
                                    <div>
                                        <p className="loc">Humidity Sensor</p>
                                        <p className="Maison">Bathroom</p>
                                        <p className="ID">ID : 5ddb94c6fc13ae640c000014</p>
                                    </div>
                                    <button className="Modifier">
                                        Supprimer
                                    </button>
                                </div>
                                <div className="Rectangle3 Sensor">
                                    <div className="Rectangle4">
                                        <button className="Edit">
                                            Add Sensor
                                        </button>
                                    </div>
                                    <div className="Rectangle4">
                                        <button className="Edit" onClick={handlePopupClose}>Exit</button>
                                    </div>
                                </div>
                            </div>
                            <div className="Content1">
                                <div className="Rectangle Sensor">
                                    <div>
                                        <p className="loc">Humidity Sensor</p>
                                        <p className="Maison">Bathroom</p>
                                        <p className="ID">ID : 5ddb94c6fc13ae640c000014</p>
                                    </div>
                                    <button className="Modifier">
                                        Supprimer
                                    </button>
                                </div>
                                <div className="Rectangle Sensor">
                                    <div>
                                        <p className="loc">Humidity Sensor</p>
                                        <p className="Maison">Bathroom</p>
                                        <p className="ID">ID : 5ddb94c6fc13ae640c000014</p>
                                    </div>
                                    <button className="Modifier">
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="Rectangle Sensor">
                    <div>
                        <p className="loc">Location</p>
                        <p className="Maison">Grande Maison de 2 personnes</p>
                        <p className="ID">ID : 5ddb94c6fc13ae640c000014</p>
                    </div>
                    <button className="Modifier" onClick={handleModifierClick}>
                        Modifier
                    </button>
                </div>
            </div>
            <div className="Content1">
                <div className="Rectangle Sensor">
                    <div>
                        <p className="loc">Location</p>
                        <p className="Maison">Grande Maison de 2 personnes</p>
                        <p className="ID">ID : 5ddb94c6fc13ae640c000014</p>
                    </div>
                    <button className="Modifier" onClick={handleModifierClick}>
                        Modifier
                    </button>
                </div>
                <div className="Rectangle Sensor">
                    <div>
                        <p className="loc">Location</p>
                        <p className="Maison">Grande Maison de 2 personnes</p>
                        <p className="ID">ID : 5ddb94c6fc13ae640c000014</p>
                    </div>
                    <button className="Modifier" onClick={handleModifierClick}>
                        Modifier
                    </button>
                </div>
            </div>
            <div className="Content1">
                <div className="Rectangle Sensor">
                    <div>
                        <p className="loc">Location</p>
                        <p className="Maison">Grande Maison de 2 personnes</p>
                        <p className="ID">ID : 5ddb94c6fc13ae640c000014</p>
                    </div>
                    <button className="Modifier" onClick={handleModifierClick}>
                        Modifier
                    </button>
                </div>
                <div className="Rectangle Sensor">
                    <div>
                        <p className="loc">Location</p>
                        <p className="Maison">Grande Maison de 2 personnes</p>
                        <p className="ID">ID : 5ddb94c6fc13ae640c000014</p>
                    </div>
                    <button className="Modifier" onClick={handleModifierClick}>
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    );
};*/

const MenuItem = ({imageSrc, text, text2, onClick, isOverview}) => (
    <div className={`MenuItem ${isOverview ? 'overviewItem' : 'otherItems'}`} onClick={onClick}>
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
                <MenuItem imageSrc={iconBlanc} text2="Overview" onClick={() => navigate("/admin")} isOverview/>
                <MenuItem imageSrc={icon} text="Statistiques Utilisateurs"
                          onClick={() => navigate("/admin/statistiques")}/>
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

        <Admin/>
        <Sidebar/>
    </div>
);
