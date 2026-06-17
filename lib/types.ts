export type VolunteerStatus = 'active' | 'inactive' | 'pending';
export type Availability = 'weekdays' | 'weekends' | 'evenings';

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  availability: Availability[];
  status: VolunteerStatus;
  joinedDate: string;
  hoursContributed: number;
  bio: string;
}

export const ALL_SKILLS = [
  'Teaching', 'Mentoring', 'Mathematics', 'Web Development', 'Design',
  'JavaScript', 'Healthcare', 'First Aid', 'Counseling', 'Event Planning',
  'Marketing', 'Photography', 'Legal', 'Writing', 'Sports', 'Coaching',
  'Arts & Crafts', 'Accounting', 'Finance',
] as const;

export const ALL_AVAILABILITY: Availability[] = ['weekdays', 'weekends', 'evenings'];
