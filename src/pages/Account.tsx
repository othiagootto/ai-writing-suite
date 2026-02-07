import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hooks/useUser';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/services/supabase';
import { openCustomerPortal } from '@/services/stripe';
import { User, CreditCard, LogOut, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

export default function Account() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, profile } = useUser();
  const { subscription, isPro, isTrialing, plan } = useSubscription();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut();
      navigate('/login');
      toast.success(t('account.signedOut'));
    } catch (error) {
      toast.error(t('account.signOutError'));
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsLoadingPortal(true);
    try {
      await openCustomerPortal();
    } catch (error) {
      toast.error(t('account.billingError'));
    } finally {
      setIsLoadingPortal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t('account.title')}</h1>
          <p className="text-muted-foreground">{t('account.subtitle')}</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('account.profile.title')}
              </CardTitle>
              <CardDescription>{t('account.profile.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">{t('common.email')}</label>
                <p className="text-foreground mt-1">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">{t('common.name')}</label>
                <p className="text-foreground mt-1">{profile?.name || t('account.profile.notSet')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">{t('account.profile.memberSince')}</label>
                <p className="text-foreground mt-1">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                {t('account.subscription.title')}
              </CardTitle>
              <CardDescription>{t('account.subscription.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">{t('account.subscription.currentPlan')}</label>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-foreground font-semibold capitalize">
                      {isPro ? (plan === 'annual' ? t('account.subscription.proAnnual') : t('account.subscription.proMonthly')) : t('account.subscription.free')}
                    </p>
                    {isPro && (
                      <Badge className="bg-primary text-primary-foreground">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {isTrialing ? t('account.subscription.trial') : t('account.subscription.active')}
                      </Badge>
                    )}
                  </div>
                </div>
                {isPro ? (
                  <Button
                    onClick={handleManageSubscription}
                    disabled={isLoadingPortal}
                    variant="outline"
                  >
                    {t('account.subscription.manage')}
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/pricing')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {t('account.subscription.upgrade')}
                  </Button>
                )}
              </div>

              {subscription && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-foreground">{t('account.subscription.status')}</label>
                    <p className="text-foreground mt-1 capitalize">{subscription.status}</p>
                  </div>
                  {subscription.current_period_end && (
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {subscription.status === 'trialing'
                          ? t('account.subscription.trialEnds')
                          : t('account.subscription.renewsOn')}
                      </label>
                      <p className="text-foreground mt-1">
                        {new Date(subscription.current_period_end).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </>
              )}

              {!isPro && (
                <>
                  <Separator />
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="font-semibold text-foreground mb-2">{t('account.subscription.freeLimits')}</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• {t('account.subscription.freeLimit1')}</li>
                      <li>• {t('account.subscription.freeLimit2')}</li>
                      <li>• {t('account.subscription.freeLimit3')}</li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">{t('account.danger.title')}</CardTitle>
              <CardDescription>{t('account.danger.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full sm:w-auto"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isSigningOut ? t('account.danger.signingOut') : t('common.signOut')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
