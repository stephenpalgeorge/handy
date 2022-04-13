import { Card } from './card';

export type Hand = [string, string, string, string, string];

export interface Feature {
    type: 'high'|'pair'|'three'|'four'|'flush'|'straight',
    value: string
}

export type HandType = 'high'|'pair'|'two-pair'|'three'|'straight'|'flush'|'full-house'|'four'|'straight-flush'|'royal-flush';

export interface HandQuality {
    type: HandType,
    rank: number,
}

export interface HandDescription extends HandQuality {
    features: Feature[],
    description?: string,
    cards: Card[],
}

