import { Volunteer } from './types';

declare global {
  // eslint-disable-next-line no-var
  var __volunteers: Volunteer[] | undefined;
}

const seed: Volunteer[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    skills: ['Teaching', 'Mentoring', 'Mathematics'],
    availability: ['weekdays', 'evenings'],
    status: 'active',
    joinedDate: '2024-01-15',
    hoursContributed: 120,
    bio: 'Passionate mathematics teacher dedicated to helping underprivileged students excel in academics.',
  },
  {
    id: '2',
    name: 'Aman Verma',
    email: 'aman.verma@example.com',
    phone: '+91 87654 32109',
    skills: ['Web Development', 'Design', 'JavaScript'],
    availability: ['weekends'],
    status: 'active',
    joinedDate: '2024-02-20',
    hoursContributed: 85,
    bio: 'Full-stack developer contributing to digital literacy programs and tech education initiatives.',
  },
  {
    id: '3',
    name: 'Priya Singh',
    email: 'priya.singh@example.com',
    phone: '+91 76543 21098',
    skills: ['Healthcare', 'First Aid', 'Counseling'],
    availability: ['weekdays', 'weekends'],
    status: 'active',
    joinedDate: '2024-01-08',
    hoursContributed: 200,
    bio: 'Registered nurse volunteering at community health camps and awareness programs.',
  },
  {
    id: '4',
    name: 'Arjun Patel',
    email: 'arjun.patel@example.com',
    phone: '+91 65432 10987',
    skills: ['Event Planning', 'Marketing', 'Photography'],
    availability: ['weekends', 'evenings'],
    status: 'active',
    joinedDate: '2024-03-10',
    hoursContributed: 60,
    bio: 'Event management professional helping NGOs organize impactful fundraising events.',
  },
  {
    id: '5',
    name: 'Neha Gupta',
    email: 'neha.gupta@example.com',
    phone: '+91 54321 09876',
    skills: ['Legal', 'Counseling', 'Writing'],
    availability: ['evenings'],
    status: 'pending',
    joinedDate: '2024-06-01',
    hoursContributed: 0,
    bio: 'Law student interested in providing free legal aid to underserved communities.',
  },
  {
    id: '6',
    name: 'Vikram Nair',
    email: 'vikram.nair@example.com',
    phone: '+91 43210 98765',
    skills: ['Sports', 'Coaching', 'Mentoring'],
    availability: ['weekends'],
    status: 'active',
    joinedDate: '2024-02-14',
    hoursContributed: 95,
    bio: 'Former state-level athlete running free sports coaching camps for youth.',
  },
  {
    id: '7',
    name: 'Ananya Krishnan',
    email: 'ananya.k@example.com',
    phone: '+91 32109 87654',
    skills: ['Arts & Crafts', 'Teaching', 'Design'],
    availability: ['weekdays'],
    status: 'inactive',
    joinedDate: '2023-11-20',
    hoursContributed: 45,
    bio: 'Art teacher who ran creative workshops for children with disabilities. Currently on break.',
  },
  {
    id: '8',
    name: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 21098 76543',
    skills: ['Accounting', 'Finance', 'Teaching'],
    availability: ['weekends', 'evenings'],
    status: 'pending',
    joinedDate: '2024-06-10',
    hoursContributed: 0,
    bio: 'Chartered accountant wanting to teach financial literacy to small business owners.',
  },
];

if (!global.__volunteers) {
  global.__volunteers = seed;
}

export const store = {
  getAll(): Volunteer[] {
    return global.__volunteers!;
  },
  get(id: string): Volunteer | undefined {
    return global.__volunteers!.find((v) => v.id === id);
  },
  add(data: Omit<Volunteer, 'id' | 'joinedDate'>): Volunteer {
    const v: Volunteer = {
      ...data,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString().split('T')[0],
    };
    global.__volunteers!.push(v);
    return v;
  },
  update(id: string, data: Partial<Omit<Volunteer, 'id'>>): Volunteer | null {
    const idx = global.__volunteers!.findIndex((v) => v.id === id);
    if (idx === -1) return null;
    global.__volunteers![idx] = { ...global.__volunteers![idx], ...data };
    return global.__volunteers![idx];
  },
  delete(id: string): boolean {
    const idx = global.__volunteers!.findIndex((v) => v.id === id);
    if (idx === -1) return false;
    global.__volunteers!.splice(idx, 1);
    return true;
  },
};
