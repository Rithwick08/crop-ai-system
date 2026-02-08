import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { PredictionResult } from '../types/crop';
import { Wheat, TrendingUp, Thermometer, Droplets, CloudRain, Sparkles, Loader2 } from 'lucide-react';

interface ResultsCardProps {
  prediction: PredictionResult | null;
  isLoading: boolean;
}

export function ResultsCard({ prediction, isLoading }: ResultsCardProps) {
  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-b dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <CardTitle>AI Analysis</CardTitle>
          </div>
          <CardDescription>Processing your data with AI algorithms</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="h-16 w-16 text-green-600 animate-spin" />
            <p className="text-muted-foreground text-center">
              Analyzing soil nutrients and weather conditions...
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
            <CardTitle>Prediction Results</CardTitle>
          </div>
          <CardDescription>Your crop recommendation will appear here</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="rounded-full bg-gray-100 dark:bg-zinc-800 p-6">
              <Wheat className="h-16 w-16 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="font-medium text-lg text-muted-foreground">
                No Prediction Yet
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                Fill in the input form and click "Predict Best Crop" to get AI-powered recommendations
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
          <CardTitle>Prediction Results</CardTitle>
        </div>
        <CardDescription>AI-powered crop recommendation based on your inputs</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Recommended Crop */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg p-6 border-2 border-green-200 dark:border-green-900/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-600 p-3 text-white">
                {getCropIcon()}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recommended Crop</p>
                <h2 className="text-3xl font-bold text-green-700">{prediction.crop}</h2>
              </div>
            </div>
          </div>

          {/* All Crop Probabilities */}
          {prediction?.probabilities && (
            <div className="mt-6 space-y-2">
              <h3 className="font-semibold text-sm">All Crop Probabilities</h3>

              {Object.entries(prediction.probabilities).map(([crop, prob]) => (
                <div key={crop} className="flex justify-between text-sm">
                  <span>{crop}</span>
                  <span>{(Number(prob) * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          )}


          {/* Confidence */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Confidence Level</span>
              </div>
              <span className={`text-2xl font-bold ${getConfidenceColor()}`}>
                {prediction.confidence}%
              </span>
            </div>
            <Progress
              value={prediction.confidence}
              className="h-3"
              indicatorClassName={getConfidenceBarColor()}
            />
            <p className="text-xs text-muted-foreground">
              {prediction.confidence >= 90 ? 'Excellent match for your conditions' :
                prediction.confidence >= 75 ? 'Good match for your conditions' :
                  'Moderate match - consider alternatives'}
            </p>
          </div>
        </div>

        {/* Weather Conditions */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-600" />
            Environmental Conditions
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {/* Temperature */}
            <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900/30">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-100 dark:bg-orange-900/40 p-2">
                  <Thermometer className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Temperature</p>
                  <p className="text-xs text-muted-foreground">Optimal growing temperature</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Humidity</p>
                  <p className="text-xs text-muted-foreground">Relative humidity level</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Rainfall</p>
                  <p className="text-xs text-muted-foreground">Annual precipitation</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-cyan-700">{prediction.rainfall} mm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>💡 Tip:</strong> This recommendation is based on your soil composition and local climate data.
            Consider consulting with local agricultural experts for best results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
