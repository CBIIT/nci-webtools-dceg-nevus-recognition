import React from 'react';
import { Container, Row, Col, Button, Nav, Card } from 'react-bootstrap';
import parse from 'html-react-parser';
import './cases.scss';

export default function Cases({ filters, cases, location }) {
  const params = new URLSearchParams(location.pathname);
  const filter = params.get('filter') || 'mole';
  const info = params.get('info') || 0;
  const search = params.get('search') || '';
  const limit = params.get('limit') || 6;
  const subgrouptype = params.get('subgrouptype') || filter;

  const selectedFilter = filters.filter((f) => f.type === filter)[0];
  const filteredCases = search
    ? cases.filter((c) => {
        var content = JSON.stringify(c).toLowerCase();
        return content.includes(search.toLowerCase());
      })
    : cases
        .filter((c) => c.type === filter)
        .filter((c) =>
          selectedFilter.subgroups
            ? c.subgroup == subgrouptype || subgrouptype == filter
            : true
        );

  const tabs = [
    { name: 'Common Moles', id: 'mole' },
    { name: 'Dysplastic Nevi (DN)', id: 'dysplasticnevi' },
    { name: 'Melanomas', id: 'melanoma' },
  ];

  return (
    <Card className="border-0 bg-light">
      <Card.Header>
        <Nav
          variant="pills"
          defaultActiveKey="mole"
          activeKey={!search && filter}
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
              {parse(selectedFilter.descriptionsummary)}
              {info == 1 && parse(selectedFilter.description)}
              <div className="text-center my-3">
                <a
                  className="btn btn-light text-uppercase"
                  href={`#/view-cases&filter=${filter}&info=${
                    info == 1 ? 0 : 1
                  }`}
                >
                  Show {info == 1 ? 'Less' : 'More'} Information
                </a>
              </div>
            </Container>
          </div>
        )}

        {/* Subgroup Tabs */}
        {selectedFilter.subgroups && (
          <ul className="nav nav-tabs nav-fill bg-light">
            {selectedFilter.subgroups.map((sub, i) => (
              <li
                key={i}
                className="nav-item"
                style={{ width: 100 / selectedFilter.subgroups.length + '%' }}
              >
                <a
                  className={`nav-link fw-bold border-secondary h-100 ${
                    subgrouptype == sub.type
                      ? 'bg-light border-bottom-0'
                      : 'bg-white'
                  }`}
                  href={`#/view-cases&filter=${filter}&subgrouptype=${sub.type}&info=${info}`}
                >
                  {sub.name}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Case Image Grid */}
        <Container fluid="xxl py-5">
          <h2 className="text-center pb-4">
            {search ? 'Search Results' : 'Examples'}
          </h2>
          <Row className="mb-3">
            {filteredCases.map(
              (c, index) =>
                index < limit && (
                  <Col md="6" lg="4" className="mb-5" key={index}>
                    <Card
                      as="a"
                      className="shadow image-highlight"
                      href={`#/view-cases&filter=${filter}${
                        selectedFilter.subgroups
                          ? `&subgrouptype=${subgrouptype}`
                          : ''
                      }&limit=${limit}&info=${info}&case=${index}&img=0`}
                    >
                      <img
                        src={'/assets/' + c.images[0].image}
                        className="card-img-top"
                        alt={c.title}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      <Card.Body className="text-center">
                        <div className="card-text text-dark fw-bold text-uppercase">
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
        {limit < filteredCases.length && (
          <div className="text-center mb-3">
            <Button
              as="a"
              className="text-uppercase"
              href={`#/view-cases${
                search
                  ? `&search=${search}`
                  : `&filter=${filter}${
                      selectedFilter.subgroups
                        ? `&subgrouptype=${subgrouptype}`
                        : ''
                    }`
              }&limit=${parseInt(limit) + 6}&info=${info}`}
            >
              Show More Images
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
