import * as hands from '../../_test_data_/hands';
import {getHighCard, findGroups, findFlush, findStraight} from "../index";
import {Feature} from "../../../types/hand";

describe('poker hand utils', () => {
    describe('utilities', () => {
        it('find the high card', () => {
            const high_card: string = getHighCard(hands.HIGH_CARD);
            expect(high_card).toBe('J');
        });
    });

    describe('hand types', () => {
        it('finds a pair', () => {
            const features: Feature[] = findGroups(hands.PAIR);
            const featureTypes = features.map(f => f.type);
            expect(featureTypes).toHaveLength(1);
            expect(featureTypes).toContain('pair');
        });

        it('finds two-pair', () => {
            const features: Feature[] = findGroups(hands.TWO_PAIR);
            const featureTypes = features.map(f => f.type);
            expect(featureTypes).toHaveLength(2);
            expect(featureTypes).toContain('pair');
        });

        it('finds a set', () => {
            const features: Feature[] = findGroups(hands.THREE);
            const featureTypes = features.map(f => f.type);
            expect(featureTypes).toHaveLength(1);
            expect(featureTypes).toContain('three');
        });

        it('finds four of a kind', () => {
            const features: Feature[] = findGroups(hands.FOUR);
            const featureTypes = features.map(f => f.type);
            expect(featureTypes).toHaveLength(1);
            expect(featureTypes).toContain('four');
        });

        it('finds a full house', () => {
            let features: Feature[] = findStraight(hands.STRAIGHT_FLUSH);
            features = [...features, ...findFlush(hands.STRAIGHT_FLUSH)];
            const featureTypes = features.map(f => f.type);
            expect(featureTypes).toHaveLength(2);
            expect(featureTypes).toContain('straight');
            expect(featureTypes).toContain('flush');
        });

        it('finds a straight', () => {
            const features: Feature[] = findStraight(hands.STRAIGHT);
            const featureTypes = features.map(f => f.type);
            expect(featureTypes).toHaveLength(1);
            expect(featureTypes).toContain('straight');
        });

        it('finds a flush', () => {
            const features: Feature[] = findFlush(hands.FLUSH);
            const featureTypes = features.map(f => f.type);
            expect(featureTypes).toHaveLength(1);
            expect(featureTypes).toContain('flush');
        });
    });
});
