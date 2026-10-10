'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from './type';

const Navlinks = ({ categories }: { categories: Category[] }) => {
  const pathname = usePathname();

  return (
    <nav className="hidden border-b border-[#e4e4e4] md:block">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-center gap-1">
          {categories.map((n) => {
            const href = `/category/${n.slug}`;
            const active = pathname === href;

            return (
              <Link
                key={n.slug}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold whitespace-nowrap transition ${
                  active
                    ? 'bg-[#05893E]/10 text-[#05893E] ring-1 ring-[#05893E]/25'
                    : 'text-[#1a1a1a] hover:bg-[#05893E]/10 hover:text-[#05893E]'
                }`}
              >
                <span
                  className={`text-lg transition-transform ${
                    active ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                >
                  {n.icon}
                </span>
                <span>{n.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;
