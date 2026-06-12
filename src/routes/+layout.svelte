<script lang="ts">
	import { onMount } from 'svelte';
	import '../lib/styles/global.css';
	import favicon from '$lib/assets/favicon.svg';
	import StickyNav from '$lib/components/StickyNav.svelte';

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
	<title>Leonhard Euler — Interactive Presentation</title>
	<meta
		name="description"
		content="An interactive presentation on Leonhard Euler's life, calculus contributions, and legacy."
	/>
</svelte:head>

<div class="mesh-bg"></div>
<div class="grid-overlay"></div>
<StickyNav />
<main>{@render children()}</main>

<style>
	main {
		position: relative;
		z-index: 1;
	}
</style>
