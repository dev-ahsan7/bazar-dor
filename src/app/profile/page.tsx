'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const card = 'rounded-3xl border border-[#e2e8e2] bg-[#FAFCF9]';

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  // null = "not edited yet", so the input follows the session name
  const [draft, setDraft] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const currentName = user?.name ?? '';
  const value = draft ?? currentName;
  const trimmed = value.trim();
  const unchanged = trimmed === currentName;

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

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (trimmed.length < 2) {
      toast.error('নাম কমপক্ষে ২ অক্ষরের হতে হবে');
      return;
    }

    setSaving(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmed });

      if (error) {
        toast.error('নাম হালনাগাদ করা যায়নি। আবার চেষ্টা করুন।');
        return;
      }

      toast.success('নাম সফলভাবে হালনাগাদ হয়েছে');
      setDraft(trimmed);
      router.refresh();
    } catch {
      toast.error('কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-184 px-4 py-8">
        <div className="h-9 w-48 animate-pulse rounded bg-[#e4e8e4]" />
        <div className={`${card} mt-6 h-25 animate-pulse`} />
        <div className={`${card} mt-6 h-50 animate-pulse`} />
      </div>
    );
  }

  // Signed out
  if (!user) {
    return (
      <div className="mx-auto w-full max-w-184 px-4 py-8">
        <div className={`${card} p-8 text-center`}>
          <p className="text-[#1a1a1a]">প্রোফাইল দেখতে সাইন ইন করুন।</p>
          <Link
            href="/sign-in"
            className="mt-4 inline-block rounded-xl border border-[#047a37] bg-[#05893E] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(5,137,62,0.35)] transition hover:bg-[#047a37]"
          >
            সাইন ইন
          </Link>
        </div>
      </div>
    );
  }

  const initial = Array.from(currentName || user.email)[0]?.toUpperCase();

  return (
    <div className="mx-auto w-full max-w-184 px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-[#1a1a1a]">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-600">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      {/* Account card */}
      <section
        className={`${card} mt-6 flex items-center justify-between gap-4 p-6`}
      >
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#05893E] text-lg font-bold text-white">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-[#1a1a1a]">
              {currentName || user.email}
            </p>
            <p className="truncate text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="shrink-0 rounded-lg border border-red-500 bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap text-red-600 transition hover:bg-red-50"
        >
          ↩ সাইন আউট
        </button>
      </section>

      {/* Update name */}
      <section className={`${card} mt-6 p-6`}>
        <h2 className="text-lg font-bold text-[#1a1a1a]">নাম হালনাগাদ করুন</h2>

        <form onSubmit={handleUpdate} className="mt-4">
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-[#1a1a1a]"
          >
            নাম
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={value}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full rounded-xl border border-[#e2e8e2] bg-[#FAFCF9] px-4 py-3 text-sm text-[#1a1a1a] outline-none transition focus:border-[#05893E] focus:ring-2 focus:ring-[#05893E]/20"
          />

          <button
            type="submit"
            disabled={saving || unchanged || trimmed.length === 0}
            className="mt-4 rounded-lg border border-[#047a37] bg-[#05893E] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(5,137,62,0.35)] transition hover:bg-[#047a37] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
          >
            {saving ? 'সংরক্ষণ হচ্ছে...' : 'নাম হালনাগাদ করুন'}
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProfilePage;
