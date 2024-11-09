import React, { useState } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import { Button } from 'antd';
import { DetailCardProps } from "../types";
import PersonForm from "./PersonForm";

const DetailCard: React.FC<DetailCardProps> = ({ member, onClose }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleUpdate = (updatedMember: any) => {
    console.log('Updated member:', updatedMember);
  };

  return (
    <>
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
          <h2 className="text-2xl font-bold mb-4">{member.name}</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Gender:</span> {member.gender}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Birth Year:</span> {member.birthYear}
            </p>
            {member.spouse && (
              <p className="text-gray-700">
                <span className="font-semibold">Spouse:</span> {member.spouse}
              </p>
            )}
            {member.children && (
              <div>
                <p className="font-semibold text-gray-700">Children:</p>
                <ul className="list-disc list-inside">
                  {member.children.map((child) => (
                    <li key={child.id} className="text-gray-700">
                      {child.name} ({child.birthYear})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
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
        </div>
      </div>

      <PersonForm
        visible={showEditForm}
        onClose={() => setShowEditForm(false)}
        initialValues={member}
        onSubmit={handleUpdate}
      />
    </>
  );
};

export default DetailCard;
