export type Telemetry = {
	level: string;
	ambientTemp: string;
	airQuality: string;
	relativeHumidity: string;
	ambientNoise: string;
};

export type Availablity = {
	level: string;
	totalRooms: string;
	occupiedRooms: string;
	availableRooms: string;
	booked: string;
};


export type Sensor = {
    title: string,
    icon: string,
    iconColor: string,
    type: 'ambientTemp' | 'airQuality' | 'relativeHumidity' | 'ambientNoise'
}

export type Room = {
    title: string,
    type: 'totalRooms' | 'occupiedRooms' | 'availableRooms' | 'booked'
}