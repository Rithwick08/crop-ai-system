import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { PredictionResult } from '../types/crop';
import { Wheat, TrendingUp, Thermometer, Droplets, CloudRain, Sparkles, Loader2, ShoppingBag, ExternalLink } from 'lucide-react';
import { cropFertilizers } from '../data/fertilizers';
import { useTranslation } from 'react-i18next';
import schemesData from '../data/schemes.json';

interface ResultsCardProps {
  prediction: PredictionResult | null;
  isLoading: boolean;
}

export function ResultsCard({ prediction, isLoading }: ResultsCardProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-b dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <CardTitle>{t('results.aiAnalysis')}</CardTitle>
          </div>
          <CardDescription>{t('results.processing')}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="h-16 w-16 text-green-600 animate-spin" />
            <p className="text-muted-foreground text-center">
              {t('results.analyzingMessage')}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-b dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <CardTitle>{t('results.predictionResults')}</CardTitle>
          </div>
          <CardDescription>{t('results.predictionDesc')}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="rounded-full bg-gray-100 dark:bg-zinc-800 p-6">
              <Wheat className="h-16 w-16 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="font-medium text-lg text-muted-foreground">
                {t('results.noPrediction')}
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                {t('results.noPredictionDesc')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getCropIcon = () => {
    return <Wheat className="h-8 w-8" />;
  };

  const getConfidenceColor = () => {
    if (prediction.confidence >= 90) return 'text-green-600';
    if (prediction.confidence >= 75) return 'text-blue-600';
    return 'text-yellow-600';
  };

  const getConfidenceBarColor = () => {
    if (prediction.confidence >= 90) return 'bg-green-600';
    if (prediction.confidence >= 75) return 'bg-blue-600';
    return 'bg-yellow-600';
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-b dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600 animate-pulse" />
          <CardTitle>{t('results.predictionResults')}</CardTitle>
        </div>
        <CardDescription>{t('results.predictionSuccessDesc')}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Top 3 Crops Podium (Themed) */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg p-6 border-2 border-green-200 dark:border-green-900/50">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-xl font-bold text-center mb-2">{t('results.topRecommendations')}</h2>
            <p className="text-sm text-muted-foreground">{t('results.basedOnData')}</p>
          </div>

          {prediction.topCrops && prediction.topCrops.length >= 3 ? (
            <div className="flex items-end justify-center gap-4 min-h-[200px]">
              {/* 2nd Place */}
              <div className="flex flex-col items-center w-1/3">
                <div className="mb-2 text-center">
                  <p className="font-bold text-lg text-green-700 dark:text-green-300">
                    {t(`crops.${prediction.topCrops[1].crop.toLowerCase()}`, { defaultValue: prediction.topCrops[1].crop })}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">{prediction.topCrops[1].confidence}%</p>
                </div>
                <div className="w-full bg-green-100 dark:bg-green-900/40 rounded-t-lg flex flex-col items-center justify-start py-4 h-24 border-t-4 border-green-400/50">
                  <span className="font-bold text-green-600 dark:text-green-400 mt-1">{t('results.rank2')}</span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center w-1/3">
                <div className="mb-2 text-center">
                  <p className="font-bold text-xl text-green-800 dark:text-green-100">
                    {t(`crops.${prediction.topCrops[0].crop.toLowerCase()}`, { defaultValue: prediction.topCrops[0].crop })}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">{prediction.topCrops[0].confidence}%</p>
                </div>
                <div className="w-full bg-green-200 dark:bg-green-800/40 rounded-t-lg flex flex-col items-center justify-start py-4 h-32 border-t-4 border-green-600 shadow-md">
                  <span className="font-bold text-green-800 dark:text-green-200 mt-1 text-lg">{t('results.rank1')}</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center w-1/3">
                <div className="mb-2 text-center">
                  <p className="font-bold text-lg text-green-700 dark:text-green-300">
                    {t(`crops.${prediction.topCrops[2].crop.toLowerCase()}`, { defaultValue: prediction.topCrops[2].crop })}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">{prediction.topCrops[2].confidence}%</p>
                </div>
                <div className="w-full bg-green-50 dark:bg-green-900/20 rounded-t-lg flex flex-col items-center justify-start py-4 h-16 border-t-4 border-green-300/50">
                  <span className="font-bold text-green-500 dark:text-green-500 mt-1">{t('results.rank3')}</span>
                </div>
              </div>
            </div>
          ) : (
            // Fallback if no topCrops data (legacy or error)
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-600 p-3 text-white">
                  {getCropIcon()}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('results.recommendedCrop')}</p>
                  <h2 className="text-3xl font-bold text-green-700">
                    {t(`crops.${prediction.crop.toLowerCase()}`, { defaultValue: prediction.crop })}
                  </h2>
                </div>
              </div>
              <span className={`text-2xl font-bold ${getConfidenceColor()}`}>
                {prediction.confidence}%
              </span>
            </div>
          )}
        </div>

        {/* Weather Conditions */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-600" />
            {t('results.environmentalConditions')}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {/* Temperature */}
            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900/30">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-100 dark:bg-orange-900/40 p-2">
                  <Thermometer className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('results.temperature')}</p>
                  <p className="text-xs text-muted-foreground">{t('results.optimalTemp')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-700">{prediction.temperature}°C</p>
              </div>
            </div>

            {/* Humidity */}
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/40 p-2">
                  <Droplets className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('results.humidity')}</p>
                  <p className="text-xs text-muted-foreground">{t('results.relativeHumidity')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-700">{prediction.humidity}%</p>
              </div>
            </div>

            {/* Rainfall */}
            <div className="flex items-center justify-between p-4 bg-cyan-50 dark:bg-cyan-950/20 rounded-lg border border-cyan-200 dark:border-cyan-900/30">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-cyan-100 dark:bg-cyan-900/40 p-2">
                  <CloudRain className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{t('results.rainfall')}</p>
                  <p className="text-xs text-muted-foreground">{t('results.annualPrecipitation')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-cyan-700">{prediction.rainfall} mm</p>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          {prediction.topCrops && prediction.topCrops.length > 0 && (
            <div className="space-y-4 pt-4 border-t dark:border-zinc-800">
              <h3 className="font-semibold flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-purple-600" />
                {t('results.recommendedProducts')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {prediction.topCrops.slice(0, 3).map((item, index) => {
                  const cropName = item.crop.toLowerCase();
                  const fertilizerInfo = cropFertilizers[cropName];
                  const pesticideLink = `https://www.amazon.in/s?k=pesticides+for+${item.crop}`;

                  return (
                    <div key={item.crop} className="bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-lg p-4 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3 pb-2 border-b dark:border-slate-800">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${index === 0 ? "bg-green-100 text-green-700 dark:bg-green-900/30" :
                          "bg-slate-200 text-slate-700 dark:bg-slate-800"
                          }`}>
                          #{index + 1}
                        </span>
                        <h4 className="font-bold capitalize">
                          {t(`crops.${cropName}`, { defaultValue: item.crop })}
                        </h4>
                      </div>

                      <div className="space-y-4 flex-1">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">{t('results.fertilizer')}</p>
                          <p className="text-sm font-medium mb-1 line-clamp-2" title={fertilizerInfo?.fertilizer}>
                            {fertilizerInfo?.fertilizer || 'Balanced Fertilizer'}
                          </p>
                          <a
                            href={fertilizerInfo?.fertilizerLink || `https://www.amazon.in/s?k=fertilizer+for+${item.crop}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-500 hover:underline flex items-center gap-1"
                          >
                            {t('results.buyNow')} <ExternalLink size={10} />
                          </a>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">{t('results.pesticide')}</p>
                          <a
                            href={pesticideLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-500 hover:underline flex items-center gap-1"
                          >
                            {t('results.findPesticides')} <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Recommended Schemes */}
        {prediction.crop && (
          <div className="space-y-4 pt-4 border-t dark:border-zinc-800">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-600" />
              {t('results.recommendedSchemes', 'Recommended Government Schemes')}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {schemesData
                .filter(scheme =>
                  scheme.relatedCrops.includes("All") ||
                  scheme.relatedCrops.some(c => c.toLowerCase() === prediction.crop.toLowerCase())
                )
                .slice(0, 3)
                .map(scheme => (
                  <div key={scheme.id} className="flex items-start gap-4 p-4 bg-yellow-50/50 dark:bg-yellow-900/10 rounded-lg border border-yellow-100 dark:border-yellow-900/30 hover:shadow-md transition-shadow">
                    <img
                      src={scheme.image}
                      alt={scheme.name}
                      className="w-16 h-16 rounded-md object-cover hidden sm:block"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">{t(`schemesData.${scheme.id}.name`, scheme.name)}</h4>
                        <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full whitespace-nowrap">
                          {t(`schemesData.${scheme.id}.benefit`, scheme.benefit)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{t(`schemesData.${scheme.id}.details`, scheme.details)}</p>
                      <a
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-flex items-center gap-1"
                      >
                        View Details <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>💡 {t('results.tip')}</strong> {t('results.tipMessage')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
