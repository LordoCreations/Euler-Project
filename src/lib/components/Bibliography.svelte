<script lang="ts">
	import { onMount } from 'svelte';
	import { bibliography } from '$lib/data/euler';

	let sectionEl: HTMLElement;

	onMount(async () => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from(sectionEl.querySelectorAll('.bib-entry'), {
			y: 20,
			opacity: 0,
			duration: 0.5,
			stagger: 0.08,
			ease: 'power2.out',
			scrollTrigger: { trigger: sectionEl, start: 'top 75%' }
		});
	});

	function formatApa(entry: (typeof bibliography)[0]): string {
		let text = `${entry.authors} (${entry.year}). ${entry.title}. ${entry.source}.`;
		if (entry.url) text += ` ${entry.url}`;
		return text;
	}
</script>

<section id="bibliography" bind:this={sectionEl} class="bib-section">
	<div class="section-inner">
		<p class="section-label">References</p>
		<h2 class="section-title">Bibliography <span class="gradient-text">(APA)</span></h2>
		<p class="section-subtitle">
			Sources cited in this presentation. Formatted for print submission.
		</p>

		<ol class="bib-list">
			{#each bibliography as entry}
				<li class="bib-entry glass-card">
					<p>{formatApa(entry)}</p>
					{#if entry.url}
						<a href={entry.url} target="_blank" rel="noopener noreferrer" class="bib-link no-print">
							View source →
						</a>
					{/if}
				</li>
			{/each}
		</ol>
	</div>
</section>

<footer class="site-footer">
	<p>Leonhard Euler Presentation · Built with SvelteKit</p>
	<p class="footer-note no-print">Map data © OpenStreetMap contributors · Images via Wikimedia Commons</p>
</footer>

<style>
	.bib-section {
		padding-bottom: 3rem;
	}

	.bib-list {
		list-style: none;
		counter-reset: bib;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.bib-entry {
		counter-increment: bib;
		padding: 1.25rem 1.5rem 1.25rem 3rem;
		position: relative;
	}

	.bib-entry::before {
		content: counter(bib) '.';
		position: absolute;
		left: 1.25rem;
		top: 1.25rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--accent);
		font-weight: 600;
	}

	.bib-entry p {
		font-size: 0.925rem;
		line-height: 1.7;
		color: var(--text-muted);
		text-indent: -0.5rem;
		padding-left: 0.5rem;
	}

	.bib-link {
		display: inline-block;
		margin-top: 0.5rem;
		font-size: 0.8rem;
		font-family: var(--font-mono);
	}

	.site-footer {
		border-top: 1px solid var(--border);
		padding: 2rem 1.5rem;
		text-align: center;
		color: var(--text-muted);
		font-size: 0.85rem;
		position: relative;
		z-index: 1;
	}

	.footer-note {
		margin-top: 0.5rem;
		font-size: 0.75rem;
		opacity: 0.6;
	}
</style>
