/**
 * About Me Sektion Komponente
 * Persönliche Vorstellung
 */
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-about-me',
    standalone: true,
    imports: [TranslatePipe],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
    /** Scrollt zur About Me Sektion */
    scrollToSection(): void {
        const element = document.getElementById('about-me');
        if (element) {
            const offset = 80; // Navbar Höhe + Puffer
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: Math.round(elementTop - offset),
                behavior: 'smooth'
            });
        }
    }
}
