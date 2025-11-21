// src/lib/data/beaches.ts
export const beachesData = [
    {
        id: 1,
        name: "Playa Canina de Torre del Mar",
        municipality: "Vélez-Málaga",
        locality: "Torre del Mar",
        province: "Málaga",
        region: "Andalucía",
        googleMapsUrl: "https://www.google.com/maps/place/36.7277968,-4.1048616",
        coordinates: {
            latitude: 36.7277968,
            longitude: -4.1048616,
        },
        detailed_location:
            "Tramo del Mortero, situada en el extremo occidental de la playa de Torre del Mar",
        features: {
            ground_type: "Arena fina oscura",
            wave_conditions: "Moderado",
            water_quality: "Limpia (no apta oficialmente para baño humano)",
            total_area: "4000 m²",
            length: "Aprox. 200 metros lineales",
            dog_toilet_area: "150 m²",
            play_area: "250 m²",
            occupancy: "Media-alta",
            environment: "Semi-urbano con valor ecológico",
        },
        services: {
            dog_shower: true,
            water_fountain: true,
            trash_bins: true,
            agility_area: true,
            agility_elements: [
                "Columpio",
                "Dos barras de equilibrio",
                "Zona de saltos",
                "Rueda para saltar",
                "Túnel",
                "Dos zonas de descanso escalonadas",
                "Rampa",
            ],
            bag_dispenser: true,
            nearby_beach_bars: true,
            parking: true,
            lifeguard_service: false,
            regulation_signage: true,
        },
        certifications: [
            "Primera playa canina andaluza con certificación Q de calidad turística",
        ],
        opening_hours: {
            summer: "9:00 - 22:00",
            winter: "Todo el día",
        },
        regulations: {
            required_document: true,
            microchip: true,
            vaccination_card: true,
            pick_up_droppings: true,
            constant_supervision: true,
            dangerous_dogs_muzzle: true,
            dangerous_dogs_prohibited: false,
            over_20kg_muzzle: false,
            human_bathing_prohibited: true,
        },
        access: {
            type: "Fácil",
            by_car: true,
            nearby_parking: "Parking junto al camping La Laguna",
            references:
                "Pasando el camping La Laguna, cerca de la casilla de Vicente",
        },
        highlights: [
            "Mejor equipada de todas las playas caninas de Málaga",
            "Amplia zona de agility y juegos",
            "Primera con certificación Q de calidad",
            "Agua limpia y entorno natural",
            "Servicio de limpieza diaria en verano",
        ],
        status: "Active 2025",
        inauguration: "10 de agosto de 2016",
    },
    {
        id: 2,
        name: "Playa Canina del Castillo (Castillo Sohail)",
        municipality: "Fuengirola",
        province: "Málaga",
        region: "Andalucía",
        googleMapsUrl: "https://www.google.com/maps/place/36.523778,-4.628042",
        coordinates: {
            latitude: 36.523778,
            longitude: -4.628042,
            precision: "aproximada",
        },
        detailed_location:
            "Junto al Castillo Sohail, desembocadura del río Fuengirola, extremo sur del municipio, límite con Mijas",
        features: {
            ground_type: "Arena fina y oscura con algunas piedras pequeñas",
            wave_conditions: "Tranquilo",
            water_quality: "Buena (apta para baño)",
            total_area: "3424 m²",
            length: "800 metros",
            average_width: "50 metros",
            occupancy: "Media",
            environment: "Urbano, junto a monumento histórico (Castillo del siglo X)",
        },
        services: {
            dog_shower: true,
            shower_quantity: 2,
            water_fountain: true,
            trash_bins: true,
            bag_dispenser: true,
            fenced: true,
            fence_type: "Vallas de madera con puertas con cerrojo",
            nearby_beach_bars: true,
            beach_bar_count: 2,
            parking: true,
            parking_type: "Parking gratuito bajo Castillo Sohail (80-90 plazas)",
            picnic_area: true,
            sports_area: true,
            parkour_facilities: true,
            children_area: true,
            lifeguard_service: false,
            regulation_signage: true,
        },
        certifications: ["Certificación Q de Calidad Turística"],
        opening_hours: {
            summer: "10:00 - 23:00",
            winter: "10:00 - 21:00",
            year_round: true,
        },
        regulations: {
            required_document: true,
            microchip: true,
            vaccination_card: true,
            pick_up_droppings: true,
            constant_supervision: true,
            dangerous_dogs_prohibited: true,
            over_20kg_muzzle: true,
            leash_mandatory: false,
            fishing_prohibited: true,
            dogs_in_heat_prohibited: false,
        },
        access: {
            type: "Muy fácil",
            by_car: true,
            on_foot: true,
            distance_from_center: "1.5 km desde centro Fuengirola",
            access_road: "A-7",
            driving_time: "Menos de 10 minutos desde el centro",
            references:
                "Salida cercana al camping de Fuengirola, dirección Castillo Sohail",
        },
        highlights: [
            "Una de las primeras playas caninas de Málaga (desde 2014)",
            "Mejor valorada por usuarios",
            "Entorno histórico junto al Castillo Sohail",
            "Aguas aptas para el baño (excepción en Andalucía)",
            "Muy bien equipada y señalizada",
            "Fácil acceso y buen aparcamiento",
        ],
        public_transport: {
            dogs_allowed: true,
            conditions: "Hasta 25kg, atados con bozal, pagan 50% del billete",
            dangerous_dogs_prohibited: true,
        },
        status: "Activa 2025",
        inauguration: "2014",
    },
    {
        id: 3,
        name: "Playa Canina Arroyo Totalán",
        municipality: "Málaga / Rincón de la Victoria",
        locality: "Entre Málaga capital y La Cala del Moral",
        province: "Málaga",
        region: "Andalucía",
        googleMapsUrl: "https://www.google.com/maps/place/36.713438,-4.316314",
        coordinates: {
            latitude: 36.713438,
            longitude: -4.316314,
            precision: "aproximada",
        },
        detailed_location:
            "Entre los municipios de Málaga y Rincón de la Victoria, cerca de la cementera",
        features: {
            ground_type: "Arena gruesa y grava (guijarros)",
            wave_conditions: "Variable",
            water_quality: "No apta oficialmente para baño humano",
            total_area: "Pequeña-mediana",
            occupancy: "Baja-media",
            environment: "Semi-natural",
        },
        services: {
            dog_shower: false,
            shower: true,
            water_fountain: true,
            trash_bins: true,
            nearby_beach_bars: true,
            parking: true,
            lifeguard_service: false,
            regulation_signage: true,
        },
        opening_hours: {
            year_round: true,
        },
        regulations: {
            required_document: true,
            microchip: true,
            vaccination_card: true,
            pick_up_droppings: true,
            constant_supervision: true,
            dangerous_dogs_prohibited: false,
            dangerous_dogs_muzzle: true,
            over_20kg_muzzle: true,
            human_bathing_prohibited: true,
        },
        access: {
            type: "Fácil",
            by_car: true,
            distance_from_malaga: "Cercana a Málaga capital",
            references: "Entre Málaga y La Cala del Moral, zona de la cementera",
        },
        highlights: [
            "Más cercana a Málaga capital",
            "Menos concurrida que otras playas",
            "Buena para un día tranquilo con tu perro",
        ],
        status: "Activa 2025",
    },
    {
        id: 4,
        name: "Playa Canina El Pinillo",
        municipality: "Marbella",
        province: "Málaga",
        region: "Andalucía",
        googleMapsUrl: "https://www.google.com/maps/place/36.5061909,-4.8521576",
        coordinates: {
            latitude: 36.5061909,
            longitude: -4.8521576,
            precision: "aproximada",
        },
        detailed_location:
            "Zona de El Pinillo, a las afueras de Marbella, una de las zonas más tranquilas",
        features: {
            ground_type: "Arena con algunas piedras",
            wave_conditions: "Tranquilo",
            water_quality: "Limpia",
            length: "250 metros",
            occupancy: "Baja (menos concurrida incluso en verano)",
            environment: "Semi-urbano, zona tranquila",
        },
        services: {
            dog_shower: true,
            water_fountain: true,
            trash_bins: true,
            delimited_bathing_zone: true,
            parking: true,
            parking_type: "Cercano con fácil acceso",
            parallel_road: "Carretera nacional",
            lifeguard_service: false,
            regulation_signage: true,
        },
        opening_hours: {
            year_round: true,
        },
        regulations: {
            required_document: true,
            microchip: true,
            vaccination_card: true,
            pick_up_droppings: true,
            constant_supervision: true,
            dangerous_dogs_muzzle: true,
        },
        access: {
            type: "Sencillo",
            by_car: true,
            references: "A las afueras de Marbella, acceso por carretera nacional",
        },
        highlights: [
            "Zona muy tranquila de Marbella",
            "Menos concurrida que otras playas",
            "Menos piedras que otras playas caninas de la provincia",
            "Agua limpia y zona delimitada para perros",
            "Cerca del famoso arco de entrada a Marbella",
        ],
        status: "Activa 2025",
    },
    {
        id: 5,
        name: "Playa Canina Ventura del Mar (Nueva Andalucía)",
        municipality: "Marbella",
        locality: "Nueva Andalucía",
        province: "Málaga",
        region: "Andalucía",
        googleMapsUrl: "https://www.google.com/maps/place/36.4802755,-4.9696213",
        coordinates: {
            latitude: 36.4802755,
            longitude: -4.9696213,
            precision: "aproximada",
        },
        detailed_location:
            "Zona occidental de la Playa de Nueva Andalucía, cerca de la desembocadura del río Guadaliza, cerca de Puerto Banús",
        features: {
            ground_type: "Arena oscura con piedras",
            wave_conditions: "Moderado",
            water_quality: "Buena",
            length: "250 metros",
            occupancy: "Media",
            environment: "Semi-urbano, bordeada por la Gran Senda Litoral",
        },
        services: {
            dog_shower: false,
            shower: true,
            water_fountain: false,
            trash_bins: true,
            parking: true,
            coastal_trail: true,
            lifeguard_service: false,
            regulation_signage: true,
        },
        opening_hours: {
            year_round: true,
        },
        regulations: {
            required_document: true,
            microchip: true,
            vaccination_card: true,
            pick_up_droppings: true,
            constant_supervision: true,
            do_not_disturb_users: true,
        },
        access: {
            type: "Cómodo",
            by_car: true,
            references:
                "Nueva Andalucía, cerca de Puerto Banús y desembocadura río Guadaliza",
        },
        highlights: [
            "Cerca de Puerto Banús",
            "Ambiente relajado",
            "Bordeada por la Gran Senda Litoral",
            "Zona semi-urbana bien comunicada",
        ],
        status: "Activa 2025",
    },
    {
        id: 6,
        name: "Playa Canina Piedra Paloma",
        municipality: "Casares",
        province: "Málaga",
        region: "Andalucía",
        googleMapsUrl: "https://www.google.com/maps/place/36.3863352,-5.2066351",
        coordinates: {
            latitude: 36.3863352,
            longitude: -5.2066351,
            precision: "aproximada",
        },
        detailed_location:
            "Playa de Piedra Paloma, acceso desde urbanización Casares del Mar, cerca de la Torre de La Sal",
        features: {
            ground_type: "Arena y piedra (menos piedras que otras caninas)",
            wave_conditions: "Tranquilo",
            water_quality: "Limpia",
            length: "400 metros lineales",
            occupancy: "Baja (una de las más tranquilas)",
            environment: "Natural, alto valor ecológico y paisajístico",
        },
        services: {
            dog_shower: false,
            shower: true,
            water_fountain: false,
            trash_bins: true,
            restrooms: true,
            foot_wash: true,
            delimited_bathing_zone: true,
            parking: true,
            lifeguard_service: false,
            regulation_signage: true,
        },
        nearby_points_of_interest: [
            "Torre de La Sal (siglo XVI)",
            "Arrecife de La Perla",
        ],
        opening_hours: {
            year_round: true,
        },
        regulations: {
            required_document: true,
            microchip: true,
            vaccination_card: true,
            pick_up_droppings: true,
            constant_supervision: true,
        },
        access: {
            type: "Fácil",
            by_car: true,
            references:
                "Desde urbanización Casares del Mar, cerca del límite con Cádiz",
        },
        highlights: [
            "Menos piedras que otras playas caninas",
            "Muy tranquila y poco concurrida",
            "Entorno natural privilegiado",
            "Cerca de la Torre de La Sal histórica",
            "Vistas al Arrecife de La Perla",
            "Una de las más occidentales de Málaga",
        ],
        status: "Activa 2025",
    },
    {
        id: 7,
        name: "Playa Canina Torrox",
        municipality: "Torrox",
        province: "Málaga",
        region: "Andalucía",
        googleMapsUrl: "https://www.google.com/maps/place/36.7264745,-3.9567468",
        coordinates: {
            latitude: 36.7264745,
            longitude: -3.9567468,
            precision: "aproximada",
        },
        detailed_location: "Entre el faro y el río de Torrox",
        features: {
            ground_type: "Grava",
            wave_conditions: "Variable",
            water_quality: "No apta oficialmente para baño humano",
            occupancy: "Media",
            environment: "Costero",
        },
        services: {
            easy_access: true,
            trash_bins: true,
            lifeguard_service: false,
            regulation_signage: true,
        },
        opening_hours: {
            year_round: true,
        },
        regulations: {
            required_document: true,
            microchip: true,
            vaccination_card: true,
            pick_up_droppings: true,
            constant_supervision: true,
            human_bathing_not_recommended: true,
        },
        access: {
            type: "Fácil",
            by_car: true,
            references: "Entre el faro y el río de Torrox",
        },
        highlights: ["Zona tranquila en la Axarquía", "Fácil acceso"],
        status: "Activa 2025",
    },
    {
        id: 8,
        name: "Playa Canina Las Arenas",
        municipality: "Manilva",
        province: "Málaga",
        region: "Andalucía",
        googleMapsUrl: "https://www.google.com/maps/place/36.3181398,-5.2447305",
        coordinates: {
            latitude: 36.3181398,
            longitude: -5.2447305,
            precision: "aproximada",
        },
        detailed_location:
            "Playa de Las Arenas, zona de la Urbanización Playa Paraíso, cerca de Punta Chulleras",
        features: {
            ground_type: "Arena fina y oscura con grava",
            wave_conditions: "Moderado",
            water_quality: "Limpia",
            total_area: "400 m²",
            length: "Espacio delimitado de aprox. 400 m²",
            occupancy: "Media (recién inaugurada)",
            environment: "Semi-urbano, entorno natural con valor paisajístico",
        },
        services: {
            dog_shower: false,
            water_fountain: false,
            trash_bins: true,
            bag_dispenser: false,
            fenced: true,
            fence_type: "Espacio señalizado y acotado con postes delimitadores",
            parking: true,
            parking_type:
                "Primera playa canina de Málaga con aparcamiento específico",
            nearby_beach_bars: true,
            lifeguard_service: false,
            regulation_signage: true,
            signage_quality: "Muy buena, carteles informativos claros",
        },
        opening_hours: {
            year_round: true,
        },
        regulations: {
            required_document: true,
            microchip: true,
            vaccination_card: true,
            pick_up_droppings: true,
            constant_supervision: true,
            dangerous_dogs_muzzle: true,
            over_20kg_muzzle: true,
        },
        access: {
            type: "Fácil",
            by_car: true,
            distance_from_center: "Desde Manilva centro (13 min aprox.)",
            access_road: "A-377 hacia A-7 en San Luis de Sabinillas",
            references:
                "Urbanización Playa Paraíso, cerca del límite con Cádiz y Puerto de La Duquesa (3 km)",
        },
        highlights: [
            "Playa canina más reciente de Málaga (inaugurada abril 2025)",
            "Primera playa canina de la provincia con aparcamiento específico",
            "Espacio nuevo de 400 m² bien señalizado",
            "Zona más occidental de las playas caninas de Málaga",
            "Cerca del límite con Cádiz",
            "Entorno natural privilegiado cerca de Punta Chulleras",
            "Instalaciones completamente nuevas",
        ],
        nearby_points_of_interest: [
            "Puerto Deportivo de La Duquesa (3 km)",
            "Urbanización Playa Paraíso",
            "Cala de la Sardina",
        ],
        status: "Activa 2025",
        inauguration: "Abril 2025 (27-28 de abril)",
        additional_notes:
            "Inaugurada con una fiesta canina organizada por el Ayuntamiento. Es la playa canina más nueva de toda la Costa del Sol.",
    },
] as const;



