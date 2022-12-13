function getPricesArray(type = "item") {
  // Get the list of prices from the page
  if (type === "item") {
    prices = document.querySelectorAll(".srp-results .s-item__price");
  } else if (type === "shipping") {
    prices = document.querySelectorAll(".srp-results .s-item__shipping");
  } else {
    throw new Error("Invalid type");
  }

  // console.log("${type} price elements: ", prices);

  if (prices.length === 0) {
    return false;
  }

  // Convert the NodeList of prices to an array
  prices = [...prices];

  // Extract the price value from each element and store in an array
  prices = prices.map((item) => {
    if (item.innerText.includes("Free")) {
      return 0;
    } else {
      return parseFloat(item.innerText.replace(/[^0-9\.]+/g, ""));
    }
  });

  // Remove all NaN values from the array
  prices = prices.filter((item) => !isNaN(item));

  // Sort the array of prices in ascending order
  prices.sort((a, b) => a - b);

  return prices;
}

function calculatePricesSum(type = "item", prices = false) {
  if (!prices) {
    prices = getPricesArray(type);
  }

  if (prices.length === 0) {
    return "N/A";
  }

  // Calculate the sum of all prices
  sumPrice = prices.reduce((a, b) => a + b);

  // Return the sum of all prices
  return sumPrice;
}

function countPrices(type = "item", prices = false) {
  if (!prices) {
    prices = getPricesArray(type);
  }

  if (prices.length === 0) {
    return "N/A";
  }

  // Calculate the number of prices
  pricesCount = prices.length;

  // Return the number of prices
  return pricesCount;
}

// Calculate the median price of items on an eBay search results page
function calculateMedianPrice(type = "item", prices = false) {
  if (!prices) {
    prices = getPricesArray(type);
  }

  if (prices.length === 0) {
    return "N/A";
  }

  // Calculate the median price
  if (prices.length % 2 === 0) {
    // If there is an even number of prices, the median is the average of the two middle prices
    medianPrice =
      (prices[prices.length / 2 - 1] + prices[prices.length / 2]) / 2;
  } else {
    // If there is an odd number of prices, the median is the middle price
    medianPrice = prices[Math.floor(prices.length / 2)];
  }

  // Return the median price
  return medianPrice;
}

function calculateAveragePrice(type = "item", prices = false) {
  if (!prices) {
    prices = getPricesArray(type);
  }

  if (prices.length === 0) {
    return "N/A";
  }

  // Calculate the average (mean) price
  averagePrice = prices.reduce((a, b) => a + b) / prices.length;

  // Return the average (mean) price
  return averagePrice;
}

function calculateLowestPrice(type = "item", prices = false) {
  if (!prices) {
    prices = getPricesArray(type);
  }

  if (prices.length === 0) {
    return "N/A";
  }

  // Calculate the lowest price
  lowestPrice = prices[0];

  // Return the lowest price
  return lowestPrice;
}

function calculateHighestPrice(type = "item", prices = false) {
  if (!prices) {
    prices = getPricesArray(type);
  }

  if (prices.length === 0) {
    return "N/A";
  }

  // Calculate the highest price
  highestPrice = prices[prices.length - 1];

  // Return the highest price
  return highestPrice;
}

// Calculate the price statistics of items on the page when the page loads
window.addEventListener("load", () => {
  // Create a number formatter for currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  // Get all item prices
  item_prices = getPricesArray("item");
  console.log("Item Prices: ", item_prices);

  // Get all shipping prices
  shipping_prices = getPricesArray("shipping");
  console.log("Shipping Prices: ", shipping_prices);

  // Calculate all price statistics

  // Calculate all lowest prices
  lowest_item_price = calculateLowestPrice("item", item_prices);
  lowest_shipping_price = calculateLowestPrice("shipping", shipping_prices);
  lowest_total_price = lowest_item_price + lowest_shipping_price;

  // Calculate all average prices
  average_item_price = calculateAveragePrice("item", item_prices);
  average_shipping_price = calculateAveragePrice("shipping", shipping_prices);
  average_total_price = average_item_price + average_shipping_price;

  // Calculate all highest prices
  highest_item_price = calculateHighestPrice("item", item_prices);
  highest_shipping_price = calculateHighestPrice("shipping", shipping_prices);
  highest_total_price = highest_item_price + highest_shipping_price;

  // Calculate all median prices
  median_item_price = calculateMedianPrice("item", item_prices);
  median_shipping_price = calculateMedianPrice("shipping", shipping_prices);
  median_total_price = median_item_price + median_shipping_price;

  // Calculate sums of all prices
  sum_item_price = calculatePricesSum("item", item_prices);
  sum_shipping_price = calculatePricesSum("shipping", shipping_prices);
  sum_total_price = sum_item_price + sum_shipping_price;

  // Count all prices
  count_item_prices = countPrices("item", item_prices);
  count_shipping_prices = countPrices("shipping", shipping_prices);
  count_total_prices = Math.max(count_item_prices, count_shipping_prices);

  // Create an element to display the price statistics
  listingPriceStatistics = document.createElement("div");
  listingPriceStatistics.id = "ebay-price-stats";
  listingPriceStatistics.innerHTML = `
<h2>eBay Price Stats</h2>
<table class="stats">
  <thead>
    <tr>
      <th>Statistic</th>
      <th>Item Price</th>
      <th>Shipping Price</th>
      <th>Total Price</th>
    </tr>
  </thead>
  <tbody>
    <tr class="minimum">
      <th>Lowest</th>
      <td>${formatter.format(lowest_item_price)}</td>
      <td>${formatter.format(lowest_shipping_price)}</td>
      <td>${formatter.format(lowest_total_price)}</td>
    </tr>
    <tr class="average">
      <th>Average</th>
      <td>${formatter.format(average_item_price)}</td>
      <td>${formatter.format(average_shipping_price)}</td>
      <td class="highlight">${formatter.format(average_total_price)}</td>
    </tr>
    <tr class="median">
      <th>Median</th>
      <td>${formatter.format(median_item_price)}</td>
      <td>${formatter.format(median_shipping_price)}</td>
      <td class="highlight">${formatter.format(median_total_price)}</td>
    </tr>
    <tr class="maximum">
      <th>Highest</th>
      <td>${formatter.format(highest_item_price)}</td>
      <td>${formatter.format(highest_shipping_price)}</td>
      <td>${formatter.format(highest_total_price)}</td>
    </tr>
    <tr class="sum">
      <th>Total</th>
      <td>${formatter.format(sum_item_price)}</td>
      <td>${formatter.format(sum_shipping_price)}</td>
      <td>${formatter.format(sum_total_price)}</td>
    </tr>
    <tr>
      <th>Count</th>
      <td>${count_item_prices}</td>
      <td>${count_shipping_prices}</td>
      <td>${count_total_prices}</td>
    </tr>
  </tbody>
</table>
  `;

  // Insert the element into the page
  document.body.insertBefore(listingPriceStatistics, document.body.firstChild);
});
