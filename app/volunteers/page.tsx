import Link from 'next/link';
import { store } from '@/lib/store';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import { UserPlus, Search, Users } from 'lucide-react';

export default async function VolunteersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;
  let volunteers = store.getAll();

  if (q) {
    const query = q.toLowerCase();
    volunteers = volunteers.filter(
      (v) =>
        v.name.toLowerCase().includes(query) ||
        v.email.toLowerCase().includes(query) ||
        v.skills.some((s) => s.toLowerCase().includes(query))
    );
  }

  if (status && status !== 'all') {
    volunteers = volunteers.filter((v) => v.status === status);
  }

  const tabs = ['all', 'active', 'pending', 'inactive'] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteers</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {volunteers.length} volunteer{volunteers.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Link
          href="/volunteers/new"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          <UserPlus className="w-4 h-4" />
          Add Volunteer
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap gap-3 items-center">
        <form action="/volunteers" method="GET" className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search name, email, or skill…"
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {status && <input type="hidden" name="status" value={status} />}
          <button type="submit" className="sr-only">Search</button>
        </form>
        <div className="flex gap-1">
          {tabs.map((t) => (
            <Link
              key={t}
              href={`/volunteers?${q ? `q=${encodeURIComponent(q)}&` : ''}status=${t}`}
              className={`px-3 py-2 text-sm rounded-lg capitalize transition-colors ${
                (status || 'all') === t
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid */}
      {volunteers.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="font-medium text-gray-600">No volunteers found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {volunteers.map((v) => (
            <Link
              key={v.id}
              href={`/volunteers/${v.id}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar name={v.name} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{v.name}</p>
                    <p className="text-xs text-gray-500">{v.email}</p>
                  </div>
                </div>
                <StatusBadge status={v.status} />
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{v.bio}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {v.skills.slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {v.skills.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                    +{v.skills.length - 3}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                <span>
                  Joined{' '}
                  {new Date(v.joinedDate).toLocaleDateString('en-IN', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
                <span className="font-medium text-gray-700">{v.hoursContributed}h contributed</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
