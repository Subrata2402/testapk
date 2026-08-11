import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './FaqPage.css';
import { useTranslation } from '../context/LanguageContext';

export default function FaqPage({ onBackToHome }) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: t('FAQ.QUESTION_1'),
      answer: t('FAQ.ANSWER_1'),
    },
    {
      question: t('FAQ.QUESTION_2'),
      answer: t('FAQ.ANSWER_2'),
    },
    {
      question: t('FAQ.QUESTION_3'),
      answer: t('FAQ.ANSWER_3'),
    },
    {
      question: t('FAQ.QUESTION_4'),
      answer: t('FAQ.ANSWER_4'),
    },
    {
      question: t('FAQ.QUESTION_5'),
      answer: t('FAQ.ANSWER_5'),
    },
    {
      question: t('FAQ.QUESTION_6'),
      answer: t('FAQ.ANSWER_6'),
    },
    {
      question: t('FAQ.QUESTION_7'),
      answer: t('FAQ.ANSWER_7'),
    },
    {
      question: t('FAQ.QUESTION_8'),
      answer: t('FAQ.ANSWER_8'),
    },
    {
      question: t('FAQ.QUESTION_9'),
      answer: t('FAQ.ANSWER_9'),
    },
    {
      question: t('FAQ.QUESTION_10'),
      answer: t('FAQ.ANSWER_10'),
    },
    {
      question: t('FAQ.QUESTION_11'),
      answer: t('FAQ.ANSWER_11'),
    },
  ];

  // Helper to render text with clickable links
  const renderAnswer = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="faq-link"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="faq-container flex-center">
      <div className="faq-card glass-panel animate-fade-in">
        <div className="faq-header">
          <button className="btn-back flex-center" onClick={onBackToHome} aria-label="Go back">
            <Icons.ArrowLeft size={20} />
          </button>
          <h2>{t('FAQ.TITLE')}</h2>
        </div>

        <div className="faq-content">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`faq-item glass-card ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-question-btn flex-center"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <Icons.ChevronDown size={18} className="faq-chevron" />
                </button>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer-content">
                    <p>{renderAnswer(item.answer)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
