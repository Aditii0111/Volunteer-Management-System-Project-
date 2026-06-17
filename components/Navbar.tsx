import Link from 'next/link';
import { Users, LayoutDashboard, Shield, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <Users className="w-5 h-5" />
            VolunteerHub
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link href="/volunteers" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Users className="w-4 h-4" />
              Volunteers
            </Link>
            <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Shield className="w-4 h-4" />
              Admin
            </Link>
            <Link href="/volunteers/new" className="flex items-center gap-2 px-4 py-2 ml-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              <UserPlus className="w-4 h-4" />
              Add Volunteer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
