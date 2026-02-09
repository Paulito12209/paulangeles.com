/**
 * Footer Komponente
 * Footer mit Logo und Impressum-Link
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    private router = inject(Router);
    /** Aktuelles Jahr für Copyright */
    currentYear = new Date().getFullYear();

    scrollToTop(event: Event): void {
        const url = this.router.url.split('#')[0];
        if (url !== '/' && url !== '') {
            return;
        }
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
