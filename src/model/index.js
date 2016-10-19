/* TODO : Créer le modèle objet ici */ 

export class Sensor{
	constructor(data){
		if(!Number.isInteger(data.id)){
			throw "id should be an integer";
		}
		this.id = data.id;
		this.name = data.name;
		this.data = new Factory().createData(data.data);
	}
}

export class Factory{
	constructor(){
	}
	createSensor(data){
		switch(data.type){
		case "TEMPERATURE":
			return new Temperature(data);
		case "DOOR":
			return new Door(data);
		case "FAN_SPEED":
			return new FanSpeed(data);
		}
	}

	createData(data){
		if(Array.isArray(data.values) && Array.isArray(data.labels)){
			return new TimeSeries(data);
		} else {
			return new Datum(data);
		}
	}
}

export class Temperature extends Sensor{
	constructor(data){
		super(data);
	}
}

export class Door extends Sensor{
	constructor(data){
		super(data);
	}
}

export class FanSpeed extends Sensor{
	constructor(data){
		super(data);
	}
}


export class Data{
	constructor(){
	}
}

export class TimeSeries extends Data{
	constructor(data){
		super(data);
		if(!Array.isArray(data.values)){
			throw "expected array 'values' in parameters";
		}
		if(!Array.isArray( data.labels)){
			throw "expected array 'labels' in parameters";
		}
		if(data.values.length != data.labels.length){
			throw "expected arrays to have the same length";
		}
		for(var i in data.values){
			if(!Number.isInteger(data.values[i])){
				throw "expected array 'values' to be full of integers";
			}
			if(new Date(data.labels[i]).toISOString() !== data.labels[i]){
				throw "expected array 'labels' to be full of iso dates";
			}
		}
		this.values = data.values;
		this.labels = data.labels;
	}
	
	getValuesCount(){
		return this.values.length;
	}
	
	getLastMeasureDate(){
		var lastDate = new Date("0");
		for(var i in this.values){
			var date = new Date(this.labels[i]);
			if(date.getTime() > lastDate.getTime()){
				lastDate = date;
			}
		}
		return lastDate;
	}
	
	getLastMeasureValue(){
		var lastDate = new Date("0");
		var lastValue = 0;
		for(var i in this.values){
			var date = new Date(this.labels[i]);
			if(date.getTime() > lastDate.getTime()){
				lastDate = date;
				lastValue = this.values[i];
			}
		}
		return lastValue;
	}
	
	getAverageValue(){
		var total=0;
		for(var i in this.values){
			total+=this.values[i];
		}
		return total / this.getValuesCount();
	}
}

export class Datum extends Data{
	constructor(data){
		super(data);
		if(typeof data.value == 'undefined'){
			throw "expected attribute 'value' in parameter";
		}
		this.value = data.value;
	}
}