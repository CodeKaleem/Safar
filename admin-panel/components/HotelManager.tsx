"use client";
import { addHotel, deleteHotel } from '@/app/actions';
import { useTransition, useRef } from 'react';

export default function HotelManager({ tripSlug, hotels }: { tripSlug: string, hotels: any[] }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleAdd = (formData: FormData) => {
    formData.set('id', 'h_' + Math.random().toString(36).substr(2, 9)); // generate quick id
    startTransition(async () => {
      try {
        await addHotel(tripSlug, formData);
        formRef.current?.reset();
      } catch (e: any) {
        alert('Error adding hotel: ' + e.message);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Remove this hotel?')) return;
    startTransition(async () => {
      try {
        await deleteHotel(id, tripSlug);
      } catch (e: any) {
        alert('Error removing hotel: ' + e.message);
      }
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.map(hotel => (
          <div key={hotel.id} className="border border-[#c8a96e]/20 p-4 bg-white/5 flex gap-4">
            <img src={hotel.img} className="w-24 h-24 object-cover border border-[#c8a96e]/10" />
            <div className="flex-1 flex flex-col">
              <h4 className="text-white font-bold mb-1">{hotel.name}</h4>
              <p className="text-white/50 text-xs flex-1 line-clamp-2">{hotel.desc}</p>
              <button 
                onClick={() => handleDelete(hotel.id)}
                disabled={isPending}
                className="self-end text-red-400 text-xs tracking-widest mt-2 hover:text-red-300"
              >
                REMOVE
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-[#c8a96e]/20 p-6 bg-black/30">
        <h3 className="text-[#c8a96e] font-serif text-xl mb-4">Add Accommodation</h3>
        <form ref={formRef} action={handleAdd} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">HOTEL NAME</label>
            <input name="name" required className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">IMAGE URL</label>
            <input name="img" required placeholder="https://..." className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">DESCRIPTION</label>
            <textarea name="desc" required rows={3} className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e]" />
          </div>
          <button type="submit" disabled={isPending} className="self-start bg-[#c8a96e] text-black px-6 py-2 font-bold tracking-widest hover:bg-white transition-colors disabled:opacity-50">
            ADD HOTEL
          </button>
        </form>
      </div>
    </div>
  );
}
