<script lang="ts">
	import { onMount } from 'svelte';

	let canvasEl: HTMLCanvasElement;

	// Particle definition declared outside onMount to avoid nested class warnings and improve performance
	class Particle {
		x: number;
		y: number;
		size: number;
		speedX: number;
		speedY: number;
		opacity: number;
		pulseSpeed: number;
		color: string;

		constructor(width: number, height: number) {
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.size = Math.random() * 2 + 0.6; // tiny glowing dust
			this.speedX = Math.random() * 0.2 - 0.1;
			this.speedY = Math.random() * -0.3 - 0.1; // slow rising drift
			this.opacity = Math.random() * 0.4 + 0.15;
			this.pulseSpeed = Math.random() * 0.015 + 0.005;
			this.color = Math.random() > 0.4 ? '#dac5b3' : '#75583a'; // warm theme matches
		}

		update(width: number, height: number, mouse: { x: number; y: number }) {
			this.x += this.speedX;
			this.y += this.speedY;
			this.opacity += this.pulseSpeed;

			if (this.opacity > 0.55 || this.opacity < 0.15) {
				this.pulseSpeed = -this.pulseSpeed;
			}

			// Soft repulsion from cursor
			const dx = this.x - mouse.x;
			const dy = this.y - mouse.y;
			const dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < 130) {
				const force = (130 - dist) / 130;
				// gently push particle away
				this.x += (dx / dist) * force * 1.6;
				this.y += (dy / dist) * force * 1.6;
			}

			// Recycle particles when they exit the top boundary
			if (this.y < -10) {
				this.y = height + 10;
				this.x = Math.random() * width;
				this.opacity = Math.random() * 0.4 + 0.15;
			}
			if (this.x < -10) this.x = width + 10;
			if (this.x > width + 10) this.x = -10;
		}

		draw(ctx: CanvasRenderingContext2D) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fillStyle = this.color;
			ctx.globalAlpha = Math.max(0, Math.min(1, this.opacity));
			ctx.shadowBlur = 5;
			ctx.shadowColor = this.color;
			ctx.fill();
		}
	}

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		let animationId: number;
		let width = (canvasEl.width = window.innerWidth);
		let height = (canvasEl.height = window.innerHeight);

		// Handle window resizing
		const handleResize = () => {
			if (!canvasEl) return;
			width = canvasEl.width = window.innerWidth;
			height = canvasEl.height = window.innerHeight;
		};
		window.addEventListener('resize', handleResize);

		// Initialize 55 particles for optimal performance and subtle effect
		const particles: Particle[] = Array.from({ length: 55 }, () => new Particle(width, height));

		// Track mouse position with client margins
		const mouse = { x: -2000, y: -2000 };
		const handleMouseMove = (e: MouseEvent) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};
		window.addEventListener('mousemove', handleMouseMove);

		// Animation frame loop
		function animate() {
			if (!ctx) return;
			ctx.clearRect(0, 0, width, height);
			ctx.shadowBlur = 0; // reset for rendering speed

			for (const p of particles) {
				p.update(width, height, mouse);
				p.draw(ctx);
			}

			animationId = requestAnimationFrame(animate);
		}

		animate();

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<canvas bind:this={canvasEl} class="ambient-canvas"></canvas>

<style>
	.ambient-canvas {
		position: fixed;
		inset: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 0;
		opacity: 0.75;
	}
</style>
