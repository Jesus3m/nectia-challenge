export interface User {
  _id?: string;
  name: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
