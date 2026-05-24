"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User, Lock, Mail, Calendar } from "lucide-react";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
}

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch("/api/user");
    if (res.ok) {
      const data = await res.json();
      setProfile(data);
      setName(data.name || "");
    }
    setLoading(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const body: { name?: string; newPassword?: string } = {};
    if (name !== profile?.name) body.name = name;
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords don't match");
        setSaving(false);
        return;
      }
      if (newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        setSaving(false);
        return;
      }
      body.newPassword = newPassword;
    }

    if (Object.keys(body).length === 0) {
      toast.info("No changes to save");
      setSaving(false);
      return;
    }

    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success("Profile updated");
      setNewPassword("");
      setConfirmPassword("");
      if (body.name) {
        await update({ name: body.name });
      }
      fetchProfile();
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to update profile");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-muted" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-black mb-2">Settings</h1>
      <p className="text-muted mb-8">Manage your account and preferences</p>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-accent-purple" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-muted" />
                Email
              </label>
              <Input
                value={profile?.email || ""}
                disabled
                className="opacity-60"
              />
              <p className="mt-1 text-xs text-muted">Email cannot be changed</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <Calendar className="h-3.5 w-3.5" />
              Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—"}
            </div>
          </CardContent>
        </Card>

        {/* Password */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-5 w-5 text-accent-orange" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">New Password</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep current"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Confirm Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Plan</p>
                <p className="text-xs text-muted">You&apos;re on the free tier</p>
              </div>
              <Button variant="outline" size="sm" disabled>
                Upgrade (Coming Soon)
              </Button>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={saving} className="bg-gradient-to-r from-brand-pink to-brand-magenta hover:opacity-90">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </form>
    </div>
  );
}
