import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Eye, Heart, Lightbulb } from "lucide-react";
import type { Metadata } from 'next';
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Our Mission - InkSync',
  description: 'Learn about the mission, vision, and values that drive ASPENOVA.',
};

export default function MissionPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Our Guiding <span className="text-primary">Principles</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          At ASPENOVA, our mission, vision, and values are the bedrock of our culture and the driving force behind our innovations.
        </p>
      </section>

      <section className="mb-12 md:mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-foreground/90 leading-relaxed mb-4">
              To empower individuals and organizations through elegantly simple and powerful technological solutions. We strive to demystify complexity and enhance human potential by creating intuitive, efficient, and beautiful products that seamlessly integrate into daily life and work.
            </p>
            <h2 className="text-3xl font-semibold text-foreground mb-4 mt-8">Our Vision</h2>
            <p className="text-lg text-foreground/90 leading-relaxed">
              To be a globally recognized leader in minimalist and impactful technology, shaping a future where innovation serves humanity with clarity and purpose. We envision a world where technology is an unobtrusive enabler of creativity, productivity, and connection.
            </p>
          </div>
          <div className="order-1 md:order-2">
             <Image
                src="https://placehold.co/700x550.png"
                alt="Abstract representation of mission and vision"
                width={700}
                height={550}
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="abstract future"
              />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground text-center mb-10 md:mb-12">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValueCard
            icon={Lightbulb}
            title="Innovation with Purpose"
            description="We pursue innovation not for its own sake, but to create meaningful impact and solve real-world problems effectively."
          />
          <ValueCard
            icon={Eye}
            title="Simplicity & Clarity"
            description="We believe in the power of minimalism. Our designs and solutions prioritize clarity, ease of use, and intuitive interaction."
          />
          <ValueCard
            icon={Heart}
            title="User Empathy"
            description="We place our users at the center of everything we do, striving to understand their needs and exceed their expectations."
          />
          <ValueCard
            icon={Award}
            title="Uncompromising Quality"
            description="We are committed to excellence in every detail, from concept to execution, ensuring reliability and performance."
          />
        </div>
      </section>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <Card className="text-center shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
      <CardHeader className="items-center">
        <div className="bg-primary/10 p-4 rounded-full mb-4 inline-block">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
