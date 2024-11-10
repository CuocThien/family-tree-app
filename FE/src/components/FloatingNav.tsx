import React from 'react';
import { Button } from 'antd';
import { TeamOutlined, TableOutlined } from '@ant-design/icons';

interface FloatingNavProps {
  onSwitchView: (view: 'tree' | 'management') => void;
  currentView: 'tree' | 'management';
}

const FloatingNav: React.FC<FloatingNavProps> = ({ onSwitchView, currentView }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white p-2 rounded-full shadow-lg">
      <Button
        type={currentView === 'tree' ? 'primary' : 'default'}
        icon={<TeamOutlined />}
        onClick={() => onSwitchView('tree')}
        shape="circle"
      />
      <Button
        type={currentView === 'management' ? 'primary' : 'default'}
        icon={<TableOutlined />}
        onClick={() => onSwitchView('management')}
        shape="circle"
      />
    </div>
  );
};

export default FloatingNav; 