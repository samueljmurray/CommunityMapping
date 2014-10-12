/**
 * specinit.js
 *
 * Intialize test harness
 */

/* Includes */
var chai = require('chai'),
    sinonChai = require("sinon-chai");

global.expect = chai.expect;
global.sinon = require('sinon');
chai.use(sinonChai);