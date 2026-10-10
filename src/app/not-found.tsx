import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="px-4 py-16">
      <div className="mx-auto w-full max-w-111 rounded-3xl border border-[#e2e8e2] bg-[#FAFCF9] p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0F5F0] text-3xl">
          🛒
        </div>

        <p className="mt-5 text-6xl font-extrabold text-[#05893E]">৪০৪</p>

        <h1 className="mt-3 text-2xl font-bold text-[#1a1a1a]">
          পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, নাম বদলেছে, অথবা
          ঠিকানাটি ভুল।
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-xl border border-[#047a37] bg-[#05893E] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(5,137,62,0.35)] transition hover:bg-[#047a37]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
