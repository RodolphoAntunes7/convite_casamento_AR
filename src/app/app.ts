import { Component, ElementRef, ViewChild, signal, afterNextRender, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

// Importação das seções (Ajuste os caminhos conforme sua pasta)
import { HeroComponent } from './sections/hero/hero';
import { NossaHistoria } from './sections/nossa-historia/nossa-historia';
import { Localizacao } from './sections/localizacao/localizacao';
import { DressCode } from './sections/dress-code/dress-code';
import { Rsvp } from './sections/rsvp/rsvp';
import { StickyNav } from './components/sticky-nav/sticky-nav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgComponentOutlet, 
    StickyNav
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Referências para os gatilhos no DOM
  @ViewChild('navTrigger') navTrigger!: ElementRef;
  @ViewChild('infiniteSentinel') infiniteSentinel!: ElementRef;

  // Bloco padrão que será repetido
  private readonly blocoOriginal: Type<any>[] = [
    HeroComponent,
    NossaHistoria,
    Localizacao,
    DressCode,
    Rsvp
  ];

  // Signals para gerenciamento de estado (Angular 18)
  sections = signal<Type<any>[]>([...this.blocoOriginal]);
  showNav = signal(false);

  constructor() {
    // afterNextRender garante que o IntersectionObserver rode apenas no navegador
    afterNextRender(() => {
      this.initObservers();
    });
  }

  private initObservers() {
    /**
     * OBSERVER 1: Ativação da Sticky Nav
     * Monitora o ponto após o primeiro RSVP para subir a barra de ferramentas.
     */
    const navObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('✅ Sticky Nav: Ativada');
        this.showNav.set(true);
        navObserver.disconnect(); // Desliga após a primeira ativação
      }
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Dispara um pouco antes de sumir da tela
    });

    if (this.navTrigger) {
      navObserver.observe(this.navTrigger.nativeElement);
    }

    /**
     * OBSERVER 2: Infinite Scroll
     * Monitora o final da página para injetar novos blocos de conteúdo.
     */
    const scrollObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('🔄 Infinite Scroll: Injetando novo bloco');
        this.appendNewBlock();
      }
    }, { 
      rootMargin: '600px' // Carrega o próximo bloco "antecipadamente"
    });

    if (this.infiniteSentinel) {
      scrollObserver.observe(this.infiniteSentinel.nativeElement);
    }
  }

  private appendNewBlock() {
    // Imutabilidade: espalha o array atual e adiciona o novo bloco
    this.sections.update(current => [...current, ...this.blocoOriginal]);
  }
}