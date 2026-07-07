import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>

      <p className="text-gray-400 mb-8">
        <strong>Last Updated:</strong> July 2026
      </p>

      <p className="text-gray-300 mb-6">
        Welcome to <span className="font-semibold text-yellow-400">Zynvora</span>.
        By accessing and using this website, you agree to comply with the
        following Terms & Conditions.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Website Usage</h2>
          <p className="text-gray-300">
            You agree to use Zynvora only for lawful purposes. Any attempt to
            misuse, damage, or interfere with the website or its services is
            strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Content Disclaimer</h2>
          <p className="text-gray-300">
            Zynvora provides movie information for entertainment and educational
            purposes. We strive to keep information accurate, but we cannot
            guarantee that all content is always complete, accurate, or
            up-to-date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Intellectual Property</h2>
          <p className="text-gray-300">
            All movie titles, posters, trailers, logos, trademarks, and related
            materials belong to their respective copyright owners. Zynvora does
            not claim ownership of third-party intellectual property.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">External Links</h2>
          <p className="text-gray-300">
            Our website may include links to third-party websites. We are not
            responsible for the content, privacy practices, or policies of those
            external websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Changes to These Terms</h2>
          <p className="text-gray-300">
            We reserve the right to modify these Terms & Conditions at any time.
            Updated versions will be published on this page with the revised
            date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions regarding these Terms & Conditions, please
            contact us through our official social media accounts listed on the
            Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
