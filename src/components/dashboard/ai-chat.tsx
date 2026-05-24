"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Bot, User, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  projectId: string;
  agent: "validate" | "build" | "growth" | "raise";
  agentName: string;
  agentColor: string;
  initialMessages?: Message[];
  placeholder?: string;
  onScoreUpdate?: (score: number) => void;
}

export function AIChat({ projectId, agent, agentName, agentColor, initialMessages = [], placeholder, onScoreUpdate }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`/api/ai/${agent}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          message: userMessage.content,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "assistant", content: `Error: ${data.error}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "assistant", content: data.response },
        ]);
        if (onScoreUpdate) {
          const scoreMatch = data.response.match(/"score"\s*:\s*(\d+)/);
          if (scoreMatch) {
            const score = parseInt(scoreMatch[1]);
            onScoreUpdate(score);
            toast.success(`Validation Score: ${score}/100`, {
              description: score >= 75 ? "Strong potential detected!" : score >= 60 ? "Moderate potential — refine your positioning" : "Consider iterating on your approach",
            });
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "assistant", content: "Failed to connect to AI. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] rounded-xl border border-border bg-surface overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", agentColor)}>
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold">{agentName}</h3>
          <p className="text-xs text-muted">AI Agent</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center max-w-sm space-y-3">
              <div className={cn("mx-auto flex h-12 w-12 items-center justify-center rounded-xl", agentColor)}>
                <Bot className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm text-muted">
                {placeholder || `Start chatting with the ${agentName} to get started.`}
              </p>
            </div>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}>
            <div className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              msg.role === "assistant" ? agentColor : "bg-surface-light"
            )}>
              {msg.role === "assistant" ? <Bot className="h-4 w-4 text-white" /> : <User className="h-4 w-4" />}
            </div>
            <div className={cn(
              "max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed group/msg relative",
              msg.role === "assistant" ? "bg-background border border-border" : "bg-accent-purple/20"
            )}>
              {msg.role === "assistant" ? (
                <>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(msg.content);
                      toast.success("Copied to clipboard");
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover/msg:opacity-100 transition-opacity p-1 rounded hover:bg-surface-light"
                    title="Copy"
                  >
                    <Copy className="h-3.5 w-3.5 text-muted" />
                  </button>
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted prose-strong:text-foreground prose-td:text-muted prose-th:text-foreground prose-li:text-muted prose-a:text-accent-purple">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </>
              ) : (
                <div className="whitespace-pre-wrap">{msg.content}</div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", agentColor)}>
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="rounded-xl bg-background border border-border px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{agentName} is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t border-border p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Type your message..."
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
          />
          <Button type="submit" disabled={loading || !input.trim()} size="icon" className="shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
