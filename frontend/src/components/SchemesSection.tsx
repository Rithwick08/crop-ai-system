import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Sprout } from 'lucide-react';
import schemesData from '../data/schemes.json';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function SchemesSection() {
    const { t } = useTranslation();
    const featuredSchemes = schemesData.slice(0, 3); // Show top 3 schemes

    return (
        <section id="schemes" className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-zinc-950 transition-colors">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-in slide-in-from-bottom-5 duration-700">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                            <Sprout className="h-8 w-8 text-green-600" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                            {t('schemes.title', 'Government Schemes')}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t('schemes.subtitle', 'Explore financial support, insurance, and subsidies available for farmers.')}
                        </p>
                    </div>
                    <div>
                        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white shadow-lg group">
                            <Link to="/schemes" className="flex items-center gap-2">
                                {t('schemes.viewAll', 'View All Schemes')} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredSchemes.map((scheme) => (
                        <div
                            key={scheme.id}
                            className="group relative h-[250px] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            {/* Background Image */}
                            <img
                                src={scheme.image}
                                alt={scheme.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80"; // Fallback image
                                }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold text-white mb-1 leading-tight">
                                    {t(`schemesData.${scheme.id}.name`, scheme.name)}
                                </h3>
                                <p className="text-green-300 font-medium drop-shadow-sm">
                                    {t(`schemesData.${scheme.id}.benefit`, scheme.benefit)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white w-full">
                        <Link to="/schemes">
                            {t('schemes.viewAll', 'View All Schemes')}
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
