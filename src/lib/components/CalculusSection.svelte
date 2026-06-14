<script lang="ts">
	import { onMount } from 'svelte';
	import { calculus } from '$lib/data/euler';

	let sectionEl: HTMLElement;

	onMount(async () => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(sectionEl.querySelectorAll('[data-reveal]'), {
			x: -30,
			opacity: 0,
			duration: 0.7,
			stagger: 0.1,
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

<section id="calculus" bind:this={sectionEl}>
	<div class="section-inner calculus-grid">
		<div class="calculus-text">
			<p class="section-label" data-reveal>{calculus.title}</p>
			<h2 class="section-title" data-reveal>
				Shaping <span class="gradient-text">Calculus</span>
			</h2>
			<p class="body" data-reveal>{@html calculus.body}</p>
		</div>

		<ul class="highlights">
			{#each calculus.highlights as item, i}
				<li class="highlight glass-card" data-reveal>
					<span class="num">{String(i + 1).padStart(2, '0')}</span>
					<p>{@html item}</p>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.calculus-grid {
		display: grid;
		grid-template-columns: 1fr 1.1fr;
		gap: 4rem;
		align-items: start;
	}

	.body {
		color: var(--text-muted);
		line-height: 1.75;
		font-size: 1.05rem;
		margin-top: 1rem;
	}

	.highlights {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.highlight {
		display: flex;
		gap: 1.25rem;
		padding: 1.25rem 1.5rem;
		align-items: flex-start;
	}

	.highlight:hover {
		transform: translateX(6px);
	}

	.num {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--accent);
		font-weight: 600;
		flex-shrink: 0;
		padding-top: 0.15rem;
	}

	.highlight p {
		font-size: 0.925rem;
		color: var(--text-muted);
		line-height: 1.65;
	}

	@media (max-width: 900px) {
		.calculus-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
