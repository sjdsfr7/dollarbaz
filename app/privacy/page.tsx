import LegalLayout from '@/components/LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="Oct 2025">
      <h3>1. Introduction</h3>
      <p>
        We respect your privacy. This policy explains how we handle your
        financial data.
      </p>
      <h3>2. Data Collection</h3>
      <p>
        We collect information you provide directly, such as account details and
        transaction history.
      </p>
      {/* ... more content ... */}
    </LegalLayout>
  );
}
