"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function processParams(query, sortedOutput, errorMessage) {
    var page = query.page ? Number(query.page) : 1;
    var quantity = query.quantity ? Number(query.quantity) : sortedOutput.length;
    if (page > Math.ceil(sortedOutput.length / quantity)) {
        throw new Error(errorMessage);
    }
    return {
        page: page,
        quantity: quantity
    };
}
exports.processParams = processParams;
