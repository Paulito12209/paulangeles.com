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
        const viewportHeight = window.innerHeight;
        const centerLine = viewportHeight / 2;
        let activeId: string | null = null;

        // Wenn ganz oben
        if (window.scrollY < 100) {
            this.activeSection.set('hero');
            return;
        }

        // Center-Check Logik wie in App.ts
        for (const link of this.navLinks) {
            const element = document.getElementById(link.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= centerLine && rect.bottom >= centerLine) {
                    activeId = link.id;
                    break;
                }
            }
        }

        if (activeId) {
            this.activeSection.set(activeId);
        }
    }

    /** Scrollt zur Hero-Sektion (Logo-Klick) */
    scrollToTop(event: Event): void {
        if (this.router.url !== '/') {
            // Wenn nicht auf Startseite, lass den RouterLink arbeiten
            return;
        }
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /** Scrollt sanft zu einer Sektion mit Offset um Subheadline zu verstecken */
    scrollToSection(event: Event, anchor: string): void {
        if (this.router.url !== '/') {
            // Wenn nicht auf Startseite, lass den RouterLink arbeiten
            return;
        }

        event.preventDefault();
        const targetId = anchor.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            // Manuelle Offset-Berechnung für Home-Page Smooth Scroll
            const elementTop = element.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: elementTop,
                behavior: 'smooth'
            });
        }
    }
}
