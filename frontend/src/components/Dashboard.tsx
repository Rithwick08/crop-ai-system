import { useState } from 'react';
import { InputForm } from './InputForm';
import { ResultsCard } from './ResultsCard';
import { Button } from './ui/button';
import { CropInputData, PredictionResult } from '../types/crop';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handlePredict = async (data: CropInputData) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock prediction logic based on inputs
    const mockPrediction = generateMockPrediction(data);
    setPrediction(mockPrediction);
    setIsLoading(false);
  };

  const generateMockPrediction = (data: CropInputData): PredictionResult => {
    // Simple logic to determine crop based on inputs
    const { nitrogen, phosphorus, potassium, soilPH } = data;

    let crop = 'Rice';
    let confidence = 85;

    if (nitrogen > 80 && phosphorus > 40 && potassium > 40) {
      crop = 'Wheat';
      confidence = 92;
    } else if (nitrogen < 50 && phosphorus < 30 && potassium > 20) {
      crop = 'Cotton';
      confidence = 88;
    } else if (soilPH >= 6 && soilPH <= 7 && nitrogen > 60) {
      crop = 'Maize';
      confidence = 90;
    } else if (potassium > 60 && phosphorus > 50) {
      crop = 'Sugarcane';
      confidence = 87;
    } else if (nitrogen < 40 && potassium < 30) {
      crop = 'Pulses';
      confidence = 84;
    }

    return {
      crop,
      confidence,
      temperature: Math.round(20 + Math.random() * 15),
      humidity: Math.round(60 + Math.random() * 30),
      rainfall: Math.round(100 + Math.random() * 150),
    };
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back to Home Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <Button
          asChild
          variant="outline"
          className="gap-2 hover:bg-green-50 hover:border-green-600 hover:text-green-600 transition-colors"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <InputForm onPredict={handlePredict} isLoading={isLoading} />
        <ResultsCard prediction={prediction} isLoading={isLoading} />
      </div>
    </main>
  );
}