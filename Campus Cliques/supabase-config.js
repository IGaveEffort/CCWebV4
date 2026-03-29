// ============================================================
// Campus Cliques — Supabase Configuration
// ============================================================
// SETUP INSTRUCTIONS:
//
// 1. Go to https://supabase.com → New project → name it "campus-cliques"
// 2. In Project Settings → API → copy:
//    • Project URL  → paste into SUPABASE_URL below
//    • anon public key → paste into SUPABASE_ANON_KEY below
// 3. Set ADMIN_EMAIL to the email you'll use for the admin account
//
// 4a. FIRST-TIME SETUP — Run this SQL only if tables don't exist yet:
// ------------------------------------------------------------
//
//   create table users (
//     id uuid references auth.users primary key,
//     first_name text, last_name text, email text,
//     university text, year text, major text,
//     platform text, followers text, vibe text,
//     created_at timestamptz default now()
//   );
//
//   create table gigs (
//     id uuid default gen_random_uuid() primary key,
//     title text not null, brand text not null,
//     category text, compensation text, deadline date,
//     campuses text, description text,
//     tasks jsonb default '[]',
//     status text default 'open',
//     created_at timestamptz default now()
//   );
//
//   create table applications (
//     id uuid default gen_random_uuid() primary key,
//     gig_id uuid references gigs(id) on delete cascade,
//     user_id uuid references auth.users(id),
//     user_email text, user_name text,
//     status text default 'pending',
//     applied_at timestamptz default now()
//   );
//
//   create table deliverables (
//     id uuid default gen_random_uuid() primary key,
//     gig_id uuid references gigs(id) on delete cascade,
//     user_id uuid references auth.users(id),
//     user_email text, task_id text, task_title text,
//     type text, content text,
//     file_url text, file_name text,
//     status text default 'submitted',
//     submitted_at timestamptz default now()
//   );
//
// 4b. SECURITY — Run this SQL to enable RLS (tables already exist, run this separately):
// ------------------------------------------------------------
//
//   -- Enable Row Level Security on all tables
//   alter table users        enable row level security;
//   alter table gigs         enable row level security;
//   alter table applications enable row level security;
//   alter table deliverables enable row level security;
//
//   -- Users: can only read/write their own profile
//   create policy "users_self" on users for all using (auth.uid() = id) with check (auth.uid() = id);
//
//   -- Gigs: anyone authenticated can read; only service_role can write
//   create policy "gigs_read" on gigs for select using (auth.role() = 'authenticated');
//
//   -- Applications: users can insert/read their own
//   create policy "apps_insert" on applications for insert with check (auth.uid() = user_id);
//   create policy "apps_read"   on applications for select using (auth.uid() = user_id);
//
//   -- Deliverables: users can insert/update/read their own
//   create policy "delivs_insert" on deliverables for insert with check (auth.uid() = user_id);
//   create policy "delivs_update" on deliverables for update using (auth.uid() = user_id);
//   create policy "delivs_read"   on deliverables for select using (auth.uid() = user_id);
//
//   -- NOTE: Once RLS is on, the admin panel (which reads ALL rows) will break until
//   --       you add admin policies or move admin queries to a Supabase Edge Function
//   --       using the service_role key. Never put the service_role key in client code.
//
// 5. Create Storage bucket:
//    Supabase → Storage → New bucket → name: "deliverables" → Public: ON
//
// firebase-config.js is no longer used and can be deleted.
// ============================================================

const SUPABASE_URL = '__SUPABASE_URL__';
const SUPABASE_ANON_KEY = '__SUPABASE_ANON_KEY__';
const ADMIN_EMAIL = '__ADMIN_EMAIL__';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Security helpers ──────────────────────────────────────
// Escape user-supplied strings before injecting into innerHTML
function esc(str) {
  const d = document.createElement('div');
  d.textContent = String(str ?? '');
  return d.innerHTML;
}
// Only allow http/https URLs in href/src attributes
function safeUrl(url) {
  try {
    const u = new URL(url);
    return (u.protocol === 'https:' || u.protocol === 'http:') ? url : '#';
  } catch { return '#'; }
}
