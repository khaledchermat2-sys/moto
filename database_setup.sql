-- ==========================================
-- 1. CREATION DES TABLES (PHASE 3)
-- ==========================================

-- Table: marques
create table marques (
  id         uuid primary key default gen_random_uuid(),
  nom        text not null unique,
  logo_url   text,
  created_at timestamp default now()
);

-- Table: produits
create table produits (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null,
  description text,
  prix        numeric(10,2) not null,
  stock       int default 0,
  categorie   text check (categorie in ('moto', 'piece')),
  publie      boolean default false,
  marque_id   uuid references marques(id) on delete set null,
  created_at  timestamp default now()
);

-- Table: produit_photos
create table produit_photos (
  id         uuid primary key default gen_random_uuid(),
  produit_id uuid references produits(id) on delete cascade,
  url        text not null,
  ordre      int default 0
);

-- Table: commandes
create table commandes (
  id         uuid primary key default gen_random_uuid(),
  nom        text not null,
  telephone  text not null,
  wilaya     text not null,
  adresse    text not null,
  notes      text,
  statut     text default 'en_attente' check (statut in ('en_attente','confirmee','refusee','livree')),
  produit_id uuid references produits(id) on delete set null,
  created_at timestamp default now()
);

-- Table: podcasts
create table podcasts (
  id           uuid primary key default gen_random_uuid(),
  titre        text not null,
  description  text,
  video_url    text not null,
  thumbnail_url text,
  created_at   timestamp default now()
);

-- ==========================================
-- 2. RLS & POLICIES (PHASE 4)
-- ==========================================

-- Activer RLS
alter table marques        enable row level security;
alter table produits       enable row level security;
alter table produit_photos enable row level security;
alter table commandes      enable row level security;
alter table podcasts       enable row level security;

-- Policies de lecture publique
create policy "Marques visibles" on marques for select using (true);
create policy "Produits publiés visibles" on produits for select using (publie = true);
create policy "Photos visibles" on produit_photos for select using (true);

-- Policy d'insertion de commandes (tout le monde peut commander)
create policy "Créer commande" on commandes for insert with check (true);

-- Policies Podcasts
create policy "Podcasts visibles" on podcasts for select using (true);

-- ==========================================
-- 3. STORAGE POLICIES
-- Rappel: N'oubliez pas de créer les buckets 'logos' et 'produits' (Public) manuellement depuis le Dashboard.
-- ==========================================
create policy "Public read" on storage.objects for select using (bucket_id in ('logos', 'produits'));
