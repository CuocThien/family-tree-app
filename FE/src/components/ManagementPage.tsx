import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, message, Modal, Image } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { FaMale, FaFemale } from 'react-icons/fa';
import { userService } from '../services/userService';
import { FamilyMember } from '../types';
import PersonForm from './PersonForm';
import dayjs from 'dayjs';
import Search from 'antd/es/input/Search';
import { debounce } from 'lodash';
import { GetAllUsersParams } from '../types/user.interface';

const PAGE_SIZE = 10;

const ManagementPage: React.FC = () => {
    const [users, setUsers] = useState<FamilyMember[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<string | undefined>();
    const [searchText, setSearchText] = useState('');
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: PAGE_SIZE,
        total: 0
    });

    const fetchUsers = async (params: GetAllUsersParams) => {
        setLoading(true);
        try {
            const response = await userService.getAllUsers(params);
            setUsers(response.items);
            setPagination({
                ...pagination,
                total: response.total
            });
        } catch (error) {
            message.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers({
            search_text: searchText,
            skip: (pagination.current - 1) * pagination.pageSize,
            limit: pagination.pageSize
        });
    }, [searchText, pagination.current, pagination.pageSize]);

    const handleDelete = async (id: string) => {
        try {
            await userService.deleteUser(id);
            message.success('User deleted successfully');
            fetchUsers({
                search_text: searchText,
                skip: (pagination.current - 1) * pagination.pageSize,
                limit: pagination.pageSize
            });
        } catch (error) {
            message.error('Failed to delete user');
        }
    };

    const handleTableChange = (newPagination: any) => {
        setPagination(newPagination);
    };

    const debouncedSearch = debounce((value: string) => {
        setSearchText(value);
        setPagination({ ...pagination, current: 1 }); // Reset to first page on search
    }, 500);

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar: string, record: FamilyMember) => (
                avatar ? (
                    <div className="w-12 h-12">
                        <Image
                            src={avatar}
                            alt="avatar"
                            style={{ 
                                width: '48px', 
                                height: '48px', 
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }}
                            preview={{
                                mask: null,
                                maskClassName: "rounded-full",
                                title: record.name
                            }}
                        />
                    </div>
                ) : (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center">
                        {record.gender === 'male' ? (
                            <FaMale className="text-blue-500" size={24} />
                        ) : (
                            <FaFemale className="text-pink-500" size={24} />
                        )}
                    </div>
                )
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Birth Date',
            dataIndex: 'birth_date',
            key: 'birth_date',
            render: (date: string) => dayjs(date).format('YYYY-MM-DD')
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: FamilyMember) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSelectedUser(record._id);
                            setShowForm(true);
                        }}
                    />
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">User Management</h1>
                <Button type="primary" onClick={() => setShowForm(true)}>
                    Add User
                </Button>
            </div>

            <div className="mb-4">
                <Search
                    placeholder="Search by name..."
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onChange={(e) => debouncedSearch(e.target.value)}
                />
            </div>

            <Table
                columns={columns}
                dataSource={users}
                rowKey="_id"
                loading={loading}
                pagination={pagination}
                onChange={handleTableChange}
            />

            <PersonForm
                visible={showForm}
                onClose={() => {
                    setShowForm(false);
                    setSelectedUser(undefined);
                }}
                userId={selectedUser}
                onSubmit={() => {
                    setShowForm(false);
                    setSelectedUser(undefined);
                    fetchUsers({
                        search_text: searchText,
                        skip: (pagination.current - 1) * pagination.pageSize,
                        limit: pagination.pageSize
                    });
                }}
            />
        </div>
    );
};

export default ManagementPage; 