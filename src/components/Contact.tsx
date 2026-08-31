"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Copy } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import LinkedInIcon from "./LinkedInIcon";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, "")}`,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: personalInfo.linkedin,
  },
  {
    icon: MapPin,
    label: "Location",
    value: personalInfo.location,
    href: undefined,
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sentHint, setSentHint] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      name.trim()
        ? `Project Inquiry from ${name.trim()}`
        : "Project Inquiry",
    );
    const body = encodeURIComponent(
      [
        message.trim() || "Hi Louie,",
        "",
        name.trim() ? `— ${name.trim()}` : "",
        email.trim() ? email.trim() : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    // Gmail compose works in the browser even without a desktop mail client
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    setSentHint(true);
    window.setTimeout(() => setSentHint(false), 4000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      window.prompt("Copy email address:", personalInfo.email);
    }
  };

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="contact"
          label="Contact"
          title="Let's Work Together"
          description="Have a Shopify project or e-commerce challenge? I'd love to hear about it."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/5 p-8 sm:p-12"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {contactMethods.map((method) => {
              const content = (
                <>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <method.icon size={18} />
                  </div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                    {method.label}
                  </p>
                  <p className="text-sm font-medium text-white">{method.value}</p>
                </>
              );

              if (method.href) {
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      method.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  key={method.label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  {content}
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-500/40 focus:bg-emerald-500/[0.04]"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-500/40 focus:bg-emerald-500/[0.04]"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500">
                Message
              </span>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-500/40 focus:bg-emerald-500/[0.04]"
              />
            </label>

            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25"
              >
                <Send size={16} />
                Send a Message
              </button>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Email copied" : "Copy email"}
              </button>
            </div>

            {sentHint && (
              <p className="text-center text-sm text-emerald-400">
                Opening Gmail to send your message…
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
