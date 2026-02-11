import foundersChildImage from './images/founders/foundersChildImage.jpg';

export function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-36 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 flex items-center gap-6">
          <h2 className="text-[11px] uppercase tracking-[0.3em] text-zinc-400">
            Our Story
          </h2>
          <div className="flex-1 h-px bg-zinc-200" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl tracking-wide text-black font-light leading-tight">
              Elevating Perspective,
              <br />
              Every Day
            </h3>

            <div className="space-y-5 text-zinc-500 leading-relaxed text-[15px]">
              <p>
                Aspenova Club was started by two friends, Sawyer and Ryan, who wanted to turn a feeling into something real. That feeling came from Aspen, Colorado, standing up on the mountain top looking down at a place we call home. Realizing how different life looks when you're higher up and have a moment to reflect.
              </p>

              <p>
                For us, "Elevating Perspective" isn't just a phrase; it's a way of living. It's the practice of stepping outside your immediate thoughts and emotions to view a different perspective. Being able to choose compassion over reaction, pulling back from any negativity, and asking what truly matters.
              </p>

              <p>
                Aspenova Club is our way of bringing that mindset into everyday life. We created this brand to encourage people to rise above the fear, sadness, judgement, and overthinking. It's about learning to move through this chaotic world with a calmness and compassion for others and yourself.
              </p>

              <p className="italic text-black/70 pt-2">
                We are glad to have you on this journey.
                <br />
                This is just the beginning,
              </p>

              <p className="text-black text-xs tracking-[0.2em] uppercase pt-1">
                — Aspenova Club
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-zinc-100">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1">Est.</p>
                <p className="text-black text-sm">2025</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1">Location</p>
                <p className="text-black text-sm">Aspen, CO</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1">Mission</p>
                <p className="text-black text-sm">Elevate Perspective</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src={foundersChildImage}
                alt="Aspenova Club founder as a child"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
