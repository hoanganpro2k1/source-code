export interface ProfilePermission {
  id: number;
  name: string;
  module: string;
  path: string;
  method: string;
}

export interface ProfileRole {
  id: number;
  name: string;
  permissions: ProfilePermission[];
}

export interface Profile {
  id: number;
  email: string;
  name: string;
  phoneNumber: string;
  avatar: string | null;
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  roleId: number;
  createdById: number | null;
  updatedById: number | null;
  deletedById: number | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  role: ProfileRole;
}
