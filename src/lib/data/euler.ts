export const navLinks = [
	{ id: 'intro', label: 'Introduction' },
	{ id: 'timeline', label: 'Timeline' },
	{ id: 'calculus', label: 'Calculus' },
	{ id: 'gallery', label: 'Gallery' },
	{ id: 'map', label: 'Map' },
	{ id: 'why', label: 'Motivation' },
	{ id: 'bibliography', label: 'Bibliography' }
];


export type TimelineEvent = {
	year: number;
	label: string;
	location: string;
	description: string;
	highlight?: boolean;
};

export type GalleryItem = {
	id: string;
	title: string;
	image: string;
	imageAlt: string;
	body: string;
	tag: string;
};

export type MapLocation = {
	id: string;
	name: string;
	lat: number;
	lng: number;
	period: string;
	description: string;
	collaborators: string[];
};

export type BibliographyEntry = {
	authors: string;
	year: string;
	title: string;
	source: string;
	url?: string;
};

export type InterestCard = {
	icon: string;
	title: string;
	body: string;
};
export const hero = {
  name: 'Leonhard Euler',
  years: '1707 – 1783',
  tagline: 'The King of Mathematics',
  intro: `Leonhard Euler was a Swiss mathematician and physicist whose work shaped nearly every branch of 18th-century mathematics. From Basel to St. Petersburg to Berlin, he produced more than 800 works, ranging from integrating Leibniz's differential calculus with Newton's method of fluxions to inventing much of modern mathematical notation. Even after losing his vision in one eye and eventually the other, he continued his work, up unto his death at an age of 76 in St. Petersburg.`,
  portrait: '/eulerportrait.jpg',
  portraitAlt: 'Leonhard Euler'
};




export const interests: InterestCard[] = [
  {
      icon: '∫',
      title: 'Mathematician & Physicist',
      body: 'Euler made many contributions to geometry, calculus, mechanics, number theory, astronomy, and applied mathematics that defined 18th-century science. Euler also solved famous problems like The Seven Bridges of Königsberg.'
  },
  {
      icon: '⚙',
      title: 'Beyond Mathematics',
      body: 'In addition to pure math, Euler wrote many textbooks related to his discoveries, and the formulas, laws, and theories that came out of it. Euler was influential to society by bringing improvements to Fire Trucks (via his knowledge of hydraulics), redesigning the mechanical componentry of machines, and also shipbuilding by improving the basic knowledge of buoyancy at the time.'
  },
  {
      icon: '✦',
      title: 'Prolific Output',
      body: 'In total, Euler created 866 works, with around 560 being published during his lifetime. After his death, his manuscripts continued to be published, with the final ones being released in 1862, almost 80 years after his death.'
  }
];




export const calculus = {
  title: 'Contributions to Calculus',
  subtitle: 'How Euler improved mathematical analysis',
  body: `Euler's calculus textbooks include Institutiones calculi differentialis (1755) and Institutiones calculi integralis (1768–70). These textbooks became the prototypes for modern calculus instruction. They contained formulae for differentiation and indefinite integration, many invented by Euler himself, along with methods for determining work done by a force and solving geometric problems.`,
  highlights: [
      'Euler integrated Leibniz\'s differential calculus and Newton\'s method of fluxions into unified mathematical analysis',
      'Euler introduced the concept of a function in Introduction in Analysin Infinitorum (1748)',
      'Euler developed beta and gamma functions, integrating factors, and advances in linear differential equations',
      'Euler pioneered the calculus of variations and applied analysis to physics and mechanics',
      'Euler created notations that we use today: f(x), e, Σ, π, i, and finite-difference symbols Δy, Δ²y'
  ]
};




