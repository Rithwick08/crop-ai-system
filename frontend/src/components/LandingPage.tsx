import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import {
  Sprout,
  Brain,
  Leaf,
  Droplets,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SchemesSection } from './SchemesSection';

export function LandingPage() {
  const { t } = useTranslation();

  const featuresMapped = [
    {
      icon: Brain,
      title: t('landing.prediction'),
      description: t('landing.predictionDesc'),
      image: 'https://images.unsplash.com/photo-1768602182173-154eeedeed05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGZhcm1pbmclMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MDUzMTM2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: Leaf,
      title: t('landing.yield'),
      description: t('landing.yieldDesc'),
      image: 'https://images.unsplash.com/photo-1710090720809-527cefdac598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2lsJTIwdGVzdGluZyUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc3MDQ2MDE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      icon: Droplets,
      title: t('landing.weather'),
      description: t('landing.weatherDesc'),
      image: 'https://images.unsplash.com/photo-1655903724829-37b3cd3d4ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZHklMjBmaWVsZCUyMGdyZWVufGVufDF8fHx8MTc3MDUyODAxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const crops = [
    {
      name: t('crops.wheat'),
      image: 'https://images.unsplash.com/photo-1627842822558-c1f15aef9838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGZpZWxkJTIwZ29sZGVuJTIwaGFydmVzdHxlbnwxfHx8fDE3NzA0MzkyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: t('crops.rice'),
      image: 'https://images.unsplash.com/photo-1655903724829-37b3cd3d4ab9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZHklMjBmaWVsZCUyMGdyZWVufGVufDF8fHx8MTc3MDUyODAxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      name: t('crops.maize'),
      image: 'https://images.unsplash.com/photo-1600367051858-9cc795d50a52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwbWFpemUlMjBjcm9wJTIwZmFybXxlbnwxfHx8fDE3NzA1MzEzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const benefits = [
    t('landing.benefit1'),
    t('landing.benefit2'),
    t('landing.benefit3'),
    t('landing.benefit4'),
    t('landing.benefit5'),
    t('landing.benefit6')
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Badge className="bg-green-600 text-white px-4 py-1.5">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {t('landing.aiPowered')}
                </Badge>
                <Badge variant="outline" className="border-blue-600 text-blue-600 px-4 py-1.5">
                  {t('landing.smartFarming')}
                </Badge>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    {t('landing.heroTitle')}
                  </span>
                  <br />
                  <span className="text-gray-900 dark:text-gray-100">{t('landing.system')}</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  {t('landing.heroSubtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/estimate">
                    {t('header.getStarted')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 text-lg px-8 py-6"
                >
                  {t('landing.learnMore')}
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{t('landing.accuracyNum')}</div>
                  <div className="text-sm text-muted-foreground">{t('landing.accuracy')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{t('landing.farmersNum')}</div>
                  <div className="text-sm text-muted-foreground">{t('landing.farmers')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{t('landing.cropTypesNum')}</div>
                  <div className="text-sm text-muted-foreground">{t('landing.cropTypes')}</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1744230673231-865d54a0aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBmaWVsZCUyMHRlY2hub2xvZ3klMjB0YWJsZXR8ZW58MXx8fHwxNzcwNTMxMzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Farmer using technology"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-lg font-semibold">{t('landing.smartFarmingImg')}</p>
                  <p className="text-sm opacity-90">{t('landing.smartFarmingImgDesc')}</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{t('landing.yieldIncreaseNum')}</p>
                    <p className="text-xs text-muted-foreground">{t('landing.yieldIncrease')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-blue-600 text-white mb-4">{t('landing.features')}</Badge>
            <h2 className="text-4xl font-bold mb-4">{t('landing.howItWorks')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('landing.howItWorksDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresMapped.map((feature, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="rounded-full bg-white dark:bg-zinc-900 p-3">
                      <feature.icon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Feature Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl skew-y-3 transform transition-transform hover:skew-y-0 duration-500">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZ3JhcGh8ZW58MXx8fHwxNzcwNTMxMzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Analytics Dashboard"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-2 mb-2">
                    <div className="h-2 w-16 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="h-2 w-10 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                  </div>
                  <div className="h-2 w-24 bg-white/50 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <Badge className="bg-indigo-600 text-white px-4 py-1.5 flex w-fit items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>New Feature</span>
              </Badge>
              <h2 className="text-4xl font-bold leading-tight">
                {t('landing.analyticsTitle')}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t('landing.analyticsDesc')}
              </p>

              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/analytics">
                    {t('landing.exploreAnalytics')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Government Schemes Section */}
      <SchemesSection />

      {/* Crops Gallery Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-green-600 text-white mb-4">{t('landing.cropDatabase')}</Badge>
            <h2 className="text-4xl font-bold mb-4">{t('landing.supportedCrops')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('landing.supportedCropsDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {crops.map((crop, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">{crop.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">{t('landing.moreCrops')}</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-zinc-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1592864554447-5e40d96e2b21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjBoYW5kcyUyMHNvaWx8ZW58MXx8fHwxNzcwNTMxMzY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Farmer with soil"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>

            <div className="space-y-6">
              <Badge className="bg-purple-600 text-white">{t('landing.benefitsBadge')}</Badge>
              <h2 className="text-4xl font-bold">{t('landing.whyChoose')}</h2>
              <p className="text-xl text-muted-foreground">
                {t('landing.whyChooseDesc')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg px-8 py-6 mt-6"
              >
                <Link to="/estimate">
                  {t('landing.startJourney')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              {t('landing.readyToOptimize')}
            </h2>
            <p className="text-xl opacity-90">
              {t('landing.readyToOptimizeDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-green-600 hover:bg-gray-100"
              >
                <Link to="/estimate">
                  {t('landing.getStartedNow')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-2">
                  <Sprout className="h-5 w-5 text-white" />
                </div>
                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2">
                  <Brain className="h-5 w-5 text-white" />
                </div>
              </div>
              <span className="font-semibold">{t('footer.systemName')}</span>
            </div>
            <p className="text-sm text-gray-400">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
