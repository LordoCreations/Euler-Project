<script lang="ts">
	import { onMount } from 'svelte';
	import '../lib/styles/global.css';
	import favicon from '$lib/assets/favicon.svg';
	import StickyNav from '$lib/components/StickyNav.svelte';
	import AmbientParticles from '$lib/components/AmbientParticles.svelte';

	let { children } = $props();

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let destroyed = false;
		let lenisDestroy: (() => void) | undefined;

		(async () => {
			const Lenis = (await import('lenis')).default;
			const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
			document.documentElement.classList.add('lenis', 'lenis-smooth');

			function raf(time: number) {
				if (destroyed) return;
				lenis.raf(time);
				requestAnimationFrame(raf);
			}
			requestAnimationFrame(raf);

			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);
			lenis.on('scroll', ScrollTrigger.update);

			// Parallax scroll effects for background mesh and grid overlay
			gsap.to('.mesh-bg', {
				yPercent: 8,
				ease: 'none',
				scrollTrigger: {
					trigger: 'body',
					start: 'top top',
					end: 'bottom bottom',
					scrub: true
				}
			});

			gsap.to('.grid-overlay', {
				yPercent: -8,
				ease: 'none',
				scrollTrigger: {
					trigger: 'body',
					start: 'top top',
					end: 'bottom bottom',
					scrub: true
				}
			});

			lenisDestroy = () => {
				lenis.destroy();
				document.documentElement.classList.remove('lenis', 'lenis-smooth');
			};
		})();

		return () => {
			destroyed = true;
			lenisDestroy?.();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Leonhard Euler</title>
	<meta
		name="description"
		content="An interactive presentation on Leonhard Euler's life, calculus contributions, and legacy."
	/>
</svelte:head>

<div class="mesh-bg"></div>
<div class="grid-overlay"></div>
<AmbientParticles />
<StickyNav />
<main>{@render children()}</main>

<style>
	main {
		position: relative;
		z-index: 1;
	}

	/* Adjust background bounds to allow for vertical scroll parallax without showing raw edges */
	:global(.mesh-bg) {
		position: fixed;
		top: -10%;
		bottom: -10%;
		left: -5%;
		right: -5%;
		background: var(--gradient-mesh);
		pointer-events: none;
		z-index: 0;
	}

	:global(.grid-overlay) {
		position: fixed;
		top: -10%;
		bottom: -10%;
		left: -5%;
		right: -5%;
		background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
		background-size: 64px 64px;
		pointer-events: none;
		z-index: 0;
		mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent);
	}
</style>
