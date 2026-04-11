import { Component, signal } from '@angular/core';
import { DressCode } from './sections/dress-code/dress-code';
import { Localizacao } from './sections/localizacao/localizacao';
import { HeroComponent } from './sections/hero/hero';
import { NossaHistoria } from './sections/nossa-historia/nossa-historia';
import { Rsvp } from './sections/rsvp/rsvp';
import { StickyNav } from './components/sticky-nav/sticky-nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DressCode, HeroComponent, Localizacao, NossaHistoria, Rsvp, StickyNav],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('convite_casamento_AR');
}
