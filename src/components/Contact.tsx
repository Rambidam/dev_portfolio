"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
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

          <div className="mt-8 text-center">
            <a
              href={`mailto:${personalInfo.email}?subject=Project Inquiry`}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25"
            >
              <Mail size={16} />
              Send a Message
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
