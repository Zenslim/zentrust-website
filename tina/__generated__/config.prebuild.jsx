// tina/config.ts
import { defineConfig } from "tinacms";
var config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  branch: process.env.TINA_BRANCH || "main",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  /* -----------------------------------------------------
   * GLOBAL MEDIA CONFIGURATION (repo-based)
   * ----------------------------------------------------- */
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images",
      static: false
    }
  },
  // NOTE: After media config changes, delete the .next folder and restart `npm run dev` so Tina picks up the new media store.
  /* -----------------------------------------------------
   * SCHEMA 
   * ----------------------------------------------------- */
  schema: {
    collections: [
      /* -----------------------------------------------------
       * BLOG POSTS
       * ----------------------------------------------------- */
      {
        name: "blog",
        label: "Legacy Posts",
        path: "content/blog",
        format: "mdx",
        defaultItem: () => ({
          date: (/* @__PURE__ */ new Date()).toISOString(),
          author: "ZenTrust Team"
        }),
        ui: {
          allowedActions: { create: false, delete: false },
          filename: {
            readonly: true
          }
        },
        fields: [
          {
            name: "title",
            type: "string",
            required: true,
            isTitle: true
          },
          { name: "date", type: "datetime", required: false },
          { name: "author", type: "string", required: false },
          { name: "excerpt", type: "string", required: false },
          {
            name: "primaryCategory",
            label: "Primary Category",
            type: "string",
            required: true,
            options: [
              "Awareness",
              "Regeneration",
              "Wellness",
              "Community",
              "Systems & Governance",
              "Spiritual Ecology"
            ]
          },
          {
            name: "categories",
            label: "Additional Categories",
            type: "string",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            name: "tags",
            label: "Tags",
            type: "string",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            name: "tones",
            label: "Tones",
            type: "string",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            name: "audio",
            label: "Audio Narration (optional)",
            type: "string",
            ui: {
              component: "text"
            }
          },
          { name: "category", type: "string", required: false },
          { name: "heroImage", type: "image", required: false },
          { name: "body", type: "rich-text", isBody: true }
        ]
      },
      /* -----------------------------------------------------
       * QUESTIONS
       * ----------------------------------------------------- */
      {
        name: "questions",
        label: "Questions",
        path: "content/questions",
        format: "mdx",
        defaultItem: () => ({
          status: "draft",
          adEligible: false,
          heroMode: "answer_below"
        }),
        ui: {
          router: ({ document }) => `/questions/${document._sys.filename}`
        },
        fields: [
          {
            name: "question",
            label: "Question",
            type: "string",
            isTitle: true,
            required: true
          },
          {
            name: "heroMode",
            label: "Hero Mode",
            type: "string",
            required: true,
            options: [
              { label: "Full answer in hero", value: "full_answer" },
              { label: "Answer below hero", value: "answer_below" }
            ],
            ui: {
              component: "radio-group"
            }
          },
          {
            name: "heroText",
            label: "Hero Text",
            type: "string",
            ui: { component: "textarea" },
            required: true
          },
          {
            name: "youtubeUrl",
            label: "YouTube Explainer URL",
            type: "string"
          },
          {
            name: "category",
            label: "Category",
            type: "string",
            required: true,
            options: [
              "Nature & Land",
              "Health & Suffering",
              "Mind & Experience",
              "Schools & Systems",
              "Meaning & Seeking",
              "Tools & Technology"
            ]
          },
          {
            name: "adEligible",
            label: "Ad Eligible",
            type: "boolean",
            required: false
          },
          {
            name: "status",
            label: "Status",
            type: "string",
            required: true,
            options: ["draft", "published", "archived"]
          },
          { name: "body", type: "rich-text", isBody: true }
        ]
      },
      /* -----------------------------------------------------
       * STATIC PAGES
       * ----------------------------------------------------- */
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "json",
        ui: {
          allowedActions: { create: true, delete: true }
        },
        fields: [
          {
            name: "hero",
            label: "Hero",
            type: "object",
            fields: [
              { name: "badge", label: "Badge", type: "string" },
              { name: "titleLine1", label: "Title Line 1", type: "string" },
              { name: "titleHighlight", label: "Title Highlight", type: "string" },
              { name: "titleLine3", label: "Title Line 3", type: "string" },
              { name: "subtitle", label: "Subtitle", type: "string" },
              { name: "primaryCta", label: "Primary Button Text", type: "string" },
              { name: "primaryCtaLink", label: "Primary Button Link", type: "string" },
              { name: "secondaryCta", label: "Secondary Button Text", type: "string" },
              { name: "secondaryCtaLink", label: "Secondary Button Link", type: "string" },
              {
                name: "achievements",
                label: "Achievements",
                type: "string",
                list: true
              },
              {
                name: "impactStats",
                label: "Impact Stats",
                type: "object",
                list: true,
                fields: [
                  { name: "number", label: "Number", type: "string" },
                  { name: "label", label: "Label", type: "string" }
                ]
              },
              {
                name: "callout",
                label: "Callout",
                type: "object",
                fields: [
                  { name: "title", label: "Title", type: "string" },
                  { name: "subtitle", label: "Subtitle", type: "string" },
                  { name: "cta", label: "CTA Text", type: "string" },
                  { name: "ctaLink", label: "CTA Link", type: "string" }
                ]
              }
            ]
          },
          {
            name: "stats",
            label: "Stats",
            type: "object",
            list: true,
            fields: [
              { name: "number", label: "Number", type: "string" },
              { name: "label", label: "Label", type: "string" },
              { name: "description", label: "Description", type: "string" }
            ]
          },
          {
            name: "programsSection",
            label: "Programs Section",
            type: "object",
            fields: [
              { name: "title", label: "Title", type: "string" },
              { name: "subtitle", label: "Subtitle", type: "string" },
              { name: "ctaText", label: "CTA Text", type: "string" },
              { name: "ctaLink", label: "CTA Link", type: "string" }
            ]
          },
          {
            name: "storiesSection",
            label: "Stories Section",
            type: "object",
            fields: [
              { name: "title", label: "Title", type: "string" },
              { name: "subtitle", label: "Subtitle", type: "string" },
              { name: "ctaText", label: "CTA Text", type: "string" },
              { name: "ctaLink", label: "CTA Link", type: "string" }
            ]
          },
          {
            name: "newsletter",
            label: "Newsletter Section",
            type: "object",
            fields: [
              { name: "title", label: "Title", type: "string" },
              { name: "subtitle", label: "Subtitle", type: "string" },
              { name: "emailPlaceholder", label: "Email Placeholder", type: "string" },
              { name: "buttonText", label: "Button Text", type: "string" },
              { name: "disclaimer", label: "Disclaimer", type: "string" }
            ]
          }
        ]
      },
      /* -----------------------------------------------------
       * PROGRAMS
       * ----------------------------------------------------- */
      {
        name: "programs",
        label: "Programs",
        path: "content/programs",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
            uploadDir: () => "images/programs"
          },
          { type: "rich-text", name: "body", label: "Program Description", isBody: true },
          { type: "string", name: "category", label: "Category" },
          { type: "string", name: "impactMetric", label: "Impact Metric" },
          { type: "string", name: "impactValue", label: "Impact Value" },
          { type: "string", name: "impactUnit", label: "Impact Unit" }
        ]
      },
      /* -----------------------------------------------------
       * STORIES / TESTIMONIALS
       * ----------------------------------------------------- */
      {
        name: "stories",
        label: "Success Stories",
        path: "content/stories",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", required: true },
          { type: "string", name: "author", label: "Author" },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "location", label: "Location" },
          {
            type: "image",
            name: "image",
            label: "Story Image",
            uploadDir: () => "images/stories"
          },
          { type: "rich-text", name: "body", label: "Story Body", isBody: true },
          { type: "string", name: "category", label: "Category" },
          { type: "string", name: "impactMetric", label: "Impact Metric" },
          { type: "string", name: "impactValue", label: "Impact Value" },
          { type: "string", name: "impactUnit", label: "Impact Unit" }
        ]
      },
      /* -----------------------------------------------------
       * TEAM MEMBERS
       * ----------------------------------------------------- */
      {
        name: "team",
        label: "Team Members",
        path: "content/team",
        format: "md",
        fields: [
          { type: "string", name: "name", label: "Full Name" },
          { type: "string", name: "title", label: "Position / Role" },
          {
            type: "image",
            name: "photo",
            label: "Photo",
            uploadDir: () => "images/team"
          },
          { type: "rich-text", name: "bio", label: "Biography", isBody: true }
        ]
      }
    ]
  }
});
console.log("TINA MEDIA CONFIG:", config.media);
var config_default = config;
export {
  config_default as default
};
