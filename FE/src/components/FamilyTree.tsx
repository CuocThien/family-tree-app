import React, { useState } from "react";
import FamilyNode from "./FamilyNode";
import { FaPlus, FaMinus } from "react-icons/fa";
import { familyData } from "../familyData";
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PersonForm from './PersonForm';

const FamilyTree: React.FC = () => {
    const [zoom, setZoom] = useState(1);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleZoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
    };

    const handleZoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
    };

    const handleCreate = (newMember: any) => {
        console.log('New member:', newMember);
        // You'll need to implement a way to add to the family tree data
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
            <div className="app-container">
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
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowAddForm(true)}
                className="fixed top-4 left-4"
            >
                Add Person
            </Button>
            <PersonForm
                visible={showAddForm}
                onClose={() => setShowAddForm(false)}
                onSubmit={handleCreate}
            />
        </div>
    );
};

export default FamilyTree;
