export class getColor{


    /**
     * @param {any} value
     */
     getAmbientNoiseColor(value) {
		switch (value) {
			case 'Quiet':
				return 'success';
			case 'Very Quiet':
				return 'success';
			default:
				return 'warning';
		}
	}

    /**
     * @param {string} humidity
     */
     getHumidityColor(humidity) {
		let temp =  Number(humidity.slice(0, -1));
		if (temp < 20) {
			return 'success';
		} else if (temp >= 20 && temp < 40) {
			return 'warning';
		} else if (temp >= 40 && temp <= 90) {
			return 'danger';
		} else {
			return 'danger';
		}
	}

    /**
     * @param {string | any[]} value
     */
     getTempColor(value) {
		let temp =  Number(value.slice(0, -2));
		if (temp < 73) {
			return 'Info';
		} else if (temp >= 73 && temp < 80) {
			return 'success';
		} else if (temp >= 80 && temp <= 90) {
			return 'orange';
		} else {
			return 'red';
		}
	}


    /**
     * @param {{ peopleCount: number; capacity: number; }} event
     */
     getPeopleCountColor(event) {
		let percent = Math.round((event.peopleCount / event.capacity) * 100);
		if (percent < 70) {
			return 'success';
		} else if (percent >= 70 && percent < 85) {
			return 'warning';
		} else if (percent >= 85) {
			return 'danger';
		}
	}
    
      /**
     * @param {any} value
     */
      getAirQuality(value) {
		switch (value) {
			case 'Good':
				return 'success';
			case 'Very Good':
				return 'success';
			case 'Medium':
				return 'success';
			case 'High':
				return 'danger';
			default:
				return 'warning';
		}
	}


}