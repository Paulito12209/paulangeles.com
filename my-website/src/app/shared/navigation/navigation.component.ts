/**
 * Navigation Komponente
 * Sticky Hauptnavigation mit Logo und Links zu allen Sektionen
 */
import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Interface für Navigationslinks */
interface NavLink {
    id: string;
    label: string;
    anchor: string;
}

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
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
        { id: 'contact', label: 'Kontakt', anchor: '#contact' },
        { id: 'impressum', label: 'Impressum', anchor: '#impressum' }
    ];

    /** Aktualisiert den Scroll-Status */
    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.isScrolled.set(window.scrollY > 20);
        this.updateActiveSection();
    }

    /** Setzt die aktive Sektion basierend auf der Scroll-Position */
    private updateActiveSection(): void {
        const sections = this.navLinks.map(link => link.id);

        // Wenn ganz oben, immer Hero aktiv setzen
        if (window.scrollY < 100) {
            this.activeSection.set('hero');
            return;
        }

        for (const sectionId of sections.reverse()) {
            const element = document.getElementById(sectionId);
            if (element) {
                const rect = element.getBoundingClientRect();
                // Angepasst: Trigger etwas früher/später je nach Bedarf
                if (rect.top <= 200) {
                    this.activeSection.set(sectionId);
                    break;
                }
            }
        }
    }

    /** Scrollt zur Hero-Sektion (Logo-Klick) */
    scrollToTop(event: Event): void {
        event.preventDefault();
        const element = document.getElementById('hero');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /** Scrollt sanft zu einer Sektion */
    scrollToSection(event: Event, anchor: string): void {
        event.preventDefault();
        const targetId = anchor.replace('#', '');
        const element = document.getElementById(targetId);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
