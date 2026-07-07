import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="text-gray-400 mb-8">
        <strong>Last Updated:</strong> July 2026
      </p>

      <p className="text-gray-300 mb-6">
        Welcome to <span className="font-semibold text-yellow-400">Zynvora</span>.
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your information when you visit our website.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
          <p className="text-gray-300">
            We may collect non-personal information such as your browser type,
            device information, pages visited, and anonymous usage statistics to
            improve your browsing experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
          <p className="text-gray-300">
            Zynvora may use cookies and similar technologies to improve website
            performance, remember user preferences, and analyze website traffic.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Third-Party Services</h2>
          <p className="text-gray-300">
            We may use trusted third-party services such as Google Analytics and
            Google AdSense. These services may collect information according to
            their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Copyright</h2>
          <p className="text-gray-300">
            Movie titles, posters, trailers, logos, and other trademarks belong
            to their respective owners. Zynvora does not claim ownership of any
            third-party copyrighted content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Policy Updates</h2>
          <p className="text-gray-300">
            We may update this Privacy Policy from time to time. Any changes
            will be published on this page with the updated date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-300">
            If you have any questions regarding this Privacy Policy, please
            contact us through our official Facebook or Instagram pages listed
            on our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
