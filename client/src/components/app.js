import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Navbar } from './controls/navbar/navbar';
import Home from './pages/home/home';
import About from './pages/about/about';
import Audience from './pages/audience/audience';
import Cases from './pages/cases/cases';
import Information from './pages/information/information';
import Disclaimer from './pages/disclaimer/disclaimer';
import DisclaimerModal from './controls/disclaimerModal/disclaimerModal';
import ImageModal from './controls/imageModal/imageModal';
// data
import filters from '../data/filters.json';
import cases from '../data/cases.json';
import glossary from '../data/glossary.json';

export default function App() {
  const tabs = [
    {
      route: '/',
      title: 'Home',
      exact: true,
    },
    {
      route: '/about',
      title: 'About',
    },
    {
      route: '/intended-audience',
      title: 'Intended Audience',
    },
    {
      route: '/view-cases',
      title: 'View Cases',
      isActive: (match, location) => location.pathname.includes('/view-cases'),
    },
    {
      route: '/more-information',
      title: 'More Information',
    },
    {
      route: '/disclaimer',
      title: 'Disclaimer',
    },
  ];

  return (
    <Router>
      <DisclaimerModal />
      <ImageModal filters={filters} cases={cases} />
      <Navbar links={tabs} />
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/intended-audience" component={Audience} />
      <Route
        path="/view-cases:params?"
        render={(props) => <Cases {...props} filters={filters} cases={cases} />}
      />
      <Route path="/more-information" component={Information} />
      <Route path="/disclaimer" component={Disclaimer} />
    </Router>
  );
}
