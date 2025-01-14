import React, {useState} from "react";
import Modal from 'react-modal';
import "../styles.css";

// Modal.appElement{root};
const PopupRegister = ({onClose, onUserSubmit}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [personsInHouse, setPersonsInHouse] = useState('');
    const [houseSize, setHouseSize] = useState('');
    const [inputFocus, setInputFocus] = useState(false);



    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        onClose();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        const newUser = {
            location,
            email,
            password,
            role,
            personsInHouse,
            houseSize,
        };

        onUserSubmit(newUser);


        closeModal();
    };

    return (
        <div>
            <button className="Bouton" onClick={openModal}>Créer un utilisateur</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Pop-up"
                style={{
                    content: {
                        backgroundColor: 'rgba(89, 38, 2, 0.8)',
                    },
                }}
            >
                <h2 className="Title">Ajout Utilisateur</h2>
                <div className="LabelsContainer">
                    <label className="ModalLabel">
                        Location :
                        <input style={{
                            border: inputFocus ? '2px solid #C74617' : '2px solid #FFE2CD',
                            boxShadow: inputFocus ? '1px solid #C74617' : 'none',
                        }} className="CustomInput form-control"
                               type="text" value={location}
                               onChange={(e) => setLocation(e.target.value)}
                               onFocus={() => setInputFocus(true)}
                               onBlur={() => setInputFocus(false)}
                        />
                    </label>
                    <label className="ModalLabel">
                        Email :
                        <input style={{
                            border: inputFocus ? '2px solid #C74617' : '2px solid #FFE2CD',
                            boxShadow: inputFocus ? '1px solid #C74617' : 'none',
                        }} className="CustomInput form-control"
                               type="text" value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               onFocus={() => setInputFocus(true)}
                               onBlur={() => setInputFocus(false)}
                        />
                    </label>
                    <label className="ModalLabel">
                        Password :
                        <input style={{
                            border: inputFocus ? '2px solid #C74617' : '2px solid #FFE2CD',
                            boxShadow: inputFocus ? '1px solid #C74617' : 'none',
                        }} className="CustomInput form-control"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                               onFocus={() => setInputFocus(true)}
                               onBlur={() => setInputFocus(false)}
                        />
                    </label>
                    <label className="ModalLabel">
                        Role :
                        <input style={{
                            border: inputFocus ? '2px solid #C74617' : '2px solid #FFE2CD',
                            boxShadow: inputFocus ? '1px solid #C74617' : 'none',
                        }} className="CustomInput form-control"
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                               onFocus={() => setInputFocus(true)}
                               onBlur={() => setInputFocus(false)}
                        />
                    </label>
                    <label className="ModalLabel">
                        Persons In House :
                        <input style={{
                            border: inputFocus ? '2px solid #C74617' : '2px solid #FFE2CD',
                            boxShadow: inputFocus ? '1px solid #C74617' : 'none',
                        }} className="CustomInput form-control"
                            type="text"
                            value={personsInHouse}
                            onChange={(e) => setPersonsInHouse(e.target.value)}
                               onFocus={() => setInputFocus(true)}
                               onBlur={() => setInputFocus(false)}
                        />
                    </label>
                    <label className="ModalLabel">
                        House Size :
                        <input style={{
                            border: inputFocus ? '2px solid #C74617' : '2px solid #FFE2CD',
                            boxShadow: inputFocus ? '1px solid #C74617' : 'none',
                        }} className="CustomInput form-control"
                            type="text"
                            value={houseSize}
                            onChange={(e) => setHouseSize(e.target.value)}
                               onFocus={() => setInputFocus(true)}
                               onBlur={() => setInputFocus(false)}
                        />
                    </label>
                </div>
                <button className="Bouton" onClick={handleSubmit}>Soumettre</button>
                <button className="Bouton" onClick={closeModal}>Fermer</button>
            </Modal>
        </div>
    );
};

export default PopupRegister;