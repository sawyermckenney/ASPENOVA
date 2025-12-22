import { useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { Instagram, ShoppingBag, Mail } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
//import { toast } from 'sonner@2.0.3';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      //toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-zinc-900 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 pb-16 border-b border-white/10"
        >
          <h3 className="tracking-[0.2em] mb-4">
            Stay Elevated.
          </h3>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Be the first to know about new drops, exclusive releases, and elevation culture.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
              required
            />
            <Button 
              type="submit"
              className="bg-white text-black hover:bg-white/90 px-8 tracking-wider whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
        </motion.div>

        {/* Logo and Social */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center space-y-8"
        >
          {/* Upside Down Logo */}
          <div className="transform rotate-180">
            <h2 className="tracking-[0.3em] text-white">
              ASPENOVA CLUB
            </h2>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://www.instagram.com/aspenovaclub/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#shop"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              aria-label="Shop"
            >
              <ShoppingBag size={20} />
            </a>
            <a
              href="mailto:ryanzsawyerm@googlegroups.com"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-8 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Shipping Info
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-white/40 text-xs tracking-wider">
              © 2026 Aspenova Club. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
