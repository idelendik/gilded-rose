const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  describe("updateQuality", function () {
    it("day 1", function () {
      const items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Aged Brie", 2, 0),
        new Item("Elixir of the Mongoose", 5, 7),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Sulfuras, Hand of Ragnaros", -1, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)
      ];

      const shop = new Shop(items);

      shop.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);

      expect(items[1].sellIn).toBe(1);
      expect(items[1].quality).toBe(1);

      expect(items[2].sellIn).toBe(4);
      expect(items[2].quality).toBe(6);

      expect(items[3].sellIn).toBe(0);
      expect(items[3].quality).toBe(80);

      expect(items[4].sellIn).toBe(-1);
      expect(items[4].quality).toBe(80);


      expect(items[5].sellIn).toBe(14);
      expect(items[5].quality).toBe(21);

      expect(items[6].sellIn).toBe(9);
      expect(items[6].quality).toBe(50);

      expect(items[7].sellIn).toBe(4);
      expect(items[7].quality).toBe(50);
    });

    it("day 2", function () {
      const items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Aged Brie", 2, 0),
        new Item("Elixir of the Mongoose", 5, 7),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Sulfuras, Hand of Ragnaros", -1, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)
      ];

      const shop = new Shop(items);

      shop.updateQuality();
      shop.updateQuality();

      expect(items[0].sellIn).toBe(8);
      expect(items[0].quality).toBe(18);

      expect(items[1].sellIn).toBe(0);
      expect(items[1].quality).toBe(2);

      expect(items[2].sellIn).toBe(3);
      expect(items[2].quality).toBe(5);

      expect(items[3].sellIn).toBe(0);
      expect(items[3].quality).toBe(80);

      expect(items[4].sellIn).toBe(-1);
      expect(items[4].quality).toBe(80);


      expect(items[5].sellIn).toBe(13);
      expect(items[5].quality).toBe(22);

      expect(items[6].sellIn).toBe(8);
      expect(items[6].quality).toBe(50);

      expect(items[7].sellIn).toBe(3);
      expect(items[7].quality).toBe(50);
    });

    it("day 3", function () {
      const items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Aged Brie", 2, 0),
        new Item("Elixir of the Mongoose", 5, 7),
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Sulfuras, Hand of Ragnaros", -1, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)
      ];

      const shop = new Shop(items);

      shop.updateQuality();
      shop.updateQuality();
      shop.updateQuality();

      expect(items[0].sellIn).toBe(7);
      expect(items[0].quality).toBe(17);

      expect(items[1].sellIn).toBe(-1);
      expect(items[1].quality).toBe(4);

      expect(items[2].sellIn).toBe(2);
      expect(items[2].quality).toBe(4);

      expect(items[3].sellIn).toBe(0);
      expect(items[3].quality).toBe(80);

      expect(items[4].sellIn).toBe(-1);
      expect(items[4].quality).toBe(80);


      expect(items[5].sellIn).toBe(12);
      expect(items[5].quality).toBe(23);

      expect(items[6].sellIn).toBe(7);
      expect(items[6].quality).toBe(50);

      expect(items[7].sellIn).toBe(2);
      expect(items[7].quality).toBe(50);
    });

    it("day X", function () {
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 48),
        new Item("Backstage passes to a TAFKAL80ETC concert", 4, 47),
        new Item("X", -1, 2),
        new Item("Backstage passes to a TAFKAL80ETC concert", -1, 2),
        new Item("X", -1, -1),
        new Item("Aged Brie", -1, 55),
      ];

      const shop = new Shop(items);

      shop.updateQuality();

      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(50);

      expect(items[1].sellIn).toBe(3);
      expect(items[1].quality).toBe(50);

      expect(items[2].sellIn).toBe(-2);
      expect(items[2].quality).toBe(0);

      expect(items[3].sellIn).toBe(-2);
      expect(items[3].quality).toBe(0);

      expect(items[4].sellIn).toBe(-2);
      expect(items[4].quality).toBe(-1);
    });

    it("empty", function () {
      const shop = new Shop();

      expect(shop.updateQuality().length).toBe(0);
    });

  });
});