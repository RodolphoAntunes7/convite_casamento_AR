import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  targetDate = new Date('2026-07-11T16:00:00'); // Data do seu casamento
  cast = signal({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  private subscription!: Subscription;

  ngOnInit() {
    this.calculateTime();

    this.subscription = interval(1000).subscribe(() => {
      this.calculateTime();
    });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private calculateTime() {
    const now = new Date().getTime();
    const diff = this.targetDate.getTime() - now;

    if (diff > 0) {
      // Atualizamos o valor do Signal
      this.cast.set({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }
  }
}