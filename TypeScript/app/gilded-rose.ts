export enum ItemType {
    appreciating,
    legendary,
    event,
    normal,
    conjured,
}
export interface Item {
    name: string;
    sellIn: number;
    quality: number;
    type: ItemType;
}

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

const getUpdater = (itemType: ItemType) => {
    switch(itemType){
        case ItemType.legendary:
            return updateLegendaryItem
        case ItemType.appreciating:
            return updateAppreciatingItem
        case ItemType.event:
            return updateBackstagePassItem
        case ItemType.conjured:
            return updateConjuredItem
        case ItemType.normal:
            return updateRegularItem
    }
}

export const updateItem = (item: Item): Item => getUpdater(item.type)(item);

// why test that .map works?
export const updateQuality = (items: Item[]):Item[] => items.map(updateItem); 
