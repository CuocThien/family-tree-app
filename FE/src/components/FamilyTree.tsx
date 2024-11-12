import React, { useState, useEffect } from "react";
import { Button, Select, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useFamilyTree } from "../contexts/FamilyTreeContext";
import FamilyNode from "./FamilyNode";
import PersonForm from './PersonForm';
import { userService } from '../services/userService';
import type { FamilyMember } from '../types';
import { FaMinus, FaPlus } from "react-icons/fa";

const FamilyTree: React.FC = () => {
    const [zoom, setZoom] = useState(1);
    const [showAddForm, setShowAddForm] = useState(false);
    const [users, setUsers] = useState<FamilyMember[]>([]);
    const [selectedRootId, setSelectedRootId] = useState<string>('');
    const { familyTreeData, isLoading, fetchFamilyTree } = useFamilyTree();
    const { t } = useTranslation();

    // Load users only once when component mounts
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await userService.getAllUsers({});
                setUsers(response.items);
                // Only set initial root ID if not already set
                if (response.items.length > 0 && !selectedRootId) {
                    setSelectedRootId(response.items[0]._id);
                }
            } catch (error) {
                console.error('Failed to load users:', error);
            }
        };
        loadUsers();
    }, []); // Empty dependency array

    // Fetch family tree only when selectedRootId changes
    useEffect(() => {
        if (selectedRootId) {
            fetchFamilyTree(selectedRootId);
        }
    }, [selectedRootId]); // Remove fetchFamilyTree from dependencies

    const handleRootChange = (value: string) => {
        setSelectedRootId(value);
    };

    const handleZoomIn = () => {
        setZoom((prevZoom) => Math.min(prevZoom + 0.1, 2));
    };

    const handleZoomOut = () => {
        setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.5));
    };

    const handleAddSuccess = () => {
        setShowAddForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="fixed top-4 right-4 flex items-center gap-4">
                <Select
                    value={selectedRootId}
                    onChange={handleRootChange}
                    style={{ width: 200 }}
                    loading={isLoading}
                >
                    {users.map(user => (
                        <Select.Option key={user._id} value={user._id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
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
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        familyTreeData && <FamilyNode node={familyTreeData} level={0} zoom={zoom} />
                    )}
                </div>
            </div>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setShowAddForm(true)}
                className="fixed top-4 left-4"
            >
                {t('user.addUser')}
            </Button>
            <PersonForm
                visible={showAddForm}
                onClose={() => setShowAddForm(false)}
                onSubmit={handleAddSuccess}
            />
        </div>
    );
};

export default FamilyTree;
