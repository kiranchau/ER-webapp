import React, { useState, useEffect } from 'react';
import UseSharedDataContext from '../../../context/UseSharedDataContext';
import Spinner from '../../../UI/Spinner';
import { format, startOfMonth, addMonths, differenceInMonths } from 'date-fns';

const CohortAnalysis = () => {
    const [cohortData, setCohortData] = useState([]);
    const { queryResult } = UseSharedDataContext(); // Destructure context

    useEffect(() => {
        const processCohortData = () => {
            // const data = [...queryResult];
            const data = [
                {
                    "LastModifiedDate": "2024-07-03T09:17:55",
                    "SystemModstamp": "2024-07-03T09:17:55",
                    "count": 18
                }, {
                    "LastModifiedDate": "2024-01-10T09:17:55",
                    "SystemModstamp": "2024-01-10T09:17:55",
                    "count": 400
                }, {
                    "LastModifiedDate": "2023-10-06T09:17:55",
                    "SystemModstamp": "2023-10-06T09:17:55",
                    "count": 4000
                }, {
                    "LastModifiedDate": "2023-01-15T09:17:55",
                    "SystemModstamp": "2023-01-15T09:17:55",
                    "count": 40
                }
            ];

            if (!data.length) {
                setCohortData([]);
                return;
            }

            // Identify the first two date fields dynamically
            const dateFields = Object.keys(data[0]).filter(key => !isNaN(Date.parse(data[0][key])));
            if (dateFields.length < 2) {
                console.error('Not enough date fields found in the query result');
                return;
            }
            const cohortDateField = dateFields[0];
            const measurementDateField = dateFields[1];

            // Identify the count field
            const countField = Object.keys(data[0]).find(key => !isNaN(data[0][key]) && key !== cohortDateField && key !== measurementDateField);
            if (!countField) {
                console.error('Count field not found in the query result');
                return;
            }

            // Initialize cohort data
            const cohorts = {};
            const formattedData = data.map(item => ({
                cohortDate: startOfMonth(new Date(item[cohortDateField])),
                measurementDate: startOfMonth(new Date(item[measurementDateField])),
                count: item[countField]
            }));

            const currentDate = startOfMonth(new Date());

            formattedData.forEach(({ cohortDate, measurementDate, count }) => {
                const cohortMonth = format(cohortDate, 'MMMM yyyy');
                if (!cohorts[cohortMonth]) {
                    cohorts[cohortMonth] = { Total: 0, months: {} };
                }
                cohorts[cohortMonth].Total += count;

                // Increment counts for subsequent months
                const cohortStartDate = startOfMonth(cohortDate);
                const monthsDifference = differenceInMonths(currentDate, cohortStartDate);

                for (let i = 0; i <= monthsDifference; i++) {
                    const futureMonth = addMonths(cohortStartDate, i);
                    const futureMonthKey = format(futureMonth, 'MMMM yyyy');
                    if (!cohorts[cohortMonth].months[futureMonthKey]) {
                        cohorts[cohortMonth].months[futureMonthKey] = 0;
                    }
                    cohorts[cohortMonth].months[futureMonthKey] += count;
                }
            });

            // Convert cohorts to an array and calculate retention
            const cohortArray = Object.keys(cohorts).map(cohort => {
                const cohortObj = { Time: cohort, Total: cohorts[cohort].Total };
                const cohortMonths = cohorts[cohort].months;
                const sortedMonths = Object.keys(cohortMonths).sort((a, b) => new Date(a) - new Date(b));

                sortedMonths.forEach((month, index) => {
                    const monthRetention = cohortMonths[month] || 0;
                    cohortObj[`month ${index + 1}`] = ((monthRetention / cohortObj.Total) * 100).toFixed(2) + '%';
                });

                return cohortObj;
            });

            setCohortData(cohortArray);
        };

        processCohortData();
    }, [queryResult]);

    if (!cohortData.length) {
        return <Spinner />;
    }

    // Calculate the maximum number of months across all cohorts
    const maxMonths = Math.max(...cohortData.map(row => Object.keys(row).filter(key => key.startsWith('month ')).length));

    return (
        <div className="overflow-auto w-full">
            <table className="overflow-auto w-full border-collapse table-fixed">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border w-[150px]">Time</th>
                        <th className="px-4 py-2 border w-[100px]">Total</th>
                        {[...Array(maxMonths)].map((_, index) => (
                            <th key={index} className="px-4 py-2 border w-[100px]">Month {index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {cohortData.map((row, index) => (
                        <tr key={index} className="text-center">
                            <td className="px-4 py-2 border">{row.Time}</td>
                            <td className="px-4 py-2 border">{row.Total}</td>
                            {Object.keys(row).slice(2).map((month, index) => (
                                <td key={index} className={`px-4 py-2 border ${row[month] === '0.00%' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                    {row[month]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CohortAnalysis;
