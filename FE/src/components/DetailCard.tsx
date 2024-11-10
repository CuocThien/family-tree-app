import React, { useEffect, useState } from "react";
import { FaTimes, FaEdit } from "react-icons/fa";
import { Button, Modal } from 'antd';
import { DetailCardProps } from "../types";
import PersonForm from "./PersonForm";
import dayjs from 'dayjs';
import { useFamilyTree } from "../contexts/FamilyTreeContext";
import { useTranslation } from "react-i18next";
import { userService } from "../services/userService";
const DetailCard: React.FC<DetailCardProps> = ({ member, onClose, visible }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { refreshFamilyTree } = useFamilyTree();
  const [detailMember, setDetailMember] = useState<any>(null);
  const { t } = useTranslation();
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('DD/MM/YYYY');
  };

  const fetchMember = async () => {
    const detailMember = await userService.getUser(member._id);
    setDetailMember(detailMember);
  };

  useEffect(() => {
    if (member) {
      fetchMember();
    }
  }, [member]);

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
              {t('common.edit')}
            </Button>
            <Button
              type="default"
              icon={<FaTimes />}
              onClick={onClose}
            >
              {t('common.close')}
            </Button>
          </div>
        )}
        width="auto"
        style={{ maxWidth: '600px', minWidth: '400px' }}
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">{t('user.gender')}:</span> {detailMember?.gender === 'male' ? t('user.male') : t('user.female')}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">{t('user.birthDate')}:</span> {formatDate(detailMember?.birth_date)}
          </p>
          {detailMember?.death_date && (
            <p className="text-gray-700">
              <span className="font-semibold">{t('user.deathDate')}:</span> {formatDate(detailMember?.death_date)}
            </p>
          )}
          {detailMember?.spouses && detailMember?.spouses.length > 0 && (
            <div>
              <p className="font-semibold text-gray-700 mb-2">{t('user.form.spouse')}:</p>
              <ul className="list-disc list-inside">
                {detailMember?.spouses.map((spouse: any) => (
                  <li key={spouse._id} className="text-gray-700">
                    {spouse.name} ({t('user.born')}: {formatDate(spouse.birth_date)})
                  </li>
                ))}
              </ul>
            </div>
          )}
          {detailMember?.children_ids && detailMember?.children_ids.length > 0 && (
            <div>
              <p className="font-semibold text-gray-700 mb-2">{t('user.form.children')}:</p>
              <ul className="list-disc list-inside">
                {detailMember?.children_ids.map((child: any) => (
                  <li key={child._id} className="text-gray-700">
                    {child.name} ({t('user.born')}: {formatDate(child.birth_date)})
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
