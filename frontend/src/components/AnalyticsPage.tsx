import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader2, TrendingUp, CloudRain, DollarSign, Sprout } from 'lucide-react';
import { useTranslation } from 'react-i18next';
// import districtsData from '../data/districts.json';

interface RainfallData {
    year: number;
    actual: number;
}

interface CropEconomics {
    crop: string;
    yield_per_acre: number;
    price_per_quintal: number;
    profit_per_acre: number;
}

export function AnalyticsPage() {
    const { t } = useTranslation();
    const [selectedState, setSelectedState] = useState<string>('Telangana');
    const [rainfallData, setRainfallData] = useState<RainfallData[]>([]);
    const [economicData, setEconomicData] = useState<CropEconomics[]>([]);
    const [loadingRainfall, setLoadingRainfall] = useState(false);
    const [loadingEconomics, setLoadingEconomics] = useState(false);

    // Get unique states from backend
    const [states, setStates] = useState<string[]>([]);

    useEffect(() => {
        fetchStates();
    }, []);

    useEffect(() => {
        if (selectedState) {
            fetchRainfallData();
        }
    }, [selectedState]);

    const fetchStates = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/locations');
            if (response.ok) {
                const data = await response.json();
                const stateList = Object.keys(data).sort();
                setStates(stateList);
                // Default to Telangana if available, else first state
                if (stateList.includes('Telangana')) {
                    setSelectedState('Telangana');
                } else if (stateList.length > 0) {
                    setSelectedState(stateList[0]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch states:", error);
        }
    };

    useEffect(() => {
        fetchEconomicsData();
    }, []);

    const fetchRainfallData = async () => {
        setLoadingRainfall(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/analytics/rainfall/${selectedState}`);
            if (response.ok) {
                const data = await response.json();
                // Ensure data is sorted by year
                data.sort((a: RainfallData, b: RainfallData) => a.year - b.year);
                setRainfallData(data);
            } else {
                console.error("Failed to fetch rainfall data");
                setRainfallData([]);
            }
        } catch (error) {
            console.error("Error fetching rainfall data:", error);
            setRainfallData([]);
        } finally {
            setLoadingRainfall(false);
        }
    };

    const fetchEconomicsData = async () => {
        setLoadingEconomics(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/analytics/economics`);
            if (response.ok) {
                const data = await response.json();
                setEconomicData(data);
            } else {
                console.error("Failed to fetch economics data");
            }
        } catch (error) {
            console.error("Error fetching economics data:", error);
        } finally {
            setLoadingEconomics(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl animate-in fade-in duration-500">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent inline-flex items-center gap-2">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    {t('analytics.title', 'Market & Climate Analytics')}
                </h1>
                <p className="text-muted-foreground mt-2">
                    {t('analytics.description', 'Analyze historical rainfall patterns and crop profitability estimates.')}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Rainfall Graph Section */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow lg:col-span-2 xl:col-span-1 border-t-4 border-t-blue-500">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b dark:border-zinc-800">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <CloudRain className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <CardTitle>{t('analytics.rainfallTitle', 'Rainfall Trends')}</CardTitle>
                                    <CardDescription>{t('analytics.rainfallDesc', 'Yearly deviation per state')}</CardDescription>
                                </div>
                            </div>
                            <Select value={selectedState} onValueChange={setSelectedState}>
                                <SelectTrigger className="w-[180px] bg-white dark:bg-zinc-900 border-blue-200">
                                    <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                                <SelectContent>
                                    {states.map((state: any) => (
                                        <SelectItem key={state} value={state}>{state}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 h-[400px]">
                        {loadingRainfall ? (
                            <div className="h-full flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            </div>
                        ) : rainfallData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={rainfallData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                    <XAxis dataKey="year" />
                                    <YAxis label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', offset: 10 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend verticalAlign="top" height={36} />
                                    <Line
                                        type="monotone"
                                        dataKey="actual"
                                        name={t('analytics.rainfall', 'Rainfall (mm)')}
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#2563eb', strokeWidth: 2 }}
                                        activeDot={{ r: 6 }}
                                        animationDuration={1500}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-muted-foreground flex-col gap-2">
                                <CloudRain className="h-12 w-12 opacity-20" />
                                <p>{t('analytics.noData', 'No data available for this state')}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Crop Economics Section */}
                <Card className="shadow-lg hover:shadow-xl transition-shadow lg:col-span-2 xl:col-span-1 border-t-4 border-t-green-500">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-b dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <CardTitle>{t('analytics.economicsTitle', 'Crop Economics')}</CardTitle>
                                <CardDescription>{t('analytics.economicsDesc', 'Estimated yield and profit margins')}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {loadingEconomics ? (
                            <div className="h-40 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                            </div>
                        ) : (
                            <div className="overflow-auto max-h-[350px] pr-2">
                                <Table>
                                    <TableHeader className="sticky top-0 bg-white dark:bg-zinc-950 z-10 shadow-sm">
                                        <TableRow>
                                            <TableHead className="font-bold text-zinc-900 dark:text-zinc-100">{t('analytics.crop', 'Crop')}</TableHead>
                                            <TableHead className="text-right font-bold text-zinc-900 dark:text-zinc-100">{t('analytics.yield', 'Yield/Acre (Q)')}</TableHead>
                                            <TableHead className="text-right font-bold text-zinc-900 dark:text-zinc-100">{t('analytics.price', 'Price/Q (₹)')}</TableHead>
                                            <TableHead className="text-right font-bold text-green-600 dark:text-green-500">{t('analytics.profit', 'Profit/Acre (₹)')}</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {economicData.map((item) => (
                                            <TableRow key={item.crop} className="hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors group">
                                                <TableCell className="font-medium flex items-center gap-2">
                                                    <div className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors">
                                                        <Sprout className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                    </div>
                                                    {t(`crops.${item.crop.toLowerCase()}`, { defaultValue: item.crop })}
                                                </TableCell>
                                                <TableCell className="text-right text-muted-foreground">{item.yield_per_acre}</TableCell>
                                                <TableCell className="text-right text-muted-foreground">₹{item.price_per_quintal.toLocaleString()}</TableCell>
                                                <TableCell className="text-right font-bold text-green-700 dark:text-green-400">
                                                    ₹{item.profit_per_acre.toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
