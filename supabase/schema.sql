-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create Automations Table
create table public.automations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  trigger_keyword text not null,
  dm_message_copy text not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.automations enable row level security;

-- Create Policies so users can only manage their own automations
create policy "Users can insert their own automations" 
  on public.automations for insert 
  with check (auth.uid() = user_id);

create policy "Users can view their own automations" 
  on public.automations for select 
  using (auth.uid() = user_id);

create policy "Users can update their own automations" 
  on public.automations for update 
  using (auth.uid() = user_id);

create policy "Users can delete their own automations" 
  on public.automations for delete 
  using (auth.uid() = user_id);

-- Create Connected Accounts Table (Instagram/Meta API metadata)
create table public.connected_accounts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  platform text not null, -- 'instagram', 'tiktok', 'youtube'
  username text not null,
  is_connected boolean default true not null,
  access_token text, -- Page Access Token for Meta Graph API
  page_id text, -- Instagram Business Account ID
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, platform)
);

-- Migrations (Run these if you already executed the schema before this update):
-- alter table public.connected_accounts add column if not exists access_token text;
-- alter table public.connected_accounts add column if not exists page_id text;

-- Enable RLS for Connected Accounts
alter table public.connected_accounts enable row level security;

-- Create Policies for Connected Accounts
create policy "Users can manage their own connected accounts"
  on public.connected_accounts for all
  using (auth.uid() = user_id);
