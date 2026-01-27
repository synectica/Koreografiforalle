export function CollectionOverviewSlide() {
  return (
    <div className="w-full h-full bg-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">Collection Overview</h2>
      <div className="w-24 h-1 bg-slate-900 mb-12"></div>
      
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl text-slate-900 mb-3">Collection Theme</h3>
            <p className="text-slate-700 leading-relaxed">
              "Urban Minimalism" - A celebration of clean lines, sustainable materials, 
              and versatile pieces that transition seamlessly from day to night.
            </p>
          </div>

          <div>
            <h3 className="text-2xl text-slate-900 mb-3">Key Features</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>100% sustainable and ethically sourced materials</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>Gender-neutral designs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>Modular pieces for mix-and-match versatility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400">•</span>
                <span>Limited production runs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1762430815233-e945ec621270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY29sbGVjdGlvbiUyMHJ1bndheXxlbnwxfHx8fDE3NjY5NDQzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Collection"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">
        <div className="bg-slate-50 p-4 rounded-lg text-center">
          <p className="text-3xl text-slate-900 mb-1">24</p>
          <p className="text-sm text-slate-600">Total Pieces</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg text-center">
          <p className="text-3xl text-slate-900 mb-1">8</p>
          <p className="text-sm text-slate-600">Core Items</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg text-center">
          <p className="text-3xl text-slate-900 mb-1">4</p>
          <p className="text-sm text-slate-600">Colorways</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg text-center">
          <p className="text-3xl text-slate-900 mb-1">100%</p>
          <p className="text-sm text-slate-600">Sustainable</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-slate-600 text-sm">
          [Edit: Update collection theme, features, and statistics in CollectionOverviewSlide.tsx]
        </p>
      </div>
    </div>
  );
}
