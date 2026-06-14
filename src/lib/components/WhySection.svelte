<script lang="ts">
	import { onMount } from 'svelte';
	import { why } from '$lib/data/euler';

	let sectionEl: HTMLElement;

	onMount(async () => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(sectionEl.querySelectorAll('.why-grid > div, .quote-block'), {
			y: 40,
			opacity: 0,
			duration: 0.8,
			stagger: 0.15,
			ease: 'power2.out',
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 85%',
				end: 'bottom 15%',
				toggleActions: 'play reverse play reverse'
			}
		});
	});
</script>

<section id="why" bind:this={sectionEl}>
	<div class="section-inner why-grid">
		<div>
			<p class="section-label">{why.title}</p>
			<h2 class="section-title">
				Path to <span class="gradient-text">discovery</span>
			</h2>
			<p class="body">{why.body}</p>
		</div>

		<blockquote class="quote-block glass-card">
			<p class="quote">"{why.quote}"</p>
			<footer>— {why.quoteAttribution}</footer>
		</blockquote>
	</div>
</section>

<style>
	.why-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	.body {
		color: var(--text-muted);
		line-height: 1.75;
		font-size: 1.05rem;
		margin-top: 1rem;
	}

	.quote-block {
		padding: 2.5rem;
		position: relative;
		border-left: 3px solid var(--accent);
	}

	.quote-block::before {
		content: '"';
		position: absolute;
		top: 1rem;
		left: 1.5rem;
		font-size: 4rem;
		line-height: 1;
		color: rgba(101, 173, 241, 0.15);
		font-family: Georgia, serif;
	}

	.quote {
		font-size: 1rem;
		line-height: 1.8;
		color: var(--text);
		font-style: italic;
		position: relative;
		z-index: 1;
	}

	footer {
		margin-top: 1.25rem;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--accent);
		font-style: normal;
	}

	@media (max-width: 900px) {
		.why-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
