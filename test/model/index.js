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
  /* TODO: Ecrire ici la suite de tests pourle modèle objet.*/
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
