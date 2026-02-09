/**
 * Contact Sektion Komponente
 * Kontaktinformationen
 */
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [TranslatePipe],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
    /** Scrollt zur Contact Sektion */
    scrollToSection(): void {
        const element = document.getElementById('contact');
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
