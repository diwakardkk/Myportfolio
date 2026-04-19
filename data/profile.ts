export type ResearchFocusIcon =
  | 'scan-search'
  | 'shield-check'
  | 'radar'
  | 'messages-square'
  | 'activity'
  | 'sparkles';

export type SocialIcon = 'linkedin' | 'mail' | 'scholar' | 'phone';

export interface ProfileData {
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  personalInfo: {
    name: string;
    roleLine: string;
    subtitle: string;
    location: string;
    institution: string;
    cvUrl: string;
    profileImageUrl: string;
  };
  hero: {
    eyebrow: string;
    badges: string[];
    quickHighlights: string[];
    statCards: Array<{
      label: string;
      value: string;
    }>;
  };
  about: {
    summary: string;
    supportingText: string;
    statusCard: {
      previousQualifications: Array<{
        degree: string;
        institution: string;
        year: string;
      }>;
      session: string;
      degree: string;
      institution: string;
      status: string;
      thesisTitle: string;
    };
  };
  researchFocus: Array<{
    title: string;
    description: string;
    icon: ResearchFocusIcon;
  }>;
  skills: {
    languagesAndTools: string[];
    methods: string[];
    theory: string[];
  };
  publications: Array<{
    title: string;
    journal: string;
    publisher?: string;
    year: string;
    status?: string;
    tag?: string;
    highlight: string;
    citation?: string;
    doiUrl?: string;
    doiLabel?: string;
    categoryTags: string[];
  }>;
  projects: Array<{
    title: string;
    description: string;
    challenge: string;
    approach: string;
    impact: string;
    technologies: string[];
  }>;
  achievements: Array<{
    title: string;
    detail: string;
    year?: string;
  }>;
  postdocInterests: {
    summary: string;
    areas: string[];
  };
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    scholarUrl: string;
    formNotice: string;
  };
  socialLinks: Array<{
    label: string;
    href: string;
    icon: SocialIcon;
  }>;
}

