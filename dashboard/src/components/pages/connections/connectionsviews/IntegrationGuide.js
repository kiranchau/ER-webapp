import React from 'react';

const IntegrationGuide = () => {
    return (
        <div className="container mx-auto p-4 h-[650px] overflow-y-auto">
            <div className="max-w-2xl mx-auto bg-white p-6">
                <h1 className="text-2xl font-bold mb-4">Salesforce - Connect Your Data</h1>
                <p className="text-gray-600 mb-4">A short tutorial that explains how to connect your Salesforce to Elevated Revenue.</p>
                {/* <p className="text-gray-500 mb-2">Written by Nor Shekle</p> */}
                <p className="text-gray-500 mb-4">Updated over a week ago</p>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">To integrate Salesforce with Elevated Revenue, follow these steps:</h2>
                    <ol className="list-decimal list-inside space-y-4">
                        <li>
                            <p>Go to "Connectors" section in your Elevated Revenue account and select Salesforce.</p>
                            <img src="step1.png" alt="Step 1" className="border mt-2"/>
                        </li>
                        <li>
                            <p>Click "Connect"</p>
                            <img src="step2.png" alt="Step 2" className="border mt-2"/>
                        </li>
                        <li>
                            <p>This will open a new tab where you will be prompted to log in to your Salesforce account and authorize the Elevated Revenue app.</p>
                            <img src="step3.png" alt="Step 3" className="border mt-2"/>
                        </li>
                        <li>
                            <p>After your authentication has been verified, navigate to the bottom right corner of the page and click on the "Create Integration" button.</p>
                        </li>
                    </ol>
                    <p className="text-gray-600 mt-4">
                        The creation process typically takes about one minute, and fetching the data usually takes 30 minutes, depending on the size of your data set. After which you'll be presented with a dashboard full of powerful insights to help drive your business forward. 🚀
                    </p>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li><a href="#" className="text-blue-500 hover:underline">Intercom - Connect Your Data</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">HubSpot - Connect Your Data</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Getting started with Elevated Revenue - Build your first dashboard</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Stripe - Connect Your Data</a></li>
                        <li><a href="#" className="text-blue-500 hover:underline">Stripe - Connect Your Data</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default IntegrationGuide;
