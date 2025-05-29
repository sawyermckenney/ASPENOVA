'use client';
import type { Job } from '@/lib/placeholder-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase, Building, Clock, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface JobListingProps {
  job: Job;
}

export default function JobListing({ job }: JobListingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-md hover:shadow-lg transition-shadow w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-foreground">{job.title}</CardTitle>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mt-1">
            <span className="flex items-center"><Building className="h-4 w-4 mr-1.5" /> {job.department}</span>
            <span className="flex items-center"><MapPin className="h-4 w-4 mr-1.5" /> {job.location}</span>
            <span className="flex items-center"><Clock className="h-4 w-4 mr-1.5" /> {job.type}</span>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4 text-foreground/80">{job.description}</CardDescription>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-primary hover:no-underline font-medium">
                View Details
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {job.responsibilities.map((resp, index) => <li key={index}>{resp}</li>)}
                    </ul>
                  </div>
                )}
                {job.qualifications && job.qualifications.length > 0 && (
                   <div>
                    <h4 className="font-semibold text-foreground mb-2">Qualifications:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {job.qualifications.map((qual, index) => <li key={index}>{qual}</li>)}
                    </ul>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button className="w-full sm:w-auto" variant="default">
            Apply Now
            <Briefcase className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
