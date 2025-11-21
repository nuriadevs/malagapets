'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaPhone, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaGlobe, FaHospital, FaUserMd } from 'react-icons/fa';
import { VeterinaryCenter, VeterinaryData, PhoneData, FormattedPhone } from '@/types/veterinary';

interface VeterinaryCentersCardsProps {
    jsonFileName?: string;
}

export const VeterinaryCentersCards = ({
    jsonFileName = 'centrosVet.json',
}: VeterinaryCentersCardsProps) => {
    const [centers, setCenters] = useState<VeterinaryCenter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const formatPhoneNumbers = useCallback((phones: PhoneData[]): FormattedPhone[] =>
        phones
            .filter((p): p is PhoneData & { number: string } => Boolean(p.number))
            .map(p => ({
                type: p.type,
                number: p.number,
                displayText: `${p.type}: ${p.number}`,
            })), []);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/data/${jsonFileName}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al cargar datos: ${response.status} ${response.statusText}`);
                }

                const data: VeterinaryData = await response.json();

                if (!data.veterinaryCenters || !Array.isArray(data.veterinaryCenters)) {
                    throw new Error('Formato de datos inválido');
                }

                setCenters(data.veterinaryCenters);
            } catch (err) {
                console.error('Error cargando centros veterinarios:', err);
                setError(err instanceof Error ? err.message : 'Error desconocido al cargar datos');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [jsonFileName]);

    const handleRetry = useCallback(() => {
        setError(null);
        window.location.reload();
    }, []);

    const renderedCenters = useMemo(() => {
        return centers.map(center => {
            const phones = formatPhoneNumbers(center.phone);

            // Subtítulo según tipo
            const subTitle = center.type === 'hospital'
                ? 'Hospital'
                : 'Clínica';
            return (

                <article
                    key={center.id}
                    aria-labelledby={`center-${center.id}-name`}
                >
                    <div className="animate-fade-in hover-lift bg-card border border-success/20 rounded-xl overflow-hidden shadow-lg hover:shadow-vet transition-all duration-300 hover-lift-subtle">
                        {/* Header */}
                        <div className="relative px-6 py-5 bg-cyan-600"
                        >
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="relative flex items-center justify-start space-x-3 text-white">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    {center.type === 'hospital' ? (
                                        <FaHospital className="w-5 h-5" />
                                    ) : (
                                        <FaUserMd className="w-5 h-5" />
                                    )}
                                </div>
                                <span className="font-semibold text-sm uppercase tracking-wider">
                                    {subTitle} Veterinario
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            <h3
                                id={`center-${center.id}-name`}
                                className="text-xl font-bold text-card-foreground line-clamp-2 leading-tight"
                            >
                                {center.name}
                            </h3>

                            {/* Address */}
                            <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-success/5 via-success/8 to-success/5 border border-success/10 rounded-xl backdrop-blur-sm">
                                <div className="p-2.5 bg-success/15 rounded-xl border border-success/20 shadow-sm">
                                    <FaMapMarkerAlt className="w-4 h-4 text-success" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-success/80 font-semibold mb-1.5 uppercase tracking-wide">Ubicación</p>
                                    <p className="text-card-foreground text-sm leading-relaxed font-medium">{center.address}</p>
                                    <div className="mt-2 inline-flex items-center px-2 py-1 bg-success/10 rounded-lg border border-success/20">
                                        <span className="text-success font-bold text-xs">CP: {center.postalCode}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Phones */}
                            <div className="bg-gradient-to-r from-success/5 via-success/8 to-success/5 border border-success/10 rounded-xl backdrop-blur-sm  p-5 shadow-sm">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="p-2 bg-success/15 rounded-xl border border-success/20 shadow-sm">
                                        <FaPhone className="w-4 h-4 text-success" />
                                    </div>
                                    <div>
                                        <span className="text-sm text-success/80 font-semibold mb-1.5 uppercase tracking-wide">TELÉFONO</span>
                                        
                                    </div>
                                </div>
                                <div className="space-y-2.5">
                                    {phones.map((phone, idx) => (
                                        <a
                                            key={idx}
                                            href={`tel:${phone.number}`}
                                            className="group/phone flex items-center justify-between p-3 bg-white/70 dark:bg-slate-800/60 hover:bg-success/10 dark:hover:bg-success/20 rounded-lg transition-all duration-200 border border-transparent hover:border-success/30 shadow-sm hover:shadow-md"
                                            aria-label={`Llamar al ${phone.type}: ${phone.number}`}
                                        >
                                            <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider bg-slate-100/80 dark:bg-slate-700/80 px-2 py-1 rounded-md">
                                                {phone.type}
                                            </span>
                                            <span className="text-sm font-mono text-success font-semibold group-hover/phone:text-success/80 transition-colors">
                                                {phone.number}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Schedule and Days */}
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center gap-3 bg-gradient-to-r from-success/5 via-success/8 to-success/5 border border-success/10 rounded-xl backdrop-blur-sm px-4 py-3 shadow-sm">
                                    <div className="p-2 bg-success/15 rounded-xl border border-success/20 shadow-sm">
                                        <FaClock className="w-4 h-4 text-success" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-success/80 font-semibold mb-1.5 uppercase tracking-wide">Horario</p>
                                        <span className="text-sm font-medium text-card-foreground">{center.schedule}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-gradient-to-r from-success/5 via-success/8 to-success/5 border border-success/10 rounded-xl backdrop-blur-sm px-4 py-3 shadow-s">
                                    <div className="p-2 bg-success/15 rounded-xl border border-success/20 shadow-sm">
                                        <FaCalendarAlt className="w-4 h-4 text-success" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-success/80 font-semibold mb-1.5 uppercase tracking-wide">Disponibilidad</p>
                                        <span className="text-sm font-medium text-card-foreground">{center.daysOpen}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps */}
                            {center.googleMapsUrl && (
                                <a
                                    href={center.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/maps inline-flex items-center justify-center w-full px-5 py-4
            text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]
            focus:outline-none focus:ring-2 focus:ring-offset-2 bg-cyan-600 hover:bg-cyan-700 border border-bg-cyan-800 focus:ring-bg-cyan-750"
                                    aria-label={`Ver ${center.name} en Google Maps`}
                                >
                                    <FaGlobe className="w-5 h-5 mr-3 transition-transform duration-300 group-hover/maps:rotate-12 group-hover/maps:scale-110" />
                                    <span className="text-base tracking-wide">Ver en Google Maps</span>
                                </a>
                            )}

                        </div>
                    </div>
                </article>
            );
        });
    }, [centers, formatPhoneNumbers]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[16rem]" role="status" aria-live="polite">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-lg text-muted-foreground">Cargando centros veterinarios...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6 text-center" role="alert">
                <div className="text-red-600 dark:text-red-400 text-lg font-semibold mb-2">
                    Error al cargar centros veterinarios
                </div>
                <div className="text-red-700 dark:text-red-200 mb-4">{error}</div>
                <button
                    onClick={handleRetry}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen mx-auto container">


            {/* Cards */}
            <div className="container mx-auto px-4 py-16">
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    role="region"
                    aria-label="Lista de centros veterinarios"
                >
                    {renderedCenters}
                </div>

                {centers.length === 0 && !loading && !error && (

                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 border-2 border-success/20 rounded-2xl mb-6">
                            <FaHospital className="w-10 h-10 text-success" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-success">
                            No se encontraron centros veterinarios
                        </h3>
                        <p className="text-muted-foreground text-lg max-w-md mx-auto">
                            Verifica que el archivo JSON contenga datos válidos y vuelve a intentarlo.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 px-6 py-3 bg-success text-white font-semibold rounded-xl hover:bg-success/90 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-success/50"
                        >
                            Recargar página
                        </button>
                    </div>

                )}
            </div>
        </div>
    );
};