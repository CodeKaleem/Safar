"use client";
import { useState, useTransition } from 'react';

type Inquiry = {
  id: string;
  full_name: string;
  email: string;
  message: string;
  replied: boolean;
  admin_reply?: string;
  created_at: string;
};

export default function ReplyModal({ inquiry, onClose, onReplied }: {
  inquiry: Inquiry;
  onClose: () => void;
  onReplied: (id: string, replyText: string) => void;
}) {
  const [replyMessage, setReplyMessage] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!replyMessage.trim()) return;
    startTransition(async () => {
      try {
        const res = await fetch('/api/reply-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inquiryId: inquiry.id,
            customerEmail: inquiry.email,
            customerName: inquiry.full_name,
            replyMessage,
            originalMessage: inquiry.message,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to send reply');
        onReplied(inquiry.id, replyMessage);
        onClose();
      } catch (e: any) {
        setError(e.message);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-2xl border border-[#c8a96e]/30 bg-[#050a12]" style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#c8a96e]/15">
          <div>
            <h2 className="text-[#c8a96e] font-serif text-xl">Reply to Inquiry</h2>
            <p className="text-white/40 text-xs tracking-widest mt-1">{inquiry.full_name} — {inquiry.email}</p>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors text-2xl leading-none">✕</button>
        </div>

        {/* Original message */}
        <div className="p-6 border-b border-[#c8a96e]/10 bg-white/2">
          <p className="text-white/30 text-xs tracking-widest mb-3 uppercase">Original Message</p>
          <p className="text-white/60 text-sm leading-relaxed italic">{inquiry.message}</p>
        </div>

        {/* Reply compose area */}
        <div className="p-6">
          <label className="block text-white/40 text-xs tracking-widest mb-3 uppercase">Your Response</label>
          <textarea
            rows={6}
            value={replyMessage}
            onChange={e => setReplyMessage(e.target.value)}
            placeholder="Type your reply to the customer here..."
            className="w-full bg-black/50 border border-[#c8a96e]/20 p-4 text-white text-sm leading-relaxed focus:outline-none focus:border-[#c8a96e] resize-none"
          />
          {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 px-6 pb-6">
          <button onClick={onClose} className="px-6 py-3 border border-white/20 text-white/50 hover:text-white hover:border-white/50 text-xs tracking-widest transition-colors">
            CANCEL
          </button>
          <button
            onClick={handleSend}
            disabled={isPending || !replyMessage.trim()}
            className="px-8 py-3 bg-[#c8a96e] text-black font-bold text-xs tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'SENDING...' : 'SEND REPLY'}
          </button>
        </div>

      </div>
    </div>
  );
}
