import { Button } from "@/components/ui/button"
import { CheckCircle, Code, CreditCard, Github, Lock, Server, Users, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-space-grotesk text-xl font-bold">unextep</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-violet-500 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-violet-500 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-violet-500 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-violet-500 transition-colors">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="#demo" className="hidden md:block">
              <Button variant="outline" className="h-9">
                View Demo
              </Button>
            </Link>
            <Link href="#github">
              <Button className="h-9 bg-violet-600 hover:bg-violet-700">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-space-grotesk text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Launch your SaaS in <br />
                <span className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
                  under 60 minutes.
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                The complete toolkit for indie hackers and solo developers. Built-in auth, payments, and deployment —
                everything you need to launch fast.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="w-full sm:w-auto h-12 px-8 text-base bg-violet-600 hover:bg-violet-700">
                  Get Started
                </Button>
                <Button variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
              <div className="mt-16 flex justify-center">
                <div className="relative w-full max-w-4xl overflow-hidden rounded-xl border shadow-2xl">
                  <Image
                    src="/placeholder.svg?height=600&width=1200"
                    width={1200}
                    height={600}
                    alt="Unextep Dashboard Preview"
                    className="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-black text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="font-space-grotesk text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-gray-400">Four simple steps to launch your SaaS product</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Clone",
                  description: "Clone the Unextep repository to your local machine",
                  icon: Code,
                },
                {
                  step: "02",
                  title: "Configure",
                  description: "Set up your environment variables and API keys",
                  icon: Server,
                },
                {
                  step: "03",
                  title: "Customize",
                  description: "Modify the UI and business logic to fit your needs",
                  icon: Zap,
                },
                {
                  step: "04",
                  title: "Deploy",
                  description: "Push to GitHub and deploy to Vercel with one click",
                  icon: Github,
                },
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className="flex flex-col items-center text-center p-6 rounded-lg bg-zinc-900 border border-zinc-800 h-full transition-all duration-200 hover:border-violet-500/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-600/20 mb-4">
                      <item.icon className="h-6 w-6 text-violet-500" />
                    </div>
                    <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-violet-600 text-xs font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="h-0.5 w-8 bg-violet-600"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Demo Section */}
        <section className="py-20 bg-gradient-to-b from-black to-zinc-900 text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="font-space-grotesk text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                See Unextep in Action
              </h2>
              <p className="mt-4 text-lg text-gray-400">
                Watch how quickly you can set up and launch your SaaS product
              </p>
            </div>
            <div className="mx-auto max-w-4xl">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-700 shadow-2xl">
                {/* Replace this with your actual video embed code */}
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="h-16 w-16 rounded-full bg-violet-600 flex items-center justify-center cursor-pointer hover:bg-violet-700 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-8 h-8"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">Click to play demo video</p>
                  </div>
                </div>

                {/* Uncomment and use this for an actual video
                <video 
                  controls
                  className="w-full h-full"
                  poster="/placeholder.svg?height=600&width=1200"
                >
                  <source src="/path-to-your-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                */}

                {/* Uncomment and use this for a YouTube embed
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="Unextep Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                */}
              </div>
              <div className="mt-8 flex justify-center">
                <Button className="bg-violet-600 hover:bg-violet-700">Get Full Access</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="font-space-grotesk text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Save Time, Money and Health
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">now you can focus on building the product</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Authentication",
                  description: "User authentication and authorization with Supabase Auth",
                  icon: Lock,
                },
                {
                  title: "Payments",
                  description: "Stripe integration for subscriptions and one-time payments",
                  icon: CreditCard,
                },
                {
                  title: "User Dashboard",
                  description: "Beautiful, responsive dashboard for your users",
                  icon: Users,
                },
                {
                  title: "One-Click Deploy",
                  description: "Deploy to Vercel with a single click",
                  icon: Zap,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg border p-6 hover:shadow-md transition-all duration-200 hover:border-violet-500/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 mb-4">
                    <feature.icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-16">
              <div className="rounded-xl border bg-gradient-to-r from-violet-50 to-white p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="font-space-grotesk text-2xl font-bold mb-4">Built on Modern Tech Stack</h3>
                    <p className="text-muted-foreground mb-6">
                      Unextep is built with the latest technologies to ensure your SaaS is fast, secure, and scalable.
                    </p>
                    <ul className="space-y-3">
                      {["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Vercel"].map(
                        (tech, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-violet-600 mr-2" />
                            <span>{tech}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="aspect-video overflow-hidden rounded-lg border shadow-lg">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        width={600}
                        height={400}
                        alt="Tech Stack"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo CTA Section */}
        <section id="demo" className="py-20 bg-black text-white">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-space-grotesk text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                See It In Action
              </h2>
              <p className="mt-4 text-lg text-gray-400 mb-8">Try the live demo or explore the codebase on GitHub</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="w-full sm:w-auto h-12 px-8 text-base bg-violet-600 hover:bg-violet-700">
                  Try the Demo
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 px-8 text-base border-gray-700 text-white hover:bg-gray-800"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="font-space-grotesk text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Focus on core functionality, not just layout, aligns tightly with Unextep's mission to get people
                launched, not lost in config.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">For indie entrepreneurs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "I launched my SaaS in a weekend thanks to Unextep. The built-in Stripe integration saved me weeks of development time.",
                  author: "Sarah Chen",
                  role: "Founder, DataViz Pro",
                  avatar: "/placeholder.svg?height=100&width=100",
                },
                {
                  quote:
                    "As a solo developer, Unextep was a game-changer. I was able to focus on my product's unique features instead of boilerplate code.",
                  author: "Marcus Johnson",
                  role: "Creator, TaskFlow",
                  avatar: "/placeholder.svg?height=100&width=100",
                },
                {
                  quote:
                    "The authentication and user management system in Unextep is rock-solid. It gave me confidence in my product's security from day one.",
                  author: "Priya Sharma",
                  role: "Founder, CodeMentor",
                  avatar: "/placeholder.svg?height=100&width=100",
                },
              ].map((testimonial, index) => (
                <div key={index} className="rounded-lg border p-6 hover:shadow-md transition-all duration-200">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 flex-1">
                      <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          width={48}
                          height={48}
                          alt={testimonial.author}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-zinc-50">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="font-space-grotesk text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">No hidden fees, no surprises</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="rounded-lg border bg-white p-8">
                <div className="mb-6">
                  <h3 className="font-space-grotesk text-2xl font-bold">Free</h3>
                  <p className="text-muted-foreground mt-2">Perfect for side projects and experiments</p>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold">$0</p>
                  <p className="text-muted-foreground">Forever free</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Full source code access",
                    "Authentication system",
                    "Basic dashboard",
                    "Community support",
                    "GitHub repository access",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="rounded-lg border bg-black text-white p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-3 py-1">
                  POPULAR
                </div>
                <div className="mb-6">
                  <h3 className="font-space-grotesk text-2xl font-bold">Pro</h3>
                  <p className="text-gray-400 mt-2">For serious indie hackers and startups</p>
                </div>
                <div className="mb-6">
                  <p className="text-4xl font-bold">$99</p>
                  <p className="text-gray-400">One-time payment</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Everything in Free",
                    "Stripe payment integration",
                    "Advanced user dashboard",
                    "Email templates",
                    "Priority support",
                    "Premium components",
                    "1-on-1 onboarding call",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-violet-500 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-violet-600 hover:bg-violet-700">Get Pro</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-space-grotesk text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready to Launch Your SaaS?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground mb-8">
                Join hundreds of indie hackers who have already launched with Unextep
              </p>
              <Button className="h-12 px-8 text-base bg-violet-600 hover:bg-violet-700">Get Started Now</Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 bg-zinc-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-space-grotesk text-xl font-bold">unextep</span>
              </div>
              <p className="text-sm text-muted-foreground">The fastest way to launch your SaaS product.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Demo", "Documentation"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-violet-600 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {["Blog", "Tutorials", "Showcase", "Changelog"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-violet-600 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {["About", "Contact", "GitHub", "Twitter"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-violet-600 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Unextep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