export type Beach = (typeof beachesData)[number];

// ============================================
// 🔍 FUNCIONES HELPER PARA BÚSQUEDAS
// ============================================

/**
 * Busca una playa por su ID
 * @param id - ID de la playa
 * @returns Playa encontrada o undefined
 */
export function getBeachById(id: number): Beach | undefined {
    return beachesData.find((beach) => beach.id === id);
}

/**
 * Busca playas por municipio (exacto)
 * @param municipality - Nombre del municipio
 * @returns Array de playas del municipio
 */
export function getBeachesByMunicipality(municipality: string): Beach[] {
    return beachesData.filter(
        (beach) => beach.municipality.toLowerCase() === municipality.toLowerCase()
    );
}

/**
 * Búsqueda avanzada de playas con múltiples criterios
 * @param query - Término de búsqueda (busca en nombre, municipio, localidad, ubicación)
 * @returns Array de playas que coinciden
 */
export function searchBeaches(query: string): Beach[] {
    if (!query || !query.trim()) {
        return [...beachesData];
    }

    const searchTerm = query.toLowerCase().trim();

    return beachesData.filter((beach) => {
        return (
            beach.name.toLowerCase().includes(searchTerm) ||
            beach.municipality.toLowerCase().includes(searchTerm) ||
            ("locality" in beach &&
                beach.locality?.toLowerCase().includes(searchTerm)) ||
            beach.detailed_location.toLowerCase().includes(searchTerm) ||
            beach.province.toLowerCase().includes(searchTerm)
        );
    });
}

