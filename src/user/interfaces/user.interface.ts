import { Document } from 'mongoose';
import { Address } from './address.interface';

export interface User extends Document {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  createdAt: Date;
  bankAccountNumber?: string;
  bankAccountOwnerName?: string;
  roles: string[];
  verification?: string;
  verified: boolean;
  verificationExpires: Date;
  loginAttempts: number;
  blockExpires: Date;
  address: Address[];
}
