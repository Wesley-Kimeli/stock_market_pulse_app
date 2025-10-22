import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "stock-market_pulse_application",
  ai: { gemini: { apiKey: process.env.GEMINI_API_KEY } },
});
