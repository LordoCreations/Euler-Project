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
	tagline: 'The Master of Us All',
	intro: `Leonhard Euler was a Swiss mathematician and physicist whose work shaped nearly every branch of 18th-century mathematics. From Basel to St. Petersburg to Berlin and back again, he produced more than 800 books and papers—integrating Leibniz's differential calculus with Newton's method of fluxions, inventing much of modern mathematical notation, and continuing to publish even after losing his sight entirely.`,
	portrait: '/eulerportrait.jpg',
	portraitAlt: 'Portrait of Leonhard Euler in warm lighting'
};

export const interests: InterestCard[] = [
	{
		icon: '∫',
		title: 'Mathematician & Physicist',
		body: 'Contributions to geometry, calculus, mechanics, number theory, astronomy, and applied mathematics that defined 18th-century science.'
	},
	{
		icon: '⚙',
		title: 'Beyond Pure Mathematics',
		body: 'After 1730, Euler carried out state projects in cartography, science education, magnetism, fire engines, machines, and shipbuilding—applying mathematics to real-world engineering.'
	},
	{
		icon: '✦',
		title: 'Prolific Output',
		body: 'During 25 years in Berlin alone, Euler wrote around 380 articles—on ballistics, navigation, lunar motion, and even a popular science series for a German princess.'
	}
];

export const calculus = {
	title: 'Contributions to Calculus',
	subtitle: 'What Euler gave to the development of mathematical analysis',
	body: `Euler's calculus textbooks—Institutiones calculi differentialis (1755) and Institutiones calculi integralis (1768–70)—became the prototypes for modern calculus instruction. They contained formulae for differentiation and indefinite integration, many invented by Euler himself, along with methods for determining work done by a force and solving geometric problems.`,
	highlights: [
		'Integrated Leibniz\'s differential calculus and Newton\'s method of fluxions into unified mathematical analysis',
		'Introduced the concept of a function in Introductio in analysin infinitorum (1748)',
		'Developed beta and gamma functions, integrating factors, and advances in linear differential equations',
		'Pioneered the calculus of variations and applied analysis to physics and mechanics',
		'Created enduring notation: f(x), e, Σ, π, i, and finite-difference symbols Δy, Δ²y'
	]
};

export const why = {
	title: 'Why Euler?',
	subtitle: 'A deliberate research program—not a lucky accident',
	body: `Euler did not stumble into calculus by accident. He deliberately built an interconnected research program spanning number theory, infinitary analysis (including differential equations and the calculus of variations), and rational mechanics. He viewed these fields as intimately connected—number theory grounded the foundations of calculus, while mechanics supplied the concrete problems that drove his innovations.`,
	quote: `I soon found an opportunity to be introduced to a famous professor Johann Bernoulli… True, he was very busy and so refused flatly to give me private lessons; but he gave me much more valuable advice to start reading more difficult mathematical books on my own and to study them as diligently as I could; if I came across some obstacle or difficulty, I was given permission to visit him freely every Sunday afternoon and he kindly explained to me everything I could not understand … and this, undoubtedly, is the best method to succeed in mathematical subjects.`,
	quoteAttribution: 'Leonhard Euler, on Johann Bernoulli\'s mentorship in Basel'
};

export const timeline: TimelineEvent[] = [
	{
		year: 1707,
		label: 'Born in Basel',
		location: 'Basel, Switzerland',
		description:
			'Leonhard Euler is born on April 15. He grows up in Switzerland and shows exceptional talent in mathematics from a young age.'
	},
	{
		year: 1720,
		label: 'Bernoulli mentorship',
		location: 'Basel, Switzerland',
		description:
			'Euler studies under Johann Bernoulli, visiting every Sunday for guidance while reading advanced texts independently—the foundation of his mathematical method.'
	},
	{
		year: 1727,
		label: 'St. Petersburg',
		location: 'St. Petersburg, Russia',
		description:
			'Euler joins the St. Petersburg Academy of Sciences, working alongside leading mathematicians including Daniel Bernoulli.'
	},
	{
		year: 1733,
		label: 'Chair of Mathematics',
		location: 'St. Petersburg, Russia',
		description:
			'Euler succeeds Daniel Bernoulli as chair of mathematics at the Academy, marking the start of his most productive decades.'
	},
	{
		year: 1735,
		label: 'Vision loss begins',
		location: 'St. Petersburg, Russia',
		description:
			'After straining his eyes on cartographic work, Euler loses sight in one eye—but continues his research without slowing down.'
	},
	{
		year: 1741,
		label: 'Berlin Academy',
		location: 'Berlin, Prussia',
		description:
			'Invited by Frederick the Great, Euler becomes a member of the Berlin Academy, where he will spend 25 prolific years.',
		highlight: true
	},
	{
		year: 1748,
		label: 'Introductio',
		location: 'Berlin, Prussia',
		description:
			'In Introductio in analysin infinitorum, Euler develops the modern concept of a mathematical function—central to all of analysis.',
		highlight: true
	},
	{
		year: 1755,
		label: 'Differential Calculus',
		location: 'Berlin, Prussia',
		description:
			'Institutiones calculi differentialis is published—a definitive textbook on differentiation that shaped calculus teaching for centuries.',
		highlight: true
	},
	{
		year: 1766,
		label: 'Return to Russia',
		location: 'St. Petersburg, Russia',
		description:
			'After tensions with Frederick the Great, Euler accepts Catherine II\'s invitation to return. A cataract soon leaves him completely blind.'
	},
	{
		year: 1768,
		label: 'Integral Calculus & Letters',
		location: 'St. Petersburg, Russia',
		description:
			'Institutiones calculi integralis (1768–70) and Lettres à une princesse d\'Allemagne bring calculus and physics to wider audiences.',
		highlight: true
	},
	{
		year: 1783,
		label: 'Final discoveries',
		location: 'St. Petersburg, Russia',
		description:
			'Euler discovers the law of quadratic reciprocity—a cornerstone of modern number theory—and dies on September 18, succeeded in influence by Lagrange.'
	}
];

