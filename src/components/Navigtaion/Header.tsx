import Image from 'next/image';
import Link from 'next/link';
import Navlinks from './Navlinks';
import { Category } from './type';
import MobileMenu from './MobileMenu';

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/categories',
  );
  if (!res.ok) return [];
  return res.json();
};

const Header = async () => {
  const categories = await getCategories();

  const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
    timeZone: 'Asia/Dhaka',
  });

  return (
    <header className="sticky top-0 z-40 bg-[#F9FBF8]">
      <div className="border-b border-[#e4e4e4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          {/* Left: logo + title + date */}
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#05893E] shadow-sm">
              <Image
                src="/logo.png"
                width={22}
                height={22}
                alt="bazar-dor logo"
                className="h-5.5 w-5.5 object-contain"
              />
            </div>

            <div className="min-w-0 leading-tight">
              <div className="text-lg font-bold text-[#1a1a1a] sm:text-xl">
                বাজার দর
              </div>
              <div className="truncate text-[11px] text-gray-700 sm:text-xs">
                {date}
              </div>
            </div>
          </Link>

          {/* Desktop buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-[#1a1a1a] transition hover:bg-black/5"
            >
              সাইন ইন
            </button>
            <button
              type="button"
              className="rounded-xl border border-[#047a37] bg-[#05893E] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(5,137,62,0.35)] transition hover:bg-[#047a37]"
            >
              সাইন আপ
            </button>
          </div>

          {/* Mobile hamburger */}
          <MobileMenu categories={categories} date={date} />
        </div>
      </div>

      {/* Desktop category nav */}
      <Navlinks categories={categories} />
    </header>
  );
};

export default Header;
