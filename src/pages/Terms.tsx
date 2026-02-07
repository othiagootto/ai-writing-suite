import { Card, CardContent } from '@/components/ui/card';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-gray max-w-none dark:prose-invert">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using AI Writing Suite, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily use AI Writing Suite for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a transfer of title.
            </p>

            <h2>3. Service Description</h2>
            <p>
              AI Writing Suite provides AI-powered writing tools including content detection,
              humanization, paraphrasing, grammar checking, plagiarism detection, summarization,
              citation generation, and AI chat assistance.
            </p>

            <h2>4. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password.
              You agree to accept responsibility for all activities that occur under your account.
            </p>

            <h2>5. Usage Limits</h2>
            <p>
              Free tier users are limited to 3 uses per tool per day. Pro subscribers have unlimited
              access to all tools. We reserve the right to modify usage limits at any time.
            </p>

            <h2>6. Content Ownership</h2>
            <p>
              You retain all rights to the content you input into our tools. We do not claim ownership
              of your content. However, by using our service, you grant us the right to process your
              content to provide our services.
            </p>

            <h2>7. Prohibited Uses</h2>
            <p>You may not use our service to:</p>
            <ul>
              <li>Generate or distribute spam, malware, or harmful content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to access our service without permission</li>
            </ul>

            <h2>8. Payment and Refunds</h2>
            <p>
              Pro subscriptions are billed monthly or annually. All payments are processed securely
              through Stripe. Refunds are available within 7 days of purchase for first-time
              subscribers.
            </p>

            <h2>9. Disclaimer</h2>
            <p>
              Our AI tools are provided "as is" without warranty of any kind. We do not guarantee
              the accuracy, reliability, or completeness of any AI-generated content. Users are
              responsible for reviewing and verifying all outputs.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              We shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages resulting from your use of our service.
            </p>

            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any
              material changes via email or through our service.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us at support@aiwritingsuite.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
