export type UserRegType = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type CategoryType = {
    id: number;
  day: string;
  time: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  };
  
  export type CategoryTypeArray = CategoryType[];
  