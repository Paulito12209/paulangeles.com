/**
 * Haupt-App Komponente
 * Integriert alle Sektionen und Shared-Komponenten
 */
import { Component } from '@angular/core';

// Shared Komponenten
import { DotGridComponent } from './shared/dot-grid/dot-grid.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { SubNavigationComponent } from './shared/sub-navigation/sub-navigation.component';
import { ScrollTimelineComponent } from './shared/scroll-timeline/scroll-timeline.component';
import { FooterComponent } from './shared/footer/footer.component';

// Sektions-Komponenten
import { HeroComponent } from './sections/hero/hero.component';
import { AboutMeComponent } from './sections/about-me/about-me.component';
import { ToolsComponent } from './sections/tools/tools.component';
import { ProjectsComponent } from './sections/projects/projects.component';
import { ContactComponent } from './sections/contact/contact.component';
import { ImpressumComponent } from './sections/impressum/impressum.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // Shared
    DotGridComponent,
    NavigationComponent,
    SubNavigationComponent,
    ScrollTimelineComponent,
    FooterComponent,
    // Sektionen
    HeroComponent,
    AboutMeComponent,
    ToolsComponent,
    ProjectsComponent,
    ContactComponent,
    ImpressumComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  /** Seitentitel */
  protected readonly title = 'Paul Angeles Chaquire - Portfolio';
}
