var $_cancer_terms = {
  "asymmetry": {
    "fullName": "Asymmetry",
    "definition": "Lack or absence of balanced proportions between parts of a thing.",
    "dynamic": ["asymmetr(?:y|ic(?:al)?)"]
  },
  "breast": {
    "fullName": "Breast",
    "definition": "Glandular organ located on the chest. The breast is made up of connective tissue, fat, and breast tissue that contains the glands that can make milk. Also called mammary gland.",
    "dynamic": ["breasts?"]
  },
  "cancer": {
    "fullName": "Cancer",
    "definition": "A term for diseases in which abnormal cells divide without control and can invade nearby tissues. Cancer cells can also spread to other parts of the body through the blood and lymph systems. There are several main types of cancer. Carcinoma is a cancer that begins in the skin or in tissues that line or cover internal organs. Sarcoma is a cancer that begins in bone, cartilage, fat, muscle, blood vessels, or other connective or supportive tissue. Leukemia is a cancer that starts in blood-forming tissue, such as the bone marrow, and causes large numbers of abnormal blood cells to be produced and enter the blood. Lymphoma and multiple myeloma are cancers that begin in the cells of the immune system. Central nervous system cancers are cancers that begin in the tissues of the brain and spinal cord. Also called malignancy.",
    "dynamic": ["cancer(?!\\.gov)"]
  },
  "case-series": {
    "fullName": "Case Series",
    "definition": "A group or series of case reports involving patients who were given similar treatment. Reports of case series usually contain detailed information about the individual patients. This includes demographic information (for example, age, gender, ethnic origin) and information on diagnosis, treatment, response to treatment, and follow-up after treatment.",
    "dynamic": ["case[ -]series"]
  },
  "cell": {
    "fullName": "Cell",
    "definition": "In biology, the smallest unit that can live on its own and that makes up all living organisms and the tissues of the body. A cell has three main parts: the cell membrane, the nucleus, and the cytoplasm. The cell membrane surrounds the cell and controls the substances that go into and out of the cell. The nucleus is a structure inside the cell that contains the nucleolus and most of the cell’s DNA. It is also where most RNA is made. The cytoplasm is the fluid inside the cell. It contains other tiny cell parts that have specific functions, including the Golgi complex, the mitochondria, and the endoplasmic reticulum. The cytoplasm is where most chemical reactions take place and most proteins get made. The human body has more than 30 trillion cells.",
    "dynamic": ["cells?"]
  },
  "clinical": {
    "fullName": "Clinical",
    "definition": "Having to do with the examination and treatment of patients.",
    "dynamic": ["clinical"]
  },
  "clinician": {
    "fullName": "Clinician",
    "definition": "A health professional who takes care of patients.",
    "dynamic": ["clinicians?"]
  },
  "diagnosis": {
    "fullName": "Diagnosis",
    "definition": "The process of identifying a disease, condition, or injury from its signs and symptoms. A health history, physical exam, and tests, such as blood tests, imaging tests, and biopsies, may be used to help make a diagnosis."
  },
  "diameter": {
    "fullName": "Diameter",
    "definition": "The length of a straight line that extends from one edge of a tumor or other object, through its center and to the opposite edge. It is usually used to measure the size of round or spherical shapes."
  },
  "dysplasia": {
    "fullName": "Dysplasia",
    "definition": "Cells that look abnormal under a microscope but are not cancer."
  },
  "nevus": {
    "fullName": "Dysplastic Nevus",
    "definition": "A type of nevus (mole) that looks different from a common mole. A dysplastic nevus is often larger with borders that are not easy to see. Its color is usually uneven and can range from pink to dark brown. Parts of the mole may be raised above the skin surface. A dysplastic nevus may develop into malignant melanoma (a type of skin cancer). Also called atypical mole.",
    "dynamic": ["(?:\"?dysplastic\"? )?nev(?:i|us)","dn","atypical moles?","common nev(?:i|us)"]
  },
  "epidemiologist": {
    "fullName": "Epidemiologist",
    "definition": "A scientist who studies the patterns, causes, and control of disease in groups of people.",
    "dynamic": ["epidemiologists?"]
  },
  "fda": {
    "fullName": "Food and Drug Administration",
    "definition": "An agency in the U.S. federal government whose mission is to protect public health by making sure that food, cosmetics, and nutritional supplements are safe to use and truthfully labeled. The Food and Drug Administration also makes sure that drugs, medical devices, and equipment are safe and effective, and that blood for transfusions and transplant tissue are safe. Also called FDA.",
    "dynamic": ["fda","food and drug administration"]
  },
  "hcp": {
    "fullName": "Healthcare Provider",
    "definition": "A licensed person or organization that provides healthcare services.",
    "dynamic": ["health-?care providers?"]
  },
  "immune-system": {
    "fullName": "Immune System",
    "definition": "A complex network of cells, tissues, organs, and the substances they make that helps the body fight infections and other diseases. The immune system includes white blood cells and organs and tissues of the lymph system, such as the thymus, spleen, tonsils, lymph nodes, lymph vessels, and bone marrow.",
    "dynamic": ["immune system"]
  },
  "immunotherapy": {
    "fullName": "Immunotherapy",
    "definition": "A type of biological therapy that uses substances to stimulate or suppress the immune system to help the body fight cancer, infection, and other diseases. Some types of immunotherapy only target certain cells of the immune system. Others affect the immune system in a general way. Types of immunotherapy include cytokines, vaccines, bacillus Calmette-Guerin (BCG), and some monoclonal antibodies."
  },
  "lesion": {
    "fullName": "Lesion",
    "definition": "An area of abnormal tissue. A lesion may be benign (not cancer) or malignant (cancer).",
    "dynamic": ["lesions?"]
  },
  "liver": {
    "fullName": "Liver",
    "definition": "A large organ located in the upper abdomen. The liver cleanses the blood and aids in digestion by secreting bile.",
    "dynamic": ["livers?"]
  },
  "lung": {
    "fullName": "Lung",
    "definition": "One of a pair of organs in the chest that supplies the body with oxygen, and removes carbon dioxide from the body.",
    "dynamic": ["lungs?"]
  },
  "marker": {
    "fullName": "Marker",
    "definition": "A diagnostic indication that disease may develop.",
    "dynamic": ["markers?"]
  },
  "melanin": {
    "fullName": "Melanin",
    "definition": "A pigment that gives color to skin and eyes and helps protect it from damage by ultraviolet light."
  },
  "melanocyte": {
    "fullName": "Melanocyte",
    "definition": "A cell in the skin and eyes that produces and contains the pigment called melanin.",
    "dynamic": ["melanocytes?"]
  },
  "melanoma": {
    "fullName": "Melanoma",
    "definition": "A form of cancer that begins in melanocytes (cells that make the pigment melanin). It may begin in a mole (skin melanoma), but can also begin in other pigmented tissues, such as in the eye or in the intestines.",
    "dynamic": ["melanomas?"]
  },
  "metastatic": {
    "fullName": "Metastatic",
    "definition": "Having to do with metastasis, which is the spread of cancer from the primary site (place where it started) to other places in the body."
  },
  "mole": {
    "fullName": "Mole",
    "definition": "A benign (not cancer) growth on the skin that is formed by a cluster of melanocytes (cells that make a substance called melanin, which gives color to skin and eyes). A mole is usually dark and may be raised from the skin. Also called nevus.",
    "dynamic": ["(?:common )?moles?"]
  },
  "nci": {
    "fullName": "National Cancer Institute",
    "definition": "The National Cancer Institute, part of the National Institutes of Health of the United States Department of Health and Human Services, is the Federal Government's principal agency for cancer research. The National Cancer Institute conducts, coordinates, and funds cancer research, training, health information dissemination, and other programs with respect to the cause, diagnosis, prevention, and treatment of cancer. Access the National Cancer Institute Web site at http://www.cancer.gov. Also called NCI.",
    "dynamic": ["(?:^|\s)nci(?:$|\s)","national cancer institute"]
  },
  "papule": {
    "fullName": "Papule",
    "definition": "A small, solid, raised bump on the skin that has a border with edges that are easy to see. Papules may be red, purple, brown, or pink.",
    "dynamic": ["papules?"]
  },
  "pathology-report": {
    "fullName": "Pathology Report",
    "definition": "The description of cells and tissues made by a pathologist based on microscopic evidence, and sometimes used to make a diagnosis of a disease.",
    "dynamic": ["pathology(?: report)?"]
  },
  "pediatrician": {
    "fullName": "Pediatrician",
    "definition": "A doctor who specializes in preventing, diagnosing, and treating diseases and injuries in children. Pediatricians also help manage other problems that affect children, such as developmental disorders and behavioral, emotional, and social problems.",
    "dynamic": ["pediatricians?"]
  },
  "pigment": {
    "fullName": "Pigment",
    "definition": "A substance that gives color to tissue. Pigments are responsible for the color of skin, eyes, and hair.",
    "dynamic": ["pigment(?:s|ed)?"]
  },
  "skin-cancer": {
    "fullName": "Skin Cancer",
    "definition": "Cancer that forms in the tissues of the skin. There are several types of skin cancer. Skin cancer that forms in melanocytes (skin cells that make pigment) is called melanoma. Skin cancer that forms in the lower part of the epidermis (the outer layer of the skin) is called basal cell carcinoma. Skin cancer that forms in squamous cells (flat cells that form the surface of the skin) is called squamous cell carcinoma. Skin cancer that forms in neuroendocrine cells (cells that release hormones in response to signals from the nervous system) is called neuroendocrine carcinoma of the skin. Most skin cancers form in older people on parts of the body exposed to the sun or in people who have weakened immune systems.",
    "dynamic": ["skin[ -]cancer"]
  },
  "spf": {
    "fullName": "Sun Protection Factor",
    "definition": "A scale for rating the level of sunburn protection in sunscreen products. The higher the sun protection factor, the more sunburn protection it gives. Sunscreens with a value of 2 through 11 give minimal protection against sunburns. Sunscreens with a value of 12 through 29 give moderate protection. Sun protection factors of 30 or higher give high protection against sunburn. Also called SPF.",
    "dynamic": ["s(?:un )?p(?:rotection )?f(?:actor)?"]
  },
  "tissue": {
    "fullName": "Tissue",
    "definition": "A group or layer of cells that work together to perform a specific function.",
    "dynamic": ["tissues?"]
  },
  "uv": {
    "fullName": "Ultraviolet Radiation",
    "definition": "Invisible rays that are part of the energy that comes from the sun. Ultraviolet radiation that reaches the Earth's surface is made up of two types of rays, called UVA and UVB. Ultraviolet radiation also comes from sun lamps and tanning beds. It can cause skin damage, premature aging, melanoma, and other types of skin cancer. It can also cause problems with the eyes and the immune system. Skin specialists recommend that people use sunscreens that protect the skin from both kinds of ultraviolet radiation. In medicine, ultraviolet radiation also comes from special lamps or a laser and is used to treat certain skin conditions such as psoriasis, vitiligo, and skin tumors of cutaneous T-cell lymphoma. Also called UV radiation.",
    "dynamic": ["u(?:ltra)?v(?:iolet)?(?: (?:radiation|spectrum))?"]
  },
  "uva": {
    "fullName": "Ultraviolet A Radiation",
    "definition": "Invisible rays that are part of the energy that comes from the sun. Ultraviolet A radiation also comes from sun lamps and tanning beds. Ultraviolet A radiation may cause premature aging of the skin and skin cancer. It may also cause problems with the eyes and the immune system. Skin specialists recommend that people use sunscreens that protect the skin from ultraviolet radiation. In medicine, ultraviolet A radiation also comes from special lamps or a laser and is used to treat certain skin conditions such as psoriasis, vitiligo, and skin tumors of cutaneous T-cell lymphoma. Also called UVA radiation.",
    "dynamic": ["u(?:ltra)?v(?:iolet)?[ -]?a(?: (?:radiation|spectrum))?"]
  },
  "uvb": {
    "fullName": "Ultraviolet B Radiation",
    "definition": "Invisible rays that are part of the energy that comes from the sun. Ultraviolet B radiation causes sunburn, darkening and thickening of the outer layer of the skin, and melanoma and other types of skin cancer. It may also cause problems with the eyes and the immune system. Skin specialists recommend that people use sunscreens that protect the skin from ultraviolet radiation. In medicine, ultraviolet B radiation also comes from special lamps or a laser and is used to treat certain skin conditions such as psoriasis, vitiligo, and skin tumors of cutaneous T-cell lymphoma. Also called UVB radiation.",
    "dynamic": ["u(?:ltra)?v(?:iolet)?[ -]?b ?(?:radiation|spectrum)?"]
  }
};
$.extend($_Glossary,$_cancer_terms);
$(document).on('click touchstart','.define',termDisplay);
