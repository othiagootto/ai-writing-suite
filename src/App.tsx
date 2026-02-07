import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { useUIStore } from '@/stores/uiStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 15 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Lazy load pages
const Layout = lazy(() => import('@/components/layout/Layout'));
const DashboardLayout = lazy(() => import('@/components/layout/DashboardLayout'));
const Index = lazy(() => import('@/pages/Index'));
const Login = lazy(() => import('@/pages/Login'));
const Signup = lazy(() => import('@/pages/Signup'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const PricingPage = lazy(() => import('@/pages/Pricing'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const AIDetector = lazy(() => import('@/pages/tools/AIDetector'));
const PlagiarismChecker = lazy(() => import('@/pages/tools/PlagiarismChecker'));
const Humanizer = lazy(() => import('@/pages/tools/Humanizer'));
const Paraphraser = lazy(() => import('@/pages/tools/Paraphraser'));
const GrammarChecker = lazy(() => import('@/pages/tools/GrammarChecker'));
const Summarizer = lazy(() => import('@/pages/tools/Summarizer'));
const CitationGenerator = lazy(() => import('@/pages/tools/CitationGenerator'));
const AIChat = lazy(() => import('@/pages/tools/AIChat'));
const History = lazy(() => import('@/pages/History'));
const Account = lazy(() => import('@/pages/Account'));
const Terms = lazy(() => import('@/pages/Terms'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
    </div>
  );
}

function ThemeInitializer() {
  const theme = useUIStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', systemDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);
  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeInitializer />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tools/ai-detector" element={<AIDetector />} />
              <Route path="tools/plagiarism-checker" element={<PlagiarismChecker />} />
              <Route path="tools/humanizer" element={<Humanizer />} />
              <Route path="tools/paraphraser" element={<Paraphraser />} />
              <Route path="tools/grammar-checker" element={<GrammarChecker />} />
              <Route path="tools/summarizer" element={<Summarizer />} />
              <Route path="tools/citation-generator" element={<CitationGenerator />} />
              <Route path="tools/ai-chat" element={<AIChat />} />
              <Route path="history" element={<History />} />
              <Route path="account" element={<Account />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position="top-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
