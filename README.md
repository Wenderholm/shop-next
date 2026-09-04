# DevStock

DevStock to aplikacja e-commerce zbudowana w Next.js dla sklepu z elektroniką i akcesoriami komputerowymi. Projekt zawiera stronę główną z kategoriami i polecanymi produktami, listing produktów z filtrami, koszyk, checkout, podsumowanie zamówienia oraz logowanie i rejestrację użytkownika.

## Funkcje

- Strona główna z sekcjami kategorii, rekomendowanych produktów i marek.
- Lista produktów z filtrowaniem po kategorii i marce, wyszukiwarką, sortowaniem oraz paginacją.
- Szczegóły produktu z danymi pobieranymi z backendu.
- Koszyk oparty o zamówienie w statusie `CART`.
- Checkout i ekran podsumowania po opłaceniu zamówienia.
- Rejestracja, logowanie i profil użytkownika z historią zamówień.
- Backend API w App Routerze oraz warstwa serwisów do komunikacji z bazą danych.

## Stack

- Next.js 16 z App Routerem
- React 19
- TypeScript 5
- Tailwind CSS 4
- Prisma 7
- PostgreSQL
- NextAuth v5 `credentials`
- React Hook Form + Zod
- Material UI

## 🚀 Deployment

Projekt został wdrożony na Vercel i jest dostępny online:

### 👉 [**ZOBACZ APLIKACJĘ LIVE →**](https://shop-next-blue.vercel.app)

[![Live Demo](https://img.shields.io/badge/🌐%20LIVE%20DEMO-Otwórz%20aplikację-22c55e?style=for-the-badge)](https://shop-next-blue.vercel.app)

---

### ⚙️ Środowiska

- **Hosting:** Vercel
- **Production database:** Neon PostgreSQL
- **Local database:** PostgreSQL + Docker Compose

## Struktura projektu

```text
app/           routing, strony i endpointy API
components/    komponenty UI
contexts/      stan globalny, np. koszyk i notyfikacje
hooks/         logika widoków i custom hooki
lib/           helpery i konfiguracja, np. Prisma, checkout
prisma/        schema i seed bazy danych
services/      dostęp do danych i logika serwisowa
types/         typy TypeScript
schemas/       schematy walidacji
public/        statyczne assety
```

## Wymagania

- Node.js 20+
- npm
- Docker Desktop albo lokalny PostgreSQL

## Instalacja

```bash
npm install
```

## Zmienne środowiskowe

Utwórz plik `.env` w katalogu projektu i dodaj minimalnie:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/shop_next"
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="your-strong-secret"
```

Projekt używa `DATABASE_URL` w Prisma oraz `NEXTAUTH_URL` w części routingu serwerowego. `AUTH_SECRET` jest potrzebny dla NextAuth.

## Baza danych

Lokalnie możesz uruchomić Postgresa i Adminera przez Docker Compose:

```bash
npm run docker:up
```

Dostępne usługi:

- Aplikacja bazy: `postgresql://postgres:postgres@localhost:5432/shop_next`
- Adminer: `http://localhost:8080`

Po uruchomieniu bazy wykonaj migracje i seed, jeśli chcesz zasilić projekt danymi:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

## Uruchomienie projektu

Tryb developerski:

```bash
npm run dev
```

Albo jednym poleceniem z Dockerem:

```bash
npm run start:dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

## Skrypty

```bash
npm run dev         # uruchamia Next.js w trybie developerskim
npm run build       # generuje klienta Prisma i buduje aplikację
npm run start       # uruchamia build produkcyjny
npm run lint        # uruchamia ESLint
npm run docker:up   # start kontenerów PostgreSQL i Adminer
npm run start:dev   # docker:up + dev
```

## Główne ścieżki aplikacji

- `/` - home page
- `/products` - listing produktów z filtrami
- `/products/[id]` - szczegóły produktu
- `/cart` - koszyk
- `/checkout` - checkout
- `/checkout/success/[orderId]` - podsumowanie zamówienia
- `/login` - logowanie
- `/register` - rejestracja
- `/profile` - profil i historia zamówień
- `/contact` - kontakt

## Uwagi techniczne

- Generator Prisma zapisuje klienta do `app/generated/prisma`.
- W projekcie logika obliczeń checkoutu jest wydzielona do `lib/checkout.ts`.
- Stylowanie opiera się na tokenach semantycznych z `app/globals.css`, np. `bg-surface`, `text-foreground`, `border-border-default`.

## Rozwój

W kolejnych wersjach zostaną dodane funkcje:

- integracja płatności,
- panel administracyjny,
- obsługa stanów magazynowych i promocji.
