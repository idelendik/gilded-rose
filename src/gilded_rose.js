class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(this.process.bind(this));

    return this.items;
  }

  process(item) {
    const processorFn = this.getProcessorFn(item.name);

    processorFn(item);
  }

  getProcessorFn(itemName) {
    const availableProcessors = {
      "Aged Brie": processBrie,
      "Sulfuras, Hand of Ragnaros": processSulfuras,
      "Backstage passes to a TAFKAL80ETC concert": processBackstage,
      "Default Item Name": processRegularItem,
    };

    function processBrie(item) {
      item.sellIn--;

      if (item.sellIn < 0) {
        // shouldn't exceed 50
        item.quality = Math.min(50, item.quality + 2)
      } else {
        // shouldn't exceed 50
        item.quality = Math.min(50, item.quality + 1)
      }
    }

    function processSulfuras(item) {

    }

    function processBackstage(item) {
      if (item.quality < 50) {
        item.quality++;

        if (item.sellIn < 11) {
          if (item.quality < 50) {
            item.quality++;
          }
        }
        if (item.sellIn < 6) {
          if (item.quality < 50) {
            item.quality++;
          }
        }
      }

      item.sellIn--;

      if (item.sellIn < 0) {
        item.quality = 0;
      }
    }

    function processRegularItem(item) {
      item.sellIn--;

      if (item.sellIn < 0) {
        if (item.quality > 0) {
          item.quality = Math.max(0, item.quality - 2);
        }
      } else {
        item.quality = Math.max(0, item.quality - 1);
      }
    }

    return availableProcessors[itemName] || availableProcessors["Default Item Name"];
  }
}

module.exports = {
  Item,
  Shop
}
