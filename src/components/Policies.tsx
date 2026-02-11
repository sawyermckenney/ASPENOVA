export function Policies() {
  return (
    <section className="pt-24 pb-16 px-6 lg:px-12 max-w-[800px] mx-auto">
      <h1 className="text-[11px] tracking-[0.3em] uppercase text-center mb-16">
        Policies
      </h1>

      <div className="space-y-12 text-sm leading-relaxed text-neutral-600">
        {/* Shipping */}
        <div>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-black mb-4">
            Shipping
          </h2>
          <p>
            All orders are processed within 3–5 business days. Once shipped, you
            will receive a confirmation email with tracking information. Delivery
            times vary by location but typically take 5–10 business days within
            the United States. International shipping times may vary.
          </p>
        </div>

        {/* Returns & Exchanges */}
        <div>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-black mb-4">
            Returns &amp; Exchanges
          </h2>
          <p>
            We accept returns and exchanges within 30 days of delivery. Items
            must be unworn, unwashed, and in their original packaging. To
            initiate a return or exchange, please contact us at{' '}
            <a
              href="mailto:ryanzsawyerm@googlegroups.com"
              className="underline hover:text-black transition-colors"
            >
              ryanzsawyerm@googlegroups.com
            </a>{' '}
            with your order number and reason for return. Refunds will be
            processed to the original payment method within 5–10 business days
            after we receive the returned item.
          </p>
        </div>

        {/* Privacy Policy */}
        <div>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-black mb-4">
            Privacy Policy
          </h2>
          <p>
            We collect only the information necessary to process your order,
            including your name, email, shipping address, and payment details.
            Your information is never sold or shared with third parties, except
            as required to fulfill your order (e.g., shipping carriers, payment
            processors). We may use your email to send order updates and, with
            your consent, occasional promotional communications. You can
            unsubscribe at any time.
          </p>
        </div>

        {/* Terms of Service */}
        <div>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-black mb-4">
            Terms of Service
          </h2>
          <p>
            By placing an order through our website, you agree to these terms.
            All prices are listed in USD and are subject to change without
            notice. We reserve the right to limit quantities, refuse orders, or
            cancel orders at our discretion. Product images are for
            illustration; actual colors may vary slightly. Aspenova Club is not
            liable for delays caused by shipping carriers or circumstances
            beyond our control.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-black mb-4">
            Contact Us
          </h2>
          <p>
            For any questions regarding our policies, reach out to us at{' '}
            <a
              href="mailto:ryanzsawyerm@googlegroups.com"
              className="underline hover:text-black transition-colors"
            >
              ryanzsawyerm@googlegroups.com
            </a>
            . Follow us on{' '}
            <a
              href="https://www.instagram.com/aspenovaclub/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black transition-colors"
            >
              Instagram
            </a>{' '}
            for the latest updates.
          </p>
        </div>
      </div>
    </section>
  );
}
