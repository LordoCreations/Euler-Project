<script lang="ts">
	import { onMount } from 'svelte';
	import { navLinks } from '$lib/data/euler';

	let activeSection = $state('intro');
	let scrolled = $state(false);
	let mobileOpen = $state(false);

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 40;

			const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
			const scrollPos = window.scrollY + 120;

			for (let i = sections.length - 1; i >= 0; i--) {
				if (sections[i].offsetTop <= scrollPos) {
					activeSection = sections[i].id;
					break;
				}
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollTo(id: string) {
		mobileOpen = false;
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<nav class="nav" class:scrolled aria-label="Main navigation">
	<div class="nav-inner">
		<button class="logo" onclick={() => scrollTo('intro')}>
			<span class="logo-mark">e</span>
			<span class="logo-text">Euler</span>
		</button>

		<ul class="links" class:open={mobileOpen}>
			{#each navLinks as link}
				<li>
					<button
						class="link"
						class:active={activeSection === link.id}
						onclick={() => scrollTo(link.id)}
					>
						{link.label}
					</button>
				</li>
			{/each}
		</ul>

		<button
			class="menu-toggle no-print"
			aria-label="Toggle menu"
			aria-expanded={mobileOpen}
			onclick={() => (mobileOpen = !mobileOpen)}
		>
			<span class:open={mobileOpen}></span>
		</button>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: var(--nav-height);
		transition: background var(--transition), border-color var(--transition), backdrop-filter var(--transition);
		border-bottom: 1px solid transparent;
	}

	.nav.scrolled {
		background: rgba(6, 8, 15, 0.85);
		backdrop-filter: blur(16px);
		border-bottom-color: var(--border);
	}

	.nav-inner {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text);
		font-family: var(--font-sans);
	}

	.logo-mark {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: var(--gradient-hero);
		font-family: var(--font-mono);
		font-style: italic;
		font-weight: 700;
		font-size: 1.1rem;
		color: white;
	}

	.logo-text {
		font-weight: 700;
		font-size: 1.1rem;
		letter-spacing: -0.02em;
	}

	.links {
		display: flex;
		gap: 0.25rem;
		list-style: none;
	}

	.link {
		background: none;
		border: none;
		cursor: pointer;
		font-family: var(--font-sans);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text-muted);
		padding: 0.5rem 0.875rem;
		border-radius: var(--radius-sm);
		transition: color var(--transition), background var(--transition);
	}

	.link:hover,
	.link.active {
		color: var(--text);
		background: rgba(255, 255, 255, 0.06);
	}

	.link.active {
		color: var(--accent-bright);
	}

	.menu-toggle {
		display: none;
		background: none;
		border: none;
		cursor: pointer;
		width: 32px;
		height: 32px;
		position: relative;
	}

	.menu-toggle span,
	.menu-toggle span::before,
	.menu-toggle span::after {
		display: block;
		width: 22px;
		height: 2px;
		background: var(--text);
		border-radius: 2px;
		transition: transform var(--transition), opacity var(--transition);
	}

	.menu-toggle span {
		position: relative;
	}

	.menu-toggle span::before,
	.menu-toggle span::after {
		content: '';
		position: absolute;
		left: 0;
	}

	.menu-toggle span::before {
		top: -7px;
	}

	.menu-toggle span::after {
		top: 7px;
	}

	.menu-toggle span.open {
		background: transparent;
	}

	.menu-toggle span.open::before {
		transform: rotate(45deg) translate(5px, 5px);
	}

	.menu-toggle span.open::after {
		transform: rotate(-45deg) translate(5px, -5px);
	}

	@media (max-width: 768px) {
		.menu-toggle {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.links {
			position: fixed;
			top: var(--nav-height);
			left: 0;
			right: 0;
			flex-direction: column;
			background: rgba(6, 8, 15, 0.97);
			backdrop-filter: blur(16px);
			padding: 1rem;
			border-bottom: 1px solid var(--border);
			transform: translateY(-110%);
			opacity: 0;
			transition: transform var(--transition), opacity var(--transition);
			pointer-events: none;
		}

		.links.open {
			transform: translateY(0);
			opacity: 1;
			pointer-events: auto;
		}

		.link {
			width: 100%;
			text-align: left;
			padding: 0.75rem 1rem;
		}
	}
</style>
