function processParams(query, sortedOutput, errorMessage) {
  let { page, quantity } = query;

  if (quantity === undefined) {
    quantity = sortedOutput.length;
  }

  if(page === undefined) {
    page = 1;
  } else if (page > Math.ceil(sortedOutput.length / quantity)) {
    throw new Error(errorMessage);
  }

  return {
    page: page,
    quantity: quantity
  };
}

module.exports = processParams;