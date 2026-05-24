"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ProjectCard } from "@/components/dashboard/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Loader2, Rocket, BarChart3, Code2, PiggyBank } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  phase: string;
  score: number | null;
  createdAt: string;
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-muted" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(searchParams.get("new") === "true");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description) return;
    setCreating(true);

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const project = await res.json();
      setForm({ name: "", description: "" });
      setShowNew(false);
      router.push(`/dashboard/project/${project.id}`);
      return;
    }
    setCreating(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-muted" />
      </div>
    );
  }

  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "Founder";

  return (
    <div>
      {/* Welcome header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black">
            {projects.length === 0 ? `Welcome, ${userName}` : "Your Projects"}
          </h1>
          <p className="mt-1 text-muted">
            {projects.length === 0
              ? "Create your first project and let PONYX AI validate, build, test, and raise for your startup."
              : `${projects.length} project${projects.length !== 1 ? "s" : ""} — from idea to traction`}
          </p>
        </div>
        <Button
          onClick={() => setShowNew(!showNew)}
          className="bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90 shrink-0"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* New project form */}
      {showNew && (
        <Card className="mb-8 gradient-border">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Create New Startup Project</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Project Name</label>
                <Input
                  placeholder="e.g., AI-powered meal planning app"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Describe Your Idea</label>
                <Textarea
                  placeholder="Describe your startup idea in detail. What problem does it solve? Who is your target audience? What makes it unique?"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <Button type="submit" disabled={creating}>
                  {creating && <Loader2 className="h-4 w-4 animate-spin" />}
                  Create & Start Validation
                </Button>
                <Button type="button" variant="ghost" onClick={() => setShowNew(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {projects.length === 0 && !showNew ? (
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-pink/20 to-accent-purple/20 mb-6">
              <Rocket className="h-10 w-10 text-brand-pink" />
            </div>
            <h2 className="text-2xl font-bold">Launch your first startup</h2>
            <p className="mt-2 text-muted max-w-md">
              Describe your idea and PONYX will guide you through validation, building, testing, and fundraising — in days, not months.
            </p>
            <Button
              onClick={() => setShowNew(true)}
              className="mt-6 bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90"
              size="lg"
            >
              <Plus className="h-5 w-5" />
              Create First Project
            </Button>
          </div>

          {/* How it works cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BarChart3, title: "1. Validate", desc: "AI scores your idea against real market data", color: "text-accent-purple", bg: "bg-accent-purple" },
              { icon: Code2, title: "2. Build", desc: "Generate landing pages, copy, and MVP assets", color: "text-accent-orange", bg: "bg-accent-orange" },
              { icon: Rocket, title: "3. Test", desc: "Launch campaigns and collect market signals", color: "text-accent-green", bg: "bg-accent-green" },
              { icon: PiggyBank, title: "4. Raise", desc: "Create pitch decks and financial projections", color: "text-accent-red", bg: "bg-accent-red" },
            ].map((step) => (
              <Card key={step.title}>
                <CardContent className="p-5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step.bg} mb-3`}>
                    <step.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className={`font-bold ${step.color}`}>{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : projects.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
