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
    "Aged Brie": this.#processBrie,
    "Sulfuras, Hand of Ragnaros": this.#processSulfuras,
    "Backstage passes to a TAFKAL80ETC concert": this.#processBackstage,
    "Conjured": this.#processConjured,
    [this.#DEFAULT_ITEM_NAME]: this.#processRegularItem,
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
    return this.#itemsWithProcessors[itemName] || this.#itemsWithProcessors[this.#DEFAULT_ITEM_NAME];
  }

  #processBrie(item) {
    item.sellIn--;

    item.quality = Math.max(item.quality, Math.min(50, item.quality + 1));

    if (item.sellIn < 0) {
      item.quality = Math.max(item.quality, Math.min(50, item.quality + 1));
    }
  }

  #processSulfuras(item) {

  }

  #processBackstage(item) {
    item.quality = Math.max(item.quality, Math.min(50, item.quality + 1));

    if (item.sellIn <= 10) {
      item.quality = Math.max(item.quality, Math.min(50, item.quality + 1));
    }

    if (item.sellIn <= 5) {
      item.quality = Math.max(item.quality, Math.min(50, item.quality + 1));
    }

    item.sellIn--;

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  #processConjured(item) {
    item.sellIn--;

    item.quality = Math.min(item.quality, Math.max(0, item.quality - 2));

    if (item.sellIn < 0) {
      item.quality = Math.min(item.quality, Math.max(0, item.quality - 2));
    }
  }

  #processRegularItem(item) {
    item.sellIn--;

    item.quality = Math.min(item.quality, Math.max(0, item.quality - 1 ));

    if (item.sellIn < 0) {
      item.quality = Math.min(item.quality, Math.max(0, item.quality - 1));
    }
  }

  getAvailableItemNames() {
    return Object.keys(this.#itemsWithProcessors);
  }
}

module.exports = {
  Item,
  Shop
}
