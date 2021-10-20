import React from 'react';

export default function Information() {
  return (
    <div className="container-xxl py-4">
      <h2>More Information</h2>
      <ul className="list-unstyled">
        <li className="mb-3">
          <a
            href="https://www.cancer.gov/types/skin"
            target="_blank"
            rel="noopener noreferrer"
          >
            NCI Skin Cancer (including Melanoma)
          </a>
          <div define-terms={true}>
            National Cancer Institute homepage for skin cancer, including
            melanoma.
          </div>
        </li>
        <li className="mb-3">
          <a
            href="https://mrisktool.cancer.gov/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Melanoma Risk Assessment Tool
          </a>
          <div define-terms={true}>
            An interactive NCI tool to help estimate a person’s risk of
            developing invasive melanoma.
          </div>
        </li>
        <li className="mb-3">
          <a
            href="https://www.cancer.gov/publications/patient-education/anyone-can-get-skin-cancer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anyone Can Get Skin Cancer
          </a>
          <div define-terms={true}>
            An NCI brochure developed to dispel the belief that only people with
            light skin are at risk for skin cancer. Although people with light
            skin have greater risk than people with darker skin, people with
            darker skin can also be at risk.
          </div>
        </li>
        <li className="mb-3">
          <a
            href="https://www.cancer.gov/types/skin/moles-fact-sheet"
            target="_blank"
            rel="noopener noreferrer"
          >
            Common Moles, Dysplastic Nevi, and Risk of Melanoma
          </a>
          <div define-terms={true}>
            NCI fact sheet on common moles, dysplastic nevi, and melanoma.
          </div>
        </li>
        <li className="mb-3">
          <a
            href="https://www.skinsight.com/info/for_professionals/skin-cancer-detection-informed/skin-cancer-education"
            target="_blank"
            rel="noopener noreferrer"
          >
            INFORMED Skin Cancer Education Series
          </a>
          <div define-terms={true}>
            The INternet curriculum FOR Melanoma Early Detection (INFORMED)
            program provides Web-based early-detection training for widespread
            use, and training in dermoscopy (epiluminescence microscopy), which
            has been proven to increase diagnostic accuracy during the skin
            examination.
          </div>
        </li>
        <li className="mb-3">
          <a
            href="https://www.fda.gov/consumers/consumer-updates/should-you-put-sunscreen-infants-not-usually"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sunscreen on Infants? Not Usually—Shade is Best
          </a>
          <div define-terms={true}>
            A pediatrician from the U.S. Food and Drug Administration tells how
            to protect babies from dangerous ultraviolet rays.
          </div>
        </li>
        <li className="mb-3">
          <a
            href="https://www.fda.gov/consumers/consumer-updates/tips-stay-safe-sun-sunscreen-sunglasses"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sun Safety: Save Your Skin!
          </a>
          <div define-terms={true}>
            Advice from the FDA on how to protect your skin from the sun in all
            seasons.
          </div>
        </li>
        <li className="mb-3">
          <a
            href="https://www.cancer.gov/publications/pdq"
            target="_blank"
            rel="noopener noreferrer"
          >
            NCI Physician Data Query (PDQ)
          </a>
          <div define-terms={true}>A comprehensive source of cancer information.</div>
        </li>
      </ul>
      <h3>Educational Videos</h3>
      <ul className="list-unstyled">
        <li className="mb-3">
          <a href="https://dcmf.ca" target="_blank" rel="noopener noreferrer">
            Dear 16-year-old Me
          </a>
          <div define-terms={true}>
            A short film of real individuals whose lives have been touched by
            melanoma, courtesy of the
            <span no-define={true}>David Cornfield Melanoma Fund</span>.
          </div>
        </li>
        <li className="mb-3">
          <a
            href="https://www.youtube.com/watch?v=o9BqrSAHbTc"
            target="_blank"
            rel="noopener noreferrer"
          >
            How the Sun Sees You
          </a>
          <div define-terms={true}>
            A short film of people captured in the ultraviolet spectrum, which
            highlights freckles and sun damage unnoticeable to the naked eye.
          </div>
        </li>
      </ul>
    </div>
  );
}
