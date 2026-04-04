"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectCard } from "@/components/dashboard/project-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2, Rocket } from "lucide-react";

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
      setForm({ name: "", description: "" });
      setShowNew(false);
      fetchProjects();
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black">Your Projects</h1>
          <p className="mt-1 text-muted">Manage your AI-powered startups</p>
        </div>
        <Button
          onClick={() => setShowNew(!showNew)}
          className="bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* New project form */}
      {showNew && (
        <div className="mb-8 rounded-xl border border-border bg-surface p-6">
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
                Create &amp; Start Validation
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowNew(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Projects grid */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Rocket className="h-16 w-16 text-muted mb-4" />
          <h2 className="text-2xl font-bold">No projects yet</h2>
          <p className="mt-2 text-muted max-w-sm">
            Create your first project and let PONYX AI validate, build, test, and raise for your startup.
          </p>
          <Button
            onClick={() => setShowNew(true)}
            className="mt-6 bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Create First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
