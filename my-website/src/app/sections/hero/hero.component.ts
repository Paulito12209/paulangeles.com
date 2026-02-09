/**
 * Hero Sektion Komponente
 * Begrüßungsbereich mit Work-in-Progress Hinweis
 */
import { Component } from '@angular/core';
import { MagneticParticlesComponent } from '../../shared/magnetic-particles/magnetic-particles.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [MagneticParticlesComponent, TranslatePipe],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent {

    /** Scrollt zur nächsten Sektion (About Me) mit H2-Alignment */
    scrollToNextSection(): void {
        const targetElement = document.getElementById('about-me');
        if (targetElement) {
            // Offset: Navbar Höhe (60px) + gewünschter Abstand zur H2 (20px) = 80px
            const offset = 80;
            const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: Math.round(elementTop - offset),
                behavior: 'smooth'
            });
        }
    }
}
