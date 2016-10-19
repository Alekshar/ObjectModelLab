import expect from 'expect';

import { Factory } from '../../src/model';
import { Sensor } from '../../src/model';
import { Temperature } from '../../src/model';
import { FanSpeed } from '../../src/model';
import { Door } from '../../src/model';
import { Data } from '../../src/model';
import { Datum } from '../../src/model';
import { TimeSeries } from '../../src/model';

import  { data }  from './sensors_data'
console.log(data.length);

describe('Sensor model tests', () => {
	describe("basic sensor factory", function(){
			it("first data should be a temperature sensor with timeseries data type", function(){
				var factory = new Factory();
				var temp = factory.createSensor(data[0]);
				expect(temp instanceof Temperature).toBeTruthy();
				expect(temp.data instanceof TimeSeries).toBeTruthy();
			});
			it("second data should be a door sensor with datum data type", function(){
				var factory = new Factory();
				var temp = factory.createSensor(data[1]);
				expect(temp instanceof Door).toBeTruthy();
				expect(temp.data instanceof Datum).toBeTruthy();
			});
			it("first data should be a fanspeed sensor with timeseries data type", function(){
				var factory = new Factory();
				var temp = factory.createSensor(data[2]);
				expect(temp instanceof FanSpeed).toBeTruthy();
				expect(temp.data instanceof TimeSeries).toBeTruthy();
			});
	});
	describe("Sensor throw errors on bad parameters types", function(){
		it("id should be an integer", function(){
			expect(function (){new Sensor({id:"error", name:"test", data:{value:0}})}).toThrow("id should be an integer");
			expect(function (){new Sensor({id:25.18, name:"test", data:{value:0}})}).toThrow("id should be an integer");
		});
	});
	describe("Datum throw errors on bad parameters types", function(){
		it("expected attribute 'value' in parameter", function(){
			expect(function (){new Datum({values:0})}).toThrow("expected attribute 'value' in parameter");
		});
	});
	describe("TimeSeries throw errors on bad parameters types", function(){
		it("expected array 'values' in parameters", function(){
			expect(function (){new TimeSeries({labels:[]})}).toThrow("expected array 'values' in parameters");
			expect(function (){new TimeSeries({values:0, labels:[]})}).toThrow("expected array 'values' in parameters");
		});
		it("expected array 'labels' in parameters", function(){
			expect(function (){new TimeSeries({values:[]})}).toThrow("expected array 'labels' in parameters");
			expect(function (){new TimeSeries({values:[], labels:0})}).toThrow("expected array 'labels' in parameters");
		});
		it("expected array 'values' to be full of integers", function(){
			expect(function (){new TimeSeries({values:["2"], labels:["2016-10-19T10:00:00.000Z"]})}).toThrow("expected array 'values' to be full of integers");
		});
		it("expected array 'labels' to be full of iso dates", function(){
			expect(function (){new TimeSeries({values:[1], labels:["0"]})}).toThrow("expected array 'labels' to be full of iso dates");
		});
		it("expected arrays to have the same length", function(){
			expect(function (){new TimeSeries({values:[1, 2], labels:["2016-10-19T10:00:00.000Z"]})}).toThrow("expected arrays to have the same length");
		});
	});
	describe("TimeSeries methods", function(){
		it("getValuesCount", function(){
			expect(new TimeSeries({values:[1, 5], labels:["2016-10-19T10:00:00.000Z", "2016-10-19T10:00:00.000Z"]}).getValuesCount()).toBe(2);
		});
		it("getLastMeasureDate", function(){
			expect(new TimeSeries({values:[1, 5], labels:["2016-10-19T10:00:00.000Z", "2016-10-19T12:00:00.000Z"]}).getLastMeasureDate()).toEqual(new Date("2016-10-19T12:00:00.000Z"));
		});
		it("getLastMeasureValue", function(){
			expect(new TimeSeries({values:[1, 5], labels:["2016-10-19T10:00:00.000Z", "2016-10-19T12:00:00.000Z"]}).getLastMeasureValue()).toBe(5);
		});
		it("getAverageValue", function(){
			expect(new TimeSeries({values:[0, 5], labels:["2016-10-19T10:00:00.000Z", "2016-10-19T12:00:00.000Z"]}).getAverageValue()).toBe(2.5);
		});
	});
	
//	 nombre de valeurs, valeur moyenne, date de dernière mesure
});
