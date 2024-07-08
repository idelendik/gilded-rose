# Gilded Rose in Javascript with Jest

Credits: [Gilding the Rose: Refactoring-Driven Development - Kevlin Henney - ACCU 2023](https://www.youtube.com/watch?v=kTcDBYCpj7Q)

## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```

## Run the TextTest fixture from the Command-Line

For e.g. 10 days:

```
node test/texttest_fixture.js 10
```

You should make sure the command shown above works when you execute it in a terminal before trying to use TextTest (see below).

## Solution description

[testCases.json](./test/testCases.json) contains a set of auto-generated tests. Initially we've created it using

```sh
npm run test:initial
```

it means it used [initial](./test/initial_implementation.js) implementation of `Item` and `Shop` classes.

## Adding new Items type

We are going to implement `Test x3` (degrades in Quality thrice as fast as normal items)

Add new record to the `#itemsWithProcessors` field (for example `"Test x3": this.#processTestX3`) and a new empty method `#processTestX3` within [src/gilded_rose.js](./src/gilded_rose.js)

At this point [test/testCase.json](./test/testCases.json) doesn't have tests for `Text x3` so we have to **regenerate test file first**

```sh
npm run test:regenerate
npm run test:watch
```

Now all tests should be `green`. Despite the fact `Test x3` is treated the same way as `Sulfuras` (because it also has an empty implementation). That's correct in accordance with `updateQuality` however its behaviour should be customized

So we should edit [test/testCase.json](./test/testCases.json) and manually update `expected` values for tests related to `Test x3` and run tests again

Now we should see `Test x3` tests `red`

Start implementing `#processTestX3` and amount of `red` tests start decreasing

At the end of this process all tests should be green

Make sure you committed and saved your changes in [test/testCases.json](./test/testCases.json). Now it is the source of the truth for future tests.
 
## Additional test cases for sellIn and quality

Add them directly to the [test/regenerate_test_cases.js](./test/regenerate_test_cases.js)  (generateTestCasesData function)

## Item prefixes instead of full names

Worth mentioning that we use item name `prefixes` instead of `full names` to get respective processor.

Both `generateTestCasesData` function and `Shop.#itemsWithProcessors` field use prefixes (and check whether item name starts from this prefix). For example `Backstage passes` prefix to process
- **Backstage passes** to a TAFKAL80ETC concert
- **Backstage passes** to some other event
- etc.

So no need to generate test for each Item. It's enough to generate tests for prefixes only. Hope it makes sense

Have a nice day! :)