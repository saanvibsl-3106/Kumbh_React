import React, { useState } from 'react';
import faqData from '../bolgData/faqData';
import { Helmet } from 'react-helmet-async';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-background">
      <Helmet>
                <title>Prayatak - Faq </title>
            </Helmet>
      <div className="faq-container">
        <h2>Frequently Asked Questions</h2>
        <div>
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <span
                  className={`faq-arrow ${openIndex === index ? 'open' : ''}`}
                >
                  ▶
                </span>
                {item.question}
              </div>
              {openIndex === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
