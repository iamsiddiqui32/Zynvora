import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>

      <p className="text-gray-400 mb-8">
        <strong>Last Updated:</strong> July 2026
      </p>

      <p className="text-gray-300 mb-6">
        Welcome to <span className="font-semibold text-yellow-400">Zynvora</span>.
        This Disclaimer explains the limitations of liability and the nature of
        the content available on our website.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Information Purpose
          </h2>

          <p className="text-gray-300">
            Zynvora is created to help users discover animated movies and anime
            through movie information, trailers, and an enjoyable browsing
            experience. The information provided on this website is for general
            informational and entertainment purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Copyright Notice
          </h2>

          <p className="text-gray-300">
            All movie titles, posters, trailers, logos, images, trademarks, and
            other intellectual property displayed on Zynvora belong to their
            respective copyright owners. We do not claim ownership of any
            third-party content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Accuracy of Information
          </h2>

          <p className="text-gray-300">
            While we strive to keep all information accurate and up to date,
            Zynvora makes no guarantees regarding the completeness, reliability,
            or accuracy of the content published on this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            External Services
          </h2>

          <p className="text-gray-300">
            Our website may contain links to third-party websites, trailers, or
            services. We are not responsible for the content, availability, or
            privacy practices of external websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Limitation of Liability
          </h2>

          <p className="text-gray-300">
            By using Zynvora, you acknowledge that you do so at your own risk.
            Zynvora shall not be held liable for any direct or indirect damages
            arising from the use of this website or its content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            Contact Us
          </h2>

          <p className="text-gray-300">
            If you have any questions regarding this Disclaimer or believe that
            any content should be reviewed, please contact us through our
            official social media accounts listed on the Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
