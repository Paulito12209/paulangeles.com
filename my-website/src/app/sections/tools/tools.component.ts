/**
 * Tools Sektion Komponente
 * Zeigt alle 8 Tools mit Liquid Glass Karten
 */
import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { TranslatePipe } from '@ngx-translate/core';

/** Interface für Tool-Daten */
interface Tool {
    id: string;
    name: string;
    label: string;
    link?: string;
}

@Component({
    selector: 'app-tools',
    standalone: true,
    imports: [CardComponent, TranslatePipe],
    templateUrl: './tools.component.html',
    styleUrl: './tools.component.scss'
})
export class ToolsComponent {
    /** Alle Tools die angezeigt werden */
    readonly tools: Tool[] = [
        { id: 'raycast', name: 'Raycast', label: 'TOOL_01', link: 'https://www.raycast.com/' },
        { id: 'dia', name: 'Dia', label: 'TOOL_02', link: 'https://www.diabrowser.com/' },
        { id: 'notion', name: 'Notion', label: 'TOOL_03', link: 'https://www.notion.com/product' },
        { id: 'antigravity', name: 'Antigravity', label: 'TOOL_04', link: 'https://antigravity.google/' },
        { id: 'claude-ai', name: 'Claude AI', label: 'TOOL_05', link: 'https://claude.ai/' },
        { id: 'figma', name: 'Figma', label: 'TOOL_06', link: 'https://www.figma.com/' },
        { id: 'canva', name: 'Canva', label: 'TOOL_07', link: 'https://www.canva.com/templates' },
        { id: 'notebooklm', name: 'NotebookLM', label: 'TOOL_08', link: 'https://notebooklm.google/' }
    ];
}
