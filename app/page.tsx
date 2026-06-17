import Link from 'next/link';
import { store } from '@/lib/store';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import { Users, Clock, Zap, TrendingUp, ArrowRight, UserPlus } from 'lucide-react';

export default function Dashboard() {
  const volunteers = store.getAll();
  const active = volunteers.filter((v) => v.status === 'active').length;
  const pending = volunteers.filter((v) => v.status === 'pending').length;
  const totalHours = volunteers.reduce((sum, v) => sum + v.hoursContributed, 0);
  const allSkills = new Set(volunteers.flatMap((v) => v.skills));
  const recent = [...volunteers].reverse().slice(0, 5);

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-indigo-200 text-sm font-medium mb-1">Welcome back</p>
          <h1 className="text-3xl font-bold mb-2">VolunteerHub Dashboard</h1>
          <p className="text-indigo-100 mb-6 max-w-xl">
            Manage, track, and celebrate your volunteer community in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/volunteers/new"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors text-sm"
            >
              <UserPlus className="w-4 h-4" />
              Add Volunteer
            </Link>
            <Link
              href="/volunteers"
              className="inline-flex items-center gap-2 bg-indigo-500 text-white border border-indigo-400 px-4 py-2 rounded-lg font-medium hover:bg-indigo-400 transition-colors text-sm"
            >
              View All Volunteers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Users className="w-5 h-5 text-indigo-600" />} label="Total Volunteers" value={volunteers.length} bg="bg-indigo-50" />
          <StatCard icon={<Zap className="w-5 h-5 text-green-600" />} label="Active" value={active} bg="bg-green-50" />
          <StatCard icon={<Clock className="w-5 h-5 text-purple-600" />} label="Hours Contributed" value={totalHours} bg="bg-purple-50" />
          <StatCard icon={<TrendingUp className="w-5 h-5 text-orange-600" />} label="Unique Skills" value={allSkills.size} bg="bg-orange-50" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Volunteers */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Recent Volunteers</h2>
              <Link href="/volunteers" className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recent.map((v) => (
                <Link key={v.id} href={`/volunteers/${v.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar name={v.name} size="sm" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{v.name}</p>
                      <p className="text-xs text-gray-500">{v.skills.slice(0, 2).join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 hidden sm:block">{v.hoursContributed}h</span>
                    <StatusBadge status={v.status} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {pending > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-yellow-800 mb-1">Pending Approvals</p>
                <p className="text-sm text-yellow-700 mb-3">
                  {pending} volunteer{pending > 1 ? 's' : ''} waiting for review.
                </p>
                <Link href="/admin" className="text-xs font-medium text-yellow-700 hover:text-yellow-800 underline">
                  Go to Admin →
                </Link>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Available Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {[...allSkills].slice(0, 12).map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 text-sm mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/volunteers/new" className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                  <UserPlus className="w-4 h-4" /> Add new volunteer
                </Link>
                <Link href="/admin" className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                  <Users className="w-4 h-4" /> Manage all volunteers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: number; bg: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
      <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
