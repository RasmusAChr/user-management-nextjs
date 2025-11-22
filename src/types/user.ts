export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
    UNSPECIFIED = 'UNSPECIFIED'
}

export const genderOptions = [
    { value: Gender.MALE, label: 'Male' },
    { value: Gender.FEMALE, label: 'Female' },
    { value: Gender.OTHER, label: 'Other' },
    { value: Gender.UNSPECIFIED, label: 'Prefer not to say' }
];

export interface RegisterUserFormData {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNumber: string;
    country: string;
    password: string;
}
