export interface PhoneData {
    type: string;
    number: string | null;
}

export interface FormattedPhone {
    type: string;
    number: string;
    displayText: string;
}

export interface VeterinaryCenter {
    id: number;
    type: "hospital" | "clinic";
    name: string;
    address: string;
    phone: PhoneData[];
    postalCode: string;
    schedule: string;
    daysOpen: string;
    website?: string;
    email?: string;
    googleMapsUrl?: string;
}

export interface VeterinaryData {
    veterinaryCenters: VeterinaryCenter[];
}
