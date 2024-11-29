import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js/auto';
import UseSharedDataContext from '../../../context/UseSharedDataContext';
import Spinner from '../../../UI/Spinner';

// Register necessary components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ColumnChart = () => {
    const [chartData, setChartData] = useState(null);
    const { queryResult, selectedMeasureField } = UseSharedDataContext();

    useEffect(() => {
        const fetchData = () => {
            const data = [...queryResult];

            // Ensure there is data
            if (!data.length) {
                setChartData(null);
                return;
            }

            // Extract unique column names
            const columns = Object.keys(data[0]);

            // Extract the first key of each object to use for labels
            const firstKey = columns[0];
            const labels = data.map(row => row[firstKey]);

            // Prepare datasets dynamically
            const datasets = columns
                .filter(column => column !== firstKey)
                .map(column => ({
                    label: column,
                    backgroundColor: '#6D28D9',
                    borderColor: '#ffffff',
                    borderWidth: 2,
                    data: data.map(row => row[column]),
                }));

            setChartData({
                labels: labels,
                datasets: datasets,
            });
        };

        fetchData();
    }, [queryResult]);

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    color: '#4B5563',
                },
            },
            x: {
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    color: '#4B5563',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                backgroundColor: '#111827',
                titleColor: '#F9FAFB',
                bodyColor: '#F9FAFB',
                cornerRadius: 4,
                callbacks: {
                    label: (tooltipItem) => {
                        // Customize the tooltip label to include the selectedMeasureField
                        const value = tooltipItem.raw; // Get the value
                        return `count (${selectedMeasureField}): ${value}`;
                    },
                },
            },
        },
    };

    if (!chartData) {
        return <Spinner/>;
    }

    return (
        <div className="w-full h-96 p-4">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ColumnChart;