export const why = {
  title: 'What led Euler to Calculus?',
  subtitle: 'Calculus was a bridge between fields',
  body: `The Bernoullis, who were family friends of Euler, were pioneers in the field of calculus. As a result, calculus became a major focus for Euler, with many of his publications being pioneering works in this field. Although some of his work is no longer considered rigorous enough for modern mathematics, they nonetheless formed a foundation for modern methods and advances. Furthermore, Euler also used calculus in applied mathematics, whether it be his pioneering work in the calculus of variations for optimizing curves and surfaces, or modelling real-world problems with differential equations. This melding of fields using calculus was also present in many other of Euler’s publications, from real and complex analysis to number theory, physics, and engineering.`,
  quote: `I soon found an opportunity to be introduced to a famous professor, Johann Bernoulli… True, he was very busy and so refused flatly to give me private lessons; but he gave me much more valuable advice to start reading more difficult mathematical books on my own and to study them as diligently as I could; if I came across some obstacle or difficulty, I was given permission to visit him freely every Sunday afternoon and he kindly explained to me everything I could not understand … and this, undoubtedly, is the best method to succeed in mathematical subjects.`,
  quoteAttribution: 'Leonhard Euler, on Johann Bernoulli\'s mentorship.'
};




export const timeline: TimelineEvent[] = [
  {
      year: 1707,
      label: 'Birth',
      location: 'Basel, Switzerland',
      description:
          'Leonhard Euler was born on April 15, 1707 in Basel, a relatively populous city in Switzerland. His father, Paul III Euler, was a pastor in the Reformed Church, and his mother, Marguerite Brucker, came from a family whose ancestors included many well-known scholars. Leonard was the oldest of four children, with two younger sisters Anna Maria and Maria Magdalena, as well as a younger brother Johann Heinrich.'
  },
  {
      year: 1708,
      label: 'Early Life',
      location: 'Riehen, Switzerland',
      description:
          'Leonhard’s father Paul was invited to become a pastor in Riehen, a nearby city. Euler would spend most of his childhood here, learning mathematics from his father, who had in turn attended lectures by Jacob Bernoulli.'
  },
  {
      year: 1715,
      label: 'Return to Basel',
      location: 'Basel, Switzerland',
      description:
          'At eight years of age, Euler returned to Basel to live with his maternal grandmother and was enrolled in the local Latin school. He also received private tutoring from Johannes Burckhardt.'
  },
  {
      year: 1720,
      label: 'Education',
      location: 'Basel, Switzerland',
      description:
          'At the age of 13, Euler enrolled in the University of Basel. At the time, attending such an institution at this age was not uncommon. He was taught elementary mathematics by Johann Bernoulli, the brother of the now deceased Johann who had taught this father. During this time, Euler grew close with Bernoulli, often inquiring about various problems he had encountered during his studies. Eventually, backed by Bernoulli, Euler was able to receive his father’s consent to become a mathematician.'
  },
  {
      year: 1723,
      label: 'Academia',
      location: 'Basel, Switzerland',
      description:
          'Euler received a Master of Philosophy comparing the philosophies of Descartes and Newton. Later, he enrolled in the theological faculty at the University of Basel. Later, in 1726, Euler completed a dissertation <i>De Sono<\i>, which discussed the propagation of sound. However, he was unable to use this to obtain a position at the university.'
  },
  {
      year: 1727,
      label: 'Imperial Russian Academy',
      location: 'St. Petersburg, Russia',
      description:
          'In 1725, Johann Bernoulli’s two sons, Daniel and Nicolaus, entered the Imperial Russian Academy of Sciences in Saint Petersburg, with a promise to recommend Euler to a post when one became available. After Nicolaus died in 1726, Daniel took over his position and recommended Euler to take his position. After being rejected for a professorship in physics at the University of Basel, Euler arrived in St. Petersburg in May of 1727.'
  },
  {
      year: 1733,
      label: 'Chair of Mathematics',
      location: 'St. Petersburg, Russia',
      description:
          'After the death of Tsar Peter II in 1730, Euler swiftly rose through academy ranks to the position of professor of physics in 1731. In 1733, after Daniel Bernoulli left Russia for Basel, Euler succeeded him as chair of mathematics at the Academy. This marked the start of his most productive decades, where he would contribute greatly to Calculus, Physics, Number Theory, while also working on various state-sponsored projects like firetrucks, machines, and ships.'
  },
  {
      year: 1735,
      label: 'Vision loss begins',
      location: 'St. Petersburg, Russia',
      description:
          'After straining his eyes focusing on intricate details needed in cartographic work, Euler lost sight in one eye — but continued his research regardless.'
  },
  {
      year: 1741,
      label: 'Berlin Academy',
      location: 'Berlin, Prussia',
      description:
          'Invited by the King of Prussia Frederick the Great, Euler became a member of the Berlin Academy, where he spent the next 25 years of his life producing many publications on mathematics and physics.',
      highlight: true
  },
  {
      year: 1748,
      label: 'The Concept of a Function',
      location: 'Berlin, Prussia',
      description:
          'In Introductio in analysin infinitorum, Euler introduced the modern idea of a mathematical function and other foundational concepts for analysis.',
      highlight: true
  },
  {
      year: 1755,
      label: 'Differential Calculus',
      location: 'Berlin, Prussia',
      description:
          'Inside of Institutiones calculi differentialis, Euler introduced many new notations, such as sigma notation with Σ, the symbol e for the base of a natural logarithm, using a, b, c for the sides of a triangle (and A, B, C for the opposing angles), i for imaginary numbers, and using the π to represent pi.',
      highlight: true
  },
  {
      year: 1766,
      label: 'Return to Russia',
      location: 'St. Petersburg, Russia',
      description:
          'After tensions arose with Frederick the Great, Euler accepted Catherine II\'s invitation to return. Not too long later, Euler got a cataract in his remaining functional eye, leaving him totally blind.'
  },
  {
      year: 1768,
      label: 'Integral Calculus',
      location: 'St. Petersburg, Russia',
      description:
          'Euler wrote Institutiones calculi integralis (1768–70) and Lettres à une princesse d\'Allemagne. Both of these made Calculus and Physics more understandable to a wider range of audiences.',
      highlight: true
  },
  {
      year: 1783,
      label: 'Final discoveries',
      location: 'St. Petersburg, Russia',
      description:
          'During the last year of his life, Euler discovered the law of quadratic reciprocity. Leonhard Euler died on September 18, 1783, at the age of 76.'
  }
];




