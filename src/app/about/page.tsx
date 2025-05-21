import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Globe, Users, Zap } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          About <span className="text-primary">ASPENOVA</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Pioneering the future with innovative solutions and minimalist design. We are ASPENOVA, and this is our story.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-6">Our Journey</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              ASPENOVA was born from a shared vision: to create technology that is not only powerful but also intuitive and beautiful. In a world cluttered with complexity, we chose the path of minimalism, believing that simplicity is the ultimate sophistication. Our journey began with a small team of passionate engineers and designers committed to this ideal.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Over the years, we've grown, but our core philosophy remains unchanged. We focus on developing solutions that streamline processes, enhance productivity, and empower users. Each product under the AspenFlow brand is a reflection of our dedication to quality, innovation, and user-centric design.
            </p>
            <p className="text-foreground/90 leading-relaxed">
              We are driven by the challenge of solving complex problems with elegant solutions. Our team thrives on collaboration, continuous learning, and the pursuit of excellence.
            </p>
          </div>
          <div>
            <Image
              src="https://placehold.co/700x500.png"
              alt="ASPENOVA Team Working"
              width={700}
              height={500}
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="diverse team meeting"
            />
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-foreground text-center mb-10">What Drives Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Zap className="h-10 w-10 mx-auto mb-3 text-primary" />
              <CardTitle>Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We continuously explore new technologies to build groundbreaking solutions.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="h-10 w-10 mx-auto mb-3 text-primary" />
              <CardTitle>User-Centricity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Our users are at the core of our design and development process.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Building className="h-10 w-10 mx-auto mb-3 text-primary" />
              <CardTitle>Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We operate with transparency and uphold the highest ethical standards.</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Globe className="h-10 w-10 mx-auto mb-3 text-primary" />
              <CardTitle>Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We aim to create solutions that make a positive difference worldwide.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-foreground text-center mb-10">Meet Our (Placeholder) Leadership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Alex Chen", title: "Chief Executive Officer", dataAiHint: "professional portrait" },
            { name: "Maria Rodriguez", title: "Chief Technology Officer", dataAiHint: "woman tech leader" },
            { name: "Sam Green", title: "Head of Product", dataAiHint: "product manager" },
          ].map((leader) => (
            <Card key={leader.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={`https://placehold.co/400x400.png`}
                alt={`Portrait of ${leader.name}`}
                width={400}
                height={400}
                className="w-full h-56 object-cover"
                data-ai-hint={leader.dataAiHint}
              />
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground">{leader.name}</h3>
                <p className="text-primary">{leader.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
