import React from 'react';

export default function Audience() {
  return (
    <div className="container-xxl py-4">
      <h2>Who is the Intended Audience?</h2>
      <p define-terms={true}>
        The photographs in this tool show moles on the skin of participants
        enrolled in the{' '}
        <a
          href="https://clinicaltrials.gov/show/NCT00040352"
          target="_blank"
          rel="noopener noreferrer"
        >
          NCI Familial Melanoma Study
        </a>
        . This study only includes individuals in U.S. melanoma-prone families
        who are at high-risk of developing this form of skin cancer. As shown in
        Figure 1, Caucasians are at the highest risk of developing melanoma. To
        date, this study has not identified or enrolled any non-Caucasian
        families; therefore this tool does not provide images representative of
        other ethnicities.
      </p>
      <figure className="figure">
        <img
          className="w-100 figure-img img-fluid"
          src="/assets/images/incidence.png"
          alt="Graph showing the melanoma Incidence Rates per one hundred thousand people in the U.S. between 1975 and 2013. In that time period, caucasians were found to have developed melanoma at a higher rate compared to individuals of other races and ethnicities"
        />
        <figcaption className="figure-caption">
          <p define-terms={true}>
            Reference: Howlader N, Noone AM, Krapcho M, Garshell J, Miller D,
            Altekruse SF, Kosary CL, Yu M, Ruhl J, Tatalovich Z, Mariotto A,
            Lewis DR, Chen HS, Feuer EJ, Cronin KA (eds).
            <span no-define={true}>SEER Cancer Statistics Review</span>, 1975-2012,
            National Cancer Institute. Bethesda, MD,
            <a
              href="http://seer.cancer.gov/csr/1975_2012/"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://seer.cancer.gov/csr/1975_2012/
            </a>
            , based on November 2014 SEER data submission, posted to the SEER
            web site, April 2015
          </p>

          <p define-terms={true}>
            Data points are not included for clarity of presentation, but may be
            found at
            <a
              href="http://seer.cancer.gov/csr/1975_2012/sections.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://seer.cancer.gov/csr/1975_2012/sections.html
            </a>
            Figure 16.2.
          </p>
        </figcaption>
      </figure>

      <h3>Where can I find information on Skin Cancer in other Ethnicities?</h3>
      <ul>
        <li define-terms={true}>
          NCI -
          <a
            href="http://www.cancer.gov/publications/patient-education/anyone-can-get-skin-cancer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anyone Can Get Skin Cancer
          </a>
          , includes images of skin cancer in people with darker skin
        </li>
        <li>
          Skin Cancer Foundation -
          <a
            href="http://www.skincancer.org/prevention/skin-cancer-and-skin-of-color"
            target="_blank"
            rel="noopener noreferrer"
          >
            Skin Cancer and Skin of Color
          </a>
        </li>
      </ul>
      <h3>Where can I find information about Non-Melanoma Skin Cancer?</h3>
      <p define-terms={true}>
        This collection does not include any pictures of non-melanoma types of
        skin cancer (e.g. basal cell or squamous cell), since they arise from
        different cell types in the skin they look very different from melanoma.
        For information on those types of skin cancer, visit the following
        websites:
        <a
          href="http://www.cancer.gov/types/skin"
          target="_blank"
          rel="noopener noreferrer"
        >
          National Cancer Institute - Skin Cancer (including Melanoma)
        </a>
        &amp;
        <a
          href="http://www.cancer.org/cancer/cancercauses/sunanduvexposure/skin-cancer-facts"
          target="_blank"
          rel="noopener noreferrer"
        >
          American Cancer Society - Skin Cancer Facts
        </a>
        .
      </p>
    </div>
  );
}
