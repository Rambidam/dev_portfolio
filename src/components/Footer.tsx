import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {year} {personalInfo.name}. All rights reserved.
        </p>
        <p className="text-sm text-slate-600">
          Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
