/**
 * Footer Komponente
 * Footer mit Logo und Impressum-Link
 */
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterLink, TranslatePipe],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    private router = inject(Router);
    /** Aktuelles Jahr für Copyright */
    currentYear = new Date().getFullYear();

    scrollToTop(event: Event): void {
        event.preventDefault();
        const url = this.router.url.split('#')[0].split('?')[0];
        if (url !== '/' && url !== '') {
            this.router.navigate(['/']).then(() => {
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
            });
            return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
