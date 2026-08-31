"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Copy, Video } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import SectionHeading from "./SectionHeading";
import LinkedInIcon from "./LinkedInIcon";

type InterviewPlatform = "none" | "zoom" | "google-meet";

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

function ZoomIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.5 6.75A2.25 2.25 0 016.75 4.5h7.5A2.25 2.25 0 0116.5 6.75v6a.75.75 0 01-.75.75H8.25A2.25 2.25 0 016 11.25v-4.5zm12.75 2.25l3.22-2.01A1.125 1.125 0 0122 8.01v7.98a1.125 1.125 0 01-1.53.98l-3.22-2.01V9z" />
    </svg>
  );
}

function MeetIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4.5l2.1 3.6 4.2.6-3 2.9.7 4.2L12 13.8 7.99 15.8l.71-4.2-3-2.9 4.2-.6L12 4.5z"
        fill="currentColor"
        opacity="0.9"
      />
      <rect
        x="3.5"
        y="6"
        width="12"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path
        d="M15.5 9.5L20 7v8l-4.5-2.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

const interviewOptions: {
  id: Exclude<InterviewPlatform, "none">;
  label: string;
  description: string;
  icon: typeof ZoomIcon;
}[] = [
  {
    id: "zoom",
    label: "Zoom",
    description: "Video call on Zoom",
    icon: ZoomIcon,
  },
  {
    id: "google-meet",
    label: "Google Meet",
    description: "Video call on Meet",
    icon: MeetIcon,
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [interview, setInterview] = useState<InterviewPlatform>("none");
  const [copied, setCopied] = useState(false);
  const [sentHint, setSentHint] = useState(false);

  const openInterviewEmail = (platform: "zoom" | "google-meet") => {
    const platformLabel = platform === "zoom" ? "Zoom" : "Google Meet";
    const subject = encodeURIComponent(`Interview Request via ${platformLabel}`);
    const body = encodeURIComponent(
      [
        `Hi Louie,`,
        ``,
        `I'd like to schedule a video interview using ${platformLabel}.`,
        ``,
        `Proposed times (your timezone / PH GMT+8):`,
        `- `,
        `- `,
        ``,
        `Looking forward to speaking with you.`,
        ``,
        name.trim() ? `— ${name.trim()}` : "",
        email.trim() ? email.trim() : "",
      ]
        .filter(Boolean)
        .join("\n"),
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setSentHint(true);
    window.setTimeout(() => setSentHint(false), 4000);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const interviewLine =
      interview === "zoom"
        ? "Preferred interview: Zoom"
        : interview === "google-meet"
          ? "Preferred interview: Google Meet"
          : "";

    const subject = encodeURIComponent(
      interview !== "none"
        ? `Interview Request (${interview === "zoom" ? "Zoom" : "Google Meet"})${name.trim() ? ` — ${name.trim()}` : ""}`
        : name.trim()
          ? `Project Inquiry from ${name.trim()}`
          : "Project Inquiry",
    );

    const body = encodeURIComponent(
      [
        message.trim() || "Hi Louie,",
        interviewLine,
        "",
        name.trim() ? `— ${name.trim()}` : "",
        email.trim() ? email.trim() : "",
      ]
        .filter((line) => line !== undefined)
        .join("\n"),
    );

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
          description="Have a Shopify project or e-commerce challenge? I'd love to hear about it — or book a video interview."
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

          {/* Interview options */}
          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 sm:p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                <Video size={18} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                  Video interview
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  Prefer to talk live?
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Schedule an interview over Zoom or Google Meet — pick a
                  platform and I&apos;ll confirm a time that works for you.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {interviewOptions.map((option) => {
                const selected = interview === option.id;
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setInterview(option.id);
                      openInterviewEmail(option.id);
                    }}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                      selected
                        ? "border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                        : "border-white/10 bg-white/[0.03] hover:border-emerald-500/30 hover:bg-emerald-500/[0.05]"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        selected
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
                      <Icon size={20} />
                    </span>
                    <span>
                      <span className="block font-semibold text-white">
                        {option.label}
                      </span>
                      <span className="block text-xs text-slate-400">
                        {option.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
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

            <fieldset>
              <legend className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-slate-500">
                Interview preference
              </legend>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "none", label: "Message only" },
                    { id: "zoom", label: "Zoom" },
                    { id: "google-meet", label: "Google Meet" },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setInterview(option.id)}
                    className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                      interview === option.id
                        ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                        : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-slate-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

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
                placeholder={
                  interview !== "none"
                    ? "Share a bit about the role and a few times that work for you..."
                    : "Tell me about your project..."
                }
                className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-500/40 focus:bg-emerald-500/[0.04]"
              />
            </label>

            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25"
              >
                <Send size={16} />
                {interview !== "none" ? "Request Interview" : "Send a Message"}
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
                Opening Gmail to send your request…
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
