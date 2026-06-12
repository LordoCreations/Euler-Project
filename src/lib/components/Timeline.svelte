<script lang="ts">
	import { onMount } from 'svelte';
	import { timeline } from '$lib/data/euler';

	let activeIndex = $state(0);
	let sectionEl: HTMLElement;
	let trackEl: HTMLElement;

	onMount(async () => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(sectionEl.querySelector('.section-header'), {
			y: 30,
			opacity: 0,
			duration: 0.8,
			scrollTrigger: { trigger: sectionEl, start: 'top 80%' }
		});

		if (trackEl) {
			const totalScroll = trackEl.scrollWidth - trackEl.clientWidth;
			if (totalScroll > 0) {
				gsap.to(trackEl, {
					scrollLeft: totalScroll,
					ease: 'none',
					scrollTrigger: {
						trigger: sectionEl,
						start: 'top top',
						end: () => `+=${totalScroll + 400}`,
						pin: true,
						scrub: 1,
						onUpdate: (self) => {
							const progress = self.progress;
							activeIndex = Math.min(
								timeline.length - 1,
								Math.floor(progress * timeline.length)
							);
						}
					}
				});
			}
		}
	});

	function selectEvent(i: number) {
		activeIndex = i;
		const node = trackEl?.querySelector(`[data-index="${i}"]`) as HTMLElement;
		node?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
	}
</script>

<section id="timeline" bind:this={sectionEl} class="timeline-section">
	<div class="section-inner">
		<div class="section-header">
			<p class="section-label">When & Where</p>
			<h2 class="section-title">Interactive <span class="gradient-text">Timeline</span></h2>
			<p class="section-subtitle">
				Scroll to journey through Euler's life—from Basel to St. Petersburg, Berlin, and back.
			</p>
		</div>
	</div>

	<div class="timeline-track-wrap">
		<div class="timeline-track" bind:this={trackEl} data-lenis-prevent>
			<div class="timeline-line"></div>
			{#each timeline as event, i}
				<button
					class="timeline-node"
					class:active={activeIndex === i}
					class:highlight={event.highlight}
					data-index={i}
					onclick={() => selectEvent(i)}
				>
					<span class="node-year">{event.year}</span>
					<span class="node-dot"></span>
					<span class="node-label">{event.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<div class="section-inner">
		<div class="detail-panel glass-card">
			<div class="detail-meta">
				<span class="detail-year">{timeline[activeIndex].year}</span>
				<span class="detail-location">{timeline[activeIndex].location}</span>
			</div>
			<h3 class="detail-title">{timeline[activeIndex].label}</h3>
			<p class="detail-body">{timeline[activeIndex].description}</p>
		</div>
	</div>
</section>

<style>
	.timeline-section {
		padding-bottom: 2rem;
		z-index: 1;
	}

	.timeline-track-wrap {
		overflow: hidden;
		margin-bottom: 2rem;
	}

	.timeline-track {
		display: flex;
		align-items: flex-start;
		gap: 0;
		padding: 3rem 2rem 2rem;
		overflow-x: auto;
		position: relative;
		scrollbar-width: none;
		min-height: 180px;
	}

	.timeline-track::-webkit-scrollbar {
		display: none;
	}

	.timeline-line {
		position: absolute;
		top: 4.6rem;
		left: 2rem;
		right: 2rem;
		height: 2px;
		background: linear-gradient(90deg, var(--accent), var(--accent-secondary), var(--accent));
		opacity: 0.4;
	}

	.timeline-node {
		flex: 0 0 160px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0 0.5rem;
		color: var(--text-muted);
		font-family: var(--font-sans);
		transition: color var(--transition), transform var(--transition);
	}

	.timeline-node:hover,
	.timeline-node.active {
		color: var(--text);
		transform: translateY(-4px);
	}

	.node-year {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--accent);
		opacity: 0.7;
		transition: opacity var(--transition);
	}

	.timeline-node.active .node-year {
		opacity: 1;
	}

	.node-dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: var(--bg-deep);
		border: 2px solid var(--text-muted);
		transition: border-color var(--transition), box-shadow var(--transition), transform var(--transition);
		position: relative;
		z-index: 1;
	}

	.timeline-node.active .node-dot,
	.timeline-node.highlight.active .node-dot {
		border-color: var(--accent-bright);
		box-shadow: 0 0 16px rgba(101, 173, 241, 0.6);
		transform: scale(1.3);
	}

	.timeline-node.highlight .node-dot {
		border-color: var(--accent-secondary);
	}

	.node-label {
		font-size: 0.8rem;
		font-weight: 500;
		text-align: center;
		line-height: 1.3;
		max-width: 140px;
	}

	.detail-panel {
		padding: 2rem 2.5rem;
		animation: fadeIn 0.4s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.detail-meta {
		display: flex;
		gap: 1rem;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
	}

	.detail-year {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--accent);
		font-weight: 600;
	}

	.detail-location {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--text-muted);
	}

	.detail-title {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
	}

	.detail-body {
		color: var(--text-muted);
		line-height: 1.75;
		font-size: 1rem;
	}

	@media (max-width: 768px) {
		.timeline-node {
			flex: 0 0 120px;
		}
	}
</style>
