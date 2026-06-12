<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { timeline } from '$lib/data/euler';

	let activeIndex = $state(0);
	let sectionEl: HTMLElement;
	let trackEl: HTMLElement;

	let canScrollLeft = $state(false);
	let canScrollRight = $state(true);

	let hoverScrollActive = false;
	let hoverScrollSpeed = 0;
	let hoverScrollDirection: 'left' | 'right' | null = null;
	let scrollRafId: number;

	onMount(async () => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(sectionEl.querySelector('.section-header'), {
			y: 30,
			opacity: 0,
			duration: 0.8,
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 85%',
				end: 'bottom 15%',
				toggleActions: 'play reverse play reverse'
			}
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
							handleTrackScroll();
						}
					}
				});
			}
		}
	});

	function handleTrackScroll() {
		if (!trackEl) return;
		canScrollLeft = trackEl.scrollLeft > 5;
		canScrollRight = trackEl.scrollLeft < trackEl.scrollWidth - trackEl.clientWidth - 5;
	}

	function checkHoverScroll(e: MouseEvent) {
		if (!trackEl) return;
		const rect = trackEl.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const threshold = 120; // active zone width from edge

		if (mouseX < threshold && (trackEl.scrollLeft > 0 || window.scrollY > 0)) {
			hoverScrollActive = true;
			hoverScrollDirection = 'left';
			hoverScrollSpeed = ((threshold - mouseX) / threshold) * 10;
		} else if (
			mouseX > rect.width - threshold &&
			(trackEl.scrollLeft < trackEl.scrollWidth - rect.width ||
				window.scrollY < document.documentElement.scrollHeight)
		) {
			hoverScrollActive = true;
			hoverScrollDirection = 'right';
			hoverScrollSpeed = ((mouseX - (rect.width - threshold)) / threshold) * 10;
		} else {
			hoverScrollActive = false;
			hoverScrollDirection = null;
		}
	}

	function startHoverScrollLoop() {
		function loop() {
			if (!hoverScrollActive || !hoverScrollDirection || !trackEl) return;

			const isPinned = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 768;

			if (isPinned) {
				// Pinning is active: scroll page vertically to trigger ScrollTrigger horizontal scroll
				const scrollDelta = hoverScrollDirection === 'left' ? -hoverScrollSpeed * 2.5 : hoverScrollSpeed * 2.5;
				window.scrollBy(0, scrollDelta);
			} else {
				// Pinning is not active: scroll container scrollLeft directly
				const scrollDelta = hoverScrollDirection === 'left' ? -hoverScrollSpeed : hoverScrollSpeed;
				trackEl.scrollLeft += scrollDelta;
				handleTrackScroll();
			}

			scrollRafId = requestAnimationFrame(loop);
		}
		scrollRafId = requestAnimationFrame(loop);
	}

	function handleMouseEnter() {
		startHoverScrollLoop();
	}

	function handleMouseLeave() {
		hoverScrollActive = false;
		hoverScrollDirection = null;
		if (scrollRafId) cancelAnimationFrame(scrollRafId);
	}

	function handleMouseMoveTrack(e: MouseEvent) {
		checkHoverScroll(e);
	}

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

	<div class="section-inner">
		<div class="timeline-track-wrap">
			<div class="scroll-cue left-cue" class:visible={canScrollLeft}></div>
			<div class="scroll-cue right-cue" class:visible={canScrollRight}></div>
			
			<div 
				class="timeline-track" 
				bind:this={trackEl} 
				data-lenis-prevent
				role="region"
				aria-label="Interactive timeline scrollable track"
				onmousemove={handleMouseMoveTrack}
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
				onscroll={handleTrackScroll}
			>
				<div class="timeline-line" style="width: {160 * (timeline.length - 1)}px"></div>
				<div class="timeline-line-active" style="width: {160 * activeIndex}px"></div>
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
	</div>

	<div class="section-inner">
		<div class="detail-panel glass-card">
			{#key activeIndex}
				<div
					in:fly={{ y: 15, duration: 350, delay: 100 }}
					out:fade={{ duration: 100 }}
					class="detail-content"
				>
					<div class="detail-meta">
						<span class="detail-year">{timeline[activeIndex].year}</span>
						<span class="detail-location">{timeline[activeIndex].location}</span>
					</div>
					<h3 class="detail-title">{timeline[activeIndex].label}</h3>
					<p class="detail-body">{timeline[activeIndex].description}</p>
				</div>
			{/key}
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
		position: relative;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.01);
		backdrop-filter: blur(8px);
	}

	/* Fading cues at the edges of scrollable content */
	.scroll-cue {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 80px;
		pointer-events: none;
		z-index: 3;
		opacity: 0;
		transition: opacity var(--transition);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.scroll-cue.visible {
		opacity: 1;
	}

	.left-cue {
		left: 0;
		background: linear-gradient(90deg, var(--bg-deep) 0%, transparent 100%);
	}

	.left-cue::before {
		content: "←";
		font-family: var(--font-mono);
		font-size: 1.25rem;
		color: var(--accent);
		opacity: 0.65;
		animation: pulseLeft 1.5s infinite ease-in-out;
	}

	.right-cue {
		right: 0;
		background: linear-gradient(-90deg, var(--bg-deep) 0%, transparent 100%);
	}

	.right-cue::before {
		content: "→";
		font-family: var(--font-mono);
		font-size: 1.25rem;
		color: var(--accent);
		opacity: 0.65;
		animation: pulseRight 1.5s infinite ease-in-out;
	}

	@keyframes pulseLeft {
		0%, 100% { transform: translateX(0); opacity: 0.3; }
		50% { transform: translateX(-5px); opacity: 0.8; }
	}

	@keyframes pulseRight {
		0%, 100% { transform: translateX(0); opacity: 0.3; }
		50% { transform: translateX(5px); opacity: 0.8; }
	}

	.timeline-track {
		display: flex;
		align-items: flex-start;
		gap: 0;
		padding: 3.5rem 2rem 2.5rem;
		overflow-x: auto;
		position: relative;
		scrollbar-width: none;
		min-height: 200px;
	}

	.timeline-track::-webkit-scrollbar {
		display: none;
	}

	.timeline-line {
		position: absolute;
		top: calc(3.5rem + 1.5rem + 0.75rem + 7px);
		left: 112px;
		height: 2px;
		background: rgba(218, 197, 179, 0.1);
		z-index: 0;
	}

	.timeline-line-active {
		position: absolute;
		top: calc(3.5rem + 1.5rem + 0.75rem + 7px);
		left: 112px;
		height: 2px;
		background: linear-gradient(90deg, var(--accent), var(--accent-secondary));
		transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		z-index: 0;
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
		position: relative;
	}

	.node-year {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 600;
		color: var(--text-muted);
		opacity: 0.7;
		height: 1.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity var(--transition), transform var(--transition), color var(--transition), font-size var(--transition);
	}

	.timeline-node.active .node-year {
		opacity: 1;
		color: var(--text);
		font-size: 0.95rem;
		font-weight: 700;
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

	.timeline-node:hover .node-dot {
		transform: scale(1.15);
		border-color: var(--accent);
	}

	/* Selected state: dot rises above the line and connects via thin line */
	.timeline-node.active .node-dot,
	.timeline-node.highlight.active .node-dot {
		border-color: var(--accent-bright);
		box-shadow: 0 0 16px rgba(117, 88, 58, 0.6);
		transform: translateY(-10px) scale(1.3);
		background: var(--bg-surface);
	}

	.timeline-node.active .node-dot::after {
		content: "";
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		width: 2px;
		height: 10px;
		background: var(--accent);
		z-index: -1;
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
		color: var(--text-muted);
		transition: transform var(--transition), color var(--transition), font-size var(--transition), font-weight var(--transition);
	}

	.timeline-node.active .node-label {
		color: var(--text);
		font-size: 0.9rem;
		font-weight: 700;
	}

	/* Hover expansions */
	.timeline-node:hover .node-year,
	.timeline-node.active .node-year {
		transform: translateY(-4px);
		opacity: 1;
	}

	.timeline-node:hover .node-label,
	.timeline-node.active .node-label {
		transform: translateY(4px);
	}

	.detail-panel {
		padding: 2.25rem 2.75rem;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		min-height: 200px;
	}

	.detail-content {
		grid-area: 1 / 1 / 2 / 2;
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
