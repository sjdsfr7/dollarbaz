import LegalLayout from '@/components/LegalLayout';

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="Oct 2025">
      <h3>1. Acceptance of Terms</h3>
      <p>
        By using Dollarbaz, you agree to these terms. This is a binding legal
        agreement.
      </p>
      <h3>2. Eligibility</h3>
      <p>You must be at least 18 years old to use our services.</p>
      {/* ... more content ... */}
    </LegalLayout>
  );
}
