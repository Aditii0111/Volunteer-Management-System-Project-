'use client';

import { updateStatus } from '@/actions/volunteers';
import { VolunteerStatus } from '@/lib/types';

export default function StatusUpdater({ id, current }: { id: string; current: VolunteerStatus }) {
  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await updateStatus(id, e.target.value as VolunteerStatus);
  }

  return (
    <select
      defaultValue={current}
      onChange={handleChange}
      className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
    >
      <option value="active">Active</option>
      <option value="pending">Pending</option>
      <option value="inactive">Inactive</option>
    </select>
  );
}
