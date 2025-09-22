"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/admin/api/ezforms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: payload }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
      form.reset();
    } catch (error: unknown) {
      console.error("Failed to submit contact form", error);
      setErrorMessage("Something went wrong while sending your message. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-semibold uppercase tracking-widest text-slate-200" htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-white/10 bg-white/90 px-3 py-2 text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold uppercase tracking-widest text-slate-200" htmlFor="contact-email">
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-white/10 bg-white/90 px-3 py-2 text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold uppercase tracking-widest text-slate-200" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className="w-full rounded-md border border-white/10 bg-white/90 px-3 py-2 text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>
      {status === "success" && (
        <p className="text-sm font-medium text-emerald-200" role="status">
          Thank you! Your message has been sent.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className="text-sm font-medium text-rose-200" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
