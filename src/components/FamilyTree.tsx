import React, { useState } from "react";
import FamilyNode from "./FamilyNode";
import { FaPlus, FaMinus } from "react-icons/fa";
import { familyData } from "../familyData";

const FamilyTree: React.FC = () => {
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
    };

    const handleZoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
    };


    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="fixed top-4 right-4 flex gap-2">
                <button
                    onClick={handleZoomIn}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Zoom in"
                >
                    <FaPlus />
                </button>
                <button
                    onClick={handleZoomOut}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-label="Zoom out"
                >
                    <FaMinus />
                </button>
            </div>
            <div className="overflow-auto">
                <div
                    className="transform-gpu transition-transform"
                    style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: "top center"
                    }}
                >
                    <FamilyNode node={familyData} level={0} zoom={zoom} />
                </div>
            </div>
        </div>
    );
};

export default FamilyTree;
