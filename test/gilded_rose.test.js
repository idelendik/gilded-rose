const fs = require("node:fs");
const path = require("node:path");

const {Shop, Item} = require("../src/gilded_rose");
const {TEST_CASES_FILE_NAME} = require("./constants");

describe("Gilded Rose", function() {
  describe("updateQuality", () => {
    const testCases = getTestCasesFromFile();

    testCases.forEach(({name, given, expected}) => {
      describe(name, function () {
        it(`[${given.sellIn}, ${given.quality}]`, () => {
          const shop = new Shop([
            new Item(name, given.sellIn, given.quality)
          ]);

          shop.updateQuality();

          expect(shop.items[0].sellIn).toBe(expected.sellIn);
          expect(shop.items[0].quality).toBe(expected.quality);
        });
      })
    });

    xit("change this test manually to check a specific case", () => {
      const shop = new Shop([{name: undefined, sellIn: undefined, quality: undefined}]);

      shop.updateQuality();

      expect(shop.items[0].sellIn).toBe(undefined);
      expect(shop.items[0].quality).toBe(undefined);
    });

    it("returns an empty array if the shop is empty", function () {
      const shop = new Shop();

      expect(shop.updateQuality().length).toBe(0);
    });
  });

  describe("Shop", function () {
    it("getAvailableItemNames method should contain at least 1 key (default)", function () {
    const shop = new Shop();

    expect(Object.keys(shop.getAvailableItemPrefixes()).length).toBeGreaterThan(0);
  });
  });
});

function getTestCasesFromFile () {
  const testCasesData = fs.readFileSync(path.join(__dirname, TEST_CASES_FILE_NAME), "utf8");

  return Object.values(JSON.parse(testCasesData));
}