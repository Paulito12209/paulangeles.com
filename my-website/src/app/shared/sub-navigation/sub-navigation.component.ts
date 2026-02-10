/**
 * Sub-Navigation Komponente
 * Sekundäre Navigation für die Tools-Sektion mit horizontalem Scroll
 */
import {
    Component,
    ElementRef,
    HostListener,
    ViewChild,
    ViewChildren,
    QueryList,
    signal,
    effect,
    AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

/** Interface für Tool-Links */
interface ToolLink {
    id: string;
    name: string;
}

@Component({
    selector: 'app-sub-navigation',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './sub-navigation.component.html',
    styleUrl: './sub-navigation.component.scss'
})
export class SubNavigationComponent implements AfterViewInit {
    /** Referenz zum scrollbaren Container */
    @ViewChild('toolsList') toolsListRef!: ElementRef<HTMLElement>;

    /** Referenzen zu den einzelnen Tool-Items */
    @ViewChildren('toolItem') toolItems!: QueryList<ElementRef<HTMLElement>>;

    /** Ob die Sub-Navigation sichtbar ist */
    isVisible = signal<boolean>(false);

    /** Aktives Tool */
    activeTool = signal<string>('');

    /** Alle Tools */
    readonly tools: ToolLink[] = [
        { id: 'raycast', name: 'Raycast' },
        { id: 'dia', name: 'Dia' },
        { id: 'notion', name: 'Notion' },
        { id: 'antigravity', name: 'Antigravity' },
        { id: 'claude-ai', name: 'Claude AI' },
        { id: 'figma', name: 'Figma' },
        { id: 'canva', name: 'Canva' },
        { id: 'notebooklm', name: 'NotebookLM' }
    ];

    constructor() {
        // Reagiere auf Änderungen des aktiven Tools und scrolle das Menü
        effect(() => {
            const currentActive = this.activeTool();
            if (currentActive) {
                // Kurze Verzögerung, um sicherzustellen, dass View aktualisiert ist (falls nötig)
                // In diesem Fall meist nicht, aber sicherheitshalber bei Signal-Updates hilfreich
                setTimeout(() => this.scrollSubNav(currentActive), 0);
            }
        });
    }

    ngAfterViewInit(): void {
        this.updateActiveToolOnScroll();
    }

    /** Prüft ob die Tools-Sektion sichtbar ist */
    @HostListener('window:scroll')
    onWindowScroll(): void {
        this.checkVisibility();
        this.updateActiveToolOnScroll();
    }

    /** Aktualisiert die Sichtbarkeit der Sub-Navigation */
    private checkVisibility(): void {
        const toolsSection = document.getElementById('tools-section');

        if (toolsSection) {
            const rect = toolsSection.getBoundingClientRect();
            const navHeight = 60;

            const isInView = rect.top <= navHeight + 100 && rect.bottom >= navHeight;
            this.isVisible.set(isInView);
        }
    }

    /** Aktualisiert das aktive Tool basierend auf Scroll-Position */
    private updateActiveToolOnScroll(): void {
        const offset = 150; // Header (60) + SubNav (so 50) + Puffer
        let currentActiveId = this.tools[0].id; // Default erster

        for (const tool of this.tools) {
            const element = document.getElementById(`tool-${tool.id}`);
            if (element) {
                const rect = element.getBoundingClientRect();
                // Wenn das Element oben den Offset passiert hat (oder knapp davor ist)
                // d.h. der obere Rand ist kleiner als unser Trigger-Punkt
                if (rect.top <= offset) {
                    currentActiveId = tool.id;
                } else {
                    // Da wir vorwärts iterieren: Sobald eines > offset ist, sind alle folgenden auch > offset (da sie weiter unten sind).
                    // Also können wir abbrechen. Das letzte, das <= offset war, ist das aktive.
                    break;
                }
            }
        }

        if (this.activeTool() !== currentActiveId) {
            this.activeTool.set(currentActiveId);
        }
    }

    /** Scrollt zu einem Tool und setzt aktiv */
    scrollToTool(event: Event, toolId: string): void {
        event.preventDefault();

        const element = document.getElementById(`tool-${toolId}`);
        if (element) {
            const offset = 126;
            const elementTop = element.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: Math.round(elementTop - offset),
                behavior: 'smooth'
            });
        }

        // Das Setzen von activeTool löst den effect aus und scrollt das Menü
        this.activeTool.set(toolId);
    }

    /** Scrollt die Sub-Navigation horizontal zum aktiven Element */
    private scrollSubNav(toolId: string): void {
        const container = this.toolsListRef?.nativeElement;
        if (!container || !this.toolItems) return;

        const index = this.tools.findIndex(t => t.id === toolId);
        const items = this.toolItems.toArray();

        if (index >= 0 && items[index]) {
            const itemElement = items[index].nativeElement;

            // Berechne die Position, um das Element zentriert oder sichtbar zu machen
            // Hier: Wir scrollen so, dass das Element linksbündig mit etwas Padding ist
            // Berechne die Position relativ zum Container (Viewport-basiert ist robuster)
            const containerRect = container.getBoundingClientRect();
            const itemRect = itemElement.getBoundingClientRect();

            // Die aktuelle Position des Items relativ zum Container-Start
            const relativeLeft = itemRect.left - containerRect.left;

            // Addiere dies zum aktuellen scrollLeft, um die absolute Scroll-Position zu erhalten
            let scrollLeft = container.scrollLeft + relativeLeft;

            // Grenzen beachten
            scrollLeft = Math.max(0, scrollLeft);

            container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
    }
}
