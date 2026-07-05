/* api.js — chat backend. Calls the Anthropic API when a key is configured,
   otherwise generates a helpful local demo response so the app is fully
   functional out of the box with no setup. */
(function () {
  "use strict";

  const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";

  // Convert our stored conversation into the Anthropic messages format.
  function toApiMessages(history) {
    return history
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role, content: m.content }));
  }

  async function callAnthropic(agent, history, settings) {
    const res = await fetch(ANTHROPIC_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": settings.apiKey,
        "anthropic-version": "2023-06-01",
        // Required to call the API directly from a browser origin.
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: settings.model || "claude-sonnet-5",
        max_tokens: 1024,
        system: agent.systemPrompt,
        messages: toApiMessages(history)
      })
    });

    if (!res.ok) {
      let detail = "";
      try {
        const err = await res.json();
        detail = err.error && err.error.message ? err.error.message : JSON.stringify(err);
      } catch (e) {
        detail = "HTTP " + res.status;
      }
      throw new Error(detail);
    }

    const data = await res.json();
    const text = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return text || "(empty response)";
  }

  // A lightweight local persona engine used when no API key is set. It is not
  // a real language model — it produces a plausible, role-flavored reply so the
  // product is demonstrable, and it tells the user how to enable real answers.
  function localReply(agent, history) {
    const lastUser = [...history].reverse().find((m) => m.role === "user");
    const q = lastUser ? lastUser.content.trim() : "";
    const first = Store.getConversation(agent.id).filter((m) => m.role === "assistant").length === 0;

    const intro = first
      ? `Hi, I'm ${agent.name}, your AI ${agent.role}. `
      : "";

    const canned = {
      "aria-sales":
        "Here's how I'd approach that:\n\n• Lead with the prospect's pain, not your product.\n• Keep the first email under 90 words with one clear ask.\n• Follow up 3× with new value each time.\n\nWant me to draft the actual copy? Tell me the persona and product.",
      "milo-support":
        "I'd handle it like this:\n\n1. Acknowledge the frustration sincerely.\n2. Take ownership and state the fix.\n3. Offer a concrete next step and timeline.\n\nShare the customer's message and I'll write the full reply.",
      "nova-writer":
        "Great brief. My process:\n\n• Nail the hook in the first line.\n• One idea per paragraph, active voice.\n• Close with a single call to action.\n\nGive me the topic, audience, and length and I'll write it.",
      "dex-analyst":
        "Let's ground this in the data:\n\n• Define the exact question first.\n• Pick the metric that answers it (avoid vanity metrics).\n• Check the sample size before trusting a delta.\n\nTell me your schema or numbers and I'll write the query/analysis.",
      "kai-engineer":
        "Here's my take:\n\n• Start with the simplest correct solution.\n• Cover the edge cases (empty, null, huge input).\n• Add a test before refactoring.\n\nPaste the code or describe the problem and I'll dig in.",
      "luna-recruiter":
        "Here's a structured approach:\n\n• Write for the candidate, not the org chart.\n• Score against a rubric, not gut feel.\n• Keep every candidate warm, even rejections.\n\nTell me the role and I'll draft the post or questions."
    };

    const body =
      canned[agent.id] ||
      "Tell me a bit more about what you need and I'll help.";

    const echo = q
      ? `\n\nYou asked: "${q.length > 140 ? q.slice(0, 140) + "…" : q}"`
      : "";

    const note =
      "\n\n— (Demo mode. Add your Anthropic API key in Settings to get real, live answers.)";

    return intro + body + echo + note;
  }

  const Api = {
    /** Returns a Promise resolving to the assistant's reply text. */
    async send(agent, history) {
      const settings = Store.get().settings;
      if (settings.apiKey) {
        return callAnthropic(agent, history, settings);
      }
      // Simulate a small delay so the typing indicator reads naturally.
      await new Promise((r) => setTimeout(r, 450));
      return localReply(agent, history);
    },
    hasKey() {
      return !!Store.get().settings.apiKey;
    }
  };

  window.Api = Api;
})();
