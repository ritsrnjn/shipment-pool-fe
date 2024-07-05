"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

// Define the type for a single shipment
type Consolidation = {
  id: number;
  origin: string;
  destination: string;
  eta: string;
  etd: string;
  status: string;
  weight: number;
};


// Define the type for the state, which can be an array of shipments or null
type ConsolidationsData = {
  consolidations: Consolidation[];
} | null;

const dummyConsolidationsData = {
  "consolidations": [
    {
      "id": 1,
      "origin": "New York, NY",
      "destination": "Los Angeles, CA",
      "eta": "2023-10-05",
      "etd": "2023-09-30",
      "status": "Pending",
      "weight": 5000
    },
    // Add more dummy data as needed
  ]
};


// Step 1 & 2: Define Button Component
type ActivateButtonProps = {
  label: string;
  consolidatonId: number;
  onClick: (consolidatonId: number, status: string) => void;
};

const ActivateButton = ({ label, consolidatonId, onClick }: ActivateButtonProps) => (
  <button
    className={`px-4 py-2 text-white bg-green-500 hover:bg-green-700' rounded`}
    onClick={() => onClick(consolidatonId, label.toLowerCase())}
  >
    {label}
  </button>
);

// Step 3: API Call Function
const activateConsolidation = async (consolidationId: number, status: string) => {
  try {
    // TODO: replace API
    const response = await fetch(`/api/shipments/${consolidationId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Network response was not ok.');
    // Handle success response
    console.log('Consolidation activated successfully');
  } catch (error) {
    console.error('Failed to activate Consolidation:', error);
  }
};


const ConsolidationsTable = () => {
  // make a api call and populate brandData with the response

  const [consolidationsData, setConsolidationsData] = useState<ConsolidationsData>(dummyConsolidationsData);
  useEffect(() => {
    async function fetchConsolidationsData() {
      try {
        const res = await fetch('https://b03d5f07-cec4-4b1f-8c7c-73a0ea5a335d.mock.pstmn.io/consolidations/list');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: ConsolidationsData = await res.json();
        setConsolidationsData(data);
      } catch (error) {
        console.error("API calls failed, using dummy data", error);
        setConsolidationsData(dummyConsolidationsData);
      }
    }

    fetchConsolidationsData();
  }, []);


  return (

    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Consolidations
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              ConsolidatioinId
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

        {consolidationsData?.consolidations.map((consolidation, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-7 ${key === consolidationsData.consolidations.length - 1
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
                {consolidation.id}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{consolidation.origin}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{consolidation.destination}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{consolidation.eta}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{consolidation.etd}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{consolidation.status}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <ActivateButton label="Activate" consolidatonId={consolidation.id} onClick={activateConsolidation} />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsolidationsTable;
