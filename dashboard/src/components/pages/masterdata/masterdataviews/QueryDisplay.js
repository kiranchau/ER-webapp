import React from 'react';

const QueryDisplay = ({ query }) => {
    return (
        <div className="mt-5 p-4 rounded-md border">
            <pre className="whitespace-pre-wrap text-red-500">
                <code>
                    {query}
                </code>
            </pre>
        </div>
    );
};

export default QueryDisplay;
