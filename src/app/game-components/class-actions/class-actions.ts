import { Component, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import {
    type ClassAbility,
    rollD20,
    bonusFromHalf,
    bonusFromQuarter,
    castHitSuccess,
    CAST_HIT_DC,
} from '../../static/class-ability';
import { MAGE_ABILITIES, MAGE_CLASS_ID } from '../../static/mage-abilities';
import { HEALER_ABILITIES, HEALER_CLASS_ID } from '../../static/healer-abilities';
import { WARRIOR_ABILITIES, WARRIOR_CLASS_ID } from '../../static/warrior-abilities';
import { ROGUE_ABILITIES, ROGUE_CLASS_ID } from '../../static/rogue-abilities';

@Component({
    selector: 'app-class-actions',
    standalone: true,
    imports: [IonicModule, CommonModule],
    templateUrl: './class-actions.html',
    styleUrl: './class-actions.less',
})
export class ClassActions implements OnChanges {
    @Input() classId = 0;
    @Input() baseDamage = 0;
    @Input() visible = false;

    modalOpen = signal(false);
    resultMessage = signal('');

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && !this.visible) {
            this.modalOpen.set(false);
        }
    }

    abilities(): ClassAbility[] {
        switch (this.classId) {
            case HEALER_CLASS_ID:
                return HEALER_ABILITIES;
            case MAGE_CLASS_ID:
                return MAGE_ABILITIES;
            case WARRIOR_CLASS_ID:
                return WARRIOR_ABILITIES;
            case ROGUE_CLASS_ID:
                return ROGUE_ABILITIES;
            default:
                return [];
        }
    }

    modalTitle(): string {
        switch (this.classId) {
            case HEALER_CLASS_ID:
                return 'Ações do Curandeiro';
            case MAGE_CLASS_ID:
                return 'Ações do Mago';
            case WARRIOR_CLASS_ID:
                return 'Ações do Guerreiro';
            case ROGUE_CLASS_ID:
                return 'Ações do Ladino';
            default:
                return 'Ações de classe';
        }
    }

    private isHealer(): boolean {
        return this.classId === HEALER_CLASS_ID;
    }

    openModal(): void {
        this.resultMessage.set('');
        this.modalOpen.set(true);
    }

    onModalDismiss(): void {
        this.modalOpen.set(false);
    }

    closeModal(): void {
        this.modalOpen.set(false);
    }

    previewLine(ability: ClassAbility): string {
        const b = this.baseDamage;
        const heal = this.isHealer();
        switch (ability.formula) {
            case 'base':
                return `Dano: ${b}`;
            case 'base_plus_half':
                return heal
                    ? `${b} + ⌊d20/2⌋ (cura +0 a +10)`
                    : `${b} + ⌊d20/2⌋ (bônus +0 a +10)`;
            case 'base_plus_quarter': {
                const baseLine = heal
                    ? `${b} + ⌊d20/4⌋ (cura +0 a +5)`
                    : `${b} + ⌊d20/4⌋ (bônus +0 a +5)`;
                if (ability.id === 'piercing') {
                    return `${baseLine} — ignora armadura`;
                }
                return baseLine;
            }
            case 'none':
                if (ability.noneEffect) {
                    return `Sem dano — ${ability.noneEffect} — conjurar d20 ≥ ${CAST_HIT_DC}`;
                }
                return heal
                    ? 'Sem dano — efeito — conjurar com d20 ≥ ' + CAST_HIT_DC
                    : 'Sem dano — conjurar com d20 ≥ ' + CAST_HIT_DC;
            case 'reduce_half':
                return `Reduz ⌊d20/2⌋ de dano (0 a 10) — teste d20 ≥ ${CAST_HIT_DC}, depois 2º d20 para a redução`;
        }
    }

    resolve(ability: ClassAbility): void {
        const base = this.baseDamage;
        const heal = this.isHealer();

        if (ability.guaranteedHit) {
            this.resultMessage.set(`${ability.name} — Dano: ${base}`);
            return;
        }

        const hit = rollD20();
        if (!castHitSuccess(hit)) {
            this.resultMessage.set(
                `${ability.name} — Acerto (conjuração): ${hit} — Falha (precisa ≥ ${CAST_HIT_DC}).`,
            );
            return;
        }

        if (ability.id === 'gust') {
            const secondRoll = rollD20();
            if (!castHitSuccess(secondRoll)) {
                this.resultMessage.set(
                    `${ability.name} — Acerto (conjuração): ${hit} | Ventania (2º d20=${secondRoll}) — Falha (precisa ≥ ${CAST_HIT_DC}).`,
                );
                return;
            }
            else {
                this.resultMessage.set(
                    `${ability.name} — Acerto (conjuração): ${hit} | Ventania (2º d20=${secondRoll}) — Ventania bem-sucedida!`,
                );
                return;
            }
        }

        if (ability.formula === 'none') {
            if (ability.noneEffect) {
                this.resultMessage.set(
                    `${ability.name} — Acerto (conjuração): ${hit} — Conjuração bem-sucedida! (${ability.noneEffect})`,
                );
            } else {
                this.resultMessage.set(
                    heal
                        ? `${ability.name} — Acerto (conjuração): ${hit} — Conjuração bem-sucedida! (efeito)`
                        : `${ability.name} — Acerto (conjuração): ${hit} — Conjuração bem-sucedida! (sem dano)`,
                );
            }
            return;
        }

        if (ability.formula === 'reduce_half') {
            const redRoll = rollD20();
            const reduction = bonusFromHalf(redRoll);
            this.resultMessage.set(
                `${ability.name} — Acerto: ${hit} | Redução (2º d20=${redRoll}, ⌊d20/2⌋=${reduction}) — ${reduction} de dano reduzido`,
            );
            return;
        }

        const dmgRoll = rollD20();
        if (ability.formula === 'base_plus_half') {
            const bonus = bonusFromHalf(dmgRoll);
            const total = base + bonus;
            if (heal) {
                this.resultMessage.set(
                    `${ability.name} — Acerto: ${hit} | Cura (2º d20=${dmgRoll}, ⌊d20/2⌋=${bonus}) — Total: ${base} + ${bonus} = ${total}`,
                );
            } else {
                this.resultMessage.set(
                    `${ability.name} — Acerto: ${hit} | Dano (2º d20=${dmgRoll}, ⌊d20/2⌋=${bonus}) — Total: ${base} + ${bonus} = ${total}`,
                );
            }
            return;
        }

        const bonus = bonusFromQuarter(dmgRoll);
        const total = base + bonus;
        if (heal) {
            this.resultMessage.set(
                `${ability.name} — Acerto: ${hit} | Cura (2º d20=${dmgRoll}, ⌊d20/4⌋=${bonus}) — Total: ${base} + ${bonus} = ${total}`,
            );
        } else {
            const dmgLine = `${ability.name} — Acerto: ${hit} | Dano (2º d20=${dmgRoll}, ⌊d20/4⌋=${bonus}) — Total: ${base} + ${bonus} = ${total}`;
            if (ability.id === 'piercing') {
                this.resultMessage.set(`${dmgLine} — ignora armadura`);
            } else {
                this.resultMessage.set(dmgLine);
            }
        }
    }
}
