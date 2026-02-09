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
        { sectionId: 'contact', label: 'Kontakt', isPast: false },
        { sectionId: 'impressum', label: 'Impressum', isPast: false }
    ]);

    /** Aktiver Sektions-Index */
    activeIndex = signal<number>(0);

    /** Scroll-Fortschritt in Prozent */
    scrollProgress = signal<number>(0);

    /** IntersectionObserver für Sektionen */
    private observer: IntersectionObserver | null = null;

    ngOnInit(): void {
        this.setupIntersectionObserver();
    }

    ngAfterViewInit(): void {
        this.observeSections();
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
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
    }

    /** Erstellt den IntersectionObserver */
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
