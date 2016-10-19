/* TODO : Créer le modèle objet ici */ 

export class Sensor{
	constructor(data){
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
		this.values = data.values;
		this.labels = data.labels;
	}
}

export class Datum extends Data{
	constructor(data){
		super(data);
		this.value = data.value;
	}
}