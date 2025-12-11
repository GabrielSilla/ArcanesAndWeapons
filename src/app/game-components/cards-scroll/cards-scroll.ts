import { Component, Input, ElementRef, ViewChild, AfterViewInit, signal, Output, EventEmitter } from '@angular/core';
import { Cards } from '../../static/cards';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
    imports: [IonicModule, CommonModule],
    standalone: true,
    selector: 'app-cards-scroll',
    templateUrl: './cards-scroll.html',
    styleUrls: ['./cards-scroll.less']
})
export class CardsScroll implements AfterViewInit {
    @ViewChild('carouselEl', { static: false }) carouselEl!: ElementRef;
    @Input() cards: any = [];
    @Input() type: string = "";
    @Input() hasActions: boolean = true;
    
    @Output() cardSelected = new EventEmitter<void>();
    
    activeIndex = signal(-1);

    public isAnimating = false;
    public cardToAnimate = -1;
    private startX = 0;
    private currentX = 0;

    ngAfterViewInit() {
        if (!this.carouselEl) {
            console.warn('carouselEl não encontrado');
            return;
        }
        const carousel = this.carouselEl.nativeElement;

        carousel.addEventListener('touchstart', (e: TouchEvent) => {
            this.startX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchmove', (e: TouchEvent) => {
            this.currentX = e.touches[0].clientX;
        });

        carousel.addEventListener('touchend', () => {
            const diff = this.startX - this.currentX;
            if (diff > 30) {
                this.next();
            } else if (diff < -30) {
                this.prev();
            }
        });
    }

    selectCard(index: number) {
        if(index == this.activeIndex())
            this.activeIndex.set(-1);
        else
           this.activeIndex.set(index);
    }

    prev() {
        this.activeIndex.set((this.activeIndex() - 1 + this.cards.length) % this.cards.length);
    }

    next() {
        this.activeIndex.set((this.activeIndex() + 1) % this.cards.length);
    }

    getTransform() {
        const offset = this.activeIndex() * 160; // largura da carta + margem
        return `translateX(-${offset}px)`;
    }

    selected(id: any) {
        if(this.type === "bag") {
            this.isAnimating = true;

            // Marcar carta ativa
            this.cardToAnimate = this.activeIndex();

            setTimeout(() => {
                this.isAnimating = false;
                this.cardSelected.emit(id);
            }, 600); // tempo da animação
        } else {
            this.cardSelected.emit(id);
        }
    }

    close() {
        this.cardSelected.emit();
    }
}