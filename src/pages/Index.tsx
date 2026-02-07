import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TOOLS, PRICING_PLANS, FREE_DAILY_LIMIT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export default function Index() {
  const { t } = useTranslation();

  const getPlanFeatures = (planId: string): string[] => {
    const prefix = `plan.${planId}`;
    const features: string[] = [];
    for (let i = 1; i <= 6; i++) {
      const key = `${prefix}.feature${i}`;
      const val = t(key);
      if (val !== key) features.push(val);
    }
    return features;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="outline" className="mb-4">
            {t('landing.badge')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
            {t('landing.headline')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('landing.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" asChild>
              <Link to="/signup">
                {t('common.startFree')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/pricing">{t('common.seePricing')}</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold">8</div>
              <div className="text-sm text-muted-foreground">{t('landing.stats.tools')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-muted-foreground">{t('landing.stats.users')}</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm text-muted-foreground">{t('landing.stats.uptime')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOOLS.map((tool) => {
              const Icon = (LucideIcons as any)[tool.icon];
              return (
                <Card key={tool.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={cn('mb-2', tool.color)}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg">{t(tool.nameKey)}</CardTitle>
                    <CardDescription>{t(tool.descriptionKey)}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={tool.path}>
                        {t('landing.features.tryFree')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {t('landing.howItWorks.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('landing.howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold">{t('landing.howItWorks.step1.title')}</h3>
              <p className="text-muted-foreground">
                {t('landing.howItWorks.step1.description')}
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold">{t('landing.howItWorks.step2.title')}</h3>
              <p className="text-muted-foreground">
                {t('landing.howItWorks.step2.description')}
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold">{t('landing.howItWorks.step3.title')}</h3>
              <p className="text-muted-foreground">
                {t('landing.howItWorks.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {t('landing.pricing.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('landing.pricing.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <Card key={plan.id} className={cn(
                'relative',
                plan.popular && 'border-primary shadow-lg'
              )}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {t('common.popular')}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle>{t(`plan.${plan.id}.name`)}</CardTitle>
                  <CardDescription>{t(`plan.${plan.id}.description`)}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                    {plan.annualPrice && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {t('landing.pricing.billedAnnually', { amount: plan.annualPrice })}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {getPlanFeatures(plan.id).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to={plan.id === 'free' ? '/signup' : '/signup'}>
                      {t(`plan.${plan.id}.cta`)}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {t('landing.testimonials.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('landing.testimonials.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                    SK
                  </div>
                  <div>
                    <div className="font-semibold">{t('landing.testimonials.testimonial1.name')}</div>
                    <div className="text-sm text-muted-foreground">{t('landing.testimonials.testimonial1.role')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('landing.testimonials.testimonial1.quote')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                    MR
                  </div>
                  <div>
                    <div className="font-semibold">{t('landing.testimonials.testimonial2.name')}</div>
                    <div className="text-sm text-muted-foreground">{t('landing.testimonials.testimonial2.role')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('landing.testimonials.testimonial2.quote')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                    EP
                  </div>
                  <div>
                    <div className="font-semibold">{t('landing.testimonials.testimonial3.name')}</div>
                    <div className="text-sm text-muted-foreground">{t('landing.testimonials.testimonial3.role')}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('landing.testimonials.testimonial3.quote')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-heading font-bold">
              {t('landing.cta.title')}
            </h2>
            <p className="text-lg opacity-90">
              {t('landing.cta.subtitle')}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">
                {t('common.getStartedFree')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
