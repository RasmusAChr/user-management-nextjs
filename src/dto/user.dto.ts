import { Gender } from '@/types/user';

// For creating a new user (incoming data)
export interface CreateUserDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  phoneNumber: string;
  country: string;
  password: string;
}

// For returning user data (outgoing data - NO password)
export interface UserResponseDto {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  phoneNumber: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

// For updating user data (optional fields)s
export interface UpdateUserDto {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  phoneNumber?: string;
  country?: string;
}

// For password changes (separate from user updates)
export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}