export const profile: ProfileData = {
  seo: {
    title: 'Diwakar | Trustworthy AI for Healthcare Research Portfolio',
    description:
      'Diwakar is a PhD in Computer Science building interpretable, uncertainty-aware, and deployable AI systems for healthcare, spanning medical imaging, ECG analysis, and conversational AI.',
    keywords: [
      'Diwakar',
      'healthcare AI',
      'medical imaging',
      'explainable AI',
      'trustworthy AI',
      'postdoc',
      'computer science',
      'chest x-ray',
      'MRI',
      'ECG',
      'conversational AI',
      'uncertainty-aware machine learning',
    ],
    ogImage: '/og-image.svg',
  },
  personalInfo: {
    name: 'Diwakar',
    roleLine:
      'PhD in Computer Science | Trustworthy AI for Healthcare | Medical Imaging, X-ray, MRI, ECG, Conversational AI',
    subtitle:
      'I build interpretable, uncertainty-aware, and deployable AI systems for real-world healthcare.',
    location: 'Lucknow, India',
    institution: 'Babasaheb Bhimrao Ambedkar University, Lucknow, India',
    cvUrl: '/diwakar-cv.pdf',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/169533665?v=4',
  },
  hero: {
    eyebrow: 'Available for postdoctoral opportunities in AI for healthcare',
    badges: [
      'Trustworthy Healthcare AI',
      'Medical Imaging Systems',
      'Deployable Clinical ML',
    ],
    quickHighlights: [
      '5+ Years Research Experience',
      'PhD Thesis Submitted',
      'Healthcare AI + Trustworthy ML',
      'SCIE Q1 Publications',
    ],
    statCards: [
      {
        label: 'Research focus',
        value: 'Healthcare AI',
      },
      {
        label: 'Primary domains',
        value: 'X-ray, MRI, ECG',
      },
      {
        label: 'Clinical direction',
        value: 'Interpretable + Safe',
      },
    ],
  },
  about: {
    summary:
      'I am a PhD in Computer Science with 5+ years of research experience in healthcare AI. My work focuses on medical imaging using machine learning and deep learning, with applied systems for X-ray, MRI, and ECG analysis. I have also developed transformer-based conversational AI systems for mental health screening and decision support. My broader goal is to build trustworthy, interpretable, uncertainty-aware, and deployable AI systems for real clinical use.',
    supportingText:
      'My research interests include interpretable representation learning, explainable AI, uncertainty-aware modeling, calibration, selective prediction, conformal prediction, data-efficient learning, self-supervised learning, generative AI, and deployable clinical AI workflows.',
    statusCard: {
      previousQualifications: [
        {
          degree: 'M.Sc., Computer Science',
          institution: 'University of Allahabad, U.P., India',
          year: '2016',
        },
        {
          degree: 'Bachelor of Computer Applications (BCA)',
          institution: 'University of Allahabad, U.P., India',
          year: '2014',
        },
      ],
      session: '2020-2026',
      degree: 'PhD in Computer Science',
      institution: 'Babasaheb Bhimrao Ambedkar University, Lucknow, India',
      status: 'Thesis Submitted',
      thesisTitle: 'Designing a Framework of Multi-Disease Detection and Prediction',
    },
  },
  researchFocus: [
    {
      title: 'Medical Imaging AI',
      description:
        'Chest X-ray, Knee MRI, clinical image analysis, localization, and diagnostic decision support workflows.',
      icon: 'scan-search',
    },
    {
      title: 'Trustworthy & Explainable AI',
      description:
        'Explainability, attribution, interpretability, human-centered AI, and reliability in healthcare settings.',
      icon: 'shield-check',
    },
    {
      title: 'Uncertainty-Aware AI',
      description:
        'Calibration, conformal prediction, selective classification, and safe deployment for clinical models.',
      icon: 'radar',
    },
    {
      title: 'Conversational AI for Mental Health',
      description:
        'Transformer-based conversational systems for screening and decision support in mental health contexts.',
      icon: 'messages-square',
    },
    {
      title: 'Signal Analysis for Healthcare',
      description:
        'ECG and time-frequency pipelines for cardiac disease detection and robust signal interpretation.',
      icon: 'activity',
    },
    {
      title: 'Generative & Data-Efficient AI',
      description:
        'GANs, diffusion, self-supervised learning, and robust training strategies for medical AI.',
      icon: 'sparkles',
    },
  ],
  skills: {
    languagesAndTools: [
      'Python',
      'PyTorch',
      'TensorFlow',
      'MATLAB',
      'C/C++',
      'NumPy',
      'Pandas',
      'SQL',
      'MongoDB',
      'Hugging Face',
      'GitHub',
      'Cloud',
    ],
    methods: [
      'CNNs',
      'Vision Transformers',
      'NLP',
      'LLMs',
      'LangChain',
      'LangGraph',
      'Agents',
      'GANs',
      'Diffusion Models',
      'Attention Mechanisms',
      'Conformal Prediction',
      'Wavelets',
      'Image Analysis',
      'Signal Analysis',
      'Responsible AI',
      'Explainable AI',
    ],
    theory: ['Linear Algebra', 'Probability & Statistics', 'Optimization', 'Information Theory'],
  },
  publications: [
    {
      title:
        'Interpretable Chest X-Ray Localization Using Principal Component-Based Feature Selection in Deep Learning',
      journal: 'Engineering Applications of Artificial Intelligence',
      publisher: 'Elsevier',
      year: '2025',
      tag: 'SCIE Q1',
      highlight: 'Interpretable deep learning for chest X-ray localization',
      citation: 'Vol. 162, article 112358.',
      doiUrl: 'https://doi.org/10.1016/j.engappai.2025.112358',
      categoryTags: ['Medical Imaging', 'Interpretability', 'Localization'],
    },
    {
      title: 'AI-powered Conversational Framework for Mental Health Diagnosis',
      journal: 'PeerJ Computer Science',
      publisher: 'PeerJ',
      year: '2026',
      highlight: 'Conversational AI for mental health screening and diagnostic support',
      citation: 'Vol. 12, article e3602.',
      doiUrl: 'https://doi.org/10.7717/peerj-cs.3602',
      categoryTags: ['Conversational AI', 'Mental Health', 'Healthcare AI'],
    },
    {
      title: 'Integrated CNN Model for Multi-disease Classification Through Chest X-ray Images',
      journal: 'ELCVIA Electronic Letters on Computer Vision and Image Analysis',
      publisher: 'Universitat Autonoma de Barcelona',
      year: '2026',
      highlight: 'Multi-disease chest X-ray classification for screening workflows',
      citation: 'Vol. 24, no. 2, pp. 143-158.',
      doiUrl: 'https://doi.org/10.5565/rev/elcvia.1804',
      categoryTags: ['CNN', 'Chest X-ray', 'Classification'],
    },
    {
      title: 'Generative AI in Wearables: Exploring the Impact of GANs, VAEs, and Transformers',
      journal: 'Generative Artificial Intelligence for Biomedical and Smart Health Informatics',
      publisher: 'Wiley',
      year: '2025',
      tag: 'Book Chapter',
      highlight: 'Generative modeling strategies for wearable and biomedical intelligence systems',
      citation: 'Book chapter, pp. 1-34.',
      doiUrl: 'https://doi.org/10.1002/9781394280735.ch1',
      categoryTags: ['Generative AI', 'Wearables', 'Biomedical AI'],
    },
    {
      title: 'ECG-Based Cardiac Disease Detection in Time-Frequency Domain using Grid Search Optimized Wavelet Transforms',
      journal: 'Letters in High Energy Physics',
      publisher: 'Research Square preprint available',
      year: '2024',
      status: 'In review',
      highlight: 'Wavelet-optimized ECG classification for cardiac disease detection',
      citation: 'Research Square preprint v2; journal DOI is not assigned in the CV record.',
      doiUrl: 'https://doi.org/10.21203/rs.3.rs-4468988/v2',
      doiLabel: 'Preprint DOI',
      categoryTags: ['ECG', 'Wavelets', 'Cardiac AI'],
    },
    {
      title: 'Multi-disease Classification Including Localization Through Chest X-Ray Images',
      journal: 'Proceedings on International Conference on Data Analytics and Computing',
      publisher: 'Springer Nature Singapore',
      year: '2023',
      tag: 'Conference Chapter',
      highlight: 'Chest X-ray disease classification combined with weak localization cues',
      citation: 'Lecture Notes on Data Engineering and Communications Technologies, pp. 129-141.',
      doiUrl: 'https://doi.org/10.1007/978-981-99-3432-4_11',
      categoryTags: ['Chest X-ray', 'Localization', 'Conference'],
    },
    {
      title: 'Automated Knee MRI Diagnosis with Attention-Guided Slice Ranking and Classification',
      journal: 'Clinical Imaging',
      year: 'Communicated',
      status: 'Communicated',
      tag: 'SCIE Q1',
      highlight: 'Attention-guided slice ranking for clinically meaningful knee MRI diagnosis',
      citation: 'Communicated manuscript; DOI not assigned yet.',
      categoryTags: ['MRI', 'Attention', 'Clinical Imaging'],
    },
    {
      title: 'Conformal Prediction for Reliable Risk Estimation in Diabetes Diagnosis',
      journal: 'WOS-indexed journal',
      year: 'Communicated',
      status: 'Communicated',
      highlight: 'Reliable diabetes risk estimation with uncertainty-aware conformal prediction',
      citation: 'Communicated manuscript; DOI not assigned yet.',
      categoryTags: ['Conformal Prediction', 'Diabetes', 'Trustworthy AI'],
    },
    {
      title: 'DistilBERT-based Text Classification for Automated Diagnosis of Mental Health Conditions',
      journal: 'Microbial Data Intelligence and Computational Techniques for Sustainable Computing',
      publisher: 'Springer Nature Singapore',
      year: '2024',
      tag: 'Book Chapter',
      highlight: 'Transformer-based text classification for mental health condition screening',
      citation: 'Microorganisms for Sustainability, pp. 93-106.',
      doiUrl: 'https://doi.org/10.1007/978-981-99-9621-6_6',
      categoryTags: ['NLP', 'DistilBERT', 'Mental Health'],
    },
    {
      title: 'Comparative Study of CNN-Based Multi-Disease Detection Models Through X-Ray Images',
      journal: 'ICT with Intelligent Applications',
      publisher: 'Springer Nature Singapore',
      year: '2023',
      tag: 'Conference Chapter',
      highlight: 'Comparative evaluation of CNN architectures for multi-disease X-ray detection',
      citation: 'Smart Innovation, Systems and Technologies, pp. 271-282.',
      doiUrl: 'https://doi.org/10.1007/978-981-19-3571-8_27',
      categoryTags: ['CNN', 'X-ray', 'Benchmarking'],
    },
    {
      title: 'Recent Object Detection Techniques: A Survey',
      journal: 'International Journal of Image, Graphics and Signal Processing',
      publisher: 'MECS Press',
      year: '2022',
      tag: 'SCOPUS',
      highlight: 'Survey of modern object detection methods and design tradeoffs',
      citation: 'Vol. 14, no. 2, pp. 47-60.',
      doiUrl: 'https://doi.org/10.5815/ijigsp.2022.02.05',
      categoryTags: ['Survey', 'Object Detection', 'Computer Vision'],
    },
  ],
  projects: [
    {
      title: 'Chest X-ray Explainable AI Pipeline',
      description:
        'Interpretable deep learning pipeline for multi-disease chest X-ray classification and localization using PCA-based feature selection and attribution analysis.',
      challenge:
        'Clinical screening models often provide high accuracy but poor transparency for localizing evidence and understanding failure modes.',
      approach:
        'Designed a localization-aware workflow combining PCA-guided feature selection, deep classification, and attribution-based interpretation.',
      impact:
        'Improves clinician-facing interpretability and supports safer adoption of chest X-ray AI workflows.',
      technologies: ['PyTorch', 'CNNs', 'Feature Selection', 'Explainable AI'],
    },
    {
      title: 'Knee MRI Diagnosis with Attention-Guided Slice Ranking',
      description:
        'Attention-guided ranking and classification workflow for knee MRI diagnosis using CNN and ViT-inspired models with clinically meaningful slice selection.',
      challenge:
        'MRI volumes contain many slices, while clinically relevant evidence is concentrated in a limited subset that must be surfaced reliably.',
      approach:
        'Built an attention-guided ranking module to prioritize diagnostically informative slices before downstream classification.',
      impact:
        'Supports clinically meaningful MRI triage with improved interpretability and reduced noise from irrelevant slices.',
      technologies: ['PyTorch', 'Vision Transformers', 'MRI', 'Attention'],
    },
    {
      title: 'ECG Time-Frequency Cardiac Analysis',
      description:
        'Wavelet-based ECG analysis pipeline with optimized signal representations for cardiac disease detection.',
      challenge:
        'Cardiac signals are non-stationary and require strong temporal-frequency representations for robust disease discrimination.',
      approach:
        'Combined time-frequency transforms with signal modeling pipelines tailored to clinically relevant waveform patterns.',
      impact:
        'Enables richer ECG representations for interpretable and scalable cardiac risk modeling.',
      technologies: ['Wavelets', 'Signal Analysis', 'Python', 'Time-Frequency Analysis'],
    },
    {
      title: 'Conversational AI for Mental Health Diagnosis',
      description:
        'Transformer-based conversational system for mental health screening and early decision support.',
      challenge:
        'Mental health support requires conversational systems that are careful, context-aware, and aligned with diagnostic screening goals.',
      approach:
        'Developed a transformer-based conversational framework for guided screening and clinically oriented response generation.',
      impact:
        'Creates an early-support research path toward accessible screening and human-in-the-loop diagnostic assistance.',
      technologies: ['Transformers', 'NLP', 'Healthcare AI', 'Decision Support'],
    },
  ],
  achievements: [
    {
      title: 'PhD Thesis Submitted',
      detail: 'Completed doctoral research focused on multi-disease detection and prediction in healthcare AI.',
      year: '2026',
    },
    {
      title: 'SCIE Q1 Publications',
      detail: 'Published research in high-impact venues relevant to interpretable medical AI.',
      year: '2025',
    },
    {
      title: 'PeerJ Computer Science Publication',
      detail: 'Published conversational AI research for mental health diagnosis and screening workflows.',
      year: '2026',
    },
    {
      title: 'Analytics Vidhya AI & ML BlackBelt Plus Program',
      detail: 'Completed the BlackBelt Plus Program in AI and machine learning.',
      year: '2024',
    },
    {
      title: 'Trustworthy and Deployable Healthcare AI',
      detail: 'Ongoing research emphasis on reliability, interpretability, and translational clinical impact.',
    },
  ],
  postdocInterests: {
    summary:
      'I am especially interested in collaborating with labs working at the intersection of AI, medicine, reliability, interpretability, and translational impact.',
    areas: [
      'Trustworthy AI',
      'Medical Imaging AI',
      'Interpretable Representation Learning',
      'Uncertainty-Aware Machine Learning',
      'Human-Centered Clinical AI',
      'Deployable AI for Healthcare',
    ],
  },
  contact: {
    email: 'diwakarmsccs0@gmail.com',
    phone: '+91-9415197334',
    location: 'Lucknow, India',
    linkedin: 'https://linkedin.com/in/diwakarpro',
    scholarUrl: 'https://scholar.google.com/citations?user=pZqRrOQAAAAJ&hl=en',
    formNotice: 'Submitting this form opens an email draft addressed to diwakarmsccs0@gmail.com with your details prefilled.',
  },
  socialLinks: [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/diwakarpro',
      icon: 'linkedin',
    },
    {
      label: 'Email',
      href: 'mailto:diwakarmsccs0@gmail.com',
      icon: 'mail',
    },
    {
      label: 'Google Scholar',
      href: 'https://scholar.google.com/citations?user=pZqRrOQAAAAJ&hl=en',
      icon: 'scholar',
    },
    {
      label: 'Phone',
      href: 'tel:+919415197334',
      icon: 'phone',
    },
  ],
};