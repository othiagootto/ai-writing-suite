import { Link } from 'react-router-dom';
import { Check, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRICING_PLANS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export default function PricingPage() {
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

  const faqs = [
    {
      question: t('pricing.faq.q1'),
      answer: t('pricing.faq.a1'),
    },
    {
      question: t('pricing.faq.q2'),
      answer: t('pricing.faq.a2'),
    },
    {
      question: t('pricing.faq.q3'),
      answer: t('pricing.faq.a3'),
    },
    {
      question: t('pricing.faq.q4'),
      answer: t('pricing.faq.a4'),
    },
    {
      question: t('pricing.faq.q5'),
      answer: t('pricing.faq.a5'),
    },
    {
      question: t('pricing.faq.q6'),
      answer: t('pricing.faq.a6'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('pricing.subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  'relative flex flex-col',
                  plan.popular && 'border-primary shadow-lg scale-105'
                )}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    {t('common.mostPopular')}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{t(`plan.${plan.id}.name`)}</CardTitle>
                  <CardDescription>{t(`plan.${plan.id}.description`)}</CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-lg text-muted-foreground">{plan.period}</span>
                    {plan.annualPrice && (
                      <div className="text-sm text-muted-foreground mt-2">
                        {t('pricing.billedAnnually', { amount: plan.annualPrice })}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {getPlanFeatures(plan.id).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
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

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">
              {t('pricing.faq.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('pricing.faq.subtitle')}
            </p>
          </div>

          <div className="grid gap-6">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-heading font-bold">
            {t('pricing.stillHaveQuestions')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('pricing.contactSupport')}
          </p>
          <Button size="lg" asChild>
            <Link to="/signup">{t('common.getStartedFree')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
