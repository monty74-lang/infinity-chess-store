function FAQ() {
  const faqs = [
    {
      question: "How do I purchase a course?",
      answer: "Contact us on Telegram. We'll guide you through the purchase process.",
    },
    {
      question: "How much does each course cost?",
      answer: "Every course is available for a one-time payment of ₹999.",
    },
    {
      question: "Can I ask questions before purchasing?",
      answer: "Yes. Feel free to contact us on Telegram before making a purchase.",
    },
    {
      question: "Can't find the course I'm looking for?",
      answer: "Message us on Telegram. We'll let you know if it's available.",
    },
  ];

  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-5xl px-8">
        <h2 className="mb-4 text-center text-5xl font-bold">
          Frequently Asked Questions
        </h2>

        <p className="mb-12 text-center text-slate-400">
          Everything you need to know before purchasing.
        </p>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="text-xl font-bold">
                {faq.question}
              </h3>

              <p className="mt-3 text-slate-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;