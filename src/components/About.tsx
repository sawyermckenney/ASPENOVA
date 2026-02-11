import foundersImage from './images/founders/foundersChildImage.jpg';

export function About() {
  return (
    <section className="pt-28 pb-24 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Founders Image */}
          <div className="md:w-1/2 shrink-0">
            <img
              src={foundersImage}
              alt="Sawyer and Ryan, founders of Aspenova Club"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="md:w-1/2">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl md:text-4xl tracking-[0.15em] font-light uppercase">
                Our Story
              </h1>
              <div className="w-12 h-px bg-neutral-300 mt-6" />
            </div>

            {/* Content */}
            <div className="space-y-8 text-[15px] text-neutral-500 leading-relaxed">
              <p>
                Aspenova Club was started by two friends, Sawyer and Ryan, who wanted
                to turn a feeling into something real. That feeling came from Aspen,
                Colorado — standing on the mountain top, looking down at a place we
                call home. Realizing how different life looks when you're higher up
                and have a moment to reflect.
              </p>

              <p>
                For us, "Elevating Perspective" isn't just a phrase — it's a way of
                living. It's the practice of stepping outside your immediate thoughts
                and emotions to view a different perspective. Being able to choose
                compassion over reaction, pulling back from negativity, and asking
                what truly matters.
              </p>

              <p>
                Aspenova Club is our way of bringing that mindset into everyday life.
                We created this brand to encourage people to rise above the fear,
                sadness, judgement, and overthinking. It's about learning to move
                through this chaotic world with a calmness and compassion for others
                and yourself.
              </p>

              <p className="text-black italic">
                We are glad to have you on this journey.
                <br />
                This is just the beginning.
              </p>

              <p className="text-[11px] tracking-[0.2em] uppercase text-black pt-2">
                — Aspenova Club
              </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-neutral-200">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
              Est.
            </p>
            <p className="text-sm text-black">2025</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
              Location
            </p>
            <p className="text-sm text-black">Aspen, CO</p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
              Mission
            </p>
            <p className="text-sm text-black">Elevate Perspective</p>
          </div>
        </div>
      </div>
    </section>
  );
}
