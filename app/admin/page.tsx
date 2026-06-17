import { store } from '@/lib/store';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import StatusUpdater from '@/components/StatusUpdater';
import DeleteButton from '@/components/DeleteButton';
import Link from 'next/link';
import { Shield, Users, Clock, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  const volunteers = store.getAll();
  const pending = volunteers.filter((v) => v.status === 'pending');
  const active = volunteers.filter((v) => v.status === 'active');
  const inactive = volunteers.filter((v) => v.status === 'inactive');
  const totalHours = volunteers.reduce((sum, v) => sum + v.hoursContributed, 0);

  const topContributors = [...active]
    .sort((a, b) => b.hoursContributed - a.hoursContributed)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500">Manage volunteer statuses and view system overview</p>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-gray-900">{volunteers.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-700">{active.length}</p>
          <p className="text-xs text-green-600 mt-1">Active</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-yellow-700">{pending.length}</p>
          <p className="text-xs text-yellow-600 mt-1">Pending</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-gray-600">{inactive.length}</p>
          <p className="text-xs text-gray-500 mt-1">Inactive</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="lg:col-span-2">
          {pending.length > 0 && (
            <div className="bg-white rounded-xl border border-yellow-200 overflow-hidden mb-5">
              <div className="px-5 py-4 bg-yellow-50 border-b border-yellow-100 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <h2 className="font-semibold text-yellow-800 text-sm">
                  Pending Approvals ({pending.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-50">
                {pending.map((v) => (
                  <div key={v.id} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={v.name} size="sm" />
                      <div>
                        <Link href={`/volunteers/${v.id}`} className="text-sm font-medium text-gray-900 hover:text-indigo-600">
                          {v.name}
                        </Link>
                        <p className="text-xs text-gray-500">{v.skills.slice(0, 2).join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusUpdater id={v.id} current={v.status} />
                      <DeleteButton id={v.id} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Volunteers Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <h2 className="font-semibold text-gray-900 text-sm">All Volunteers</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {volunteers.map((v) => (
                <div key={v.id} className="flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={v.name} size="sm" />
                    <div>
                      <Link href={`/volunteers/${v.id}`} className="text-sm font-medium text-gray-900 hover:text-indigo-600">
                        {v.name}
                      </Link>
                      <p className="text-xs text-gray-500">{v.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 hidden md:block">{v.hoursContributed}h</span>
                    <StatusBadge status={v.status} />
                    <StatusUpdater id={v.id} current={v.status} />
                    <DeleteButton id={v.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Top Contributors */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-purple-500" />
              <h3 className="font-semibold text-gray-900 text-sm">Top Contributors</h3>
            </div>
            <div className="space-y-3">
              {topContributors.map((v, i) => (
                <div key={v.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 w-4">#{i + 1}</span>
                  <Avatar name={v.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{v.name}</p>
                  </div>
                  <span className="text-sm font-semibold text-purple-600">{v.hoursContributed}h</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
            <h3 className="font-semibold text-indigo-900 text-sm mb-3">Total Impact</h3>
            <p className="text-3xl font-bold text-indigo-700">{totalHours}h</p>
            <p className="text-xs text-indigo-500 mt-1">hours contributed across all volunteers</p>
            <p className="text-xs text-indigo-600 mt-3">
              Avg {active.length > 0 ? Math.round(active.reduce((s, v) => s + v.hoursContributed, 0) / active.length) : 0}h per active volunteer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
