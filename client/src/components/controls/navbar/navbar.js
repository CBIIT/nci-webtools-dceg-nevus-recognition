import React, { useCallback } from 'react';
import { Row, Col, Form, FormControl } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import _debounce from 'lodash/debounce';
import './navbar.scss';

export function Navbar({ links }) {
  const history = useHistory();
  const handleDebounceSearch = useCallback(
    _debounce((value) => {
      const query = value.trim();
      if (query.length) history.push(`view-cases&search=${query}`);
    }, 300),
    [],
  );

  return (
    <div className="bg-dark text-white gradient shadow-sm">
      <div className="container d-none d-md-block">
        <Row className="w-100 justify-content-between">
          <Col md="auto">
            {links
              .filter((link) => link.title)
              .sort((a, b) => a.navIndex - b.navIndex)
              .map(({ route, title, ...props }, index) => (
                <div
                  data-testid="Navbar"
                  className="d-inline-block"
                  key={title}
                >
                  <NavLink
                    data-testid={`Navbar-NavLink-${index}`}
                    id={title + '-navbar'}
                    className="navlinks py-2 px-4 d-inline-block"
                    activeClassName="active-navlinks"
                    to={route}
                    {...props}
                  >
                    {title}
                  </NavLink>
                  <div className="d-lg-none w-100"></div>
                </div>
              ))}
          </Col>
          <Col md="auto">
            <Form className="w-100 py-1">
              <FormControl
                size="sm"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => handleDebounceSearch(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
      </div>

      {/*Mobile View*/}
      <div className="container d-flex flex-column d-md-none" align="center">
        {links
          .filter((link) => link.title)
          .sort((a, b) => a.navIndex - b.navIndex)
          .map(({ route, title, exact }, index) => {
            return (
              <div data-testid="Navbar" className="d-block" key={title}>
                <NavLink
                  data-testid={`Navbar-NavLink-${index}`}
                  id={title + '-navbar'}
                  // key={title}
                  className="navlinks py-2 px-4 d-inline-block"
                  activeClassName="active-navlinks"
                  exact={true}
                  to={route}
                >
                  {title}
                </NavLink>
              </div>
            );
          })}
        <Form className="w-100 py-1">
          <FormControl
            size="sm"
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </div>
    </div>
  );
}
