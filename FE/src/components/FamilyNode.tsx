import React, { useState } from "react";
import { FaMale, FaFemale, FaPlus, FaMinus, FaUser } from "react-icons/fa";
import DetailCard from "./DetailCard";
import { FamilyNodeProps } from "../types";
import dayjs from 'dayjs';

const FamilyNode: React.FC<FamilyNodeProps> = ({ node, level, zoom }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const nodeSize = 40 * zoom;
  const spacing = 120 * zoom;

  const renderNodeContent = (person: any) => {
    if (person.avatar) {
      return (
        <div 
          className="w-full h-full rounded-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${person.avatar})`,
            width: nodeSize,
            height: nodeSize
          }}
        />
      );
    }

    return person.gender === "male" ? (
      <FaMale className="text-blue-500" size={nodeSize * 0.5} />
    ) : (
      <FaFemale className="text-pink-500" size={nodeSize * 0.5} />
    );
  };

  const renderNode = (person: any, isMainNode: boolean = false) => (
    <div className="flex flex-col items-center relative">
      <div
        className="relative flex items-center justify-center rounded-full bg-white border-2 border-gray-300 cursor-pointer transition-transform hover:scale-110 overflow-hidden"
        style={{ width: nodeSize, height: nodeSize }}
        onMouseEnter={() => isMainNode && setShowTooltip(true)}
        onMouseLeave={() => isMainNode && setShowTooltip(false)}
        onClick={() => setShowDetail(true)}
        role="button"
        aria-label={`Family member: ${person.name}`}
        tabIndex={0}
      >
        {renderNodeContent(person)}
      </div>
      <div className="text-center mt-2 text-sm font-medium">{person.name}</div>
      {isMainNode && person.children && person.children.length > 0 && (
        <button
          className="absolute bottom-7 -right-1 bg-gray-200 hover:bg-gray-300 rounded-full p-1 z-50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? <FaMinus size={12} /> : <FaPlus size={12} />}
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center">
        {/* Main Node */}
        <div className="relative">
          {renderNode(node, true)}
          {showTooltip && (
            <div className="absolute left-full ml-2 p-2 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap z-50">
              <p>Name: {node.name}</p>
              <p>Birth Date: {dayjs(node.birth_date).format('YYYY-MM-DD')}</p>
              {node.spouses && node.spouses.length > 0 && (
                <p>Spouse: {node.spouses[0].name}</p>
              )}
            </div>
          )}
        </div>

        {/* Spouse Connection and Node */}
        {node.spouses && node.spouses.length > 0 && (
          <>
            <div
              className="border-t-2 border-gray-300"
              style={{ width: spacing / 2 }}
            ></div>
            <div className="relative">
              {renderNode(node.spouses[0])}
            </div>
          </>
        )}
      </div>

      {node.children && node.children.length > 0 && isExpanded && (
        <div
          className="relative mt-8 flex justify-center"
          style={{ gap: `${spacing}px` }}
        >
          <div className="absolute top-[-20px] w-full border-t-2 border-gray-300"></div>
          {node.children.map((child) => (
            <div key={child._id} className="relative">
              <div className="absolute top-[-20px] h-5 border-l-2 border-gray-300 left-1/2"></div>
              <FamilyNode node={child} level={level + 1} zoom={zoom} />
            </div>
          ))}
        </div>
      )}

      {showDetail && (
        <DetailCard 
          member={node} 
          onClose={() => setShowDetail(false)} 
          visible={showDetail} 
        />
      )}
    </div>
  );
};

export default FamilyNode;
