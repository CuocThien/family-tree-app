export interface FamilyMember {
    id: number;
    name: string;
    gender: "male" | "female";
    birthYear: number;
    spouse?: string;
    spouseData?: FamilyMember;
    children?: FamilyMember[];
}

export interface DetailCardProps {
    member: FamilyMember;
    onClose: () => void;
}

export interface FamilyNodeProps {
    node: FamilyMember;
    level: number;
    zoom: number;
}
