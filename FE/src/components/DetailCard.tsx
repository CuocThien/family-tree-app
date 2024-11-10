import React, { useState } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import { Button, Modal } from 'antd';
import { DetailCardProps } from "../types";
import PersonForm from "./PersonForm";
import dayjs from 'dayjs';
import { useFamilyTree } from "../contexts/FamilyTreeContext";

const DetailCard: React.FC<DetailCardProps> = ({ member, onClose, visible }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { refreshFamilyTree } = useFamilyTree();

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMMM D, YYYY');
  };

  const handleEditSuccess = async () => {
    await refreshFamilyTree();
    setShowEditForm(false);
    onClose();
  };

  return (
    <>
      <Modal
        title={member.name}
        open={visible}
        onCancel={onClose}
        centered
        footer={(
          <div className="flex justify-center gap-4">
            <Button
              type="primary"
              icon={<FaEdit />}
              onClick={() => setShowEditForm(true)}
            >
              Edit
            </Button>
            <Button
              type="default"
              icon={<FaTimes />}
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        )}
        width="auto"
        style={{ maxWidth: '600px', minWidth: '400px' }}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">Gender:</span> {member.gender}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Birth Date:</span> {formatDate(member.birth_date)}
          </p>
          {member.death_date && (
            <p className="text-gray-700">
              <span className="font-semibold">Death Date:</span> {formatDate(member.death_date)}
            </p>
          )}
          {member.spouses && member.spouses.length > 0 && (
            <div>
              <p className="font-semibold text-gray-700 mb-2">Spouses:</p>
              <ul className="list-disc list-inside">
                {member.spouses.map((spouse) => (
                  <li key={spouse._id} className="text-gray-700">
                    {spouse.name} (Born: {formatDate(spouse.birth_date)})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {member.children && member.children.length > 0 && (
            <div>
              <p className="font-semibold text-gray-700 mb-2">Children:</p>
              <ul className="list-disc list-inside">
                {member.children.map((child) => (
                  <li key={child._id} className="text-gray-700">
                    {child.name} (Born: {formatDate(child.birth_date)})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Modal>

      <PersonForm
        visible={showEditForm}
        onClose={() => setShowEditForm(false)}
        userId={member._id}
        onSubmit={handleEditSuccess}
      />
    </>
  );
};

export default DetailCard;