export const gallery: GalleryItem[] = [
  {
      id: '(TODO) notation',
      title: '(TODO) Mathematical Notation',
      image: '(TODO) https://images.unsplash.com/photo-1453733190148-c44698c26588?q=80&w=800',
      imageAlt: '(TODO) Handwritten vintage mathematics on parchment paper',
      body: '(TODO) We owe to Euler the notation f(x) for a function (1734), e for the base of natural logarithms (1727), i for √−1 (1777), π for pi, Σ for summation (1755), and finite-difference symbols Δy and Δ²y—symbols still used in every calculus classroom today.',
      tag: '(TODO) Calculus'
  },
  {
      id: '(TODO) konigsberg',
      title: '(TODO) Seven Bridges of Königsberg',
      image: '(TODO) https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800',
      imageAlt: '(TODO) Vintage European stone bridges over a scenic river at sunset',
      body: '(TODO) In 1736, Euler solved the famous puzzle: can you walk through the city crossing each of its seven bridges exactly once? His proof that it was impossible founded the field of graph theory—a branch of mathematics with applications from GPS to social networks.',
      tag: '(TODO) Fun Fact'
  },
  {
      id: '(TODO) blind',
      title: '(TODO) Blind but Unstoppable',
      image: '(TODO) https://images.unsplash.com/photo-1549877427-0cf09848523c?q=80&w=800',
      imageAlt: '(TODO) Stately classical architectural pillars in warm light',
      body: '(TODO) Fully blind from 1766, Euler continued to produce roughly half of his total output—dictating papers to scribes and performing complex calculations entirely in his head. His productivity barely slowed.',
      tag: '(TODO) Fun Fact'
  },
  {
      id: '(TODO) number-theory',
      title: '(TODO) Number Theory',
      image: '(TODO) https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800',
      imageAlt: '(TODO) Vintage chalk mathematical equations on a dark board',
      body: '(TODO) Throughout his life Euler was absorbed by the properties of integers. His greatest number-theoretic discovery, the law of quadratic reciprocity (1783), remains essential to modern cryptography and algebra.',
      tag: '(TODO) Mathematics'
  },
  {
      id: '(TODO) bernoulli',
      title: '(TODO) The Bernoulli Legacy',
      image: '(TODO) https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800',
      imageAlt: '(TODO) Cozy historical library with leather-bound books in soft warm light',
      body: '(TODO) Johann Bernoulli\'s mentorship in Basel shaped Euler\'s entire career. The Sunday tutorial method—rigorous self-study with expert guidance when stuck—became Euler\'s model for mathematical education in Russia.',
      tag: '(TODO) Influence'
  },
  {
      id: '(TODO) mechanics',
      title: '(TODO) Analytical Mechanics',
      image: '(TODO) https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
      imageAlt: '(TODO) Close up of historical brass mechanical gears under warm illumination',
      body: '(TODO) Euler laid the foundation of analytical mechanics in Theory of the Motions of Rigid Bodies (1765), studied lunar theory with Clairaut, and explored elasticity, acoustics, hydraulics, and the wave theory of light.',
      tag: '(TODO) Physics'
  }
];




