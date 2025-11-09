'use client';

// Import the shadcn/ui components
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; // Use Button, not plain <button>

type LoginFormProps = {
  action: (formData: FormData) => void;
};

export default function LoginForm({ action }: LoginFormProps) {
  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        {/* Use Tailwind classes for colors */}
        <Label htmlFor="email" className="text-steel-400">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
          // These classes make it match the dark theme
          className="bg-ink-900 border-steel-600 text-fog-50 placeholder:text-steel-600"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-steel-400">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          // These classes make it match the dark theme
          className="bg-ink-900 border-steel-600 text-fog-50"
        />
      </div>

      {/* This is now the shadcn/ui <Button>.
        We apply all our .btn-primary styles *directly* to it
        using Tailwind classes.
      */}
      <Button
        type="submit"
        className="w-full text-white text-base font-semibold
                   bg-gradient-to-r from-aqua-600 to-aqua-500
                   rounded-xl p-6 h-auto
                   shadow-[0_6px_20px_rgba(50,109,136,0.25)]
                   hover:translate-y-[-3px]
                   transition-all duration-300
                   hover:shadow-[0_12px_35px_rgba(50,109,136,0.4)]
                   hover:bg-gradient-to-r hover:from-aqua-600 hover:to-aqua-500"
      >
        Login
      </Button>
    </form>
  );
}
