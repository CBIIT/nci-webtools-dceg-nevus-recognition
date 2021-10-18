import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ImageModal({ cases, filters }) {
  const params = new URLSearchParams(window.location.hash);
  const filter = params.get('filter') || 'mole';
  const info = params.get('info') || 0;
  const search = params.get('search') || '';
  const limit = params.get('limit') || 6;
  const subgrouptype = params.get('subgrouptype') || filter;

  const selectedFilter = filters.filter((f) => f.type === filter)[0];
  const selectedCases = cases
    .filter((c) => c.type === filter)
    .filter((c) =>
      selectedFilter.subgroups
        ? c.subgroup == subgrouptype || subgrouptype == filter
        : true
    );

  const [show, setShow] = useState(false);

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex justify-content-center w-100"></Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>

      {/* <div 
    className="modal-header"
    ng-init="params = (
        c.search 
            ? 'search=' + c.search 
            : 'filter=' + c.filter.type + '&subgrouptype=' + c.subgroup.type
    ) + '&limit=' + c.showImageLimit
      + '&info=' + (c.showMoreInformation ? 1 : 0)">
    <h5 className="modal-title" id="image-modal-title"> {{ c.case.title }} </h5>
    <a ng-href="#/view-cases?{{params}}" className="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </a>
</div>
<div className="modal-body p-0" id="image-modal-body">
    <div className="p-3">
        <p  define-terms ng-compile-html="c.case.description"></p>
        <p>"ABCDE" features:</p>
        <ul className="pl-4">
            <li><strong define-terms>Asymmetry</strong> - <span define-terms ng-compile-html="c.case.abcde.asymmetry"></span></li>
            <li><strong define-terms>Border</strong> - <span define-terms ng-compile-html="c.case.abcde.border"></span></li>
            <li><strong define-terms>Color</strong> - <span define-terms ng-compile-html="c.case.abcde.color"></span></li>
            <li><strong define-terms>Diameter</strong> - <span define-terms ng-compile-html="c.case.abcde.diameter"></span></li>
            <li><strong define-terms>Evolving</strong> - <span define-terms ng-compile-html="c.case.abcde.evolving"></span></li>
        </ul>
        <strong>
            <span define-terms ng-compile-html="c.case.diagnosis.type | titleCase"></span> 
            <span define-terms>Diagnosis: </span>
        </strong>
        <span define-terms ng-compile-html="c.case.diagnosis.result"></span>
    </div>
    <div className="p-3 text-center bg-secondary-light">
        <a  className="d-inline-block"
            ng-repeat="image in c.case.images" 
            ng-href="#/view-cases?{{params}}&case={{c.caseIndex}}&img={{$index}}">
            <img 
                ng-src="{{image.thumbnail}}" 
                height="65"
                className="m-2 shadow-lg object-cover" 
                ng-className="{'outline-white-1': $index == c.imgIndex}"
                alt="Thumbnail for {{ c.case.title }}, Image {{ $index + 1 }}" 
                no-context-menu />
        </a>
        
    </div>
    <div className="container-fluid">
        <div className="row">
            <div className="col-xl-6 p-0">
                <img 
                    className="w-100 h-100 object-cover" 
                    ng-src="{{c.case.images[c.imgIndex].image}}"
                    alt="{{ c.case.title }}, Image {{ +c.imgIndex + 1 }}"
                    no-context-menu />
            </div>
            <div className="col-xl-6 p-3 bg-dark text-light" define-terms ng-compile-html="c.case.description"></div>
        </div>
    </div>
</div> */}
    </>
  );
}
