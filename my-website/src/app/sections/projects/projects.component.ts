/**
 * Projects Sektion Komponente
 * Zeigt die 3 Projekte mit Status-Hinweis
 */
import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { TranslatePipe } from '@ngx-translate/core';

/** Interface für Projekt-Daten */
interface Project {
    id: string;
    name: string;
    label: string;
    statusKey: string;
    link?: string;
    github?: string;
}

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [CardComponent, TranslatePipe],
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
            statusKey: 'inDevelopment'
        },
        {
            id: 'parabook',
            name: 'ParaBook',
            label: 'PROJEKT_02',
            statusKey: 'inDevelopment',
            github: 'https://github.com/Paulito12209/ParaBook'
        },
        {
            id: 'notizapp',
            name: 'NotizApp',
            label: 'PROJEKT_03',
            statusKey: 'betaVersion',
            link: 'https://paulangeles.com/projects/notiz-app/',
            github: 'https://github.com/Paulito12209/Paul-s-Notiz-App'
        }
    ];

    /** Scrollt zur Projects Sektion */
    scrollToSection(): void {
        const element = document.getElementById('projects');
        if (element) {
            const offset = 80;
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: Math.round(elementTop - offset),
                behavior: 'smooth'
            });
        }
    }
}
