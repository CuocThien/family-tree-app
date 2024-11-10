import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Space } from 'antd';
import { GB, VN } from 'country-flag-icons/react/3x2';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Space>
        <Button 
          type={i18n.language === 'en' ? 'primary' : 'default'}
          onClick={() => i18n.changeLanguage('en')}
          icon={<GB className="w-4 h-4" />}
        />
        <Button
          type={i18n.language === 'vi' ? 'primary' : 'default'}
          onClick={() => i18n.changeLanguage('vi')}
          icon={<VN className="w-4 h-4" />}
        />
      </Space>
    </div>
  );
};

export default LanguageSwitcher; 