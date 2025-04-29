export default ({ env }) => ({
  ezforms: {
    config: {
      captchaProvider: {
        name: "none",
      },
      notificationProviders: [
        {
          name: "email",
          enabled: true,
          config: {
            subject: "Dreams | Contact Form Submission", // Optional
            from: env("SMTP_EMAIL_NOREPLY"), // Required
          },
        },
      ],
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env.int("SMTP_PORT"),
        secure: false,
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
      },
      settings: {
        defaultFrom: env("SMTP_EMAIL_NOREPLY"),
        defaultReplyTo: env("SMTP_EMAIL_SUPPORT"),
      },
    },
  },
});
