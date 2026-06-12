<script lang="ts">
	import { onMount } from 'svelte';
	import { interests } from '$lib/data/euler';

	let sectionEl: HTMLElement;

	onMount(async () => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(sectionEl.querySelectorAll('.card'), {
			y: 50,
			opacity: 0,
			duration: 0.8,
			stagger: 0.12,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 85%',
				end: 'bottom 15%',
				toggleActions: 'play reverse play reverse'
			}
		});
	});

	function handleMouseMove(e: MouseEvent) {
		const card = e.currentTarget as HTMLElement;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		card.style.setProperty('--mouse-x', `${x}px`);
		card.style.setProperty('--mouse-y', `${y}px`);
	}
</script>

<section id="who" bind:this={sectionEl}>
	<div class="section-inner">
		<p class="section-label">Who was Euler?</p>
		<h2 class="section-title">Mathematician, physicist, <span class="gradient-text">polymath</span></h2>
		<p class="section-subtitle">
			Swiss-born and endlessly curious—Euler's interests stretched far beyond the pages of a calculus
			textbook.
		</p>

		<div class="cards">
			{#each interests as card, i}
				<article class="card glass-card mouse-glow" onmousemove={handleMouseMove}>
					<span class="icon">{card.icon}</span>
					<h3>{card.title}</h3>
					<p>{card.body}</p>
					<span class="card-index">0{i + 1}</span>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.card {
		padding: 2rem;
		position: relative;
		overflow: hidden;
	}

	.card:hover {
		transform: translateY(-4px);
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		border-radius: 12px;
		background: rgba(101, 173, 241, 0.12);
		font-size: 1.4rem;
		margin-bottom: 1.25rem;
		color: var(--accent-bright);
	}

	.card h3 {
		font-size: 1.15rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		letter-spacing: -0.01em;
	}

	.card p {
		font-size: 0.925rem;
		color: var(--text-muted);
		line-height: 1.7;
	}

	.card-index {
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		font-family: var(--font-mono);
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.15);
	}

	@media (max-width: 900px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>
