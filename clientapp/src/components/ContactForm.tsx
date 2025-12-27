"use client";

import styles from "@/styles/retro.module.css";
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
        <label className={`${styles.formLabel} text-sm font-semibold uppercase`} htmlFor="contact-name">
          Name
        </label>
        <input id="contact-name" name="name" type="text" required className={styles.formField} />
      </div>
      <div className="space-y-1">
        <label className={`${styles.formLabel} text-sm font-semibold uppercase`} htmlFor="contact-email">
          Email address
        </label>
        <input id="contact-email" name="email" type="email" required className={styles.formField} />
      </div>
      <div className="space-y-1">
        <label className={`${styles.formLabel} text-sm font-semibold uppercase`} htmlFor="contact-message">
          Message
        </label>
        <textarea id="contact-message" name="message" required rows={4} className={styles.formField} />
      </div>
      <button type="submit" disabled={status === "submitting"} className={styles.formButton}>
        {status === "submitting" ? "Sending…" : "Send"}
      </button>
      {status === "success" && (
        <p className={`${styles.formStatusSuccess} text-sm font-medium`} role="status">
          Thank you! Your message has been sent.
        </p>
      )}
      {status === "error" && errorMessage && (
        <p className={`${styles.formStatusError} text-sm font-medium`} role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
