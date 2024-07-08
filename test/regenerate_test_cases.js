const fs = require("node:fs");
const path = require("node:path");

const {TEST_CASES_FILE_NAME, TEST_CASES_INITIAL_FILE_NAME} = require("./constants");

(() => {
    const testCasesData = generateTestCasesData(process.argv[2]);

    updateTestFile(testCasesData, process.argv[2]);
})();

function generateTestCasesData(isInitial) {
    let shop = isInitial ? require("./initial_implementation") : require("../src/gilded_rose");
    let itemPrefixes = isInitial ? [
        "Aged Brie",
        "Backstage passes",
        "Conjured",
        "Sulfuras",
    ] : new shop.Shop().getAvailableItemPrefixes();

    const namesToTest = [
        ...itemPrefixes,
        "non_existing_item_name_to_test_default_processor_selection"
    ].sort();
    const sellInValuesToTest = [-10, -1, 0, 1, 10, 100].sort((a,b) => a - b);
    const qualityValuesToTest = [0, 1, 49, 100].sort((a,b) => a - b);

    const result = {};

    namesToTest.forEach(itemName => {
        sellInValuesToTest.forEach(itemSellIn => {
            qualityValuesToTest.forEach(itemQuality => {
                const {sellIn, quality} = new shop.Shop([new shop.Item(itemName, itemSellIn, itemQuality)]).updateQuality()[0];

                const id = btoa(`${itemName}|${itemSellIn}|${itemQuality}|${sellIn}|${quality}`);

                if (result[id]) {
                    throw new Error("non-unique key");
                }

                result[id] = {
                    name: itemName,
                    given: {sellIn: itemSellIn, quality: itemQuality},
                    expected: {sellIn: sellIn, quality: quality}
                };
            });
        });
    });

    return result;
}

function updateTestFile(testCasesDataToWrite) {
    fs.writeFileSync(path.join(__dirname, TEST_CASES_FILE_NAME), JSON.stringify(testCasesDataToWrite, null, 2) );
}