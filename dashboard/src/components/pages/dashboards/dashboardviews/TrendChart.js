import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter
import { format, addMonths, startOfYear, endOfYear, differenceInMonths, differenceInYears } from 'date-fns'; // Import date-fns for date manipulation
import ChartTrendline from 'chartjs-plugin-trendline'; // Import the trendline plugin
import Spinner from '../../../UI/Spinner';

// Register necessary components and plugins
Chart.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartTrendline // Register the trendline plugin
);

const TrendChart = ({metricResult,metricMeasureField}) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            const data = [...metricResult];

            if (!data.length) {
                setChartData(null);
                return;
            }

            const columns = Object.keys(data[0]);
            const firstKey = columns[0];
            const measureColumn = columns.find(column => column !== firstKey);

            // Generate a list of months from the minimum to the maximum date in the dataset
            const dates = data.map(row => new Date(row[firstKey]));
            const minDate = new Date(Math.min(...dates));
            const maxDate = new Date(Math.max(...dates));

            let labels = [];
            let currentDate = startOfYear(minDate);
            const endDate = endOfYear(maxDate);

            while (currentDate <= endDate) {
                labels.push(new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1))); // Store in UTC
                currentDate = addMonths(currentDate, 1);
            }

            // Create a dataset with zeros and populate the existing data
            let dataset = labels.map(date => ({ x: date.getTime(), y: 0 }));
            data.forEach(row => {
                const date = new Date(Date.UTC(new Date(row[firstKey]).getFullYear(), new Date(row[firstKey]).getMonth(), 1)).getTime();
                const existingDataPoint = dataset.find(point => point.x === date);
                if (existingDataPoint) {
                    existingDataPoint.y = row[measureColumn];
                }
            });

            setChartData({
                labels: labels.map(date => new Date(date)), // Convert timestamps back to Date objects for chart labels
                datasets: [{
                    label: measureColumn,
                    // backgroundColor: 'rgba(109, 40, 217, 0.2)',
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            // This case occurs on initial chart creation
                            return null;
                        }

                        const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
                        gradient.addColorStop(0, '#6D28D9');
                        gradient.addColorStop(1, '#ffffff');
                        
                        return gradient;
                    },
                    borderColor: '#6D28D9',
                    pointBackgroundColor: '#6D28D9',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#6D28D9',
                    data: dataset.map(point => ({ x: new Date(point.x), y: point.y })), // Ensure data points have Date objects for x-axis
                    fill: true,
                    tension: 0.4,
                    borderWidth: 1,
                    trendline: { // Trendline configuration
                        color: 'rgba(255,99,132,0.6)', // Solid line color
                        lineStyle: 'solid', // Solid line style
                        width: 2,
                    }
                }],
            });
        };

        fetchData();
    }, [metricResult]);

    const determineTimeUnit = (minDate, maxDate) => {
        const monthsDifference = differenceInMonths(maxDate, minDate);
        const yearsDifference = differenceInYears(maxDate, minDate);

        if (yearsDifference > 2) {
            return 'year';
        } else if (monthsDifference > 12) {
            return 'quarter';
        } else {
            return 'month';
        }
    };

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
                type: 'time', // Ensure x-axis is time-based
                time: {
                    unit: chartData ? determineTimeUnit(chartData.labels[0], chartData.labels[chartData.labels.length - 1]) : 'month', // Determine the unit dynamically
                    displayFormats: {
                        month: 'MMM yyyy', // Customize the format to "Aug 2021"
                        quarter: 'QQQ yyyy', // Customize the format to "Q1 2021"
                        year: 'yyyy', // Customize the format to "2021"
                    },
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    color: '#4B5563',
                    autoSkip: false, // Ensure all labels are shown
                    maxRotation: 0, // Ensure labels are horizontal
                    minRotation: 0,
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
                        const value = tooltipItem.raw.y; // Get the y-value
                        return `count (${metricMeasureField}): ${value}`;
                    },
                },
            },
            trendline: { // Trendline plugin options
                color: '#6D28D9', // Solid line color
                lineStyle: 'solid', // Solid line style
                width: 2,
            }
        },
    };

    if (!chartData) {
        return <Spinner />;
    }

    return (
        <div style={{ height: '300px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default TrendChart;
