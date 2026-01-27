export function AdvertisementSlide() {
  const adConcepts = [
    {
      title: "Street Campaign",
      description:
        "Billboard and urban advertising showcasing minimalist aesthetics",
      image:
        "https://images.unsplash.com/photo-1736279206455-afb3b27b44d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWxsYm9hcmQlMjBzdHJlZXQlMjBhZHZlcnRpc2luZ3xlbnwxfHx8fDE3NjY5NDM1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Digital Screens",
      description:
        "Dynamic content for high-traffic digital displays",
      image:
        "https://images.unsplash.com/photo-1762417582156-e172b6db6d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2NyZWVuJTIwYWR2ZXJ0aXNlbWVudHxlbnwxfHx8fDE3NjY5NDM1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div className="w-full h-full bg-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">
        Advertisement Concepts
      </h2>
      <div className="w-24 h-1 bg-slate-900 mb-12"></div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        {adConcepts.map((concept, index) => (
          <div key={index} className="space-y-4">
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
              <img
                src={concept.image}
                alt={concept.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl text-slate-900 mb-2">
                {concept.title}
              </h3>
              <p className="text-slate-700">
                {concept.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-8 rounded-lg">
        <h3 className="text-2xl mb-4">Campaign Tagline</h3>
        <p className="text-4xl font-light mb-4">
          "Wear Your Values"
        </p>
        <p className="text-slate-300 text-lg">
          A campaign centered on conscious consumption and
          timeless style
        </p>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-slate-600 text-sm">
          [Edit: Upload your advertisement mockups and update
          campaign messaging in AdvertisementSlide.tsx]
        </p>
      </div>
    </div>
  );
}