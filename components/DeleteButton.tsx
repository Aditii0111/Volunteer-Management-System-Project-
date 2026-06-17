'use client';

import { deleteVolunteer } from '@/actions/volunteers';
import { Trash2 } from 'lucide-react';

export default function DeleteButton({ id }: { id: string }) {
  async function handleDelete() {
    if (!confirm('Are you sure you want to remove this volunteer?')) return;
    await deleteVolunteer(id);
  }

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </button>
  );
}
