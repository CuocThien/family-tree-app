import { FamilyMember } from "./types";

export const familyData: FamilyMember = {
    id: 1,
    name: "John Smith",
    gender: "male",
    birthYear: 1950,
    spouse: "Mary Smith",
    spouseData: {
        id: 7,
        name: "Mary Smith",
        gender: "female",
        birthYear: 1952,
    },
    children: [
        {
            id: 2,
            name: "David Smith",
            gender: "male",
            birthYear: 1975,
            spouse: "Sarah Smith",
            spouseData: {
                id: 8,
                name: "Sarah Smith",
                gender: "female",
                birthYear: 1977,
            },
            children: [
                {
                    id: 4,
                    name: "Emily Smith",
                    gender: "female",
                    birthYear: 2000,
                },
                {
                    id: 5,
                    name: "Michael Smith",
                    gender: "male",
                    birthYear: 2003,
                },
            ],
        },
        {
            id: 3,
            name: "Lisa Johnson",
            gender: "female",
            birthYear: 1978,
            spouse: "Tom Johnson",
            spouseData: {
                id: 9,
                name: "Tom Johnson",
                gender: "male",
                birthYear: 1976,
            },
            children: [
                {
                    id: 6,
                    name: "Emma Johnson",
                    gender: "female",
                    birthYear: 2005,
                },
            ],
        },
    ],
};
