-- Create Waitlist Table
create table if not exists public.waitlist (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Allow anonymous users to sign up to the waitlist (insert policy)
create policy "Anyone can insert to waitlist"
  on public.waitlist for insert
  with check (true);

-- Allow service role (or authenticated admin) to read waitlist records
create policy "Service role can read waitlist"
  on public.waitlist for select
  using (true);
