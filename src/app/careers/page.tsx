import JobListing from '@/components/JobListing';
import CareerForm from '@/components/CareerForm';
import { jobsData } from '@/lib/placeholder-data';
import type { Metadata } from 'next';
import { Aperture } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers - AspenFlow',
  description: 'Join the ASPENOVA team and help shape the future of technology.',
};

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <section className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Shape the Future with <span className="text-primary">Us</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          At ASPENOVA, we believe our people are our greatest asset. We're looking for passionate, innovative individuals to join our mission. Explore our open positions and find your place with us.
        </p>
      </section>

      <section className="mb-12 md:mb-16">
        <h2 className="text-3xl font-semibold text-foreground mb-8 text-center md:text-left">Current Openings</h2>
        {jobsData.length > 0 ? (
          <div className="space-y-8">
            {jobsData.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary/30 rounded-lg">
            <Aperture className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Openings Currently</h3>
            <p className="text-muted-foreground">
              We don't have any open positions at the moment, but we're always looking for talent.
              <br />
              Feel free to submit a general application below or check back soon!
            </p>
          </div>
        )}
      </section>

      <section>
        <CareerForm />
      </section>
    </div>
  );
}
