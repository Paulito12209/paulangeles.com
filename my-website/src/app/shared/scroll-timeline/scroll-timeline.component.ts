/**
 * Scroll Timeline Komponente
 * Vertikaler Scroll-Fortschrittsindikator mit animierten Knotenpunkten
 */
import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    OnDestroy,
    signal,
    ViewChildren,
    QueryList,
    AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** Interface für Timeline-Knoten */
interface TimelineNode {
    sectionId: string;
    label: string;
    isPast: boolean;
}

@Component({
    selector: 'app-scroll-timeline',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scroll-timeline.component.html',
    styleUrl: './scroll-timeline.component.scss'
})
export class ScrollTimelineComponent implements OnInit, AfterViewInit, OnDestroy {
    /** Alle Timeline-Knoten */
    nodes = signal<TimelineNode[]>([
        { sectionId: 'hero', label: 'Start', isPast: false },
        { sectionId: 'about-me', label: 'Über mich', isPast: false },
        { sectionId: 'tools', label: 'Tools', isPast: false },
        { sectionId: 'projects', label: 'Projekte', isPast: false },
        { sectionId: 'contact', label: 'Kontakt', isPast: false }
    ]);

    /** Aktiver Sektions-Index */
    activeIndex = signal<number>(0);

    /** Ob der Footer sichtbar ist (dann Timeline ausblenden) */
    isFooterVisible = signal<boolean>(false);

    /** Scroll-Fortschritt in Prozent */
    scrollProgress = signal<number>(0);

    /** Dynamischer Bottom-Offset für Timeline (um Footer zu vermeiden) */
    timelineBottomOffset = signal<number>(40);

    /** IntersectionObserver für Sektionen */
    private observer: IntersectionObserver | null = null;
    private footerObserver: IntersectionObserver | null = null;

    ngOnInit(): void {
        this.setupIntersectionObserver();
        this.setupFooterObserver();
    }

    ngAfterViewInit(): void {
        this.observeSections();
        this.observeFooter();
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
        this.footerObserver?.disconnect();
    }

    /** Aktualisiert den Scroll-Fortschritt */
    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.updateScrollProgress();
        this.checkActiveSection();
    }

    /** Prüft die aktive Sektion basierend auf Scroll-Position (für Top-Fix) */
    private checkActiveSection(): void {
        // Fix: Wenn ganz oben, immer den ersten Punkt (Hero) aktivieren
        if (window.scrollY < 100) {
            this.activeIndex.set(0);
            this.isFooterVisible.set(false);

            // Auch "isPast" Status zurücksetzen
            const currentNodes = this.nodes();
            const updatedNodes = currentNodes.map((node, i) => ({
                ...node,
                isPast: false
            }));

            // Nur aktualisieren wenn sich was geändert hat, um unnötige Cycles zu vermeiden
            if (currentNodes.some((n, i) => n.isPast !== updatedNodes[i].isPast)) {
                this.nodes.set(updatedNodes);
            }
        }
    }

    /** Berechnet den Scroll-Fortschritt */
    private updateScrollProgress(): void {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollTop = window.scrollY;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        this.scrollProgress.set(Math.min(100, Math.max(0, progress)));

        // Timeline nach oben verschieben wenn nahe am Footer
        // Footer-Höhe ist ca. 180px, Timeline startet bei 40px
        if (progress > 80) {
            // Zusätzlicher Offset: Je mehr gescrollt, desto höher die Timeline
            const extraProgress = progress - 80; // 0-20
            const footerOffset = (extraProgress / 20) * 180; // 0-180px
            this.isFooterVisible.set(false); // Nicht verstecken
            this.timelineBottomOffset.set(40 + footerOffset);
        } else {
            this.timelineBottomOffset.set(40); // Standard-Position
        }
    }

    /** Erstellt den IntersectionObserver für Sektionen */
    private setupIntersectionObserver(): void {
        const options: IntersectionObserverInit = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.onSectionVisible(entry.target.id);
                }
            });
        }, options);
    }

    /** Erstellt den Observer für den Footer */
    private setupFooterObserver(): void {
        this.footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isFooterVisible.set(entry.isIntersecting);
            });
        }, { rootMargin: '0px', threshold: 0.1 }); // Sobald 10% vom Footer da sind
    }

    /** Beobachtet den Footer */
    private observeFooter(): void {
        const footer = document.querySelector('footer');
        if (footer && this.footerObserver) {
            this.footerObserver.observe(footer);
        }
    }

    /** Beobachtet alle Sektionen */
    private observeSections(): void {
        const currentNodes = this.nodes();

        currentNodes.forEach(node => {
            const element = document.getElementById(node.sectionId);
            if (element && this.observer) {
                this.observer.observe(element);
            }
        });
    }

    /** Wird aufgerufen wenn eine Sektion sichtbar wird */
    private onSectionVisible(sectionId: string): void {
        const currentNodes = this.nodes();
        const index = currentNodes.findIndex(n => n.sectionId === sectionId);

        if (index >= 0) {
            this.activeIndex.set(index);

            // Markiere vergangene Sektionen
            const updatedNodes = currentNodes.map((node, i) => ({
                ...node,
                isPast: i < index
            }));

            this.nodes.set(updatedNodes);
        }
    }

    /** Scrollt zu einer Sektion */
    scrollToSection(sectionId: string): void {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
