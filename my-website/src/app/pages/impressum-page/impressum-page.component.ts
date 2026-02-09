/**
 * Impressum Page Component
 * Separate page for legal information
 */
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-impressum-page',
    standalone: true,
    imports: [RouterLink, TranslatePipe],
    template: `
    <div class="impressum-page">
        <div class="impressum-page__container">
            <!-- Back Link (oben) -->
            <a routerLink="/" class="impressum-page__back">
                {{ 'impressum.back' | translate }}
            </a>

            <h1 class="impressum-page__title">{{ 'impressum.title' | translate }}</h1>

            <div class="impressum-page__content">
                <!-- Angaben gemäß § 5 TMG -->
                <div class="impressum-page__block">
                    <h2 class="impressum-page__heading">{{ 'impressum.tmgTitle' | translate }}</h2>
                    <address class="impressum-page__address">
                        <strong>Paul Angeles Chaquire</strong><br>
                        c/o Online-Impressum.de #5610<br>
                        Europaring 90<br>
                        53757 Sankt Augustin
                    </address>
                </div>

                <!-- Kontakt -->
                <div class="impressum-page__block">
                    <h2 class="impressum-page__heading">{{ 'impressum.contactTitle' | translate }}</h2>
                    <p>
                        E-Mail: <a href="mailto:kontakt@paulangeles.com">kontakt&#64;paulangeles.com</a><br>
                        Telefon: +49 (0)162 6526358
                    </p>
                </div>
            </div>

            <!-- Back Link (unten) -->
            <a routerLink="/" class="impressum-page__back impressum-page__back--bottom">
                {{ 'impressum.back' | translate }}
            </a>
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

        .impressum-page__back--bottom {
            margin-top: 3rem;
            margin-bottom: 0;
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
export class ImpressumPageComponent implements OnInit {
    ngOnInit(): void {
        window.scrollTo({ top: 0 });
    }
}
