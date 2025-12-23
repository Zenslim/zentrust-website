import { createClient } from "tinacms/dist/client";
import { queries } from "./types";

const apiURL =
  process.env.NEXT_PUBLIC_TINA_API_URL ||
  "https://content.tinajs.io/2.0/content/local/github/main";

export const client = createClient({
  url: apiURL,
  token: process.env.TINA_TOKEN,
  queries,
});

export default client;
  
