import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Modal } from 'antd';
import { FamilyMember } from '../types';
import { familyData } from '../familyData';

interface PersonFormProps {
  visible: boolean;
  onClose: () => void;
  initialValues?: FamilyMember;
  onSubmit: (values: any) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({
  visible,
  onClose,
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [allPeople, setAllPeople] = useState<FamilyMember[]>([]);

  // Flatten family tree to get all people for relationship selection
  const flattenFamilyTree = (node: FamilyMember): FamilyMember[] => {
    let result: FamilyMember[] = [node];
    if (node.spouseData) {
      result.push(node.spouseData);
    }
    if (node.children) {
      node.children.forEach(child => {
        result = result.concat(flattenFamilyTree(child));
      });
    }
    return result;
  };

  useEffect(() => {
    const people = flattenFamilyTree(familyData);
    setAllPeople(people);
  }, []);

  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        birthYear: initialValues.birthYear,
        spouse: initialValues.spouseData?.id,
      });
    } else {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      id: initialValues?.id || Math.max(...allPeople.map(p => p.id)) + 1,
      spouseData: values.spouse ? allPeople.find(p => p.id === values.spouse) : undefined,
    };
    onSubmit(formattedValues);
    onClose();
  };

  return (
    <Modal
      title={initialValues ? 'Edit Person' : 'Add New Person'}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
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
          name="birthYear"
          label="Birth Year"
          rules={[{ required: true, message: 'Please input birth year' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="spouse"
          label="Spouse"
        >
          <Select
            showSearch
            allowClear
            placeholder="Select a spouse"
            filterOption={(input, option) =>
              (option?.children as unknown as string)?.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {allPeople
              .filter(person => person.id !== initialValues?.id)
              .map(person => (
                <Select.Option key={person.id} value={person.id}>
                  {person.name} ({person.birthYear})
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Button type="default" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {initialValues ? 'Update' : 'Create'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PersonForm; 