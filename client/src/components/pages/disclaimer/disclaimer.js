import React from 'react';

export default function Disclaimer() {
  return (
    <div className="container-xxl py-4">
      <h2>Disclaimer</h2>
      <ul>
        <li define-terms>
          The pictures used in this tool were taken over more than a 35-year
          period. They show moles and melanomas from participants enrolled in
          the{' '}
          <a
            href="https://clinicaltrials.gov/show/NCT00040352"
            target="_blank"
            rel="noopener noreferrer"
          >
            NCI Familial Melanoma Study
          </a>
          .{' '}
        </li>
        <li define-terms>
          The pictures show examples of the variability in pigmented lesions in
          U.S. melanoma-prone families.
        </li>
        <li define-terms>
          Because most of the study participants are Caucasian, the nevi and
          melanomas shown are not representative of those found in individuals
          with darker skin.
        </li>
        <li define-terms>
          Melanomas and lesions suspicious for melanoma vary widely in
          appearance; these pictures should not be used to diagnose melanoma.
        </li>
        <li define-terms>
          NCI does not provide medical advice to users of its website.
        </li>
        <li define-terms>
          Consult with a qualified health care provider if you have concerns
          about your skin.
        </li>
      </ul>
      <h3>About the photos</h3>
      <ul>
        <li define-terms>
          The photographs have variations in color due to differences in
          photography equipment, lighting, and skin color of the individual
          (e.g. sunburned or suntanned).
        </li>
        <li define-terms>Photographs are standardized to ease viewing. </li>
        <li define-terms>
          Rulers show size of the moles and melanomas in millimeters.
        </li>
      </ul>
    </div>
  );
}
