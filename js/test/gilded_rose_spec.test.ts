import {Shop, Item} from '../src/gilded_rose';
import {describe, it} from '../node_modules/mocha';
import { expect } from 'chai';

describe("Gilded Rose", function() {

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  it("should decrease quality by 2 every day if sellIn <= 0", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 20) ]);
    for(var i = 0; i<10; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(18-2*i);
    }
  });

  it("should decrease quality by 1 every day if sellIn > 0", function() {
    const gildedRose = new Shop([ new Item("foo", 10, 20) ]);
    for(var i = 0; i<10; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(19-i);
    }
  });

  it("should never decrease quality below 0", function() {
    const gildedRose = new Shop([ new Item("foo", 10, 0) ]);
    for(var i = 0; i<10; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    }
  });

  it("Aged Brie should increase in quality with age", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 10, 20) ]);
    for(var i = 0; i<10; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(21+i);
    }
  });

  it("Aged Brie should increase in quality with age twice as fast after sellIn time", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 0, 20) ]);
    for(var i = 0; i<10; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(22+2*i);
    }
  });

  it("Quality can't increase past 50", function() {
    const gildedRose = new Shop([ new Item("Aged Brie", 10, 49), new Item("Backstage passes", 10, 48) ]);
    for(var i = 0; i<10; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.be.equal(50);
    }
  });

  it("Quality of Sulfuras doesn't have to be sold or decreases in quality", function() {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
    for(var i = 0; i<10; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.be.equal(80);
      expect(items[0].sellIn).to.be.equal(10);
    }
  });

  it("Quality of backstage passes increases by 1 if more than 10 days left", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 20, 0)]);
    for(var i = 0; i<10; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.be.equal(i+1);
    }
  });

  it("Quality of backstage passes increases by 2 if between 10 and 5 days left", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0)]);
    for(var i = 0; i<5; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.be.equal(2*i+2);
    }
  });

  it("Quality of backstage passes increases by 3 if 5 or fewer days left", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0)]);
    for(var i = 0; i<5; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.be.equal(3*i+3);
    }
  });

  it("Quality of backstage passes is 0 after concert", function() {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)]);
    for(var i = 0; i<5; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.be.equal(0);
    }
  });

  it("Conjured should decrease quality by 4 every day if sellIn <= 0", function() {
    const gildedRose = new Shop([ new Item("Conjured", 0, 20) ]);
    for(var i = 0; i<5; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(16-4*i);
    }
  });

  it("Conjured should decrease quality by 2 every day if sellIn > 0", function() {
    const gildedRose = new Shop([ new Item("Conjured", 10, 20) ]);
    for(var i = 0; i<10; i++){
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(18-2*i);
    }
  });

});