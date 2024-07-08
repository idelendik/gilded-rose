class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  #DEFAULT_ITEM_NAME = "Regular (default) Item";

  #itemsWithProcessors = {
    "Aged Brie": this.#processBrie.bind(this),
    "Sulfuras": this.#processSulfuras.bind(this),
    "Backstage passes": this.#processBackstage.bind(this),
    "Conjured": this.#processConjured.bind(this),
    [this.#DEFAULT_ITEM_NAME]: this.#processRegularItem.bind(this),
  };

  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      this.getProcessorFnOrDefault(item.name)(item);
    });

    return this.items;
  }

  getProcessorFnOrDefault(itemName) {
    const availableNames = this.getAvailableItemPrefixes();

    for (let i = 0; i < availableNames.length; i++) {
      if (itemName.startsWith(availableNames[i])) {
        return this.#itemsWithProcessors[availableNames[i]];
      }
    }

    return this.#itemsWithProcessors[this.#DEFAULT_ITEM_NAME];
  }

  #processBrie(item) {
    item.sellIn--;

    const qualityDelta = this.#isPassedSellIn(item.sellIn) ? 2 : 1;

    item.quality = this.#clamp(50, item.quality, item.quality + qualityDelta);
  }

  #processSulfuras(item) {

  }

  #processBackstage(item) {
    let qualityDelta;

    if (item.sellIn > 10) {
      qualityDelta = 1;
    } else if (item.sellIn > 5) {
      qualityDelta = 2;
    } else {
      qualityDelta = 3;
    }

    item.quality = this.#clamp(50, item.quality, item.quality + qualityDelta);

    item.sellIn--;

    item.quality = this.#isPassedSellIn(item.sellIn) ? 0 : item.quality;
  }

  #processConjured(item) {
    item.sellIn--;

    const qualityDelta = this.#isPassedSellIn(item.sellIn) ? 4 : 2;

    item.quality = Math.max(0, item.quality - qualityDelta);
  }

  #processRegularItem(item) {
    item.sellIn--;

    const qualityDelta = this.#isPassedSellIn(item.sellIn) ? 2 : 1;

    item.quality = Math.max(0, item.quality - qualityDelta);
  }

  #clamp(limit, min, max) {
    return Math.min(Math.max(limit, min), max);
  }

  #isPassedSellIn(sellIn) {
    return sellIn < 0;
  }

  getAvailableItemPrefixes() {
    return Object.keys(this.#itemsWithProcessors);
  }
}

module.exports = {
  Item,
  Shop
}
