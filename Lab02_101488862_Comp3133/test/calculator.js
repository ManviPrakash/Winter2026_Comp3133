const chai = require('chai');
const expect = chai.expect;
const calculator = require('../calculator'); // make sure path is correct



// Helper function to print custom messages
function runTest(actual, expected, testName) {
    if (actual === expected) {
        console.log(`${testName}: PASS`);
    } else {
        console.log(`${testName}: FAIL (expected ${expected}, got ${actual})`);
    }
}

describe('Calculator Tests', function() {

    // ---------- ADDITION ----------
    describe('Addition', function() {
        it('add(5, 2) should PASS', function() {
            runTest(calculator.add(5, 2), 7, 'Addition PASS Test');
        });

        it('add(5, 2) should FAIL', function() {
            runTest(calculator.add(5, 2), 8, 'Addition FAIL Test');
        });
    });

    // ---------- SUBTRACTION ----------
    describe('Subtraction', function() {
        it('sub(5, 2) should PASS', function() {
            runTest(calculator.sub(5, 2), 3, 'Subtraction PASS Test');
        });

        it('sub(5, 2) should FAIL', function() {
            runTest(calculator.sub(5, 2), 5, 'Subtraction FAIL Test');
        });
    });

    // ---------- MULTIPLICATION ----------
    describe('Multiplication', function() {
        it('mul(5, 2) should PASS', function() {
            runTest(calculator.mul(5, 2), 10, 'Multiplication PASS Test');
        });

        it('mul(5, 2) should FAIL', function() {
            runTest(calculator.mul(5, 2), 12, 'Multiplication FAIL Test');
        });
    });

    // ---------- DIVISION ----------
    describe('Division', function() {
        it('div(10, 2) should PASS', function() {
            runTest(calculator.div(10, 2), 5, 'Division PASS Test');
        });

        it('div(10, 2) should FAIL', function() {
            runTest(calculator.div(10, 2), 2, 'Division FAIL Test');
        });
    });

});
