'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

type Props = {
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void; // e.g. close the mobile drawer
};

const UserInfo = ({ variant = 'desktop', onNavigate }: Props) => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Esc
  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.error('সফলভাবে সাইন আউট হয়েছে');
          router.push('/');
          router.refresh();
        },
        onError: () => {
          toast.error('সাইন আউট করা যায়নি। আবার চেষ্টা করুন।');
        },
      },
    });
  };

  const mobile = variant === 'mobile';

  // Loading: avoids flashing the sign-in buttons for a signed-in user
  if (isPending) {
    return (
      <div
        className={`animate-pulse rounded-xl bg-[#e4e8e4] ${
          mobile ? 'h-24 w-full' : 'h-10 w-36'
        }`}
      />
    );
  }

  // ---------- Signed out ----------
  if (!user) {
    return (
      <div
        className={mobile ? 'flex flex-col gap-3' : 'flex items-center gap-3'}
      >
        <Link
          href={'/sign-in'}
          onClick={onNavigate}
          className={
            mobile
              ? 'w-full rounded-xl border border-[#e4e4e4] bg-white px-5 py-3 text-center text-sm font-semibold text-[#1a1a1a] transition hover:bg-black/5'
              : 'rounded-lg px-4 py-2 text-sm font-semibold text-[#1a1a1a] transition hover:bg-black/5'
          }
        >
          সাইন ইন
        </Link>
        <Link
          href={'/sign-up'}
          onClick={onNavigate}
          className={
            mobile
              ? 'w-full rounded-xl border border-[#047a37] bg-[#05893E] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_6px_14px_rgba(5,137,62,0.35)] transition hover:bg-[#047a37]'
              : 'rounded-xl border border-[#047a37] bg-[#05893E] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(5,137,62,0.35)] transition hover:bg-[#047a37]'
          }
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  // ---------- Signed in ----------
  const name = user.name?.trim() || user.email;
  const initial = Array.from(name)[0]?.toUpperCase() ?? '?';

  // Mobile drawer: a card + full-width buttons
  if (mobile) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-xl border border-[#e4e4e4] bg-white px-3 py-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#05893E] text-base font-bold text-white">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#1a1a1a]">{name}</p>
            <p className="truncate text-xs text-gray-600">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
        >
          সাইন আউট
        </button>
      </div>
    );
  }

  // Desktop: pill button + dropdown
  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-[#e2e8e2] bg-[#FAFCF9] py-1 pr-3 pl-1 shadow-sm transition hover:border-[#05893E]/40"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#05893E] text-sm font-bold text-white">
          {initial}
        </span>
        <span className="max-w-30 truncate text-sm font-semibold text-[#1a1a1a]">
          {name}
        </span>
        <span className="text-[10px] text-gray-600">{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-[#e2e8e2] bg-[#FAFCF9] p-1.5 shadow-lg"
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm font-bold text-[#1a1a1a]">{name}</p>
            <p className="truncate text-xs text-gray-600">{user.email}</p>
          </div>

          <div className="my-1 border-t border-[#e2e8e2]" />

          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm text-[#1a1a1a] transition hover:bg-[#05893E]/10 hover:text-[#05893E]"
          >
            আমার প্রোফাইল
          </Link>

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="block w-full rounded-xl px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
          >
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
