/**
 * Sub-Navigation Komponente
 * Sekundäre Navigation für die Tools-Sektion mit horizontalem Scroll
 */
import {
    Component,
    ElementRef,
    HostListener,
    ViewChild,
    signal,
    AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/** Interface für Tool-Links */
interface ToolLink {
    id: string;
    name: string;
}

@Component({
    selector: 'app-sub-navigation',
    standalone: true,
    imports: [CommonModule, TranslatePipe],
    templateUrl: './sub-navigation.component.html',
    styleUrl: './sub-navigation.component.scss'
})
export class SubNavigationComponent implements AfterViewInit {
    /** Referenz zum scrollbaren Container */
    @ViewChild('toolsList') toolsListRef!: ElementRef<HTMLElement>;

    /** Ob die Sub-Navigation sichtbar ist */
    isVisible = signal<boolean>(false);

    /** Aktives Tool */
    activeTool = signal<string>('');

    /** Breite eines einzelnen Tool-Links für Scroll-Berechnung */
    private toolWidth = 120;

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
        // Wir tracken die gesamte Sektion, nicht nur die H2-Überschrift
        const toolsSection = document.getElementById('tools-section');

        if (toolsSection) {
            const rect = toolsSection.getBoundingClientRect();
            const navHeight = 60; // Höhe der Hauptnavigation

            // Sichtbar wenn die Tools-Sektion (Container) den oberen Navigationsbereich erreicht
            // und solange sie noch im Viewport ist.
            const isInView = rect.top <= navHeight + 100 && rect.bottom >= navHeight;
            this.isVisible.set(isInView);
        }
    }

    /** Aktualisiert das aktive Tool basierend auf Scroll-Position */
    private updateActiveToolOnScroll(): void {
        for (const tool of [...this.tools].reverse()) {
            const element = document.getElementById(`tool-${tool.id}`);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 200) {
                    this.activeTool.set(tool.id);
                    break;
                }
            }
        }
    }

    /** Scrollt zu einem Tool und verschiebt die horizontale Scroll-Position */
    scrollToTool(event: Event, toolId: string): void {
        event.preventDefault();

        const element = document.getElementById(`tool-${toolId}`);
        if (element) {
            // Kombinierter Offset für Tools: Navbar (60) + Sub-Nav (48) + Puffer (32) = 140px
            const offset = 140;
            const elementTop = element.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
                top: Math.round(elementTop - offset),
                behavior: 'smooth'
            });
        }

        // Horizontalen Scroll der Sub-Navigation anpassen
        this.scrollSubNav(toolId);
        this.activeTool.set(toolId);
    }

    /** Scrollt die Sub-Navigation horizontal */
    private scrollSubNav(toolId: string): void {
        const index = this.tools.findIndex(t => t.id === toolId);
        const container = this.toolsListRef?.nativeElement;

        if (container && index >= 0) {
            // Zeige das nächste Tool nach dem angeklickten
            const scrollPosition = Math.max(0, (index - 1) * this.toolWidth);
            container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
    }
}
