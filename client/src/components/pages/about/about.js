import React from 'react';
import Define from '../../controls/defineText/define';

export default function About() {
  return (
    <div className="container-xxl py-4">
      <h2>About the Tool</h2>
      <Define>
        <p define-terms={true}>
          The Moles to Melanoma Tool presents photographs in three main groups
          of pigmented lesions:{' '}
          <a href="#/view-cases?filter=mole">common moles</a>;{' '}
          <a href="#/view-cases?filter=dysplasticnevi">dysplastic nevi (DN)</a>;
          and <a href="#/view-cases?filter=melanoma">melanomas</a> that arose
          from DN.
        </p>
        <p define-terms={true}>
          The DN section is subdivided into two broad categories: stable and
          fading, and evolving toward melanoma.
        </p>
        <p define-terms={true}>
          Each case series shows changes in an individual pigmented lesion over
          a number of years and across the spectrum of changes typically seen in
          U.S. melanoma-prone families. We include a description of the “ABCDE”
          features for each type of pigmented lesion (moles, DN, and melanomas).
          Although the “ABCDE” rules were made for identifying early melanoma,
          they can also be used to describe DN.{' '}
        </p>
        <h3>About the Study</h3>
        <p define-terms={true}>
          For more information about the study from which these cases were
          identified, please go to:{' '}
          <a
            href="https://clinicaltrials.gov/show/NCT00040352"
            target="_blank"
            rel="noopener noreferrer"
          >
            Clinical, Laboratory, and Epidemiologic Characterization of
            Individuals and Families at High Risk of Melanoma
          </a>
        </p>
        <h3>Publications</h3>
        <ol>
          <li>
            Tucker MA, Fraser MC, Goldstein AM, et al.{' '}
            <a
              href="http://www.ncbi.nlm.nih.gov/pubmed/12115352"
              target="_blank"
              rel="noopener noreferrer"
            >
              Melanomas and dysplastic nevi: A natural history atlas
            </a>
            . Cancer. 2002 Jun 15;94(12):3192-209.
          </li>
          <li>
            Tucker MA, Halpern A, Holly EA, et al.{' '}
            <a
              href="http://www.ncbi.nlm.nih.gov/pubmed/9145715"
              target="_blank"
              rel="noopener noreferrer"
            >
              Clinically recognized dysplastic nevi: a central risk factor for
              cutaneous melanoma
            </a>
            . JAMA: The Journal of the American Medical Association 1997;
            277(18):1439–1444.
          </li>
        </ol>
        <h3>Acknowledgements</h3>
        <p define-terms={true}>
          We thank the study participants for their many years of participation,
          their willingness to be photographed during skin examinations, and
          their generosity in allowing their pictures to be included in this
          resource.{' '}
        </p>
        <p define-terms={true}>
          We would also like to thank John Crawford and Mary King,{' '}
          <span no-define={true}>NIH Clinical Center</span> clinical
          photographers, for their expertise. The tool would not have been
          possible without the substantial commitment and cooperation of both
          the study participants and the clinical photographers.{' '}
        </p>
      </Define>
    </div>
  );
}
