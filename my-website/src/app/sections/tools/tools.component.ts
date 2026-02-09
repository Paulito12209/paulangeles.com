/**
 * Tools Sektion Komponente
 * Zeigt alle 8 Tools mit Liquid Glass Karten
 */
import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';

/** Interface für Tool-Daten */
interface Tool {
    id: string;
    name: string;
    label: string;
    description: string;
}

@Component({
    selector: 'app-tools',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './tools.component.html',
    styleUrl: './tools.component.scss'
})
export class ToolsComponent {
    /** Alle Tools die angezeigt werden */
    readonly tools: Tool[] = [
        {
            id: 'raycast',
            name: 'Raycast',
            label: 'TOOL_01',
            description: 'Ein leistungsstarker Launcher für macOS, der meine Produktivität mit schnellen Befehlen, Snippets und Erweiterungen steigert.'
        },
        {
            id: 'dia',
            name: 'Dia',
            label: 'TOOL_02',
            description: 'Ein moderner Browser mit KI-Funktionen, der mir hilft, effizienter im Web zu arbeiten und zu recherchieren.'
        },
        {
            id: 'notion',
            name: 'Notion',
            label: 'TOOL_03',
            description: 'Mein zentrales Tool für Notizen, Projekte und Wissensmmanagement — alles an einem Ort organisiert.'
        },
        {
            id: 'antigravity',
            name: 'Antigravity',
            label: 'TOOL_04',
            description: 'Ein KI-gestützter Coding-Assistent, der mir bei der Entwicklung von Projekten hilft und meinen Workflow beschleunigt.'
        },
        {
            id: 'claude-ai',
            name: 'Claude AI',
            label: 'TOOL_05',
            description: 'Ein fortschrittlicher KI-Assistent von Anthropic, der mir bei Recherche, Texten und komplexen Fragen zur Seite steht.'
        },
        {
            id: 'figma',
            name: 'Figma',
            label: 'TOOL_06',
            description: 'Das Design-Tool meiner Wahl für UI/UX-Arbeit, Prototyping und kollaboratives Design.'
        },
        {
            id: 'canva',
            name: 'Canva',
            label: 'TOOL_07',
            description: 'Perfekt für schnelle Grafiken, Social-Media-Posts und Präsentationen mit professionellem Look.'
        },
        {
            id: 'notebooklm',
            name: 'NotebookLM',
            label: 'TOOL_08',
            description: 'Ein KI-gestütztes Notizbuch von Google, das mir hilft, komplexe Dokumente zu verstehen und zu analysieren.'
        }
    ];
}
