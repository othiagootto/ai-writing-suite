import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { resetPassword } from '@/services/auth';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);
      setSubmitted(true);
      toast.success(t('auth.forgot.success'));
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || t('auth.forgot.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="h-8 w-8" />
          <span className="font-heading text-2xl font-bold">WriteAI</span>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{t('auth.forgot.title')}</CardTitle>
            <CardDescription>
              {submitted
                ? t('auth.forgot.subtitleSubmitted')
                : t('auth.forgot.subtitle')}
            </CardDescription>
          </CardHeader>

          {!submitted ? (
            <>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('common.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('auth.login.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? t('auth.forgot.submitting') : t('auth.forgot.submit')}
                  </Button>
                </form>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="w-full">
                  <Link to="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('auth.forgot.backToLogin')}
                  </Link>
                </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('auth.forgot.emailSent')} <strong>{email}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('auth.forgot.checkSpam')}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSubmitted(false)}
                >
                  {t('auth.forgot.tryDifferent')}
                </Button>
                <Button variant="ghost" asChild className="w-full">
                  <Link to="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('auth.forgot.backToLogin')}
                  </Link>
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
