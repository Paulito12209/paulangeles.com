/**
 * Card Komponente
 * Wiederverwendbare Karte mit Liquid Glass Effekt
 */
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
    /** Titel der Karte */
    @Input() title = '';

    /** Optionales technisches Label (z.B. "TOOL_01") */
    @Input() label = '';

    /** Ob das Externe-Link-Icon angezeigt werden soll */
    @Input() showExternalIcon = false;

    /** Optionaler Link für das Icon */
    @Input() externalLink = '';
}
