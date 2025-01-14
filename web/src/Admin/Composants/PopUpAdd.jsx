import React, {useState} from "react";
import Modal from 'react-modal';
import "../styles.css";

// Modal.appElement{root};
const PopupAdd = ({onClose, onLocationSubmit}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
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
        // Faites quelque chose avec la valeur du champ texte ici
        console.log('Valeur du champ texte :', inputValue);
        onLocationSubmit(inputValue);

        // Fermez le pop-up après avoir traité la valeur
        closeModal();
    };

    return (
        <div>
            <button className="Bouton"  onClick={openModal}>Créer un capteur</button>

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
                <h2 className="Title">Créer Capteur</h2>
                <div className="LabelsContainer">
                <label className="ModalLabel">
                    Location :
                    <input style={{
                        border: inputFocus ? '2px solid #C74617' : '2px solid #FFE2CD',
                        boxShadow: inputFocus ? '1px solid #C74617' : 'none',
                    }} className="CustomInput form-control"
                        type="text" value={inputValue}
                        onChange={handleInputChange}
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

export default PopupAdd;