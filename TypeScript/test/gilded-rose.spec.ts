import { expect } from 'chai';
import { ItemType, updateItem, updateQuality } from '../app/gilded-rose';

describe('updateItem', () => {
    describe("regular items", () => {
        it('reduces quality and sellIn when sellIn is positive', () => {
            expect(updateQuality([{name: 'foo', quality: 2, sellIn: 2, type: ItemType.normal}])[0]).to.deep.equal({name: 'foo', quality: 1, sellIn: 1, type: ItemType.normal})
        });
        it('reduces quality by 2 and sellIn by 1 when sellIn is negative', () => {
            expect(updateQuality([{name: 'foo', quality: 2, sellIn: 0, type: ItemType.normal}])[0]).to.deep.equal({name: 'foo', quality: 0, sellIn: -1, type: ItemType.normal})
        });
        it('does not reduce quality when 0', () => {
            expect(updateQuality([{name: 'foo', quality: 0, sellIn: 0, type: ItemType.normal}])[0]).to.deep.equal({name: 'foo', quality: 0, sellIn: -1, type: ItemType.normal})
        });
    });
    describe("legendary items", () => {
        it('doesnt reduce in quality nor sellIn', () => {
            const legendary = {name: 'legendary_item_name', quality: 2, sellIn: 1, type: ItemType.legendary};
            expect(updateItem(legendary)).to.deep.equal(legendary);
            const legendary2 = {name: 'legendary_item_name', quality: 2, sellIn: -1, type: ItemType.legendary};
            expect(updateItem(legendary2)).to.deep.equal(legendary2);
            const legendary3 = {name: 'legendary_item_name', quality: 2, sellIn: -1, type: ItemType.legendary};
            expect(updateItem(legendary3)).to.deep.equal(legendary3);
        });
    });
    describe('backstage passes',() => {
        it('decreases quality to 0 when sellIn <= 0', () => {
            expect(updateItem({name: 'backstage_pass_name', quality: 10, sellIn: 0, type: ItemType.event})).property('quality', 0)
        });
        it('increases quality by 3 when sellIn between 0 and 5', () => {
            expect(updateItem({name: 'backstage_pass_name', quality: 10, sellIn: 1, type: ItemType.event})).property('quality', 13)
            expect(updateItem({name: 'backstage_pass_name', quality: 10, sellIn: 5, type: ItemType.event})).property('quality', 13)
        })
        it('increases quality by 2 when sellIn between 0 and 10', () => {
            expect(updateItem({name: 'backstage_pass_name', quality: 10, sellIn: 6, type: ItemType.event})).property('quality', 12)
            expect(updateItem({name: 'backstage_pass_name', quality: 10, sellIn: 10, type: ItemType.event})).property('quality', 12)
        })
        it('increases quality by 1 when sellIn between > 10', () => {
            expect(updateItem({name: 'backstage_pass_name', quality: 10, sellIn: 11, type: ItemType.event})).property('quality', 11)
        })
    });
    describe('appreciating items', () => {
        it('increases quality as time proceeds', () => {
            expect(updateItem({name: 'aged_brie_name', quality: 10, sellIn: 2, type: ItemType.appreciating})).property('quality', 11)
            expect(updateItem({name: 'aged_brie_name', quality: 10, sellIn: -5, type: ItemType.appreciating})).property('quality', 12)
        })
    })
    describe('Conjured items', () => {
        it('depreciates twice as fast as normal items', () => {
            it('reduces quality and sellIn when sellIn is positive', () => {
                expect(updateItem({name: 'Conjured Mana Cake', quality: 2, sellIn: 2, type: ItemType.conjured})).property('quality', 0)
            });
            it('reduces quality by 2 and sellIn by 1 when sellIn is negative', () => {
                expect(updateItem({name: 'Conjured Mana Cake', quality: 2, sellIn: 0, type: ItemType.conjured})).to.deep.equal({name: 'foo', quality: 0, sellIn: -1})
            });
            it('does not reduce quality when 0', () => {
                expect(updateItem({name: 'Conjured Mana Cake', quality: 0, sellIn: 0, type: ItemType.conjured})).to.deep.equal({name: 'foo', quality: 0, sellIn: -1})
            });
        });
    });
});
