import { AnimatedFadeIn } from '@/components/ui/AnimatedFadeIn';
import Image from 'next/image';

// This is a server component
export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-24 sm:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedFadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-brand-accent-dark to-brand-accent bg-clip-text text-transparent">
              Trusted by Users Worldwide
            </span>
          </h2>
        </AnimatedFadeIn>
        <AnimatedFadeIn className="mx-auto mt-16 grid max-w-none grid-cols-1 gap-8 md:grid-cols-3 lg:mt-24">
          {/* Testimonial 1 */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="text-gray-600">
              &quot;The most intuitive platform I&apos;ve ever used. Combining
              my banking and trading has saved me so much time and hassle.
              Highly recommend!&quot;
            </div>
            <div className="mt-6 flex items-center gap-x-4">
              <Image
                className="h-10 w-10 rounded-full bg-gray-200"
                src="https://placehold.co/40x40/E5E7EB/4B5563?text=AS"
                alt="Alex S."
                width={40}
                height={40}
              />
              <div>
                <div className="font-poppins font-semibold text-gray-900">
                  Alex S.
                </div>
                <div className="text-sm text-gray-600">Portfolio Manager</div>
              </div>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="text-gray-600">
              &quot;Finally, a platform that doesn&apos;t feel cluttered. The
              dashboard is clean, the execution is fast, and the support is
              top-notch.&quot;
            </div>
            <div className="mt-6 flex items-center gap-x-4">
              <Image
                className="h-10 w-10 rounded-full bg-gray-200"
                src="https://placehold.co/40x40/E5E7EB/4B5563?text=MJ"
                alt="Maria J."
                width={40}
                height={40}
              />
              <div>
                <div className="font-poppins font-semibold text-gray-900">
                  Maria J.
                </div>
                <div className="text-sm text-gray-600">Day Trader</div>
              </div>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="text-gray-600">
              &quot;The multi-currency wallet is a game-changer for my business.
              Dollarbaz has simplified my international finances
              completely.&quot;
            </div>
            <div className="mt-6 flex items-center gap-x-4">
              <Image
                className="h-10 w-10 rounded-full bg-gray-200"
                src="https://placehold.co/40x40/E5E7EB/4B5563?text=RK"
                alt="Ravi K."
                width={40}
                height={40}
              />
              <div>
                <div className="font-poppins font-semibold text-gray-900">
                  Ravi K.
                </div>
                <div className="text-sm text-gray-600">
                  Small Business Owner
                </div>
              </div>
            </div>
          </div>
        </AnimatedFadeIn>
      </div>
    </section>
  );
}
