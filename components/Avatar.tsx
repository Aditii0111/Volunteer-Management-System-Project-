const gradients = [
  'from-indigo-400 to-purple-500',
  'from-blue-400 to-cyan-500',
  'from-rose-400 to-pink-500',
  'from-amber-400 to-orange-500',
  'from-teal-400 to-emerald-500',
  'from-violet-400 to-fuchsia-500',
];

export default function Avatar({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const gradient = gradients[name.charCodeAt(0) % gradients.length];
  const sizeClass = size === 'sm' ? 'w-8 h-8 text-xs' : size === 'lg' ? 'w-16 h-16 text-xl' : 'w-10 h-10 text-sm';

  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold shrink-0`}>
      {initials}
    </div>
  );
}
