'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bars, ChevronRight, Xmark } from '@gravity-ui/icons';
import { Category } from './type';

type Props = {
  categories: Category[];
  date: string;
};

const MobileMenu = ({ categories, date }: Props) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    // Esc closes the menu
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    // Close if the screen grows to desktop size while open
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };

    // Lock page scroll behind the drawer
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', onKeyDown);
    mq.addEventListener('change', onChange);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
      mq.removeEventListener('change', onChange);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="মেনু খুলুন"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e4e4e4] bg-white text-[#1a1a1a] shadow-sm transition hover:bg-[#05893E]/10 hover:text-[#05893E] active:scale-95"
      >
        <Bars width={22} height={22} />
      </button>

      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Drawer */}
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="মেনু"
        className={`fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-[#F9FBF8] shadow-2xl transition-[transform,visibility] duration-300 ease-out ${
          open ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#e4e4e4] px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
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
              <div className="text-lg font-bold text-[#1a1a1a]">বাজার দর</div>
              <div className="truncate text-[11px] text-gray-700">{date}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="মেনু বন্ধ করুন"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#1a1a1a] transition hover:bg-black/5 active:scale-95"
          >
            <Xmark width={22} height={22} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          <p className="px-3 pb-2 text-xs font-semibold tracking-wide text-gray-500">
            ক্যাটাগরি
          </p>

          <nav className="flex flex-col">
            {categories.map((n) => (
              <Link
                key={n.slug}
                href={`/category/${n.slug}`}
                onClick={close}
                className="group flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] font-semibold text-[#1a1a1a] transition hover:bg-[#05893E]/10 hover:text-[#05893E] active:bg-[#05893E]/15"
              >
                <span className="text-xl leading-none">{n.icon}</span>
                <span className="flex-1 truncate">{n.nameBn}</span>
                <ChevronRight
                  width={16}
                  height={16}
                  className="text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#05893E]"
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Auth buttons */}
        <div className="flex flex-col gap-3 border-t border-[#e4e4e4] px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={close}
            className="w-full rounded-xl border border-[#e4e4e4] bg-white px-5 py-3 text-sm font-semibold text-[#1a1a1a] transition hover:bg-black/5"
          >
            সাইন ইন
          </button>
          <button
            type="button"
            onClick={close}
            className="w-full rounded-xl border border-[#047a37] bg-[#05893E] px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(5,137,62,0.35)] transition hover:bg-[#047a37]"
          >
            সাইন আপ
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MobileMenu;
