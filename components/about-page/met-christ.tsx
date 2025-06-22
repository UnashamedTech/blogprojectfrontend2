import Image from 'next/image';

export default function MetChrist() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#F7FAFF]">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/Background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/blog-4.png"
                alt="Family photo"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How I Met Christ
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in
                vel massa donec sit. Mi ut risus sem malesuada ornare. Ac eu
                erat eget et lorem est arcu. Gravida hendrerit sit blandit
                semper lacus. Nulla amet suscipit sit lectus tortor. Dolor non
                eget suspendisse leo scelerisque sed d.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in
                vel massa donec sit. Mi ut risus sem malesuada ornare. Ac eu
                erat eget et lorem est arcu. Gravida hendrerit sit blandit
                semper lacus. Nulla amet suscipit sit lectus tortor. Dolor non
                eget suspendisse leo scelerisque sed d.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum in
                vel massa donec sit. Mi ut risus sem malesuada ornare. Ac eu
                erat eget et lorem est arcu. Gravida hendrerit sit blandit
                semper lacus. Nulla amet suscipit sit lectus tortor. Dolor non
                eget suspendisse leo scelerisque sed d.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
