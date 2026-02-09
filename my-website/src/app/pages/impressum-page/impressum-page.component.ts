/**
 * Impressum Page Component
 * Separate page for legal information
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-impressum-page',
    standalone: true,
    imports: [RouterLink],
    template: `
    <div class="impressum-page">
        <div class="impressum-page__container">
            <!-- Back Link -->
            <a routerLink="/" class="impressum-page__back">
                ← Zurück zur Startseite
            </a>

            <!-- Content -->
            <!-- Label entfernt -->
            <h1 class="impressum-page__title">Impressum</h1>

            <div class="impressum-page__content">
                <!-- Angaben gemäß § 5 TMG -->
                <div class="impressum-page__block">
                    <h2 class="impressum-page__heading">Angaben gemäß § 5 TMG</h2>
                    <address class="impressum-page__address">
                        <strong>Paul Angeles Chaquire</strong><br>
                        c/o Online-Impressum.de #5610<br>
                        Europaring 90<br>
                        53757 Sankt Augustin
                    </address>
                </div>

                <!-- Kontakt -->
                <div class="impressum-page__block">
                    <h2 class="impressum-page__heading">Kontakt</h2>
                    <p>
                        E-Mail: <a href="mailto:kontakt@paulangeles.com">kontakt&#64;paulangeles.com</a><br>
                        Telefon: +49 (0)162 6526358
                    </p>
                </div>
            </div>
        </div>
    </div>
    `,
    styles: [`
        .impressum-page {
            min-height: 100vh;
            background: #FFFFFF;
            padding: 8rem 0 4rem;
        }

        .impressum-page__container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .impressum-page__back {
            display: inline-block;
            margin-bottom: 2rem;
            color: var(--color-primary);
            text-decoration: none;
            font-weight: 500;

            &:hover {
                text-decoration: underline;
            }
        }

        .impressum-page__label {
            display: block;
            margin-bottom: 1rem;
            color: var(--color-muted);
        }

        .impressum-page__title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 3rem;
        }

        .impressum-page__block {
            margin-bottom: 2rem;
        }

        .impressum-page__heading {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
        }

        .impressum-page__address {
            font-style: normal;
            line-height: 1.8;
        }

        a {
            color: var(--color-primary);
        }
    `]
})
export class ImpressumPageComponent { }