export const mapLocations: MapLocation[] = [
  {
      id: 'basel',
      name: 'Basel, Switzerland',
      lat: 47.5596,
      lng: 7.5886,
      period: '1707, 1720 – 1727',
      description:
          '(TODO) Euler\'s birthplace and early training ground. Here he studied under Johann Bernoulli and built the self-directed study habits that would define his career.',
      collaborators: ['Johann Bernoulli']
  },
  {
      id: 'riehen',
      name: 'Riehen, Switzerland',
      lat: 47.57884,
      lng: 7.64683,
      period: '1708 – 1715',
      description:
          '(TODO) TODO',
      collaborators: ['Paul III Euler', 'Anna Maria', 'Maria Magdalena', 'Johann Heinrich']
  },
  {
      id: 'stpetersburg',
      name: 'St. Petersburg, Russia',
      lat: 59.9343,
      lng: 30.3351,
      period: '1727 – 1741 & 1766 – 1783',
      description:
          '(TODO) Euler spent two long stretches at the St. Petersburg Academy—first rising to the chair of mathematics, then returning under Catherine II. He helped establish mathematical education across Russia.',
      collaborators: ['Daniel Bernoulli', 'Catherine II', 'Lagrange (successor)']
  },
  {
      id: 'berlin',
      name: 'Berlin, Prussia',
      lat: 52.52,
      lng: 13.405,
      period: '1741 – 1766',
      description:
          '(TODO) At Frederick the Great\'s Berlin Academy, Euler wrote ~380 articles—including his landmark calculus texts—and collaborated on lunar theory and ballistics.',
      collaborators: ['Frederick the Great', 'Clairaut', 'Lagrange']
  }
];




export const bibliography: BibliographyEntry[] = [
  {
      authors: 'Britannica, T. Editors of Encyclopedia ',
      year: '2024',
      title: 'Leonhard Euler',
      source: 'Encyclopedia Britannica',
      url: 'https://www.britannica.com/biography/Leonhard-Euler'
  },
  {
      authors: "O'Connor, J. J., & Robertson, E. F.",
      year: '1998',
      title: 'Leonhard Euler',
      source: 'MacTutor History of Mathematics Archive, University of St Andrews',
      url: 'https://mathshistory.st-andrews.ac.uk/Biographies/Euler/'
  },
  {
      authors: 'Bradley, R. C.',
      year: '2006',
      title: 'Euler and the Bernoullis: Learning by teaching',
      source: 'Convergence. Mathematical Association of America',
      url: 'https://old.maa.org/press/periodicals/convergence/euler-and-the-bernoullis-learning-by-teaching-introduction'
  },
  {
      authors: 'Britannica, T. Editors of Encyclopedia ',
      year: '2024',
      title: 'Königsberg bridge problem',
      source: 'Encyclopedia Britannica',
      url: 'https://www.britannica.com/science/Konigsberg-bridge-problem'
  },
  {
      authors: 'Dunham, W.',
      year: '1999',
      title: 'Euler: The master of us all',
      source: 'Mathematical Association of America',
      url: undefined
  }
];