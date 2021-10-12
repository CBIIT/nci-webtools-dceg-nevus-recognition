import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Nav, Card } from 'react-bootstrap';
import parse from 'html-react-parser';
import './cases.scss';

export default function Cases({ match, filters, cases }) {
  const rawParams = match.params.params || '&filter=mole';
  const params = new URLSearchParams(rawParams);
  const filter = params.get('filter');
  const info = params.get('info');
  const search = params.get('search');
  const limit = params.get('limit');

  const tabs = [
    { name: 'Common Moles', id: 'mole' },
    { name: 'Dysplastic Nevi (DN)', id: 'dysplasticnevi' },
    { name: 'Melanomas', id: 'melanoma' },
  ];

  const selectedFilter = filters.filter((e) => e.type === filter)[0];
  const selectedCases = cases.filter((e) => e.type === filter);

  const [imageLimit, setImageLimit] = useState(limit || 6);
  console.log(selectedFilter);

  return (
    <Card className="border-0">
      <Card.Header>
        <Nav
          variant="pills"
          defaultActiveKey="mole"
          activeKey={filter}
          className="justify-content-center"
        >
          {tabs.map(({ name, id }) => (
            <Nav.Item key={id}>
              <Nav.Link eventKey={id} href={`#/view-cases&filter=${id}`}>
                {name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Card.Header>
      <Card.Body className="p-0">
        {/* Description */}
        {!search && (
          <div className="bg-primary text-light py-3">
            <Container fluid="xxl">
              <p>{parse(selectedFilter.descriptionsummary)}</p>
              {info == 1 && <p>{parse(selectedFilter.description)}</p>}
              <div className="text-center my-3">
                <a
                  className="btn btn-light text-uppercase"
                  href={`#/view-cases${rawParams.replace(
                    /&info=.{1}/,
                    ''
                  )}&info=${info == 1 ? 0 : 1}`}
                >
                  Show {info == 1 ? 'Less' : 'More'} Information
                </a>
              </div>
            </Container>
          </div>
        )}

        {/* Case Image Grid */}
        <Container fluid="xxl py-5">
          <h2 className="text-center pb-4">
            {search ? 'Search Results' : 'Examples'}
          </h2>
          <Row className="mb-3">
            {selectedCases.map(
              (c, index) =>
                index < imageLimit && (
                  <Col md="6" lg="4" className="mb-5">
                    <Card
                      as="a"
                      className="shadow image-highlight"
                      href={`#/view-cases&${rawParams}&limit=${imageLimit}&info=${
                        info ? 1 : 0
                      }&case=${index}&img=0`}
                    >
                      <img
                        src={'/assets/' + c.images[0].image}
                        className="card-img-top"
                        alt={c.title}
                        no-context-menu
                      />
                      <Card.Body className="text-center">
                        <div className="card-text text-dark font-weight-bold text-uppercase">
                          {c.name}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                )
            )}
          </Row>
        </Container>

        {/* Show More Images Button */}
        {imageLimit < selectedCases.length && (
          <div className="text-center mb-3">
            <Button
              as="a"
              className="text-uppercase"
              onClick={() => setImageLimit(imageLimit + 6)}
              href={`#/view-cases?${rawParams}&limit=${imageLimit + 6}&info=${
                info ? 1 : 0
              }`}
            >
              Show More Images
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
