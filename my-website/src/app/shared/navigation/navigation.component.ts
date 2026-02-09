/**
 * Navigation Komponente
 * Sticky Hauptnavigation mit Logo und Links zu allen Sektionen
 */
import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

/** Interface für Navigationslinks */
interface NavLink {
    id: string;
    label: string;
    anchor: string;
}

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
    private router = inject(Router);

    /** Aktuell aktiver Abschnitt */
    activeSection = signal<string>('hero');

    /** Ob die Navigation gescrollt ist (für Schatten-Effekt) */
    isScrolled = signal<boolean>(false);

    /** Alle Navigationslinks */
    readonly navLinks: NavLink[] = [
        { id: 'hero', label: 'Start', anchor: '#hero' },
        { id: 'about-me', label: 'Über mich', anchor: '#about-me' },
        { id: 'tools', label: 'Tools', anchor: '#tools' },
        { id: 'projects', label: 'Projekte', anchor: '#projects' },
        { id: 'contact', label: 'Kontakt', anchor: '#contact' }
    ];

    /** Aktualisiert den Scroll-Status */
    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.isScrolled.set(window.scrollY > 20);
        this.updateActiveSection();
    }

    /** Setzt die aktive Sektion basierend auf der Scroll-Position - Sync mit App-Logik */
    private updateActiveSection(): void {
        let activeId: string = 'hero'; // Standardmäßig auf Start

        // Wir prüfen, welcher Link-Anker (H2) gerade der Navbar am am nächsten ist.
        // Die Trigger-Schwelle muss groß genug sein (200px), um auch Sektionen mit 
        // großem Offset (Tools = 140px) sicher zu erfassen.
        const triggerThreshold = 200;

        // Wenn wir ganz oben sind, bleiben wir bei Hero
        if (window.scrollY < 50) {
            this.activeSection.set('hero');
            return;
        }

        // Wir gehen die Sektionen von unten nach oben durch
        for (let i = this.navLinks.length - 1; i >= 0; i--) {
            const link = this.navLinks[i];
            const element = document.getElementById(link.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                // Die erste Sektion von unten, die den Triggerpunkt unterschritten hat, gewinnt
                if (rect.top <= triggerThreshold) {
                    activeId = link.id;
                    break;
                }
            }
        }

        this.activeSection.set(activeId);
    }

    /** Scrollt zur Hero-Sektion (Logo-Klick) */
    scrollToTop(event: Event): void {
        const url = this.router.url.split('#')[0];
        if (url !== '/' && url !== '') {
            return;
        }
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /** Scrollt sanft zu einer Sektion mit Offset um Subheadline zu verstecken */
    scrollToSection(event: Event, anchor: string): void {
        const url = this.router.url.split('#')[0];
        if (url !== '/' && url !== '') {
            return;
        }

        event.preventDefault();
        const targetId = anchor.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Wenn es die Hero-Sektion ist (Start), scrollen wir ganz nach oben
            if (targetId === 'hero') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            // Offset Berechnung: 
            // Normal (Navbar 60px + Gap 20px) = 80px
            // Tools (Navbar 60px + Sub-Nav ~48px + Gap 32px) = 140px
            const offset = targetId === 'tools' ? 140 : 80;
            const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: Math.round(elementTop - offset),
                behavior: 'smooth'
            });
        }
    }
}
