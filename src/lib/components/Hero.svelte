<script lang="ts">
	import { onMount } from 'svelte';
	import { hero } from '$lib/data/euler';

	let heroEl: HTMLElement;
	let visible = $state(false);

	onMount(async () => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) {
			visible = true;
			return;
		}

		const { gsap } = await import('gsap');
		visible = true;

		gsap.from(heroEl.querySelectorAll('[data-animate]'), {
			y: 40,
			opacity: 0,
			duration: 1,
			stagger: 0.15,
			ease: 'power3.out',
			delay: 0.2
		});

		gsap.to(heroEl.querySelector('.portrait-glow'), {
			scale: 1.08,
			opacity: 0.6,
			duration: 3,
			repeat: -1,
			yoyo: true,
			ease: 'sine.inOut'
		});
	});
</script>

<section id="intro" class="hero" bind:this={heroEl}>
	<div class="hero-content">
		<div class="hero-text">
			<p class="eyebrow" data-animate>{hero.years}</p>
			<h1 class="title" data-animate>
				<span class="gradient-text">{hero.name}</span>
			</h1>
			<p class="tagline" data-animate>{hero.tagline}</p>
			<p class="intro" data-animate>{hero.intro}</p>
		</div>

		<div class="hero-visual" data-animate>
			<div class="portrait-wrap">
				<div class="portrait-glow"></div>
				<img src={hero.portrait} alt={hero.portraitAlt} class="portrait" width="440" height="520" />
			</div>
		</div>
	</div>

	<button
		class="scroll-indicator no-print"
		onclick={() => document.getElementById('who')?.scrollIntoView({ behavior: 'smooth' })}
		aria-label="Scroll to content"
	>
		<span class="scroll-line"></span>
		<span class="scroll-text">Explore</span>
	</button>
</section>

<style>
	.hero {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-top: var(--nav-height);
		padding-bottom: 4rem;
		position: relative;
		z-index: 1;
	}

	.hero-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1.5rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 4rem;
		align-items: center;
	}

	.eyebrow {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.title {
		font-size: clamp(2.75rem, 7vw, 4.5rem);
		font-weight: 800;
		line-height: 1.05;
		letter-spacing: -0.03em;
		margin-bottom: 0.75rem;
	}

	.tagline {
		font-size: 1.25rem;
		color: var(--text-muted);
		margin-bottom: 1.5rem;
		font-weight: 500;
	}

	.intro {
		font-size: 1.05rem;
		color: var(--text-muted);
		line-height: 1.75;
		max-width: 540px;
	}

	.hero-visual {
		display: flex;
		justify-content: center;
	}

	.portrait-wrap {
		position: relative;
	}

	.portrait-glow {
		position: absolute;
		inset: -20%;
		background: radial-gradient(circle, rgba(101, 173, 241, 0.35), rgba(167, 139, 250, 0.15), transparent 70%);
		border-radius: 50%;
		z-index: 0;
	}

	.portrait {
		position: relative;
		z-index: 1;
		border-radius: var(--radius);
		border: 1px solid var(--border);
		box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		animation: bob 2s ease-in-out infinite;
	}

	.scroll-line {
		width: 1px;
		height: 40px;
		background: linear-gradient(to bottom, var(--accent), transparent);
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateX(-50%) translateY(0);
		}
		50% {
			transform: translateX(-50%) translateY(8px);
		}
	}

	@media (max-width: 900px) {
		.hero-content {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.intro {
			max-width: none;
		}

		.hero-visual {
			order: -1;
		}

		.portrait {
			max-width: 280px;
			margin: 0 auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-indicator {
			animation: none;
		}
	}
</style>
