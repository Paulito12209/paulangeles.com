/**
 * Haupt-App Komponente
 * Integriert alle Sektionen und Shared-Komponenten
 */
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Shared Komponenten
import { DotGridComponent } from './shared/dot-grid/dot-grid.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Router
    RouterOutlet,
    // Shared
    DotGridComponent,
    NavigationComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  /** Seitentitel */
  protected readonly title = 'Paul Angeles Chaquire - Portfolio';
}
