import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      <p className="text-gray-300 mb-4">
        Thank you for visiting Zynvora!
      </p>

      <p className="text-gray-300 mb-4">
        If you have any questions, suggestions, feedback, or copyright concerns,
        feel free to reach out to us through our official social media accounts.
      </p>

      <p className="text-gray-300 mb-4">
        Our official Facebook and Instagram links are available in the website footer.
      </p>

      <p className="text-gray-300">
        We usually respond within 24–48 hours.
      </p>
    </div>
  );
}
