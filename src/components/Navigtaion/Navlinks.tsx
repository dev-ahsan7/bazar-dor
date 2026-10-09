import Link from 'next/link';
import { Category } from './type';

const Navlinks = ({ categories }: { categories: Category[] }) => {
  return (
    <nav className="hidden border-b border-[#e4e4e4] md:block">
      <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-center gap-1">
          {categories.map((n) => (
            <Link
              key={n.slug}
              href={`/category/${n.slug}`}
              className="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-[#1a1a1a] transition hover:bg-[#05893E]/10 hover:text-[#05893E]"
            >
              <span className="text-lg transition-transform group-hover:scale-110">
                {n.icon}
              </span>
              <span>{n.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;
