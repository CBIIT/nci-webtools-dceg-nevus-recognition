import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DisclaimerModal() {
  const [show, setShow] = useState(
    localStorage.getItem('showDisclaimer') == 'false' ? false : true
  );

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      animation={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title className="d-flex justify-content-center w-100">
          Disclaimer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li define-terms={true}>
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
          <li define-terms={true}>
            The pictures show examples of the variability in pigmented lesions
            in U.S. melanoma-prone families.
          </li>
          <li define-terms={true}>
            Because most of the study participants are Caucasian, the nevi and
            melanomas shown are not representative of those found in individuals
            with darker skin.
          </li>
          <li define-terms={true}>
            Melanomas and lesions suspicious for melanoma vary widely in
            appearance; these pictures should not be used to diagnose melanoma.
          </li>
          <li define-terms={true}>
            NCI does not provide medical advice to users of its website.
          </li>
          <li define-terms={true}>
            Consult with a qualified health care provider if you have concerns
            about your skin.
          </li>
        </ul>
        <h6>About the photos</h6>
        <ul>
          <li define-terms={true}>
            The photographs have variations in color due to differences in
            photography equipment, lighting, and skin color of the individual
            (e.g. sunburned or suntanned).
          </li>
          <li define-terms={true}>Photographs are standardized to ease viewing. </li>
          <li define-terms={true}>
            Rulers show size of the moles and melanomas in millimeters.
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-0">
        <Button
          variant="outline-secondary"
          onClick={() => {
            setShow(false);
            localStorage.setItem('showDisclaimer', false);
          }}
        >
          Acknowledge
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
