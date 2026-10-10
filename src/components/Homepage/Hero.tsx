import Image from 'next/image';

const Hero = () => {
  const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
    timeZone: 'Asia/Dhaka',
  });

  return (
    <section className="w-full px-4 py-5">
      <div className="overflow-hidden rounded-3xl border border-[#e2e8e2] bg-[#FAFCF9]">
        <div className="flex flex-col gap-6 px-6 pt-10 pb-15  md:flex-row md:items-center md:justify-between md:pr-14 md:pb-5 md:pl-6">
          {/* Text */}
          <div className="min-w-0 flex-1">
            <span className="inline-block rounded-full bg-[#DCF0E3] px-3 py-1 text-xs font-semibold text-[#05893E]">
              {date}
            </span>

            <h1 className="mt-3 text-3xl leading-tight font-extrabold text-[#1a1a1a] md:text-[40px]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-136.25 text-[15px] leading-relaxed text-gray-600">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#products"
              className="mt-7 inline-block rounded-lg border border-[#047a37] bg-[#05893E] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_6px_14px_rgba(5,137,62,0.35)] transition hover:bg-[#047a37]"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          {/* Image (placeholder, swap later) */}
          <div className="hidden shrink-0 md:block">
            <Image
              src={'/bazar-hero.png'}
              alt="আজকের বাজার"
              width={315}
              height={263}
              className="h-65.75 w-78.75 rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
