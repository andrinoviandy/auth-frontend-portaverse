import { ReactNode } from "react";

interface Employee {
  id: number;
  employee_number: string;
  user_id: number;
  profile_picture: string;
  name: string;
  sme: boolean;
  position?: string;
  entity_id: number | null;
  entity_name: string | null;
  group_id?: number | null;
  group_name: string;
  email: string;
  social_employee_profile_id: number;
  social_avatar: string;
  personal_area_name?: string;
  sub_personal_area_name?: string;
}

export interface EmployeesResponse {
  employees: Employee[];
  totalAccount: number;
  hasMe: boolean;
}

export interface EmployeeOptionItem {
  label: string;
  value: string;
  name: string;
  positionName: string;
  imageUrl: string | null;
  badgeIcon: ReactNode | null;
}
export type EmployeeOptions = EmployeeOptionItem[];
