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

export default function Account() {
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
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsLoadingPortal(true);
    try {
      await openCustomerPortal();
    } catch (error) {
      toast.error('Failed to open billing portal');
    } finally {
      setIsLoadingPortal(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account and subscription</p>
        </div>

        <div className="space-y-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <p className="text-foreground mt-1">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <p className="text-foreground mt-1">{profile?.name || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Member Since</label>
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
                Subscription
              </CardTitle>
              <CardDescription>Your current plan and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-foreground">Current Plan</label>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-foreground font-semibold capitalize">
                      {isPro ? `Pro ${plan === 'annual' ? 'Annual' : 'Monthly'}` : 'Free'}
                    </p>
                    {isPro && (
                      <Badge className="bg-primary text-primary-foreground">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {isTrialing ? 'Trial' : 'Active'}
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
                    Manage Subscription
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate('/pricing')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                )}
              </div>

              {subscription && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-foreground">Status</label>
                    <p className="text-foreground mt-1 capitalize">{subscription.status}</p>
                  </div>
                  {subscription.current_period_end && (
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {subscription.status === 'trialing'
                          ? 'Trial Ends'
                          : 'Renews On'}
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
                    <h4 className="font-semibold text-foreground mb-2">Free Plan Limits</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 3 uses per tool per day</li>
                      <li>• Access to all 8 writing tools</li>
                      <li>• Basic AI analysis</li>
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="w-full sm:w-auto"
              >
                <LogOut className="h-4 w-4 mr-2" />
                {isSigningOut ? 'Signing out...' : 'Sign Out'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
