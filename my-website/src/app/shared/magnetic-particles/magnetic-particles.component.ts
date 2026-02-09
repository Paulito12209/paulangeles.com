/**
 * Magnetic Particles Component
 * Creates an animated canvas background with particles that orbit around the cursor
 * Similar to the Antigravity website effect
 */
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    size: number;
    color: string;
    angle: number;
    speed: number;
    orbitRadius: number;
}

@Component({
    selector: 'app-magnetic-particles',
    standalone: true,
    template: `<canvas #canvas class="magnetic-particles"></canvas>`,
    styles: [`
    .magnetic-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }
  `]
})
export class MagneticParticlesComponent implements AfterViewInit, OnDestroy {
    @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

    private ctx!: CanvasRenderingContext2D;
    private particles: Particle[] = [];
    private mouseX = 0;
    private mouseY = 0;
    private animationId: number = 0;
    private isBrowser: boolean;

    // Configuration
    private readonly PARTICLE_COUNT = 120;
    private readonly INFLUENCE_RADIUS = 200;
    private readonly COLORS = [
        'rgba(145, 30, 33, 0.6)',   // Primary red
        'rgba(145, 30, 33, 0.4)',
        'rgba(100, 100, 100, 0.3)', // Gray
        'rgba(80, 80, 80, 0.25)',
    ];

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngAfterViewInit(): void {
        if (!this.isBrowser) return;

        const canvas = this.canvasRef.nativeElement;
        this.ctx = canvas.getContext('2d')!;

        this.resizeCanvas();
        this.initParticles();
        this.addEventListeners();
        this.animate();
    }

    ngOnDestroy(): void {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.isBrowser) {
            window.removeEventListener('resize', this.resizeCanvas.bind(this));
            window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        }
    }

    private resizeCanvas = (): void => {
        const canvas = this.canvasRef.nativeElement;
        const parent = canvas.parentElement;
        if (parent) {
            const rect = parent.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            this.ctx.scale(dpr, dpr);
            // Re-init particles when resized
            if (this.particles.length > 0) {
                this.initParticles();
            }
        }
    };

    private initParticles(): void {
        const canvas = this.canvasRef.nativeElement;
        this.particles = [];

        for (let i = 0; i < this.PARTICLE_COUNT; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;

            this.particles.push({
                x,
                y,
                baseX: x,
                baseY: y,
                size: Math.random() * 3 + 1,
                color: this.COLORS[Math.floor(Math.random() * this.COLORS.length)],
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.01,
                orbitRadius: Math.random() * 30 + 10
            });
        }
    }

    private addEventListeners(): void {
        window.addEventListener('resize', this.resizeCanvas.bind(this));
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
    }

    private handleMouseMove = (e: MouseEvent): void => {
        const canvas = this.canvasRef.nativeElement;
        const rect = canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    };

    private animate = (): void => {
        this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);

        this.particles.forEach(particle => {
            // Calculate distance to mouse
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.INFLUENCE_RADIUS && this.mouseX !== 0) {
                // Magnetic orbit effect: particles circle around the cursor
                particle.angle += particle.speed;
                const targetX = this.mouseX + Math.cos(particle.angle) * particle.orbitRadius;
                const targetY = this.mouseY + Math.sin(particle.angle) * particle.orbitRadius;

                // Smooth interpolation towards orbit position
                const strength = 1 - (distance / this.INFLUENCE_RADIUS);
                particle.x += (targetX - particle.x) * 0.05 * strength;
                particle.y += (targetY - particle.y) * 0.05 * strength;
            } else {
                // Return to base position slowly
                particle.x += (particle.baseX - particle.x) * 0.02;
                particle.y += (particle.baseY - particle.y) * 0.02;
            }

            // Draw particle as small line/splinter
            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.angle);

            this.ctx.beginPath();
            this.ctx.moveTo(-particle.size, 0);
            this.ctx.lineTo(particle.size, 0);
            this.ctx.strokeStyle = particle.color;
            this.ctx.lineWidth = 1.5;
            this.ctx.lineCap = 'round';
            this.ctx.stroke();

            this.ctx.restore();
        });

        this.animationId = requestAnimationFrame(this.animate);
    };
}
