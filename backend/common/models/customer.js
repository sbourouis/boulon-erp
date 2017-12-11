'use strict';

module.exports = function(Customer) {
  Customer.validatesPresenceOf('name');
  Customer.validatesUniquenessOf('name', {message: 'name is not unique'});
};
