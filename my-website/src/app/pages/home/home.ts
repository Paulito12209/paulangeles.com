import { Component, AfterViewInit, OnDestroy, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Sektions-Komponenten
import { HeroComponent } from '../../sections/hero/hero.component';
import { AboutMeComponent } from '../../sections/about-me/about-me.component';
import { ToolsComponent } from '../../sections/tools/tools.component';
import { ProjectsComponent } from '../../sections/projects/projects.component';
import { ContactComponent } from '../../sections/contact/contact.component';
import { SubNavigationComponent } from '../../shared/sub-navigation/sub-navigation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutMeComponent,
    ToolsComponent,
    ProjectsComponent,
    ContactComponent,
    SubNavigationComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupSectionObserver();
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  /**
   * Richtet den IntersectionObserver ein, um den "Focus Effect" zu steuern.
   * Aktive Sections werden hell (opacity 1), inaktive grau/transparent.
   */
  private setupSectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      const viewportHeight = window.innerHeight;
      const centerLine = viewportHeight / 2;

      // Alle Sections durchgehen und die finden, die die Mitte schneidet
      const sections = document.querySelectorAll('section');
      let activeSectionId: string | null = null;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Wenn Section die Mitte beinhaltet
        if (rect.top <= centerLine && rect.bottom >= centerLine) {
          activeSectionId = section.id || (section.classList.contains('hero') ? 'hero' : null);
        }
      });

      // Aktiv-Klasse setzen
      sections.forEach(section => {
        const id = section.id || (section.classList.contains('hero') ? 'hero' : null);
        if (id === activeSectionId) {
          section.classList.add('section--active');
        } else {
          section.classList.remove('section--active');
        }
      });
    }, {
      root: null,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    });

    // Initialer Check
    setTimeout(() => {
      const sections = this.elementRef.nativeElement.querySelectorAll('section');
      sections.forEach((section: HTMLElement) => {
        this.observer?.observe(section);
      });
      // Hero default active
      const hero = this.elementRef.nativeElement.querySelector('.hero');
      if (hero) hero.classList.add('section--active');
    }, 100);
  }
}
