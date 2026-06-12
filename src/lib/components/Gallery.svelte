<script lang="ts">
	import { onMount } from 'svelte';
	import { gallery } from '$lib/data/euler';
	import { fade } from 'svelte/transition';

	let sectionEl: HTMLElement;
	let expandedId = $state<string | null>(null);

	onMount(async () => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(sectionEl.querySelectorAll('.gallery-card'), {
			y: 60,
			opacity: 0,
			duration: 0.7,
			stagger: 0.08,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: sectionEl,
				start: 'top 85%',
				end: 'bottom 15%',
				toggleActions: 'play reverse play reverse'
			}
		});
	});

	function toggle(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	function handleMouseMove(e: MouseEvent) {
		const card = e.currentTarget as HTMLElement;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		card.style.setProperty('--mouse-x', `${x}px`);
		card.style.setProperty('--mouse-y', `${y}px`);
	}
</script>

<section id="gallery" bind:this={sectionEl}>
	<div class="section-inner">
		<p class="section-label">Discoveries & Fun Facts</p>
		<h2 class="section-title">Gallery of <span class="gradient-text">genius</span></h2>
		<p class="section-subtitle">
			Click any card to expand—Euler's reach extended from notation to graph theory, mechanics, and
			beyond.
		</p>

		<div class="gallery-grid">
			{#each gallery as item}
				<div
					class="gallery-card glass-card mouse-glow"
					class:expanded={expandedId === item.id}
					role="button"
					tabindex="0"
					onclick={() => toggle(item.id)}
					onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle(item.id))}
					onmousemove={handleMouseMove}
				>
					<div class="card-image-wrap">
						<img src={item.image} alt={item.imageAlt} loading="lazy" />
						<span class="tag">{item.tag}</span>
					</div>
					<div class="card-content">
						<h3>{item.title}</h3>
						{#if expandedId === item.id}
							<p transition:fade={{ duration: 250 }}>{item.body}</p>
						{:else}
							<p class="preview">{item.body.slice(0, 100)}…</p>
						{/if}
						<span class="expand-hint">{expandedId === item.id ? 'Click to collapse' : 'Click to read more'}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>

	{#if expandedId}
		<button
			type="button"
			class="overlay no-print"
			aria-label="Close expanded card"
			transition:fade={{ duration: 200 }}
			onclick={() => (expandedId = null)}
		></button>
	{/if}
</section>

<style>
	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.gallery-card {
		overflow: hidden;
		position: relative;
		z-index: 1;
		cursor: pointer;
	}

	.gallery-card.expanded {
		z-index: 10;
		border-color: var(--border-glow);
		box-shadow: 0 16px 48px rgba(101, 173, 241, 0.15);
		transform: scale(1.02);
	}

	.card-image-wrap {
		position: relative;
		overflow: hidden;
		aspect-ratio: 16 / 10;
		background: var(--bg-surface);
	}

	.card-image-wrap img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	.gallery-card:hover .card-image-wrap img {
		transform: scale(1.05);
	}

	.tag {
		position: absolute;
		top: 0.75rem;
		left: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		padding: 0.3rem 0.6rem;
		border-radius: 6px;
		background: rgba(6, 8, 15, 0.75);
		backdrop-filter: blur(8px);
		color: var(--accent-bright);
		border: 1px solid var(--border);
	}

	.card-content {
		padding: 1.25rem 1.5rem 1.5rem;
	}

	.card-content h3 {
		font-size: 1.05rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.card-content p {
		font-size: 0.875rem;
		color: var(--text-muted);
		line-height: 1.65;
	}

	.preview {
		opacity: 0.75;
	}

	.expand-hint {
		display: block;
		margin-top: 0.75rem;
		font-family: var(--font-mono);
		font-size: 0.65rem;
		color: var(--accent);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 5;
		border: none;
		padding: 0;
		cursor: pointer;
	}

	@media (max-width: 900px) {
		.gallery-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
