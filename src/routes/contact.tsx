import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <p className="text-gray-300 mb-4">
        Thank you for visiting{" "}
        <span className="font-semibold text-yellow-400">Zynvora</span>.
      </p>

      <p className="text-gray-300 mb-4">
        We value your feedback, suggestions, and copyright-related inquiries.
        If you have any questions or need assistance, please feel free to
        contact us through our official social media accounts below.
      </p>

      <div className="mt-8 space-y-4">
        <p>
          📘 <strong>Facebook:</strong>{" "}
          <a
            href="https://www.facebook.com/zynvoraofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:underline"
          >
            facebook.com/zynvoraofficial
          </a>
        </p>

        <p>
          📷 <strong>Instagram:</strong>{" "}
          <a
            href="https://www.instagram.com/zynvoraofficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:underline"
          >
            @zynvoraofficial
          </a>
        </p>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6">
        <h2 className="text-xl font-semibold mb-3">Response Time</h2>
        <p className="text-gray-400">
          We usually respond to all messages within 24–48 hours.
        </p>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6">
        <h2 className="text-xl font-semibold mb-3">Copyright Notice</h2>
        <p className="text-gray-400">
          If you believe that any content on Zynvora infringes your copyright,
          please contact us with the necessary details. We will review your
          request and take appropriate action as soon as possible.
        </p>
      </div>
    </div>
  );
}
