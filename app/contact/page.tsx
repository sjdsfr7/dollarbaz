'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-cream dark:bg-carbon-grey pt-32 pb-20 transition-colors">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-brand-olive-dark dark:text-white mb-4">
            Get in touch.
          </h1>
          <p className="text-xl text-brand-olive-med dark:text-gray-400">
            Support, business, and partnership questions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <ContactCard
              title="Support"
              email="support@dollarbaz.com"
              icon="ph-lifebuoy"
            />
            <ContactCard
              title="Partnerships"
              email="partners@dollarbaz.com"
              icon="ph-handshake"
            />
            <ContactCard
              title="Press"
              email="press@dollarbaz.com"
              icon="ph-megaphone"
            />
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-[#12181f] p-8 rounded-3xl border border-brand-olive-med/10 dark:border-white/5">
            <form className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input className="bg-brand-offwhite dark:bg-black/20" />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  className="bg-brand-offwhite dark:bg-black/20"
                  type="email"
                />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea className="bg-brand-offwhite dark:bg-black/20 h-32" />
              </div>
              <Button className="w-full bg-brand-teal dark:bg-neon-blue dark:text-black">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

interface ContactCardProps {
  title: string;
  email: string;
  icon: string;
}

function ContactCard({ title, email, icon }: ContactCardProps) {
  return (
    <div className="flex items-center gap-4 p-6 bg-white dark:bg-[#12181f] rounded-2xl border border-brand-olive-med/10 dark:border-white/5">
      <div className="w-10 h-10 rounded-full bg-brand-offwhite dark:bg-white/10 flex items-center justify-center text-brand-teal dark:text-neon-blue">
        <i className={`ph-fill ${icon} text-xl`}></i>
      </div>
      <div>
        <h3 className="font-bold text-brand-olive-dark dark:text-white">
          {title}
        </h3>
        <a
          href={`mailto:${email}`}
          className="text-brand-olive-med dark:text-gray-400 hover:text-brand-teal dark:hover:text-neon-blue"
        >
          {email}
        </a>
      </div>
    </div>
  );
}
