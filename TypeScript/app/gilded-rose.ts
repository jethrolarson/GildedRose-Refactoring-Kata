export interface Item {
    name: string;
    sellIn: number;
    quality: number;
}

export const backstage_pass_name = 'Backstage passes to a TAFKAL80ETC concert';
export const legendary_item_name = 'Sulfuras, Hand of Ragnaros';
export const aged_brie_name = 'Aged Brie';
export const conjured_item_prefix = 'Conjured ';

const identity = <A>(a:A):A => a;

const decrementSellIn = (item: Item): Item => ({...item, sellIn: item.sellIn - 1})

// quality is never less than 0
// quality is never greater than 50
const changeQuality = (delta: number) => (item: Item): Item => ({
    ...item,
    quality: Math.max(Math.min(item.quality + delta, 50), 0)
})

const zeroQuality = (item: Item): Item => ({...item, quality: 0});

const updateRegularItem = (item: Item): Item => decrementSellIn(
    (
        item.sellIn <= 0 ? zeroQuality :
        changeQuality(-1)
    )(item)
)

const updateAppreciatingItem = (item: Item): Item => decrementSellIn(
    (
        item.sellIn > 0 ? changeQuality(1):
        changeQuality(2)
    )(item)
)

const updateConjuredItem = (item: Item): Item => decrementSellIn(
    (
        item.sellIn <= 0 ? zeroQuality :
        changeQuality(-2)
    )(item)
)

// legendary items are unchanging
const updateLegendaryItem = identity

const updateBackstagePassItem = (item: Item): Item =>
    decrementSellIn(
        (
            item.sellIn > 10 ? changeQuality(1) :
            item.sellIn > 5 ? changeQuality(2) :
            item.sellIn > 0 ? changeQuality(3) :
            zeroQuality
        )(item)
    );

const isConjured = (item: Item): boolean => item.name.startsWith(conjured_item_prefix);

export const updateItem = (item: Item): Item => {
    switch(item.name){
        case legendary_item_name:
            return updateLegendaryItem(item)
        case aged_brie_name:
            return updateAppreciatingItem(item)
        case backstage_pass_name:
            return updateBackstagePassItem(item)
        default:
            return isConjured(item) ? updateConjuredItem(item) : updateRegularItem(item)
    }
}

// why test that .map works?
export const updateQuality = (items: Item[]):Item[] => items.map(updateItem); 
