/**
 * TODO comment
 */

let sinon = require('sinon');
let expect = require('chai').expect;
let queries = require('../../service/queries');
let jqc = require('../../service/sparqlUrlMachine/jsonQueryConverter');
let stored = require('../../service/sparqlUrlMachine/storedQueries');

describe('Test queries.js', function () {

    describe('Test findBuilding', function () {

        it('Should return latitude and longitude of a building on success', function (done) {

            let stubStored = sinon.stub(stored, 'building').returns(undefined);
            let stubJQC = sinon.stub(jqc, 'getOfferings');
            stubJQC.yields([{o: {value: 1}}, {o: {value: 2}}]);

            queries.findBuilding('32', function (result) {
                stubStored.restore();
                stubJQC.restore();
                expect(result.lat).to.be.equal(1);
                expect(result.long).to.be.equal(2);
                done();
            })

        });

        it('Should return string on failure', function (done) {

            let stubStored = sinon.stub(stored, 'building').returns(undefined);
            let stubJQC = sinon.stub(jqc, 'getOfferings');
            stubJQC.yields([{}]);

            queries.findBuilding('BAD_VALUE', function (result) {
                stubStored.restore();
                stubJQC.restore();
                expect(result).to.be.equal('Something went wrong...');
                done();
            })

        });

    });

});