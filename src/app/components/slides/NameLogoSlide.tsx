export function NameLogoSlide() {
  return (
    <div className="w-full h-full bg-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">Name & Logo</h2>
      <div className="w-24 h-1 bg-slate-900 mb-12"></div>
      
      <div className="grid grid-cols-2 gap-12 h-[calc(100%-8rem)]">
        {/* Brand Name */}
        <div className="flex flex-col justify-center items-center bg-slate-900 rounded-lg p-12">
          <div className="text-center">
            <h3 className="text-7xl font-light text-white tracking-widest mb-4">
              BRAND
            </h3>
            <p className="text-2xl text-slate-300 font-light tracking-wider">
              NAME
            </p>
          </div>
        </div>

        {/* Logo Concept */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-3xl text-slate-900 mb-6">Logo Concept</h3>
            <div className="space-y-4 text-slate-700">
              <p><span className="font-semibold">Typography:</span> Modern, clean sans-serif</p>
              <p><span className="font-semibold">Color Palette:</span> Black & White with accent colors</p>
              <p><span className="font-semibold">Symbol:</span> Minimalist geometric icon</p>
              <p><span className="font-semibold">Meaning:</span> Represents timeless elegance and sustainability</p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-lg">
            <p className="text-slate-600 text-sm">
              [Edit: Replace with your brand name and upload your logo image. Update logo concept details in NameLogoSlide.tsx]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
