export interface Task {
  _id?: string;
  title: string;
  description?: string;
  user_id: string;
  status: string;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
