import React, { useState, useEffect } from 'react';
import { FaHouseUser } from "react-icons/fa";


const HousesBySize = ({ users }) => {
    const [housesBySize, setHousesBySize] = useState({});

    useEffect(() => {
        const sizes = {
            big: 0,
            medium: 0,
            small: 0,
        };

        users.forEach(user => {
            const houseSize = user.houseSize || 'unknown';

            switch (houseSize.toLowerCase()) {
                case 'big':
                    sizes.big += 1;
                    break;
                case 'medium':
                    sizes.medium += 1;
                    break;
                case 'small':
                    sizes.small += 1;
                    break;
                default:
                    break;
            }
        });

        setHousesBySize(sizes);
    }, [users]);

    return (
        <div className="box_composant">
            <h2 className="styleTitre">Taille des maisons</h2>
            <div
                style={{
                    margin : '2%',
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                <div className="stylePays">
                    <div className="Pays"><FaHouseUser />Big</div>
                    <div className="nbPersonnes">{housesBySize.big}</div>
                </div>
                <div className="stylePays">
                    <div className="Pays"><FaHouseUser />Medium</div>
                    <div className="nbPersonnes">{housesBySize.medium}</div>
                </div>
                <div className="stylePays">
                    <div className="Pays"><FaHouseUser />Small</div>
                    <div className="nbPersonnes">{housesBySize.small}</div>
                </div>
            </div>
        </div>
    );
};

export default HousesBySize;
