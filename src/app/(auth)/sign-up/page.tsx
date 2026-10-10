'use client';

import { authClient } from '@/lib/auth-client';
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const inputClass =
  'w-full rounded-xl border border-[#e2e8e2] bg-[#FAFCF9] px-3.5 py-2.5 text-sm text-[#1a1a1a] placeholder:text-gray-500 outline-none shadow-none transition focus:border-[#05893E] focus:ring-2 focus:ring-[#05893E]/15';

const labelClass = 'mb-1.5 block text-sm font-medium text-[#1a1a1a]';

const SignUpPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const pass = String(formData.get('password') ?? '');

    setSubmitting(true);

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password: pass,
      callbackURL: '/',
    });

    setSubmitting(false);

    if (error) {
      toast.danger('অ্যাকাউন্ট তৈরি করা যায়নি', {
        description: error.message || 'একটু পরে আবার চেষ্টা করুন।',
      });
      return;
    }

    if (data) {
      toast.success('অ্যাকাউন্ট তৈরি হয়েছে', {
        description: `স্বাগতম, ${name}!`,
      });
      router.push('/');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-10">
      <div className="w-full max-w-112.5">
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-[#1a1a1a]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <Form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 rounded-xl border border-[#e2e8e2] bg-[#FAFCF9] p-5"
        >
          <TextField
            isRequired
            name="name"
            validate={(value) =>
              value.trim().length < 3 ? 'নাম কমপক্ষে ৩ অক্ষরের হতে হবে' : null
            }
          >
            <Label className={labelClass}>নাম</Label>
            <Input className={inputClass} placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) =>
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ? 'সঠিক ইমেইল ঠিকানা দিন'
                : null
            }
          >
            <Label className={labelClass}>ইমেইল</Label>
            <Input className={inputClass} placeholder="you@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
            validate={(value) => {
              if (value.length < 8)
                return 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে';
              if (!/[A-Z]/.test(value))
                return 'কমপক্ষে ১টি বড় হাতের (A-Z) অক্ষর দিন';
              if (!/[0-9]/.test(value)) return 'কমপক্ষে ১টি সংখ্যা দিন';
              return null;
            }}
          >
            <Label className={labelClass}>পাসওয়ার্ড</Label>
            <Input className={inputClass} placeholder="কমপক্ষে ৮ অক্ষর" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            validate={(value) =>
              value !== password ? 'পাসওয়ার্ড দুটি মিলছে না' : null
            }
          >
            <Label className={labelClass}>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input className={inputClass} placeholder="আবার লিখুন" />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isPending={submitting}
            className="w-full rounded-xl bg-[#05893E] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#05893E]/25 transition hover:bg-[#047a37]"
          >
            {submitting ? 'অপেক্ষা করুন...' : 'অ্যাকাউন্ট তৈরি করুন'}
          </Button>

          <p className="text-center text-sm text-[#1a1a1a]">
            অ্যাকাউন্ট আছে?{' '}
            <Link
              href="/sign-in"
              className="font-medium text-[#05893E] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </Form>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#05893E]">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
