import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards, UPI, net banking, and wallets like Paytm and Google Pay."
  },
  {
    question: "How long does shipping take?",
    answer:
      "Orders are processed within 24 hours and delivered within 3-7 business days, depending on your location."
  },
  {
    question: "Can I return or exchange my order?",
    answer:
      "Yes! You can return or exchange items within 7 days of delivery, as long as they are unused and in original packaging."
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we only ship within India. International shipping will be available soon."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-400 rounded-lg shadow-sm bg-inherit/40"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left text-lg font-medium hover:bg-gray-50 "
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="ml-2 text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden "
                >
                  <div className="p-4 pt-0 text-gray-600 bg-gray-50">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
