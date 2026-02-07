import { Card, CardContent } from '@/components/ui/card';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-gray max-w-none dark:prose-invert">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, including:</p>
            <ul>
              <li>Account information (email, name)</li>
              <li>Content you input into our tools</li>
              <li>Usage data and analytics</li>
              <li>Payment information (processed securely by Stripe)</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns to improve our AI models</li>
            </ul>

            <h2>3. Data Storage and Processing</h2>
            <p>
              Your data is stored securely using Supabase infrastructure with encryption at rest
              and in transit. We use industry-standard security measures to protect your information.
            </p>

            <h2>4. AI Processing</h2>
            <p>
              Content you submit to our tools is processed by AI providers (OpenAI and Anthropic).
              We do not use your content to train AI models. Your content is only processed to
              provide the requested service.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your account information for as long as your account is active. Usage logs
              are kept for 90 days. You can request deletion of your data at any time.
            </p>

            <h2>6. Sharing Your Information</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li>Service providers who assist in operating our service (Supabase, Stripe, OpenAI, Anthropic)</li>
              <li>Law enforcement when required by law</li>
              <li>Other parties with your consent</li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <h2>8. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service.
              You can instruct your browser to refuse all cookies or to indicate when a cookie is
              being sent.
            </p>

            <h2>9. Third-Party Services</h2>
            <p>Our service integrates with third-party services:</p>
            <ul>
              <li>Supabase - Database and authentication</li>
              <li>Stripe - Payment processing</li>
              <li>OpenAI - AI text processing</li>
              <li>Anthropic Claude - AI text processing</li>
            </ul>
            <p>
              These services have their own privacy policies. We encourage you to review them.
            </p>

            <h2>10. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect
              personal information from children under 13.
            </p>

            <h2>11. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own.
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>12. Changes to Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>13. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              privacy@aiwritingsuite.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
