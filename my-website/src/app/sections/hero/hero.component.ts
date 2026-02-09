/**
 * Hero Sektion Komponente
 * Begrüßungsbereich mit Work-in-Progress Hinweis
 */
import { Component } from '@angular/core';
import { MagneticParticlesComponent } from '../../shared/magnetic-particles/magnetic-particles.component';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [MagneticParticlesComponent],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent {

    /** Scrollt zur nächsten Sektion (About Me) */
    scrollToNextSection(): void {
        const element = document.getElementById('about-me');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
