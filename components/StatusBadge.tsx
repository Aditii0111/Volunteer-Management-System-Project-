import { VolunteerStatus } from '@/lib/types';

const styles: Record<VolunteerStatus, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-600',
  pending: 'bg-yellow-100 text-yellow-700',
};

const dots: Record<VolunteerStatus, string> = {
  active: 'bg-green-500',
  inactive: 'bg-gray-400',
  pending: 'bg-yellow-500',
};

export default function StatusBadge({ status }: { status: VolunteerStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
}
