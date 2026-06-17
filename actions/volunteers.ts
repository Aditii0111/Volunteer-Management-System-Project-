'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { store } from '@/lib/store';
import { Availability, VolunteerStatus } from '@/lib/types';

export async function addVolunteer(formData: FormData) {
  const skills = formData.getAll('skills') as string[];
  const availability = formData.getAll('availability') as Availability[];

  store.add({
    name: (formData.get('name') as string).trim(),
    email: (formData.get('email') as string).trim(),
    phone: (formData.get('phone') as string).trim(),
    skills,
    availability,
    status: 'pending',
    hoursContributed: 0,
    bio: (formData.get('bio') as string).trim(),
  });

  revalidatePath('/');
  revalidatePath('/volunteers');
  redirect('/volunteers');
}

export async function deleteVolunteer(id: string) {
  store.delete(id);
  revalidatePath('/');
  revalidatePath('/volunteers');
  redirect('/volunteers');
}

export async function updateStatus(id: string, status: VolunteerStatus) {
  store.update(id, { status });
  revalidatePath('/');
  revalidatePath('/volunteers');
  revalidatePath(`/volunteers/${id}`);
  revalidatePath('/admin');
}
