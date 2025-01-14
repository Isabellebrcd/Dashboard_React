import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PeopleByCountry = ({ users }) => {
    const [peopleByCountry, setPeopleByCountry] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        const counts = {};
        users.forEach((user) => {
            const pays = user.location || 'Unknown';
            counts[pays] = (counts[pays] || 0) + 1;
        });
        setPeopleByCountry(counts);
    }, [users]);

    useEffect(() => {
        if (chartRef.current) {
            // Si graphique existe, détruire avant d'en créer un nouveau
            chartRef.current.destroy();
        }

        const labels = Object.keys(peopleByCountry);
        const data = Object.values(peopleByCountry);

        const ctx = document.getElementById('barChart').getContext('2d');

        // taille du canvas (rectangle du graphique)
        ctx.canvas.width = 1000;
        ctx.canvas.height = 400;

        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Nombre de maisons par pays',
                        data: data,
                        backgroundColor: '#F08D46',
                        borderColor: '#FFAF76',
                        borderRadius: 8,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        ticks: {
                            color: '#592602',
                        },
                    },
                    y: {
                        display: true,
                        ticks: {
                            color: '#592602',
                        },
                    },
                },

                responsive: true,
                maintainAspectRatio: false,

            },
        });
    }, [peopleByCountry]);

    return (
        <div className="box_composant">
            <h2 className="styleTitre">Maisons par pays</h2>
            <div>
                <canvas id="barChart" width="800" height="400"></canvas>
            </div>
        </div>
    );
};

export default PeopleByCountry;
