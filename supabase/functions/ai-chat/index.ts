import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");

const SYSTEM_PROMPT = `You are an expert AI writing assistant. Help users with their writing tasks: brainstorming, editing, feedback, style suggestions, and general writing questions. Be concise, helpful, and friendly. If the user shares text, provide specific, actionable feedback.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

async function callOpenAI(messages: ChatMessage[]) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 2048,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

async function callAnthropic(messages: ChatMessage[]) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Anthropic error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  const textBlock = data.content.find((b: { type: string }) => b.type === "text");
  return textBlock?.text || "";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { message, history = [] } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build conversation (last 10 messages for context)
    const recentHistory = history.slice(-10).map((m: ChatMessage) => ({
      role: m.role,
      content: m.content,
    }));
    recentHistory.push({ role: "user", content: message });

    let response: string;
    try {
      response = await callOpenAI(recentHistory);
    } catch (openaiError) {
      console.error("OpenAI failed, trying Anthropic:", openaiError);
      if (!ANTHROPIC_API_KEY) throw openaiError;
      response = await callAnthropic(recentHistory);
    }

    // Log usage
    await supabaseClient.from("usage_logs").insert({
      user_id: user.id,
      tool: "chat",
      input_text: message.substring(0, 5000),
      output_text: response.substring(0, 5000),
      tokens_used: 0,
      provider: "openai",
    });

    return new Response(JSON.stringify({ response }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("AI Chat error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
