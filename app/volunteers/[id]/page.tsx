import { notFound } from 'next/navigation';
import Link from 'next/link';
import { store } from '@/lib/store';
import StatusBadge from '@/components/StatusBadge';
import Avatar from '@/components/Avatar';
import DeleteButton from '@/components/DeleteButton';
import StatusUpdater from '@/components/StatusUpdater';
import { ArrowLeft, Mail, Phone, Clock, Calendar, CheckCircle } from 'lucide-react';

export default async function VolunteerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const volunteer = store.get(id);
  if (!volunteer) notFound();

  const availabilityLabel: Record<string, string> = {
    weekdays: 'Mon–Fri',
    weekends: 'Sat–Sun',
    evenings: 'Evenings',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/volunteers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Volunteers
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-5">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-24" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <Avatar name={volunteer.name} size="lg" />
            <div className="flex items-center gap-2 mt-8">
              <StatusUpdater id={volunteer.id} current={volunteer.status} />
              <DeleteButton id={volunteer.id} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-gray-900">{volunteer.name}</h1>
              <StatusBadge status={volunteer.status} />
            </div>
            <p className="text-gray-600 text-sm">{volunteer.bio}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Contact */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Contact</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <a href={`mailto:${volunteer.email}`} className="text-indigo-600 hover:underline truncate">
                {volunteer.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-700">{volunteer.phone || '—'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-700">
                Joined{' '}
                {new Date(volunteer.joinedDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="text-gray-700">
                <span className="font-semibold text-gray-900">{volunteer.hoursContributed}</span> hours contributed
              </span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Availability</h2>
          {volunteer.availability.length === 0 ? (
            <p className="text-sm text-gray-400">Not specified</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {volunteer.availability.map((slot) => (
                <div key={slot} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5" />
                  {availabilityLabel[slot] || slot}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:col-span-2">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Skills</h2>
          {volunteer.skills.length === 0 ? (
            <p className="text-sm text-gray-400">No skills listed</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {volunteer.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm rounded-full font-medium">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
