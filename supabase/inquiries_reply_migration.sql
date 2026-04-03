-- Run this in your Supabase SQL Editor to add reply tracking to the inquiries table

ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS replied BOOLEAN DEFAULT false;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS admin_reply TEXT;
