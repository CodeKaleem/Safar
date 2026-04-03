"use client";
import { createTrip } from '@/app/actions';
import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewTripPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreate = (formData: FormData) => {
    startTransition(async () => {
      try {
        const slug = await createTrip(formData);
        router.push(`/trips/${slug}`);
      } catch (e: any) {
        alert('Error creating trip: ' + e.message);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-serif text-[#c8a96e] mb-2">Initialize Expedition</h1>
          <p className="text-white/50 text-sm tracking-widest uppercase">CREATE A NEW JOURNEY</p>
        </div>
        <Link href="/trips" className="text-[#c8a96e] hover:text-white border border-[#c8a96e] px-6 py-2 tracking-widest text-sm transition-colors cursor-pointer">
          CANCEL
        </Link>
      </div>

      <div className="bg-white/5 border border-[#c8a96e]/20 p-8 rounded-sm">
        <form action={handleCreate} className="flex flex-col gap-6">
          
          <div>
            <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">UNIQUE SLUG (ID)</label>
            <input name="slug" required placeholder="e.g., hunza-valley" className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e] font-mono" />
            <p className="text-white/30 text-xs mt-2">This will be used in the URL: safartravel.com/trips/hunza-valley</p>
          </div>

          <div>
            <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">EXPEDITION TITLE</label>
            <input name="title" required placeholder="Islamabad to Hunza" className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e]" />
          </div>

          <button type="submit" disabled={isPending} className="mt-4 bg-[#c8a96e] text-black px-6 py-3 font-bold tracking-widest hover:bg-white transition-colors disabled:opacity-50 text-center w-full">
            {isPending ? 'INITIALIZING...' : 'START CONFIGURING JOURNEY'}
          </button>

        </form>
      </div>
    </div>
  );
}
