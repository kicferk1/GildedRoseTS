export class Item {
  /**
   * Originally not supposed to edit this, but ts won't shut up about types of fields so it has to be done
   */
  name:string;
  sellIn;quality: number;
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class Shop {
  items: Item[];
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i] = this.updateItem(this.items[i]);
    }
    return this.items;
  }
  updateItem(item:Item):Item {
    item = this.updateAgedBrie(item);
    item = this.updateBackstagePasses(item);
    item = this.updateConjured(item);
    item = this.updateSulfuras(item);
    item = this.updateDefault(item);
    return item;
  }

  updateAgedBrie(item:Item):Item{
    if(item.name == 'Aged Brie'){
      if(item.sellIn > 0){
        item.quality = item.quality + 1;
      }else{
        item.quality = item.quality + 2;
      }
      if(item.quality > 50){
        item.quality = 50;
      }
      item.sellIn = item.sellIn-1;
    }
    return item;
  }

  updateBackstagePasses(item:Item):Item{
    if(item.name == 'Backstage passes to a TAFKAL80ETC concert'){
      if(item.sellIn > 10){
        item.quality = item.quality + 1;
      }else if(item.sellIn >5){
        item.quality = item.quality + 2;
      }else if(item.sellIn > 0){
        item.quality = item.quality + 3;
      }else{
        item.quality = 0
      }
      if(item.quality > 50){
        item.quality = 50
      }
      item.sellIn = item.sellIn -1;
    }
    return item;
  }

  updateSulfuras(item:Item):Item{
    return item;
  }

  updateConjured(item:Item):Item{
    if(item.name == 'Conjured'){
      if(item.sellIn > 0){
        item.quality = item.quality - 2;
      }else{
        item.quality = item.quality - 4;
      }
      if(item.quality < 0){
        item.quality = 0;
      }
      item.sellIn = item.sellIn - 1;
    }
    return item;
  }

  updateDefault(item:Item):Item{
    if(!this.specialItem(item)){
      if(item.sellIn > 0){
        item.quality = item.quality - 1;
      }else{
        item.quality = item.quality - 2;
      }
      if(item.quality < 0){
        item.quality = 0;
      }
      item.sellIn = item.sellIn - 1;
    }
    return item;
  }

  specialItem(item:Item):boolean{
    /**
     * To check if item should degrade in a default way
     * Passes whole item despite using just name cause in principle quality/sellIn can also influence defaultness
     */
    return (
      item.name == 'Aged Brie' || 
      item.name == 'Backstage passes to a TAFKAL80ETC concert' || 
      item.name == 'Conjured' || 
      item.name == 'Sulfuras, Hand of Ragnaros'
    )
  }
}
