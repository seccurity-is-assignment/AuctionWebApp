/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	autoUpdatedAt: true,
	autoCreateAt: true,

	attributes: {
		id: {
	      type: 'string'
	    },

	  	name: {
	  		type: 'string'
	  	},

	  	curPrice: {
	  		type: 'float'
	  	},

	  	immediatePrice: {
	  		type: 'float'
	  	},

	  	owner: {
	  		tpye: 'integer'
	  	},

	  	highestBidder: {
	  		type: 'integer'
	  	},

	  	startingTime: {
	  		type: 'datetime'
	  	},

	  	finishingTime: {
	  		type: 'datetime'
	  	}

	}
};

