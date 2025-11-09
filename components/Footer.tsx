import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Product</h4>
            <Link href="#">Core Banking</Link>
            <Link href="#">B2B Services</Link>
            <Link href="#">Planning</Link>
            <Link href="#">Trading</Link>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <Link href="#">About</Link>
            <Link href="#">Careers</Link>
            <Link href="#">Press</Link>
            <Link href="#">Contact</Link>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <Link href="#">Documentation</Link>
            <Link href="#">API</Link>
            <Link href="#">Support</Link>
            <Link href="#">Status</Link>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Security</Link>
            <Link href="#">Compliance</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Dollarbaz. All rights reserved.</p>
          <div className="legal-disclosures">
            <p>
              Payment accounts and cards are provided by regulated partners.
              Instant payments availability and limits depend on your account
              and recipient bank.
            </p>
            <p>
              Trading services are offered by third-party regulated entities.
              Capital at risk. Not investment advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
