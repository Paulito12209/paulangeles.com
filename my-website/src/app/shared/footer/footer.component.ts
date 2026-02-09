/**
 * Footer Komponente
 * Footer mit Logo und Impressum-Link
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    /** Aktuelles Jahr für Copyright */
    currentYear = new Date().getFullYear();

    /** Scrollt zur Hero-Sektion (Logo-Klick) */
    scrollToTop(event: Event): void {
        event.preventDefault();
        const element = document.getElementById('hero');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /** Scrollt zum Impressum */
    scrollToImpressum(event: Event): void {
        event.preventDefault();
        const element = document.getElementById('impressum');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
