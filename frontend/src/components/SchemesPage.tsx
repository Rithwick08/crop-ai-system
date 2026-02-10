import React from 'react';
import { Button } from './ui/button';
import { ExternalLink, Sprout, ArrowLeft } from 'lucide-react';
import schemesData from '../data/schemes.json';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function SchemesPage() {
    const { t } = useTranslation();

    console.log("SchemesPage rendering with data:", schemesData);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8 max-w-7xl">

                {/* Back Button */}
                <div className="mb-6">
                    <Button variant="ghost" asChild className="pl-0 hover:pl-2 transition-all">
                        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-green-600">
                            <ArrowLeft className="h-4 w-4" />
                            {t('common.backToHome', 'Back to Home')}
                        </Link>
                    </Button>
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                        <Sprout className="h-8 w-8 text-green-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                        {t('schemes.title', 'Government Schemes')}
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        {t('schemes.subtitle', 'Explore financial support, insurance, and subsidies available for farmers.')}
                    </p>
                </div>

                {/* Schemes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {schemesData.map((scheme) => (
                        <div
                            key={scheme.id}
                            className="group relative h-[320px] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
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

                            {/* Default Overlay - Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Content - Normal State */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end transition-transform duration-300 group-hover:-translate-y-4">
                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                                    {t(`schemesData.${scheme.id}.name`, scheme.name)}
                                </h3>
                                <p className="text-green-300 font-semibold text-lg mb-1 drop-shadow-sm">
                                    {t(`schemesData.${scheme.id}.benefit`, scheme.benefit)}
                                </p>

                                {/* Hidden Details - Visible on Hover */}
                                <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-4 transition-all duration-500 opacity-0 group-hover:opacity-100">
                                    <p className="text-gray-200 text-sm mb-4 leading-relaxed">
                                        {t(`schemesData.${scheme.id}.details`, scheme.details)}
                                    </p>
                                    <Button
                                        asChild
                                        variant="default"
                                        size="sm"
                                        className="bg-green-600 hover:bg-green-700 text-white border-none"
                                    >
                                        <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            {t('schemes.viewDetails', 'View Details')} <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </Button>
                                    {scheme.state !== "All" && (
                                        <span className="ml-3 text-xs font-bold text-yellow-400 border border-yellow-400 px-2 py-1 rounded-full">
                                            {scheme.state} Only
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
