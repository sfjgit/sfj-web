import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // SEC-03: 12 of 14 pages shipped `target="_blank"` without
      // `rel="noopener"`, leaving outbound links to college and client sites
      // open to reverse tabnabbing. Fixing the existing ones is half the job;
      // this stops the next one being written.
      "react/jsx-no-target-blank": [
        "error",
        { allowReferrer: false, enforceDynamicLinks: "always" },
      ],

      // A11-02: `alt=""` on partner and certification logos is not decoration,
      // it is missing content — it cost image-search traffic and failed WCAG
      // 1.1.1 on 143 of 150 images on the faculty-development page. This rule
      // catches images with no alt attribute at all; the empty-alt audit still
      // needs eyes on it.
      "jsx-a11y/alt-text": [
        "error",
        { elements: ["img"], img: ["Image"] },
      ],
    },
  },
];

export default eslintConfig;
