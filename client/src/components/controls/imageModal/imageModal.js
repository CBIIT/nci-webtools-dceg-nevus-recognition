import React from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';
import Define from '../defineText/define';

export default function ImageModal({ cases, filters }) {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.pathname);
  const filter = params.get('filter') || 'mole';
  const info = params.get('info') || 0;
  const limit = params.get('limit') || 6;
  const subgrouptype = params.get('subgrouptype') || filter;
  const caseIndex = params.get('case');
  const imgIndex = params.get('img');

  const selectedFilter = filters.filter((f) => f.type === filter)[0];
  const filteredCases = cases
    .filter((c) => c.type === filter)
    .filter((c) =>
      selectedFilter.subgroups
        ? c.subgroup == subgrouptype || subgrouptype == filter
        : true
    );
  const selectedCase = caseIndex >= 0 ? filteredCases[caseIndex] : null;

  return (
    <>
      {selectedCase && (
        <Modal
          show={caseIndex && imgIndex && caseIndex >= 0 && imgIndex >= 0}
          onHide={() =>
            history.push(
              `view-cases&filter=${filter}${
                selectedFilter.subgroups ? `&subgrouptype=${subgrouptype}` : ''
              }&limit=${limit}&info=${info}`
            )
          }
          animation={false}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title className="d-flex w-100">
              <h5 className="modal-title" id="image-modal-title">
                {selectedCase.title}
              </h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0">
            <div className="p-3">
              <Define>
                <p define-terms="true">
                  {parse(filteredCases[caseIndex].description)}
                </p>
                <p>"ABCDE" features:</p>
                <ul className="pl-4">
                  <li>
                    <strong define-terms={true}>Asymmetry</strong> -{' '}
                    <span define-terms={true}>
                      {parse(selectedCase.abcde.asymmetry)}
                    </span>
                  </li>
                  <li>
                    <strong define-terms={true}>Border</strong> -{' '}
                    <span define-terms={true}>
                      {parse(selectedCase.abcde.border)}
                    </span>
                  </li>
                  <li>
                    <strong define-terms={true}>Color</strong> -{' '}
                    <span define-terms={true}>
                      {parse(selectedCase.abcde.color)}
                    </span>
                  </li>
                  <li>
                    <strong define-terms={true}>Diameter</strong> -{' '}
                    <span define-terms={true}>
                      {parse(selectedCase.abcde.diameter)}
                    </span>
                  </li>
                  <li>
                    <strong define-terms={true}>Evolving</strong> -{' '}
                    <span define-terms={true}>
                      {parse(selectedCase.abcde.evolving)}
                    </span>
                  </li>
                </ul>
                <strong>
                  <span className="text-capitalize" define-terms={true}>
                    {parse(selectedCase.diagnosis.type)}
                  </span>{' '}
                  <span define-terms={true}>Diagnosis: </span>
                </strong>
                <span define-terms={true}>
                  {parse(selectedCase.diagnosis.result)}
                </span>
              </Define>
            </div>
            <div className="p-3 text-center bg-secondary-light">
              {selectedCase.images.map((image, i) => (
                <a
                  key={i}
                  className="d-inline-block"
                  href={`#/view-cases&filter=${filter}${
                    selectedFilter.subgroups
                      ? `&subgrouptype=${subgrouptype}`
                      : ''
                  }&limit=${limit}&info=${info}&case=${caseIndex}&img=${i}`}
                >
                  <img
                    src={'assets/' + image.thumbnail}
                    height="65"
                    className={`m-2 shadow-lg object-cover ${
                      i == imgIndex ? 'outline-white-1¸' : ''
                    }`}
                    alt={`Thumbnail for ${selectedCase.title}, Image ${i + 1}`}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </a>
              ))}
            </div>

            <Container fluid>
              <Row>
                <Col xl="6" className="p-0">
                  <img
                    className="w-100 h-100 object-cover"
                    src={'assets/' + selectedCase.images[imgIndex].image}
                    alt={`${selectedCase.title}, Image ${imgIndex + 1}`}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </Col>
                <Col
                  xl="6"
                  className="p-3 bg-primary-dark text-light"
                  define-terms={true}
                >
                  <Define force={true}>
                    {parse(selectedCase.images[imgIndex].description)}
                  </Define>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
