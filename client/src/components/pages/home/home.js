import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import './home.scss';

export default function Home() {
  return (
    <div>
      <header
        className="banner bg-secondary-light py-4"
        style={{
          backgroundImage: "url('/assets//images/gradient.png')",
        }}
      >
        <h1 className="text-center display-4">
          Moles to Melanoma: Recognizing the ABCDE Features
        </h1>
      </header>
      <Container fluid="xxl" className="py-4">
        <Row>
          <Col lg="6" className="mb-4">
            <h2>Before You Get Started</h2>
            <p>
              To make this resource as useful as possible, please make sure you
              review and understand the following information.
            </p>
            <Accordion flush>
              <Accordion.Item eventKey="0" className="border">
                <Accordion.Header>
                  <strong>What is the purpose of this resource?</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    The National Cancer Institute has collected photographs of
                    29 different pigmented skin lesions, presented as case
                    series, to help patients and other individuals recognize
                    common moles, dysplastic nevi (DN), and melanomas that
                    started from DN. Each case series shows changes in an
                    individual pigmented lesion (mole) over time and across the
                    various mole changes typically seen in individuals from U.S.
                    melanoma-prone families.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <div className="text-center my-2">
                <img
                  src="/assets/images/arrow.svg"
                  alt="arrow icon"
                  width="20"
                  height="20"
                />
              </div>
              <Accordion.Item eventKey="1" className="border">
                <Accordion.Header>
                  <strong>What are moles, dysplastic nevi and melanoma?</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>
                      <b>Common Moles</b> - <em>A non-cancerous</em> growth on
                      the skin that is formed by a cluster of melanocytes (cells
                      that make a substance called melanin, which gives color to
                      skin and eyes). A mole may be dark or flesh-colored and
                      may be raised from the skin.
                    </li>
                    <li>
                      <b>Dysplastic Nevi (DN)</b> - A type of mole that
                      <em>
                        {' '}
                        may develop into a type of skin cancer called malignant
                        melanoma
                      </em>
                      . They look different from common moles. A DN is often
                      larger with borders that are not easy to see. Its color is
                      usually uneven and can range from pink to dark brown.
                      Parts of the mole may be raised above the skin surface.
                    </li>
                    <li>
                      <b>Melanoma</b> - <em>A form of cancer</em> that begins in
                      melanocytes (cells that make the pigment melanin). It may
                      begin in a mole (skin melanoma), but can also begin in
                      other pigmented tissues, such as in the eye or in the
                      intestines.
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
              <div className="text-center my-2">
                <img
                  src="/assets/images/arrow.svg"
                  alt="arrow icon"
                  width="20"
                  height="20"
                />
              </div>
              <Accordion.Item eventKey="2" className="border">
                <Accordion.Header>
                  <strong>Who is the intended audience?</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    This resource is intended for patients and others in the lay
                    public. It only includes images of individuals who are at
                    the highest risk of developing melanoma (i.e. Caucasians).
                    Additional information, including resources for other racial
                    and ethnic groups, can be found in the{' '}
                    <a href="#/intended-audience">Intended Audience section</a>.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <div className="text-center my-2">
                <img
                  src="/assets/images/arrow.svg"
                  alt="arrow icon"
                  width="20"
                  height="20"
                />
              </div>
              <Accordion.Item eventKey="3" className="border">
                <Accordion.Header>
                  <strong>What information does this resource provide?</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    This resource provides information about and examples of:
                    common moles, dysplastic nevi (atypical moles) and melanoma.
                    This collection does not include any pictures of
                    non-melanoma types of skin cancer (e.g. basal cell or
                    squamous cell). Since they arise from different cell types
                    in the skin, they look very different from melanoma.
                    Additional information, including resources for other types
                    of non-melanoma skin cancer, can be found in the{' '}
                    <a href="#/intended-audience">Intended Audience section</a>.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              <div className="text-center my-2">
                <img
                  src="/assets/images/arrow.svg"
                  alt="arrow icon"
                  width="20"
                  height="20"
                />
              </div>
              <Accordion.Item eventKey="4" className="border">
                <Accordion.Header>
                  <strong>What is the "ABCDE" rule?</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    The "ABCDE" rule describes the features of early melanoma.
                    These features are:
                  </p>
                  <ol className="list-unstyled">
                    <li className="d-flex align-items-center mb-3">
                      <img src="/assets/images/asymmetry.jpg" alt="Asymmetry" />
                      <div className="ml-3">
                        <strong>
                          <u className="h5">A</u>symmetry
                        </strong>{' '}
                        - The shape of one half does not match the other half.
                      </div>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <img src="/assets/images/border.jpg" alt="border" />
                      <div className="ml-3">
                        <strong>
                          <u className="h5">B</u>order
                        </strong>{' '}
                        that is irregular - The edges are often ragged, notched,
                        or blurred in outline. The pigment may spread into the
                        surrounding skin.
                      </div>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <img src="/assets/images/color.jpg" alt="color" />
                      <div className="ml-3">
                        <strong>
                          <u className="h5">C</u>olor
                        </strong>{' '}
                        that is uneven - Shades of black, brown, and tan may be
                        present. Areas of white, gray, red, pink, or blue may
                        also be seen.
                      </div>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <img src="/assets/images/diameter.jpg" alt="diameter" />
                      <div className="ml-3">
                        <strong>
                          <u className="h5">D</u>iameter
                        </strong>{' '}
                        - There is a change in size, usually an increase.
                        Melanomas can be tiny, but most are larger than 6
                        millimeters wide (about 1/4 inch wide).
                      </div>
                    </li>
                    <li className="d-flex align-items-center mb-3">
                      <img src="/assets/images/evolving.jpg" alt="evolving" />
                      <div className="ml-3">
                        <strong>
                          <u className="h5">E</u>volving
                        </strong>{' '}
                        - The mole has changed over the past few weeks or
                        months.
                      </div>
                    </li>
                  </ol>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <div className="col-lg-6 mb-4">
            <h2>View Photographs</h2>
            <p>
              Please click on the images below to view examples of moles,
              dysplastic nevi, and melanoma.
            </p>
            <a
              href="#/view-cases&filter=mole"
              className="card mb-4 shadow-sm text-decoration-none"
            >
              <Row className="g-0">
                <img
                  src="/assets/images/N1/N1A.jpg"
                  className="col-md-5 object-cover"
                  alt="mole"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">Common Moles</h5>
                    <p className="card-text text-black fw-normal">
                      A non-cancerous growth on the skin that is formed by a
                      cluster of melanocytes (cells that make a substance called
                      melanin, which gives color to skin and eyes). A mole may
                      be dark or flesh-colored and may be raised from the skin.
                    </p>
                  </div>
                </div>
              </Row>
            </a>
            <a
              href="#/view-cases&filter=dysplasticnevi"
              className="card mb-4 shadow-sm text-decoration-none"
            >
              <Row className="g-0">
                <img
                  src="/assets/images/DN10/DN10A.jpg"
                  className="col-md-5 object-cover"
                  alt="dysplastic nevi"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">Dysplastic Nevi (DN)</h5>
                    <p className="card-text text-black fw-normal">
                      A type of mole that may develop into a type of skin cancer
                      called malignant melanoma. They look different from common
                      moles. A dysplastic nevus is often larger with borders
                      that are not easy to see. Its color is usually uneven and
                      can range from pink to dark brown. Parts of the mole may
                      be raised above the skin surface.
                    </p>
                  </div>
                </div>
              </Row>
            </a>
            <a
              href="#/view-cases&filter=melanoma"
              className="card mb-4 shadow-sm text-decoration-none"
            >
              <Row className="g-0">
                <img
                  src="/assets/images/M8/M8E.jpg"
                  className="col-md-5 object-cover"
                  alt="melanoma"
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="col-md-7">
                  <div className="card-body">
                    <h5 className="card-title">Melanoma</h5>
                    <p className="card-text text-black fw-normal">
                      A form of cancer that begins in melanocytes (cells that
                      make the pigment melanin). It may begin in a mole (skin
                      melanoma), but can also begin in other pigmented tissues,
                      such as in the eye or in the intestines.
                    </p>
                  </div>
                </div>
              </Row>
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
}
