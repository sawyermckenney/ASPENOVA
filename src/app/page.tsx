'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Lightbulb, Rocket, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full py-20 md:py-32 bg-secondary/30"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Welcome to <span className="text-primary">InkSync</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            At ASPENOVA, we craft innovative solutions designed for the modern world. Experience the future of technology with our minimalist and powerful products.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/products">Explore Our Products</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* About Us Snapshot Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full py-16 md:py-24"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">Who We Are</h2>
            <p className="mt-3 text-md text-muted-foreground max-w-xl mx-auto">
              ASPENOVA is a forward-thinking company dedicated to pushing the boundaries of innovation and design.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="https://placehold.co/800x600.png"
                alt="About ASPENOVA"
                width={800}
                height={600}
                className="rounded-lg shadow-xl object-cover"
                data-ai-hint="modern office team"
              />
            </div>
            <div className="space-y-6">
              <p className="text-lg text-foreground leading-relaxed">
                Founded on the principles of clarity, efficiency, and user-centricity, ASPENOVA strives to create technology that not only solves complex problems but also enhances the human experience. Our team of passionate innovators, designers, and engineers works collaboratively to bring visionary ideas to life.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                We believe in the power of minimalist design and robust functionality. Every product and service we offer is a testament to our commitment to quality and excellence. Discover how InkSync, our flagship suite, can transform your workflow and elevate your business.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-center text-foreground">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  Commitment to Innovation
                </li>
                <li className="flex items-center text-foreground">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  User-Centric Design Philosophy
                </li>
                <li className="flex items-center text-foreground">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  Excellence in Engineering
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full py-16 md:py-24 bg-secondary/30"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">Our Core Values</h2>
            <p className="mt-3 text-md text-muted-foreground max-w-xl mx-auto">
              The principles that guide everything we do at ASPENOVA.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-md hover:shadow-lg transition-shadow w-full">
                <CardHeader className="items-center text-center">
                  <Lightbulb className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle className="text-2xl">Innovation</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  We constantly seek new ways to solve problems and improve user experiences through cutting-edge technology.
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-md hover:shadow-lg transition-shadow w-full">
                <CardHeader className="items-center text-center">
                  <Users className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle className="text-2xl">Customer Focus</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Our customers are at the heart of our decisions. We strive to understand and meet their evolving needs.
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-md hover:shadow-lg transition-shadow w-full">
                <CardHeader className="items-center text-center">
                  <Rocket className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle className="text-2xl">Excellence</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  We are committed to the highest standards of quality in our products, services, and operations.
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
