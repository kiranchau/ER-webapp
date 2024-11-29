import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-plugin-datalabels'; // Import the datalabels plugin
import UseSharedDataContext from '../../../context/UseSharedDataContext';
import Spinner from '../../../UI/Spinner';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const PieChart = () => {
    const { queryResult, selectedMeasureField } = UseSharedDataContext();
    const [chartData, setChartData] = useState(null);

    useEffect(()=>{
        Chart.register(Title, Tooltip, ChartDataLabels);
        return () => {
            Chart.unregister(ChartDataLabels);
          };
    },[])

    useEffect(() => {
        const fetchData = () => {
            if (!queryResult.length) {
                setChartData(null);
                return;
            }

            const keys = Object.keys(queryResult[0]);
            const labels = queryResult.map(item => item[keys[0]]);
            const counts = queryResult.map(item => item[keys[1]]);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: `Count (${selectedMeasureField})`,
                        backgroundColor: [
                            '#6D28D9',
                            '#C62828', // Dark Red
                            '#D84315', // Dark Orange
                            '#1E88E5', // Dark Blue
                            '#8E24AA', // Dark Purple
                            '#F57C00', // Dark Amber
                            '#00897B', // Dark Teal
                            '#F57F17', // Dark Yellow
                            '#6D4C41', // Dark Brown
                            '#5C6BC0', // Dark Indigo
                            '#004D40', // Dark Cyan
                            '#004D40', // Dark Green
                            '#C2185B', // Dark Pink
                            '#E65100', // Dark Orange-Red
                            '#BF360C', // Dark Rust
                        ],
                        borderColor: '#ffffff',
                        borderWidth: 2,
                        data: counts,
                    },
                ],
            });
        };

        fetchData();
    }, [queryResult, selectedMeasureField]);

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                backgroundColor: '#111827',
                titleColor: '#F9FAFB',
                bodyColor: '#F9FAFB',
                cornerRadius: 4,
                callbacks: {
                    label: (tooltipItem) => {
                        const value = tooltipItem.raw;
                        return `Count (${selectedMeasureField}): ${value}`;
                    },
                },
            },
            datalabels: {
                color: '#000',
                formatter: (value, context) => {
                    const dataset = context.chart.data.datasets[0];
                    const total = dataset.data.reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${percentage}%`;
                },
                anchor: 'end',
                align: 'start',
                offset: 10,
                clamp: true,
            },
        },
    };

    if (!chartData) {
        return <Spinner />;
    }

    return (
        <div className="w-full h-96 mx-auto p-4">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
