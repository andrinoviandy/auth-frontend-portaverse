export interface AgendaGuest {
  employee_id: number;
  social_employee_profile_id: number;
  name: string;
  profile_picture?: string;
  employee_number?: string;
  is_sme?: boolean;
}
export interface PersonalAgenda {
  personal_agenda_id: number;
  creator_social_employee_id: number;
  creator_social_employee_profile_id: number;
  creator_name: string;
  creator_employee_number: string;
  title: string;
  description: string;
  /** 'Online' / 'Offline' */
  type: string;
  /** Date formatted in ISO String */
  start_date: string;
  /** Date formatted in ISO String */
  end_date: string;
  offline_location: string | null;
  online_url: string | null;
  guests: AgendaGuest[];
}

export interface CommunityAgenda {
  agenda_id: number;
  cop_id: number;
  cop_name: string;
  title: string;
  description: string;
  /** 'Online' / 'Offline' */
  type: string;
  /** Date formatted in ISO String */
  start_date: string;
  /** Date formatted in ISO String */
  end_date: string;
  speaker: AgendaGuest[];
  offline_location: {
    address: string;
    name: string;
    url: string;
  } | null;
  online_url: string | null;
  is_coi: boolean;
  bg_pic: string | null;
}

export interface CalendarDate {
  date: string;
  counts: {
    personal: number;
    community: number;
  };
}
export interface CalendarSummaryResponse {
  date: CalendarDate[];
}
