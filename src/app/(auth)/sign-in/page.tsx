'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { authClient } from '@/lib/auth-client';

const inputClass =
  'w-full rounded-xl border border-[#e2e8e2] bg-[#FAFCF9] px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-gray-500 outline-none transition focus:border-[#05893E] focus:ring-2 focus:ring-[#05893E]/20';

const labelClass = 'text-sm font-medium text-[#1a1a1a]';

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    try {
      const { error } = await authClient.signIn.email({
        ...user,
        rememberMe: true,
      });

      if (error) {
        setError('ইমেইল বা পাসওয়ার্ড সঠিক নয়।');
        return;
      }

      toast.success('সফলভাবে সাইন ইন হয়েছে');
      router.push('/');
      router.refresh();
    } catch {
      setError('সাইন ইন করা যায়নি। আবার চেষ্টা করুন।');
      toast.error('সাইন ইন করা যায়নি');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpwithGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  const handleSignUpwithGitHub = async () => {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/',
    });
  };

  return (
    <div className="px-4 py-10">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-[#1a1a1a]">সাইন ইন</h1>
        <p className="mt-2 text-sm text-gray-600">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Card */}
      <div className="mx-auto mt-6 w-full max-w-112.5 rounded-xl border border-[#e2e8e2] bg-[#FAFCF9] p-6">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            className="flex w-full flex-col gap-1.5"
            validate={(value) =>
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ? null
                : 'সঠিক ইমেইল ঠিকানা দিন'
            }
          >
            <Label className={labelClass}>ইমেইল</Label>
            <Input
              placeholder="you@example.com"
              autoComplete="email"
              className={inputClass}
            />
            <FieldError className="text-xs text-red-600" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            className="flex w-full flex-col gap-1.5"
          >
            <Label className={labelClass}>পাসওয়ার্ড</Label>
            <Input
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete="current-password"
              className={inputClass}
            />
            <FieldError className="text-xs text-red-600" />
          </TextField>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl border border-[#047a37] bg-[#05893E] px-5 py-3 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(5,137,62,0.35)] transition hover:bg-[#047a37] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'অপেক্ষা করুন...' : 'সাইন ইন'}
          </button>
        </Form>

        {/* Google button */}
        <button onClick={handleSignUpwithGoogle}>
          Google দিয়ে চালিয়ে যান
        </button>

        <button onClick={handleSignUpwithGitHub}>
          GitHub দিয়ে চালিয়ে যান
        </button>

        <p className="mt-5 text-center text-sm text-[#1a1a1a]">
          অ্যাকাউন্ট নেই?{' '}
          <Link
            href="/sign-up"
            className="font-medium text-[#05893E] hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      {/* Back link */}
      <p className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm text-gray-600 transition hover:text-[#05893E]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;
