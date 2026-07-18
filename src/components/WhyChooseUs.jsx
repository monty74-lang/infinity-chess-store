import { FaBolt, FaBookOpen, FaShieldAlt, FaHeadset } from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaBookOpen className="text-4xl text-amber-400" />,
      title: "500+ Premium Courses",
      description: "A large collection of chess courses for every level.",
    },
    {
      icon: <FaBolt className="text-4xl text-amber-400" />,
      title: "One-Time Payment",
      description: "Simple pricing with no monthly subscriptions.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-amber-400" />,
      title: "Trusted Store",
      description: "Organized categories and a smooth buying experience.",
    },
    {
      icon: <FaHeadset className="text-4xl text-amber-400" />,
      title: "Quick Support",
      description: "Reach us easily on Telegram if you need assistance.",
    },
  ];

  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-4 text-center text-5xl font-bold">
          Why Choose Infinity Chess Store?
        </h2>

        <p className="mb-16 text-center text-slate-400">
          Everything you need to improve your chess in one place.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center transition hover:-translate-y-2"
            >
              <div className="mb-6 flex justify-center">
                {feature.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;