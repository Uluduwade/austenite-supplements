import { CONTACT } from '../config.js'

export default function Privacy() {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <p className="tag">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="muted">Last updated: 24 October 2026</p>
      </section>

      <section className="sec narrow legal-body">
        <p className="lead">Austenite Supplements respects your privacy. This policy explains what information we handle when you use this website and when you contact us to order.</p>

        <h2>Information we collect</h2>
        <p>This website does not have user accounts or online checkout, and we do not ask you to create a profile. We only receive personal information that you choose to send us, such as your name, phone number, delivery details and message when you contact us by WhatsApp, phone, email or social media.</p>

        <h2>How we use it</h2>
        <ul>
          <li>To reply to your enquiries and recommend products.</li>
          <li>To confirm orders, arrange payment and deliver your products.</li>
          <li>To keep a record of orders and customer support conversations.</li>
        </ul>
        <p>We do not sell your personal information or use it for unrelated marketing.</p>

        <h2>Information stored in your browser</h2>
        <p>The website saves your selected currency in your browser&apos;s local storage so your choice is remembered on your next visit. This stays on your device, is not sent to us, and you can clear it at any time from your browser settings. We do not use advertising or tracking cookies.</p>

        <h2>Third-party services</h2>
        <p>Some features rely on other services, which have their own privacy policies:</p>
        <ul>
          <li><strong>Google Fonts</strong> is used to load the site&apos;s typefaces, which means your browser contacts Google&apos;s servers.</li>
          <li><strong>WhatsApp, Instagram, TikTok and email providers</strong> handle any messages you send us through them, and you leave this website when you follow those links.</li>
          <li><strong>Hosting</strong> providers may keep standard server logs, such as IP address and browser type, for security and reliability.</li>
        </ul>

        <h2>Sharing your information</h2>
        <p>We only share your details when needed to complete your order, for example with a delivery service, or when required by law.</p>

        <h2>Keeping your information</h2>
        <p>We keep enquiry and order records only as long as needed to serve you, handle any issues with an order, and meet legal or accounting obligations. You can ask us to delete your information at any time.</p>

        <h2>Your choices</h2>
        <p>You can ask us to see, correct or delete the personal information we hold about you, or stop contacting you, by using the details below.</p>

        <h2>Children</h2>
        <p>Our products and website are intended for adults. We do not knowingly collect personal information from children.</p>

        <h2>Changes to this policy</h2>
        <p>We may update this policy from time to time. The date at the top shows when it was last changed.</p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy? Contact {CONTACT.person} at <a className="legal-link" href={'mailto:' + CONTACT.email}>{CONTACT.email}</a> or on {CONTACT.phone}.
        </p>
      </section>
    </div>
  )
}
