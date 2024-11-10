export interface FamilyMember {
    _id: string;
    name: string;
    gender: "male" | "female";
    birth_date: string;
    death_date?: string;
    avatar?: string;
    spouse_ids: string[];
    children_ids: string[];
    spouses?: FamilyMember[];
    children?: FamilyMember[];
}

export interface DetailCardProps {
    member: FamilyMember;
    onClose: () => void;
    visible: boolean;
}

export interface FamilyNodeProps {
    node: FamilyMember;
    level: number;
    zoom: number;
}
