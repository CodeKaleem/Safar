"use client";
import { updateTrip } from '@/app/actions';
import { useTransition } from 'react';

export default function TripBasicForm({ trip }: { trip: any }) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (formData: FormData) => {
    startTransition(async () => {
      try {
        await updateTrip(trip.slug, formData);
        alert('Trip updated successfully');
      } catch (e: any) {
        alert('Error updating trip: ' + e.message);
      }
    });
  };

  return (
    <form action={handleAction} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">TITLE</label>
          <input name="title" defaultValue={trip.title} required className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e]" />
        </div>
        <div>
          <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">TYPE</label>
          <select name="type" defaultValue={trip.type} className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e]">
            <option value="national">National</option>
            <option value="abroad">Abroad</option>
          </select>
        </div>
        <div>
          <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">DURATION</label>
          <input name="days" defaultValue={trip.days} required className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e]" />
        </div>
        <div>
          <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">EST. BUDGET</label>
          <input name="budget" defaultValue={trip.budget} required className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e]" />
        </div>
      </div>
      <div>
        <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">DESCRIPTION</label>
        <textarea name="desc" defaultValue={trip.desc} required rows={4} className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e]" />
      </div>
      <button type="submit" disabled={isPending} className="self-end bg-[#c8a96e] text-black px-6 py-2 font-bold tracking-widest hover:bg-white transition-colors disabled:opacity-50">
        {isPending ? 'SAVING...' : 'SAVE DETAILS'}
      </button>
    </form>
  );
}
