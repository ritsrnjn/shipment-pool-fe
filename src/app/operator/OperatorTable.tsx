"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

// Define the type for a single shipment
type Shipment = {
    id: number;
    origin: string;
    destination: string;
    eta: string;
    etd: string;
    status: string;
    weight: number;
};


// Define the type for the state, which can be an array of shipments or null
type ShipmentsData = {
    shipments: Shipment[];
} | null;

const dummyShipmentsData = {
    "shipments": [
        // Add more dummy data as needed
    ]
};

// Step 1 & 2: Define Button Component
type StatusButtonProps = {
    label: string;
    shipmentId: number;
    onClick: (shipmentId: number, status: string) => void;
    color: 'green' | 'red'; // Add color prop
};

const StatusButton = ({ label, shipmentId, onClick, color }: StatusButtonProps) => (
    <button
        className={`px-4 py-2 text-white ${color === 'green' ? 'bg-green-500 hover:bg-green-700' : 'bg-yellow-500 hover:bg-yellow-700'} rounded`}
        onClick={() => onClick(shipmentId, label.toLowerCase())}
    >
        {label}
    </button>
);

// Step 3: API Call Function
const updateShipmentStatus = async (shipmentId: number, status: string) => {
    try {
        const response = await fetch(`/api/shipments/${shipmentId}/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Network response was not ok.');
        // Handle success response
        console.log('Shipment status updated successfully');
    } catch (error) {
        console.error('Failed to update shipment status:', error);
    }
};


const OperatorTable = () => {
    // make a api call and populate brandData with the response

    const [shipmentsData, setShipmentsData] = useState<ShipmentsData>(dummyShipmentsData);
    useEffect(() => {
        async function fetchShipmentsData() {
            try {
                const res = await fetch('https://b03d5f07-cec4-4b1f-8c7c-73a0ea5a335d.mock.pstmn.io/shipments/list');
                if (!res.ok) throw new Error('Failed to fetch');
                const data: ShipmentsData = await res.json();
                setShipmentsData(data);
            } catch (error) {
                console.error("API calls failed, using dummy data", error);
                setShipmentsData(dummyShipmentsData);
            }
        }
        fetchShipmentsData();
    }, []);



    return (

        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Shipments Request
            </h4>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            ShipmentId
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Origin
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Destination
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            ETA
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            ETD
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Status
                        </h5>
                    </div>
                </div>

                {shipmentsData?.shipments.map((shipment, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-6 ${key === shipmentsData.shipments.length - 1
                            ? ""
                            : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            {/* <div className="flex-shrink-0">
                                <Image src="/images/brand/brand-01.svg" alt="Brand" width={48} height={48} />
                            </div> */}
                            <p className="hidden text-black dark:text-white sm:block">
                                {shipment.id}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{shipment.origin}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{shipment.destination}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">{shipment.eta}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{shipment.etd}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-meta-5">{shipment.status}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">

                            <StatusButton label="Approve" shipmentId={shipment.id} onClick={updateShipmentStatus} color="green" />
                            <div className="mx-2"></div> {/* This adds horizontal margin */}
                            <StatusButton label="Reject" shipmentId={shipment.id} onClick={updateShipmentStatus} color="red" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OperatorTable;
