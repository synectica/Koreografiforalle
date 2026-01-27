export function ThankYouSlide() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-16">
      <div className="text-center space-y-8">
        <h1 className="text-7xl font-light text-white tracking-wider">
          Thank You
        </h1>
        <div className="w-32 h-1 bg-white mx-auto"></div>
        <p className="text-2xl text-slate-300 font-light">
          Questions & Discussion
        </p>
        
        <div className="mt-12 space-y-3 text-slate-400">
          <p>Contact: info@yourbrand.com</p>
          <p>Instagram: @yourbrand</p>
          <p>Website: www.yourbrand.com</p>
        </div>

        <div className="mt-8 p-6 bg-slate-800 rounded-lg max-w-2xl mx-auto">
          <p className="text-slate-300 text-sm">
            [Edit: Update contact information in ThankYouSlide.tsx]
          </p>
        </div>
      </div>
    </div>
  );
}
