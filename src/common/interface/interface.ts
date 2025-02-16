export interface TokenPayload {
  id: string;
  plan: string;
  isActive: boolean;
  iat: number;
  exp: number;
}

export interface QueryFind {
  limit?: number;
  page?: number;
  sort?: string;
  search?: string;
}

export interface Users {
  _id: string;
  name: string;
  email: string;
  pwd_hash: string;
  lastAccessDate: Date;
  isActive: boolean;
  plan: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface UserFind {
  _id?: string;
  email?: string;
}

export interface Emails {
  _id: string;
  uid: string;
  name: string;
  data: Array<any>;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface EmailFind {
  _id?: string;
  uid?: string;
  name?: string;
}
export interface CronJobs {
  _id: string;
  uid: string;
  name: string;
  isActive: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface CronJobFind {
  _id?: string;
  uid?: string;
  name?: string;
}
export interface Templates {
  _id: string;
  name: string;
  data: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface TemplateFind {
  _id?: string;
  uid?: string;
  name?: string;
}
