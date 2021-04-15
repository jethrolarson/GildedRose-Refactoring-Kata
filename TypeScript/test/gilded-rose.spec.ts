import { expect } from 'chai';
import { aged_brie_name, backstage_pass_name, legendary_item_name, updateItem, updateRegularItem } from '../app/gilded-rose';

describe('updateItem', () => {
    describe("regular items", () => {
        it('reduces quality and sellIn when sellIn is positive', () => {
            expect(updateRegularItem({name: 'foo', quality: 2, sellIn: 2})).to.deep.equal({name: 'foo', quality: 1, sellIn: 1})
        });
        it('reduces quality by 2 and sellIn by 1 when sellIn is negative', () => {
            expect(updateRegularItem({name: 'foo', quality: 2, sellIn: 0})).to.deep.equal({name: 'foo', quality: 0, sellIn: -1})
        });
        it('does not reduce quality when 0', () => {
            expect(updateRegularItem({name: 'foo', quality: 0, sellIn: 0})).to.deep.equal({name: 'foo', quality: 0, sellIn: -1})
        });
    });
    describe("legendary items", () => {
        it('doesnt reduce in quality nor sellIn', () => {
            const legendary = {name: legendary_item_name, quality: 2, sellIn: 1};
            expect(updateItem(legendary)).to.deep.equal(legendary);
            const legendary2 = {name: legendary_item_name, quality: 2, sellIn: -1};
            expect(updateItem(legendary2)).to.deep.equal(legendary2);
            const legendary3 = {name: legendary_item_name, quality: 2, sellIn: -1};
            expect(updateItem(legendary3)).to.deep.equal(legendary3);
        });
    });
    describe('backstage passes',() => {
        it('decreases quality to 0 when sellIn <= 0', () => {
            expect(updateItem({name: backstage_pass_name, quality: 10, sellIn: 0})).property('quality', 0)
        });
        it('increases quality by 3 when sellIn between 0 and 5', () => {
            expect(updateItem({name: backstage_pass_name, quality: 10, sellIn: 1})).property('quality', 13)
            expect(updateItem({name: backstage_pass_name, quality: 10, sellIn: 5})).property('quality', 13)
        })
        it('increases quality by 2 when sellIn between 0 and 10', () => {
            expect(updateItem({name: backstage_pass_name, quality: 10, sellIn: 6})).property('quality', 12)
            expect(updateItem({name: backstage_pass_name, quality: 10, sellIn: 10})).property('quality', 12)
        })
        it('increases quality by 1 when sellIn between > 10', () => {
            expect(updateItem({name: backstage_pass_name, quality: 10, sellIn: 11})).property('quality', 11)
        })
    });
    describe('appreciating items', () => {
        it('increases quality as time proceeds', () => {
            expect(updateItem({name: aged_brie_name, quality: 10, sellIn: 2})).property('quality', 11)
            expect(updateItem({name: aged_brie_name, quality: 10, sellIn: -5})).property('quality', 12)
        })
    })
    describe('Conjured items', () => {
        it('depreciates twice as fast as normal items', () => {
            it('reduces quality and sellIn when sellIn is positive', () => {
                expect(updateItem({name: 'Conjured Mana Cake', quality: 2, sellIn: 2})).property('quality', 0)
            });
            it('reduces quality by 2 and sellIn by 1 when sellIn is negative', () => {
                expect(updateItem({name: 'foo', quality: 2, sellIn: 0})).to.deep.equal({name: 'foo', quality: 0, sellIn: -1})
            });
            it('does not reduce quality when 0', () => {
                expect(updateItem({name: 'foo', quality: 0, sellIn: 0})).to.deep.equal({name: 'foo', quality: 0, sellIn: -1})
            });
        });
    });
});
