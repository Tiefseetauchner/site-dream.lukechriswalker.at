import localFont from "next/font/local";

export const cormorantInfant = localFont({
  src: [
    {
      path: "../fonts/CormorantInfant-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../fonts/CormorantInfant-Italic.woff2",
      weight: "normal",
      style: "italic",
    },
    {
      path: "../fonts/CormorantInfant-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../fonts/CormorantInfant-BoldItalic.woff2",
      weight: "bold",
      style: "italic",
    },
  ],
});

export const cormorantSC = localFont({
  src: [
    {
      path: "../fonts/CormorantSC-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../fonts/CormorantSC-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
  ],
});

export const tt2020 = localFont({
  src: [
    {
      path: "../fonts/TT2020StyleE-Regular.woff2",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../fonts/TT2020StyleE-Italic.woff2",
      weight: "normal",
      style: "italic",
    },
  ],
});
