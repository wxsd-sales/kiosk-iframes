 export default class getColor {

	static processTelemetry(type: 'ambientTemp' | 'airQuality' | 'relativeHumidity' | 'ambientNoise', data: string){
		switch (type) {
			case 'ambientTemp':
				return getColor.getTempColor(data);
			case 'relativeHumidity':
				return getColor.getHumidityColor(data);
			case 'ambientNoise':
				return getColor.getAmbientNoiseColor(data);
			case 'airQuality':
				return getColor.getAirQuality(data);
		}
	}

	static getAmbientNoiseColor(value: string): string {
		switch (value) {
			case 'Quiet':
				return 'success';
			case 'Very Quiet':
				return 'success';
			default:
				return 'success';
		}
	}

	static getHumidityColor(humidity: string): "success" | "warning" | "danger" {
		let temp = Number(humidity.slice(0, -1));
		if (temp < 20) {
			return 'success';
		} else if (temp >= 20 && temp < 40) {
			return 'warning';
		} else if (temp >= 40 && temp <= 90) {
			return 'danger';
		} else {
			return 'success';
		}
	}

	static getTempColor(value: string): "success" | "warning" | "info" | "red" {
		let temp = Number(value.slice(0, -2));
		if (temp < 73) {
			return 'info';
		} else if (temp >= 73 && temp < 80) {
			return 'success';
		} else if (temp >= 80 && temp <= 90) {
			return 'warning';
		} else {
			return 'success';
		}
	}

	static getPeopleCountColor(event: { peopleCount: number; capacity: number; }): "success" | "warning" | "danger" | 'success' {
		let percent = Math.round((event.peopleCount / event.capacity) * 100);
		if (percent < 70) {
			return 'success';
		} else if (percent >= 70 && percent < 85) {
			return 'warning';
		} else if (percent >= 85) {
			return 'danger';
		} else {
			return 'success';
		}
	}

	static getAirQuality(value: string) {
		switch (value) {
			case 'Good':
				return 'success';
			case 'Very Good':
				return 'success';
			case 'Medium':
				return 'warning';
			case 'High':
				return 'danger';
			default:
				return 'success';
		}
	}
}