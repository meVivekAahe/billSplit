import React, { useState, useEffect } from 'react';
import { Menu, X, DollarSign, Users, Calculator, Smartphone, Shield, Zap, ChevronRight, Star, Check } from 'lucide-react';

const ExpenseSyncLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const closeMenuOnResize = () => {
        if (window.innerWidth >= 768) { // md breakpoint in tailwind
            setIsMenuOpen(false);
        }
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', closeMenuOnResize);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', closeMenuOnResize);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
        if(el) observer.observe(el)
    });

    return () => {
        document.querySelectorAll('[id]').forEach((el) => {
           if(el) observer.unobserve(el)
        });
    }
  }, []);

  const features = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Smart Split Calculations",
      description: "Automatically calculate who owes what with advanced splitting algorithms. Handle unequal splits, percentages, and custom amounts effortlessly."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Group Management",
      description: "Create groups for different occasions - flatmates, travel buddies, office colleagues. Keep expenses organized and accessible."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Optimized",
      description: "Access your expenses anywhere, anytime. Responsive design that works perfectly on all devices and screen sizes."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your financial data is encrypted and secure. We prioritize your privacy with industry-standard security measures."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Instant notifications when expenses are added or settled. Keep everyone in the loop with live updates."
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Multiple Currencies",
      description: "Travel abroad? No problem. Support for multiple currencies with real-time exchange rates."
    }
  ];

  const testimonials = [
    {
      name: "Yuvraj ",
      role: "Tech Professional",
      avatar: "💻",
      text: "ExpenseSync has been a lifesaver for managing expenses with my colleagues. No more awkward conversations about who owes what!"
    },
    {
      name: "Shubham ",
      role: "Startup Founder",
      avatar: "🚀",
      text: "Perfect for team trips! We used it during our company offsite and it kept everything organized and fair."
    },
    {
      name: "Harsh ",
      role: "Tech Professional",
      avatar: "💻",
      text: "It's so much easier than keeping track of receipts and calculating splits manually."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ExpenseSync
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-center flex-grow">
              <div className="flex items-baseline space-x-8">
                <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-purple-400 transition-colors">How it Works</a>
                <a href="#testimonials" className="hover:text-purple-400 transition-colors">Reviews</a>
                <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-purple-300 hover:text-white px-4 py-2 rounded-full transition-all duration-300">
                Log In
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-5 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
                Register
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3 text-center">
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-purple-400 rounded-md">Features</a>
              <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-purple-400 rounded-md">How it Works</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-purple-400 rounded-md">Reviews</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-purple-400 rounded-md">Pricing</a>
              <div className="border-t border-slate-700 my-3"></div>
              <div className="flex justify-center items-center space-x-4">
                <button className="flex-1 border border-purple-500 text-purple-300 px-4 py-2 rounded-full">
                    Log In
                </button>
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-full">
                    Register
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Split Expenses, Not Friendships
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 leading-relaxed">
            The easiest way to track and split expenses with friends, flatmates, and travel companions.
            Keep your relationships healthy and your finances organized.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Start Splitting for Free
            </button>
            <button className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose ExpenseSync?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Powerful features designed to make expense sharing effortless and transparent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                id={`feature-${index}`}
                style={{transitionProperty: 'opacity, transform', transitionDuration: '500ms'}}
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-slate-300">Simple steps to start splitting expenses today</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { step: "1", title: "Create a Group", desc: "Add your friends, flatmates, or travel companions to a group" },
              { step: "2", title: "Add Expenses", desc: "Log shared expenses with photos, receipts, and custom categories" },
              { step: "3", title: "Split & Settle", desc: "Automatically calculate who owes what and settle up easily" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">"{testimonial.text}"</p>
                <div className="flex text-yellow-400 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Simple Pricing
            </h2>
            <p className="text-xl text-slate-300">Choose the plan that works for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 flex flex-col">
              <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-4">Free</h3>
                  <p className="text-4xl font-bold mb-6">₹0<span className="text-lg text-slate-400">/month</span></p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" />Up to 5 groups</li>
                    <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" />Unlimited expenses</li>
                    <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" />Basic splitting</li>
                    <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" />Mobile app</li>
                  </ul>
              </div>
              <button className="w-full border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white py-3 rounded-full transition-all duration-300">
                Get Started
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/50 relative flex flex-col">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-4">Premium</h3>
                <p className="text-4xl font-bold mb-6">₹100<span className="text-lg text-slate-400">/month</span></p>
                <ul className="space-y-3 mb-8">
                    <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" />Unlimited groups</li>
                    <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" />Advanced splitting</li>
                    <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" />Receipt scanning</li>
                    <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" />Export reports</li>
                    <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-2" />Priority support</li>
                </ul>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ExpenseSync
                </span>
              </div>
              <p className="text-slate-300 mb-4 max-w-md">
                Making expense sharing simple and transparent for friends, flatmates, and travel companions worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#features" className="hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                <li><a href="#testimonials" className="hover:text-purple-400 transition-colors">Reviews</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} ExpenseSync. All rights reserved. Built with ❤️ for better expense sharing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ExpenseSyncLanding;