/**
 * Filtra playas por múltiples criterios
 * @param filters - Objeto con criterios de filtrado
 * @returns Array de playas filtradas
 */
export function filterBeaches(filters: {
    name?: string;
    municipality?: string;
    status?: string;
}): Beach[] {
    let results = [...beachesData];

    if (filters.name) {
        const searchTerm = filters.name.toLowerCase();
        results = results.filter((beach) =>
            beach.name.toLowerCase().includes(searchTerm)
        );
    }

    if (filters.municipality) {
        const searchTerm = filters.municipality.toLowerCase();
        results = results.filter((beach) =>
            beach.municipality.toLowerCase().includes(searchTerm)
        );
    }

    if (filters.status) {
        results = results.filter((beach) =>
            beach.status.toLowerCase().includes(filters.status!.toLowerCase())
        );
    }

    return results;
}

/**
 * Obtiene todas las playas
 * @returns Array con todas las playas
 */
export function getAllBeaches(): Beach[] {
    return [...beachesData];
}

/**
 * Obtiene la cantidad total de playas
 * @returns Número total de playas
 */
export function getBeachesCount(): number {
    return beachesData.length;
}

/**
 * Obtiene una lista única de municipios
 * @returns Array de nombres de municipios únicos
 */
export function getUniqueMunicipalities(): string[] {
    return [...new Set(beachesData.map((beach) => beach.municipality))].sort();
}
