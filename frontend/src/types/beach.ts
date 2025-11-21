export interface Beach {
    id: number;
    name: string;
    municipality: string;
    locality?: string;
    googleMapsUrl: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    detailed_location: string;
    features: {
        length: string;
        total_area: string;
    };
    services: {
        dog_shower: boolean;
        water_fountain: boolean;
        trash_bins: boolean;
        parking: boolean;
        agility_area: boolean;
        bag_dispenser: boolean;
    };
    opening_hours: {
        summer: string;
        winter: string;
        year_round?: string;
    };
    certifications?: string[];
    highlights: string[];
}

export interface BeachesData {
    beaches: Beach[];
}