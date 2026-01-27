export function BrandIdentitySlide() {
  const identityElements = [
    {
      title: "Mission",
      content:
        "To create timeless, sustainable fashion that empowers individuals to express their authentic selves.",
    },
    {
      title: "Vision",
      content:
        "Becoming a global leader in conscious fashion, setting new standards for quality and sustainability.",
    },
    {
      title: "Values",
      content:
        "Sustainability • Quality • Authenticity • Innovation • Inclusivity",
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">
        Brand Identity
      </h2>
      <div className="w-24 h-1 bg-slate-900 mb-12"></div>

      <div className="space-y-8">
        {identityElements.map((element, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-lg shadow-sm border border-slate-200"
          >
            <h3 className="text-3xl text-slate-900 mb-4">
              {element.title}
            </h3>
            <p className="text-xl text-slate-700 leading-relaxed">
              {element.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-slate-600 text-sm">
          [Edit: Define your brand's mission, vision, and values
          in BrandIdentitySlide.tsx]
        </p>
      </div>
    </div>
  );
}