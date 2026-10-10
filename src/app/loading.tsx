export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#DCF0E3] border-t-[#05893E] motion-reduce:animate-pulse" />
      <p className="text-sm text-gray-600">লোড হচ্ছে...</p>
    </div>
  );
}
