import React, { useState, useEffect } from 'react';

const MoyenneCapteursPers = ({ users, dataUsers }) => {
    // //const [averageSensorbyClient, setAverageSensorbyClient] = useState(null);
    // //
    // // useEffect(() => {
    // //         if (Array.isArray(dataUsers) && dataUsers.length > 0) {
    // //             let count = 0;
    // //             for (let i = 0; i < dataUsers.length; i++) {
    // //                 count += dataUsers[users[i].userID].length;
    // //             }
    // //             count = count / users.length;
    // //             setAverageSensorbyClient(count);
    // //             console.log("Appzdef" + count);
    // //         }
    // // }, [users]);
    //
    //
    // const [averageSensorbyClient, setAverageSensorbyClient] = useState(null);
    // const [isDataUsersUpdated, setIsDataUsersUpdated] = useState(false);
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (Array.isArray(dataUsers) && dataUsers.length > 0) {
    //             let count = 0;
    //             for (let i = 0; i < users.length; i++) {
    //                 // Utiliser une attente pour s'assurer que dataUsers[users[i].userID] est défini
    //                 if (dataUsers[users[i].userID]) {
    //                     count += dataUsers[users[i].userID].length;
    //                 }
    //             }
    //             count = count / users.length;
    //             setAverageSensorbyClient(count);
    //             setIsDataUsersUpdated(true);
    //             console.log("Appzdef" + count);
    //         }
    //     };
    //
    //     fetchData();
    // }, [users, dataUsers]);
    //
    // // Utiliser isDataUsersUpdated pour indiquer que les données sont prêtes à être utilisées dans le reste de votre composant
    // useEffect(() => {
    //     if (isDataUsersUpdated) {
    //         // Faites quelque chose avec les données une fois qu'elles sont mises à jour
    //         // Par exemple, déclenchez une autre action, effectuez un rendu conditionnel, etc.
    //         console.log('Data Users are updated!');
    //     }
    // }, [isDataUsersUpdated]);
    //
    //
    //
    // return (
    //     <div className="box_composant">
    //         <h2 className="styleTitre">Moyenne</h2>
    //         <div
    //             style={{
    //                 display: 'flex',
    //                 flexWrap: 'wrap',
    //             }}
    //         >
    //             <div>Average sensor by People : {averageSensorbyClient}</div>
    //         </div>
    //     </div>
    // );
};

export default MoyenneCapteursPers ;