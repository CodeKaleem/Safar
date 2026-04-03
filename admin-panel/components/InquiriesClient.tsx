"use client";
import { useState } from 'react';
import ReplyModal from '@/components/ReplyModal';

type Inquiry = {
  id: string;
  full_name: string;
  email: string;
  message: string;
  replied: boolean;
  admin_reply?: string;
  created_at: string;
};

export default function InquiriesClient({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const handleReplied = (id: string, replyText: string) => {
    setInquiries(prev =>
      prev.map(inq => inq.id === id ? { ...inq, replied: true, admin_reply: replyText } : inq)
    );
  };

  return (
    <>
      {selectedInquiry && (
        <ReplyModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onReplied={handleReplied}
        />
      )}

      <div className="border border-[#c8a96e]/20 bg-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm text-white/70">
          <thead className="bg-[#c8a96e]/10 text-white/50 border-b border-[#c8a96e]/20 text-xs tracking-widest">
            <tr>
              <th className="p-4 font-normal">DATE</th>
              <th className="p-4 font-normal">STATUS</th>
              <th className="p-4 font-normal">SENDER</th>
              <th className="p-4 font-normal">EMAIL</th>
              <th className="p-4 font-normal w-2/5">MESSAGE</th>
              <th className="p-4 font-normal text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                
                <td className="p-4 align-top">
                  <div className="text-white/50">{new Date(inquiry.created_at).toLocaleDateString()}</div>
                  <div className="text-xs text-white/30">{new Date(inquiry.created_at).toLocaleTimeString()}</div>
                </td>

                <td className="p-4 align-top">
                  {inquiry.replied ? (
                    <span className="text-xs tracking-widest bg-emerald-900/30 text-emerald-400 border border-emerald-900 px-2 py-1">REPLIED</span>
                  ) : (
                    <span className="text-xs tracking-widest bg-amber-900/30 text-amber-400 border border-amber-900 px-2 py-1">PENDING</span>
                  )}
                </td>

                <td className="p-4 align-top text-white font-medium">{inquiry.full_name}</td>
                
                <td className="p-4 align-top text-[#c8a96e]">{inquiry.email}</td>

                <td className="p-4 align-top">
                  <p className="text-white/60 italic">{inquiry.message}</p>
                  {inquiry.admin_reply && (
                    <div className="mt-3 pt-3 border-t border-[#c8a96e]/10">
                      <p className="text-white/30 text-xs tracking-widest mb-1">YOUR REPLY</p>
                      <p className="text-emerald-400/70 text-xs italic">{inquiry.admin_reply}</p>
                    </div>
                  )}
                </td>

                <td className="p-4 align-top text-right">
                  <button
                    onClick={() => setSelectedInquiry(inquiry)}
                    className="text-xs tracking-widest border border-[#c8a96e] text-[#c8a96e] px-4 py-2 hover:bg-[#c8a96e] hover:text-black transition-colors"
                  >
                    {inquiry.replied ? 'RESEND' : 'REPLY'}
                  </button>
                </td>

              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={6} className="p-12 text-center text-white/30 tracking-widest">No inquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
