"use client";
import { addGalleryImage, deleteGalleryImage } from '@/app/actions';
import { useTransition, useRef } from 'react';

export default function GalleryManager({ tripSlug, gallery }: { tripSlug: string, gallery: any[] }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleAdd = (formData: FormData) => {
    const url = formData.get('image_url') as string;
    if (!url) return;
    
    startTransition(async () => {
      try {
        await addGalleryImage(tripSlug, url, gallery.length);
        formRef.current?.reset();
      } catch (e: any) {
        alert('Error adding image: ' + e.message);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Remove this image?')) return;
    startTransition(async () => {
      try {
        await deleteGalleryImage(id, tripSlug);
      } catch (e: any) {
        alert('Error removing image: ' + e.message);
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.sort((a,b) => a.display_order - b.display_order).map(img => (
          <div key={img.id} className="relative group aspect-video">
            <img src={img.image_url} className="w-full h-full object-cover border border-[#c8a96e]/20" />
            <button 
              onClick={() => handleDelete(img.id)}
              disabled={isPending}
              className="absolute top-2 right-2 bg-red-900/80 text-white p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              REMOVE
            </button>
          </div>
        ))}
      </div>

      <form ref={formRef} action={handleAdd} className="flex gap-4 items-end mt-4">
        <div className="flex-1">
          <label className="block text-xs tracking-widest text-[#c8a96e] mb-2">ADD NEW IMAGE URL</label>
          <input name="image_url" placeholder="https://..." required className="w-full bg-black/50 border border-[#c8a96e]/20 p-3 text-white focus:outline-none focus:border-[#c8a96e]" />
        </div>
        <button type="submit" disabled={isPending} className="bg-[#c8a96e] text-black px-6 py-3 font-bold tracking-widest hover:bg-white transition-colors disabled:opacity-50">
          ADD
        </button>
      </form>
    </div>
  );
}
