"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateProfile } from "@/app/account/profile/actions";

type ProfileFormProps = {
  profile: {
    name?: string;
    email?: string;
  };
};

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(profile.name ?? "");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", name);

      const result = await updateProfile(formData);

      if (result.ok) {
        toast.success("Profile updated.");
        router.refresh();
        return;
      }

      toast.error(result.error ?? "Could not update profile.");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-10 w-full rounded-lg border-violet-100 bg-violet-50/60 px-3 dark:border-violet-900/40 dark:bg-violet-950/30"
        />
      </div>

      <div className="space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Email
        </span>
        <p className="rounded-lg bg-violet-50/60 px-3 py-2 text-sm text-slate-600 dark:bg-violet-950/30 dark:text-slate-300">
          {profile.email}
        </p>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-500 disabled:opacity-50 sm:w-auto"
      >
        {isPending ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}