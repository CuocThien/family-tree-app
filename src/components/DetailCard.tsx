import React from "react";
import { FaTimes } from "react-icons/fa";
import { DetailCardProps } from "../types";

const DetailCard: React.FC<DetailCardProps> = ({ member, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>
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
      </div>
    </div>
  );
};

export default DetailCard;
