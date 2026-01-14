export class UserResponseDto {
  id: string;
  email: string;
  fullName: string;
  isActive?: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