export const gallery: GalleryItem[] = [
	{
		id: 'notation',
		title: 'Mathematical Notation',
		image: 'https://images.unsplash.com/photo-1453733190148-c44698c26588?q=80&w=800',
		imageAlt: 'Handwritten vintage mathematics on parchment paper',
		body: 'We owe to Euler the notation f(x) for a function (1734), e for the base of natural logarithms (1727), i for √−1 (1777), π for pi, Σ for summation (1755), and finite-difference symbols Δy and Δ²y—symbols still used in every calculus classroom today.',
		tag: 'Calculus'
	},
	{
		id: 'konigsberg',
		title: 'Seven Bridges of Königsberg',
		image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800',
		imageAlt: 'Vintage European stone bridges over a scenic river at sunset',
		body: 'In 1736, Euler solved the famous puzzle: can you walk through the city crossing each of its seven bridges exactly once? His proof that it was impossible founded the field of graph theory—a branch of mathematics with applications from GPS to social networks.',
		tag: 'Fun Fact'
	},
	{
		id: 'blind',
		title: 'Blind but Unstoppable',
		image: 'https://images.unsplash.com/photo-1549877427-0cf09848523c?q=80&w=800',
		imageAlt: 'Stately classical architectural pillars in warm light',
		body: 'Fully blind from 1766, Euler continued to produce roughly half of his total output—dictating papers to scribes and performing complex calculations entirely in his head. His productivity barely slowed.',
		tag: 'Fun Fact'
	},
	{
		id: 'number-theory',
		title: 'Number Theory',
		image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=800',
		imageAlt: 'Vintage chalk mathematical equations on a dark board',
		body: 'Throughout his life Euler was absorbed by the properties of integers. His greatest number-theoretic discovery, the law of quadratic reciprocity (1783), remains essential to modern cryptography and algebra.',
		tag: 'Mathematics'
	},
	{
		id: 'bernoulli',
		title: 'The Bernoulli Legacy',
		image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800',
		imageAlt: 'Cozy historical library with leather-bound books in soft warm light',
		body: 'Johann Bernoulli\'s mentorship in Basel shaped Euler\'s entire career. The Sunday tutorial method—rigorous self-study with expert guidance when stuck—became Euler\'s model for mathematical education in Russia.',
		tag: 'Influence'
	},
	{
		id: 'mechanics',
		title: 'Analytical Mechanics',
		image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800',
		imageAlt: 'Close up of historical brass mechanical gears under warm illumination',
		body: 'Euler laid the foundation of analytical mechanics in Theory of the Motions of Rigid Bodies (1765), studied lunar theory with Clairaut, and explored elasticity, acoustics, hydraulics, and the wave theory of light.',
		tag: 'Physics'
	}
];

export const mapLocations: MapLocation[] = [
	{
		id: 'basel',
		name: 'Basel, Switzerland',
		lat: 47.5596,
		lng: 7.5886,
		period: '1707 – 1727',
		description:
			'Euler\'s birthplace and early training ground. Here he studied under Johann Bernoulli and built the self-directed study habits that would define his career.',
		collaborators: ['Johann Bernoulli']
	},
	{
		id: 'stpetersburg',
		name: 'St. Petersburg, Russia',
		lat: 59.9343,
		lng: 30.3351,
		period: '1727 – 1741 & 1766 – 1783',
		description:
			'Euler spent two long stretches at the St. Petersburg Academy—first rising to the chair of mathematics, then returning under Catherine II. He helped establish mathematical education across Russia.',
		collaborators: ['Daniel Bernoulli', 'Catherine II', 'Lagrange (successor)']
	},
	{
		id: 'berlin',
		name: 'Berlin, Prussia',
		lat: 52.52,
		lng: 13.405,
		period: '1741 – 1766',
		description:
			'At Frederick the Great\'s Berlin Academy, Euler wrote ~380 articles—including his landmark calculus texts—and collaborated on lunar theory and ballistics.',
		collaborators: ['Frederick the Great', 'Clairaut', 'Lagrange']
	}
];

export const bibliography: BibliographyEntry[] = [
	{
		authors: 'Britannica, T. Editors of Encyclopaedia',
		year: '2024',
		title: 'Leonhard Euler',
		source: 'Encyclopaedia Britannica',
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
		authors: 'Britannica, T. Editors of Encyclopaedia',
		year: '2024',
		title: 'Königsberg bridge problem',
		source: 'Encyclopaedia Britannica',
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

export const navLinks = [
	{ id: 'intro', label: 'Introduction' },
	{ id: 'timeline', label: 'Timeline' },
	{ id: 'calculus', label: 'Calculus' },
	{ id: 'gallery', label: 'Gallery' },
	{ id: 'map', label: 'Map' },
	{ id: 'why', label: 'Motivation' },
	{ id: 'bibliography', label: 'Bibliography' }
];
