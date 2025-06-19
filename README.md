# 🛍️ Product Dashboard App (Mini Admin Panel)

A responsive and dynamic product dashboard built with **Next.js**, featuring product listing, filtering, search, pagination, and product creation.

---

## 🚀 Features

- ✅ Responsive UI using **Tailwind CSS**
- ✅ Product listing from **MockAPI**
- ✅ Search & filter by category (`Shoes`, `Hats`, `Clothes`)
- ✅ Client-side pagination
- ✅ Create product modal with form validation
- ✅ Image upload with preview
- ✅ Inventory stats per category
- ✅ Global state management with **Zustand**
- ✅ Optimized data fetching with **React Query**

---

## 🛠️ Tech Stack

| Category         | Tool                                             |
| ---------------- | ------------------------------------------------ |
| Framework        | [Next.js 14](https://nextjs.org/)                |
| Styling          | [Tailwind CSS](https://tailwindcss.com/)         |
| UI Library       | [Shadcn](https://ui.shadcn.com/)                 |
| HTTP Client      | [Axios](https://axios-http.com/)                 |
| State Management | [Zustand](https://github.com/pmndrs/zustand)     |
| Data Fetching    | [React Query](https://tanstack.com/query/latest) |
| Form Handling    | [React Hook Form](https://react-hook-form.com/)  |
| Image Handling   | `FileReader` + `URL.createObjectURL`             |

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
