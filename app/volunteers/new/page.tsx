import { addVolunteer } from '@/actions/volunteers';
import { ALL_SKILLS, ALL_AVAILABILITY } from '@/lib/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NewVolunteerPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/volunteers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Volunteers
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
          <h1 className="text-xl font-bold text-white">Add New Volunteer</h1>
          <p className="text-indigo-100 text-sm mt-1">Fill in the details to register a new volunteer.</p>
        </div>

        <form action={addVolunteer} className="p-6 space-y-6">
          {/* Personal Info */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="email@example.com"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </section>

          {/* Bio */}
          <section>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              placeholder="Brief description of the volunteer's background and motivation…"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALL_SKILLS.map((skill) => (
                <label key={skill} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">{skill}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Availability */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Availability</h2>
            <div className="flex flex-wrap gap-4">
              {ALL_AVAILABILITY.map((slot) => (
                <label key={slot} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="availability"
                    value={slot}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-600 capitalize group-hover:text-gray-900">{slot}</span>
                </label>
              ))}
            </div>
          </section>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <Link href="/volunteers" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
              Cancel
            </Link>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Volunteer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
