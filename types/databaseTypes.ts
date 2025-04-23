export interface contact {
  contact_id: number;
  name: string;
  type_of_relationship: string | undefined;
  timezone: string;
  date_of_birth: string | undefined;
  date_of_last_contact: string | undefined;
  isCard: boolean;
  messaging_link: String | undefined;
  avatar_url: string;
  username: string | null;
}

export interface User {
  avatar_url: string;
  date_of_birth: string;
  first_name: string;
  last_name: string;
  timezone: string;
  username: string;
}
