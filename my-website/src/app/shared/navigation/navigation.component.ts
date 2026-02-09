/**
 * Navigation Komponente
 * Sticky Hauptnavigation mit Logo, Burger-Menu und Sprachwechsel
 */
import { Component, HostListener, signal, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

/** Interface für Navigationslinks */
interface NavLink {
    id: string;
    labelKey: string;
    anchor: string;
}

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [CommonModule, RouterModule, TranslateModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
    private router = inject(Router);
    translateService = inject(TranslateService);

    /** Aktuell aktiver Abschnitt */
    activeSection = signal<string>('hero');

    /** Ob die Navigation gescrollt ist (für Schatten-Effekt) */
    isScrolled = signal<boolean>(false);

    /** Burger-Menu Status */
    isMenuOpen = signal<boolean>(false);

    /** Aktuelle Sprache */
    currentLang = signal<string>('de');

    /** Ob wir auf der Impressum-Seite sind */
    isOnImpressum = signal<boolean>(false);

    /** Alle Navigationslinks */
    readonly navLinks: NavLink[] = [
        { id: 'hero', labelKey: 'nav.start', anchor: '#hero' },
        { id: 'about-me', labelKey: 'nav.aboutMe', anchor: '#about-me' },
        { id: 'tools', labelKey: 'nav.tools', anchor: '#tools' },
        { id: 'projects', labelKey: 'nav.projects', anchor: '#projects' },
        { id: 'contact', labelKey: 'nav.contact', anchor: '#contact' }
    ];

    /** Translation-Key für die aktuelle Sektion (Mobile-Anzeige) */
    activeSectionLabelKey = computed(() => {
        if (this.isOnImpressum()) {
            return 'impressum.title';
        }
        const link = this.navLinks.find(l => l.id === this.activeSection());
        return link?.labelKey || 'nav.start';
    });

    ngOnInit(): void {
        // Sprache aus localStorage laden
        const saved = localStorage.getItem('lang');
        if (saved && ['de', 'en', 'es'].includes(saved)) {
            this.translateService.use(saved);
            this.currentLang.set(saved);
        } else {
            this.translateService.use('de');
        }

        // Route-Änderungen tracken
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd)
        ).subscribe((e) => {
            const url = (e as NavigationEnd).urlAfterRedirects.split('#')[0].split('?')[0];
            this.isOnImpressum.set(url === '/impressum');
        });

        // Initialen Zustand setzen
        const initialUrl = this.router.url.split('#')[0].split('?')[0];
        this.isOnImpressum.set(initialUrl === '/impressum');
    }

    /** Aktualisiert den Scroll-Status */
    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.isScrolled.set(window.scrollY > 20);
        this.updateActiveSection();
    }

    /** Setzt die aktive Sektion basierend auf der Scroll-Position */
    private updateActiveSection(): void {
        if (this.isOnImpressum()) return;

        let activeId: string = 'hero';
        const triggerThreshold = 200;

        if (window.scrollY < 50) {
            this.activeSection.set('hero');
            return;
        }

        for (let i = this.navLinks.length - 1; i >= 0; i--) {
            const link = this.navLinks[i];
            const element = document.getElementById(link.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= triggerThreshold) {
                    activeId = link.id;
                    break;
                }
            }
        }

        this.activeSection.set(activeId);
    }

    /** Burger-Menu öffnen/schließen */
    toggleMenu(): void {
        this.isMenuOpen.update(v => !v);
        // Body-Scroll sperren wenn Menu offen
        document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
    }

    /** Schließt das Burger-Menu */
    closeMenu(): void {
        this.isMenuOpen.set(false);
        document.body.style.overflow = '';
    }

    /** Sprache wechseln */
    setLanguage(lang: string): void {
        this.translateService.use(lang);
        this.currentLang.set(lang);
        localStorage.setItem('lang', lang);
    }

    /** Scrollt zur Hero-Sektion (Logo-Klick) - funktioniert auch von Impressum */
    scrollToTop(event: Event): void {
        event.preventDefault();
        this.closeMenu();

        const url = this.router.url.split('#')[0].split('?')[0];
        if (url !== '/' && url !== '') {
            this.router.navigate(['/']).then(() => {
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
            });
            return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /** Scrollt sanft zu einer Sektion - funktioniert auch von Impressum */
    scrollToSection(event: Event, anchor: string): void {
        event.preventDefault();
        this.closeMenu();

        const targetId = anchor.replace('#', '');
        const url = this.router.url.split('#')[0].split('?')[0];

        if (url !== '/' && url !== '') {
            this.router.navigate(['/'], { fragment: targetId }).then(() => {
                setTimeout(() => this.doScrollToElement(targetId), 50);
            });
            return;
        }

        this.doScrollToElement(targetId);
    }

    /** Hilfsmethode: Scrollt zu einem Element mit Offset */
    private doScrollToElement(targetId: string): void {
        if (targetId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const offset = targetId === 'tools' ? 140 : 80;
            const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: Math.round(elementTop - offset),
                behavior: 'smooth'
            });
        }
    }
}
