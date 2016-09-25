(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

// LIST #1 - controller
ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuy = this;

  // Use factory to create new shopping list service
  var shoppingListCheckoff = ShoppingListCheckOffService;

  toBuy.items = shoppingListCheckoff.getItemsToBuy();

  toBuy.itemName = "";
  toBuy.itemQuantity = "";

  toBuy.addItem = function () {
    shoppingListCheckoff.addItemToBuy(toBuy.itemName, toBuy.itemQuantity);
  }

  toBuy.boughtItem = function (itemIndex) {
    shoppingListCheckoff.boughtItem(itemIndex);
  };
  toBuy.removeItem = function (itemIndex) {
    shoppingListCheckoff.removeItemToBuy(itemIndex);
  };

}


// LIST #2 - controller
AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var alreadybought = this;

  var shoppingListCheckoff = ShoppingListCheckOffService;

  alreadybought.items = shoppingListCheckoff.getItemsBought();

  alreadybought.itemName = "";
  alreadybought.itemQuantity = "";

  alreadybought.addItem = function () {
    try {
      shoppingListCheckoff.addItemBought(alreadybought.itemName, alreadybought.itemQuantity);
    } catch (error) {
      alreadybought.errorMessage = error.message;
    }

  }

  alreadybought.removeItem = function (itemIndex) {
    shoppingListCheckoff.removeItemBought(itemIndex);
  };
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [
    { name: "cookies", quantity: 10 },
    { name: "chips", quantity: 20 },
    { name: "eggs", quantity: 12 },
    { name: "bread", quantity: 2 },
    { name: "apples", quantity: 4 }
  ];
  var itemsBought = [];

  service.addItemToBuy = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      itemsToBuy.push(item);
  };

  service.addItemBought = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      console.log(item);
      itemsBought.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItemToBuy = function (itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
  };

  service.boughtItem = function (itemIndex) {
    var item = itemsToBuy[itemIndex];
    itemsBought.push(item);
    itemsToBuy.splice(itemIndex, 1)

  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };

  service.removeItemBought = function (itemIndex) {
    var item = itemsBought[itemIndex];
    itemsToBuy.push(item);
    itemsBought.splice(itemIndex, 1);
  };

}

})();
