export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  features?: string[];
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  responsibilities?: string[];
  qualifications?: string[];
  type: 'Full-time' | 'Part-time' | 'Contract';
}

export const productsData: Product[] = [
  {
    id: '1',
    name: 'InkSync eInk Display',
    description: 'A revolutionary price tag management system designed to streamline your business operations with cutting-edge technology and intuitive design.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'abstract technology',
    features: ['AI-Powered Analytics', 'Scalable Infrastructure', 'User-Friendly Interface', 'Seamless Integration'],
  },
  {
    id: '2',
    name: 'AspenConnect Suite',
    description: 'Enhance team collaboration and communication with our integrated suite of tools, built for the modern workplace.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'team collaboration',
    features: ['Real-time Messaging', 'Secure File Sharing', 'Project Management', 'Video Conferencing'],
  },
  {
    id: '3',
    name: 'FlowOptimize Engine',
    description: 'Optimize your workflows and boost productivity with our intelligent automation engine. Tailored for complex processes.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'workflow automation',
    features: ['Customizable Workflows', 'Performance Monitoring', 'Predictive Analysis', 'Automated Reporting'],
  },
];

export const jobsData: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are seeking a highly skilled Senior Software Engineer to join our dynamic engineering team. You will be responsible for designing, developing, and maintaining our core products, contributing to all phases of the development lifecycle.',
    responsibilities: [
        'Design and develop high-volume, low-latency applications for mission-critical systems.',
        'Contribute in all phases of the development lifecycle.',
        'Write well-designed, testable, efficient code.',
        'Ensure designs are in compliance with specifications.',
        'Prepare and produce releases of software components.'
    ],
    qualifications: [
        'BS/MS degree in Computer Science, Engineering or a related subject.',
        '5+ years of proven hands-on Software Development experience.',
        'Proven working experience in Java development (or other relevant languages like Python, Go).',
        'Experience with cloud platforms (AWS, Azure, GCP).',
        'Strong understanding of microservices architecture.'
    ]
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our product team to define and drive the roadmap for our innovative solutions. You will work closely with engineering, design, and marketing to deliver exceptional products that meet customer needs.',
    responsibilities: [
        'Define product strategy and roadmap.',
        'Gather and prioritize product and customer requirements.',
        'Work closely with engineering, sales, marketing, and support to ensure revenue and customer satisfaction goals are met.',
        'Deliver MRDs and PRDs with prioritized features and corresponding justification.'
    ],
    qualifications: [
        '3+ years of product management experience in a tech company.',
        'Proven ability to develop product and marketing strategies and effectively communicate recommendations.',
        'Strong problem-solving skills and willingness to roll up one’s sleeves to get the job done.',
        'Excellent written and verbal communication skills.',
        'Experience with agile development methodologies.'
    ]
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Contract',
    description: 'We are looking for a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UX/UI skills and be able to translate high-level requirements into interaction flows and artifacts, and transform them into beautiful, intuitive, and functional user interfaces.',
     responsibilities: [
        'Collaborate with product management and engineering to define and implement innovative solutions for the product direction, visuals and experience.',
        'Execute all visual design stages from concept to final hand-off to engineering.',
        'Conceptualize original ideas that bring simplicity and user friendliness to complex design roadblocks.',
        'Create wireframes, storyboards, user flows, process flows and site maps to effectively communicate interaction and design ideas.'
    ],
    qualifications: [
        'Proven UX/UI design experience with a strong portfolio.',
        'Proficiency in Figma, Sketch, Adobe XD, or other visual design and wireframing tools.',
        'Excellent visual design skills with sensitivity to user-system interaction.',
        'Ability to present your designs and sell your solutions to various stakeholders.',
        'Up-to-date with the latest UI trends, techniques, and technologies.'
    ]
  },
];
