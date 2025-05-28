'use client';
import Image from 'next/image';
import type { Product } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <CardHeader>
        <div className="relative w-full h-48 mb-4 rounded-t-md overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={product.dataAiHint}
          />
        </div>
        <CardTitle className="text-2xl font-semibold text-foreground">{product.name}</CardTitle>
        <CardDescription className="text-muted-foreground h-20 overflow-hidden text-ellipsis">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {product.features && product.features.length > 0 && (
          <>
            <h4 className="font-medium text-foreground mb-2">Key Features:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {product.features.slice(0, 3).map((feature, index) => ( // Show max 3 features
                <li key={index} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full hover:bg-accent hover:text-accent-foreground transition-colors">
          Learn More
        </Button>
      </CardFooter>
    </MotionCard>
  );
}
