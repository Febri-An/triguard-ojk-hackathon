"use client";

import React, { useState, useEffect } from "react";
import {
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Lock,
  Code,
  Target,
  Award,
  Clock,
  DollarSign,
  Menu,
  X,
  Eye,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const SmartContractAuditLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Alex Chen",
      role: "CTO at DeFiCore",
      content:
        "SecureAudit helped us identify critical vulnerabilities before launch. Their thorough analysis saved us millions in potential losses.",
      rating: 5,
    },
    {
      name: "Sarah Martinez",
      role: "Founder of TokenVault",
      content:
        "The most comprehensive audit we've ever received. The team's expertise in smart contract security is unmatched.",
      rating: 5,
    },
    {
      name: "Michael Zhang",
      role: "Lead Developer at CryptoFlow",
      content:
        "Fast, reliable, and incredibly detailed. SecureAudit is now our go-to partner for all security assessments.",
      rating: 5,
    },
  ];

  const auditStats = [
    { number: "500+", label: "Contracts Audited" },
    { number: "$2.5B+", label: "Assets Secured" },
    { number: "99.9%", label: "Vulnerability Detection" },
    { number: "24h", label: "Average Turnaround" },
  ];

  const vulnerabilityTypes = [
    {
      icon: AlertTriangle,
      title: "Reentrancy Attacks",
      description: "Prevent recursive calls that can drain funds",
    },
    {
      icon: Lock,
      title: "Access Control",
      description: "Ensure proper permission management",
    },
    {
      icon: DollarSign,
      title: "Integer Overflow",
      description: "Detect arithmetic vulnerabilities",
    },
    {
      icon: Eye,
      title: "Logic Flaws",
      description: "Identify business logic inconsistencies",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">TriGuard</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#services"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Services
              </a>
              <a
                href="#process"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Process
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Reviews
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Get Audit
              </button>
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#services"
                className="block text-gray-300 hover:text-white"
              >
                Services
              </a>
              <a
                href="#process"
                className="block text-gray-300 hover:text-white"
              >
                Process
              </a>
              <a
                href="#testimonials"
                className="block text-gray-300 hover:text-white"
              >
                Reviews
              </a>
              <a
                href="#pricing"
                className="block text-gray-300 hover:text-white"
              >
                Pricing
              </a>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold">
                Get Audit
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              #1 Smart Contract Security Platform
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Secure Your
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Smart Contracts
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Protect your DeFi protocols and blockchain applications with
              comprehensive security audits from industry-leading experts. Don't
              let vulnerabilities cost you millions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center">
                Start Free Audit
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                View Sample Report
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              {auditStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vulnerability Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Critical Vulnerabilities We Detect
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our advanced analysis identifies the most dangerous security flaws
              that could compromise your smart contracts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vulnerabilityTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <type.icon className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-300">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Audit Services
            </h2>
            <p className="text-xl text-gray-300">
              Comprehensive security solutions for every blockchain project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <Code className="w-12 h-12 text-purple-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Smart Contract Audit
              </h3>
              <p className="text-gray-300 mb-6">
                Comprehensive line-by-line code review identifying
                vulnerabilities, gas optimizations, and best practice
                violations.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Manual code review
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Automated scanning
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Gas optimization
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
              <Target className="w-12 h-12 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Penetration Testing
              </h3>
              <p className="text-gray-300 mb-6">
                Real-world attack simulations to test your contract's resilience
                against sophisticated threats.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Attack simulation
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Edge case testing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Stress testing
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-green-500/50 transition-all duration-300">
              <Award className="w-12 h-12 text-green-400 mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">
                Continuous Monitoring
              </h3>
              <p className="text-gray-300 mb-6">
                24/7 monitoring of your deployed contracts with real-time alerts
                for suspicious activities.
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Real-time alerts
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Threat detection
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Performance tracking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Audit Process
            </h2>
            <p className="text-xl text-gray-300">
              A systematic approach to ensure complete security coverage
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Code Submission",
                description:
                  "Submit your smart contract code through our secure portal",
              },
              {
                step: "02",
                title: "Analysis",
                description:
                  "Our experts perform comprehensive manual and automated analysis",
              },
              {
                step: "03",
                title: "Report Generation",
                description:
                  "Detailed report with findings, recommendations, and fixes",
              },
              {
                step: "04",
                title: "Follow-up",
                description:
                  "Post-audit support and re-testing after fixes implementation",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-16">
            What Our Clients Say
          </h2>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentTestimonial].rating)].map(
                (_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                )
              )}
            </div>

            <p className="text-xl text-gray-300 mb-6 italic">
              "{testimonials[currentTestimonial].content}"
            </p>

            <div className="text-white font-semibold">
              {testimonials[currentTestimonial].name}
            </div>
            <div className="text-gray-400">
              {testimonials[currentTestimonial].role}
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-cyan-400" : "bg-gray-600"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300">
              Choose the perfect plan for your project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Basic Audit
              </h3>
              <div className="text-4xl font-bold text-white mb-6">$2,500</div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Up to 500 lines of code
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Manual review
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Basic report
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  3-day delivery
                </li>
              </ul>
              <button className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors">
                Get Started
              </button>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-8 border border-cyan-500/30 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Professional Audit
              </h3>
              <div className="text-4xl font-bold text-white mb-6">$5,000</div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Up to 2000 lines of code
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Manual + automated review
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Detailed report
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Gas optimization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  2-day delivery
                </li>
              </ul>
              <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Enterprise
              </h3>
              <div className="text-4xl font-bold text-white mb-6">Custom</div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Unlimited lines of code
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Full security suite
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Penetration testing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  24/7 monitoring
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Priority support
                </li>
              </ul>
              <button className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Don't Let Vulnerabilities Cost You Millions
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join hundreds of successful projects that trust SecureAudit to
            protect their smart contracts
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300">
              Start Your Audit Today
            </button>
            <button className="border border-white/20 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-8 w-8 text-cyan-400" />
                <span className="text-xl font-bold text-white">
                  SecureAudit
                </span>
              </div>
              <p className="text-gray-400">
                Leading smart contract security auditing platform trusted by top
                DeFi protocols worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Smart Contract Audit</li>
                <li>Penetration Testing</li>
                <li>Security Monitoring</li>
                <li>Code Review</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Security Blog</li>
                <li>Case Studies</li>
                <li>API Reference</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@secureaudit.com</li>
                <li>+1 (555) 123-4567</li>
                <li>24/7 Support</li>
                <li>Emergency Hotline</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 SecureAudit. All rights reserved. Built for the future
              of Web3 security.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartContractAuditLanding;
