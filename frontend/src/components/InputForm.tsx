import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CropInputData } from '../types/crop';
import { FlaskConical, Droplets, Wind, MapPin, Loader2 } from 'lucide-react';

interface InputFormProps {
  onPredict: (data: CropInputData) => void;
  isLoading: boolean;
}

export function InputForm({ onPredict, isLoading }: InputFormProps) {
  const [formData, setFormData] = useState<CropInputData>({
    nitrogen: 50,
    phosphorus: 30,
    potassium: 40,
    soilPH: 6.5,
    state: '',
    city: ''
  });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.state && formData.city) {
      onPredict(formData);
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-b dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-2">
          <FlaskConical className="h-5 w-5 text-green-600" />
          <CardTitle>Input Parameters</CardTitle>
        </div>
        <CardDescription>
          Enter soil nutrients, pH level, and location details for accurate crop prediction
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Soil Nutrients Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-1.5">
                <FlaskConical className="h-4 w-4 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm">Soil Nutrients (kg/ha)</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nitrogen">
                Nitrogen (N)
                <span className="text-xs text-muted-foreground ml-2">Recommended: 0-140</span>
              </Label>
              <Input
                id="nitrogen"
                type="number"
                value={formData.nitrogen}
                onChange={(e) => setFormData({ ...formData, nitrogen: Number(e.target.value) })}
                placeholder="e.g., 50"
                min="0"
                max="140"
                required
                className="border-green-200 focus:border-green-400"
              />
              <p className="text-xs text-muted-foreground">Essential for leaf growth and green color</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phosphorus">
                Phosphorus (P)
                <span className="text-xs text-muted-foreground ml-2">Recommended: 0-145</span>
              </Label>
              <Input
                id="phosphorus"
                type="number"
                value={formData.phosphorus}
                onChange={(e) => setFormData({ ...formData, phosphorus: Number(e.target.value) })}
                placeholder="e.g., 30"
                min="0"
                max="145"
                required
                className="border-green-200 focus:border-green-400"
              />
              <p className="text-xs text-muted-foreground">Important for root development and flowering</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="potassium">
                Potassium (K)
                <span className="text-xs text-muted-foreground ml-2">Recommended: 0-205</span>
              </Label>
              <Input
                id="potassium"
                type="number"
                value={formData.potassium}
                onChange={(e) => setFormData({ ...formData, potassium: Number(e.target.value) })}
                placeholder="e.g., 40"
                min="0"
                max="205"
                required
                className="border-green-200 focus:border-green-400"
              />
              <p className="text-xs text-muted-foreground">Enhances disease resistance and water regulation</p>
            </div>
          </div>

          {/* Soil pH Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-1.5">
                <Droplets className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">Soil Properties</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilPH">
                Soil pH Level
                <span className="text-xs text-muted-foreground ml-2">Range: 3.5-9.5</span>
              </Label>
              <Input
                id="soilPH"
                type="number"
                step="0.1"
                value={formData.soilPH}
                onChange={(e) => setFormData({ ...formData, soilPH: Number(e.target.value) })}
                placeholder="e.g., 6.5"
                min="3.5"
                max="9.5"
                required
                className="border-blue-200 focus:border-blue-400"
              />
              <p className="text-xs text-muted-foreground">Neutral pH (6.5-7.5) is ideal for most crops</p>
            </div>
          </div>

          {/* Location Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-1.5">
                <MapPin className="h-4 w-4 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">Location Details</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => setFormData({ ...formData, state: value })}
                required
              >
                <SelectTrigger id="state" className="border-purple-200 focus:border-purple-400">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Select the state where farming will be done</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g., Mumbai"
                required
                className="border-purple-200 focus:border-purple-400"
              />
              <p className="text-xs text-muted-foreground">Enter your city or district name</p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all"
            size="lg"
            disabled={isLoading || !formData.state || !formData.city}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Analyzing Data...
              </>
            ) : (
              <>
                <Wind className="h-5 w-5 mr-2" />
                Predict Best Crop
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
