import React, { useState, useEffect } from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js/auto';
import UseSharedDataContext from '../../../context/UseSharedDataContext';
import Spinner from '../../../UI/Spinner';

// Register necessary components
Chart.register(LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = ({metricResult,metricMeasureField}) => {
    const [chartData, setChartData] = useState(null);
    // const { metricQueryResult,metricMeasureField } = UseSharedDataContext();

    useEffect(() => {
        const fetchData = () => {
            // Ensure there is data
            if (!metricResult.length) {
                setChartData(null);
                return;
            }

            // Find the first key in the first object of metricResult
            const firstKey = Object.keys(metricResult[0])[0];

            // Map data to format required for Bubble Chart
            const formattedData = metricResult.map((item) => ({
                x: item[firstKey],
                y: item.count,
                r: 10,
            }));

            setChartData({
                datasets: [
                    {
                        label: 'Bubble Chart',
                        data: formattedData,
                        backgroundColor: 'rgba(109, 40, 217, 0.2)',
                        borderColor: '#6D28D9',
                        borderWidth: 1,
                    },
                ],
            });
        };

        fetchData();
    }, [metricResult]);

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
                type: 'category', // Ensure x-axis type is set to 'category' for string values
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
                        const value = tooltipItem.raw;
                        return `Count (${metricMeasureField}): ${value.y}`;
                    },
                },
            },
        },
    };

    if (!chartData) {
        return <Spinner />;
    }

    return (
        <div className="w-full h-96 mx-auto p-4">
            <Bubble data={chartData} options={options} />
        </div>
    );
};

export default BubbleChart;
