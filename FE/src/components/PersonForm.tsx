import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Modal, message, Upload } from 'antd';
import { FamilyMember } from '../types';
import { userService } from '../services/userService';
import dayjs from 'dayjs';
import { useFamilyTree } from '../contexts/FamilyTreeContext';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { RcFile, UploadChangeParam } from 'antd/es/upload/interface';
import type { UploadFile } from 'antd/es/upload/interface';

interface PersonFormProps {
  visible: boolean;
  onClose: () => void;
  userId?: string;
  onSubmit?: (values: any) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({
  visible,
  onClose,
  userId,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [users, setUsers] = useState<FamilyMember[]>([]);
  const { refreshFamilyTree } = useFamilyTree();

  useEffect(() => {
    if (visible) {
      fetchUsers();
      if (userId) {
        fetchUserDetails(userId);
      } else {
        form.resetFields();
        setImageUrl(undefined);
      }
    }
  }, [visible, userId, form]);

  const fetchUserDetails = async (id: string) => {
    try {
      const response = await userService.getUser(id);
      const user = response;
      const formattedValues = {
        name: user.name,
        gender: user.gender,
        birth_date: user.birth_date ? dayjs(user.birth_date) : undefined,
        death_date: user.death_date ? dayjs(user.death_date) : undefined,
        spouse_ids: user.spouse_ids || [],
        children_ids: user.children_ids || []
      };
      setImageUrl(user.avatar);
      form.setFieldsValue(formattedValues);
    } catch (error) {
      message.error('Failed to fetch user details');
      onClose();
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response || []);
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  const getBase64 = (img: RcFile): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result as string));
      reader.addEventListener('error', (error) => reject(error));
      reader.readAsDataURL(img);
    });
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const base64Url = await getBase64(info.file.originFileObj as RcFile);
      setImageUrl(base64Url);
      setUploadLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const formattedValues = {
        name: values.name,
        gender: values.gender,
        birth_date: values.birth_date?.format('YYYY-MM-DD'),
        death_date: values.death_date?.format('YYYY-MM-DD'),
        spouse_ids: values.spouse_ids || [],
        children_ids: values.children_ids || [],
        avatar: imageUrl
      };

      if (userId) {
        await userService.updateUser(userId, formattedValues);
        message.success('Person updated successfully');
      } else {
        await userService.createUser(formattedValues);
        message.success('Person created successfully');
      }

      await refreshFamilyTree();
      onSubmit?.(formattedValues);
      onClose();
    } catch (error: any) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err: any) => {
          form.setFields([{
            name: err.field,
            errors: [err.message]
          }]);
        });
      } else {
        message.error('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      title={userId ? 'Edit Person' : 'Add New Person'}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        preserve={false}
        initialValues={{
          spouse_ids: [],
          children_ids: []
        }}
      >
        <Form.Item label="Avatar">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            customRequest={({ onSuccess }) => onSuccess?.('ok')}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the name' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select gender' }]}
        >
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="birth_date"
          label="Birth Date"
          rules={[{ required: true, message: 'Please select birth date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="death_date"
          label="Death Date"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="spouse_ids"
          label="Spouses"
        >
          <Select
            mode="multiple"
            placeholder="Select spouses"
            optionFilterProp="children"
          >
            {users.map(user => (
              <Select.Option 
                key={user._id} 
                value={user._id}
                disabled={user._id === userId}
              >
                {user.name} (Born: {dayjs(user.birth_date).format('YYYY-MM-DD')})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="children_ids"
          label="Children"
        >
          <Select
            mode="multiple"
            placeholder="Select children"
            optionFilterProp="children"
          >
            {users.map(user => (
              <Select.Option 
                key={user._id} 
                value={user._id}
                disabled={user._id === userId}
              >
                {user.name} (Born: {dayjs(user.birth_date).format('YYYY-MM-DD')})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button type="default" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {userId ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PersonForm; 