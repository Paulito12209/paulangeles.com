/**
 * Projects Sektion Komponente
 * Zeigt die 3 Projekte mit Status-Hinweis
 */
import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';

/** Interface für Projekt-Daten */
interface Project {
    id: string;
    name: string;
    label: string;
    description: string;
    status: string;
}

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CardComponent],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
    /** Alle Projekte */
    readonly projects: Project[] = [
        {
            id: 'xool',
            name: 'Xool',
            label: 'PROJEKT_01',
            description: 'Eine innovative Web-App, die Lernprozesse vereinfacht und personalisiertes Lernen ermöglicht.',
            status: 'In Entwicklung'
        },
        {
            id: 'parabook',
            name: 'ParaBook',
            label: 'PROJEKT_02',
            description: 'Ein digitales Notizbuch, das auf dem PARA-System basiert und Wissensmanagement vereinfacht.',
            status: 'In Entwicklung'
        },
        {
            id: 'notizapp',
            name: 'NotizApp',
            label: 'PROJEKT_03',
            description: 'Eine minimalistische Notiz-Anwendung mit Fokus auf Einfachheit und schnelle Erfassung.',
            status: 'In Entwicklung'
        }
    ];
}
