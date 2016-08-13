'use strict';

var expect = require('chai').expect;
var mosc   = require('../mosc');

describe('#MoscModelBuilder', function () {

	it('Should return {id:{type:"string"}}', function () {
		var result = new mosc({}).chain('id', 'type:string').end(); 
		expect(result).to.have.property('id').to.have.property('type').to.equal('string');
	});

});