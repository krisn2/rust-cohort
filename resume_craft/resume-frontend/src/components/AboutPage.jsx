import { Target, Award,Edit, Star,CheckCircle} from 'lucide-react';

const AboutPage = () => {
    return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          About ResumeBuilder
        </h1>
        <p className="text-xl text-purple-200 max-w-3xl mx-auto leading-relaxed">
          Empowering professionals worldwide to create stunning, ATS-friendly resumes that land interviews and dream jobs.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-purple-200 leading-relaxed">
            To democratize professional success by providing cutting-edge resume building tools that help job seekers showcase their unique value proposition and stand out in competitive markets.
          </p>
        </div>
        
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-purple-200 leading-relaxed">
            To become the world's most trusted platform for career advancement, where every professional can confidently present their story and achieve their career aspirations.
          </p>
        </div>
      </div>

      {/* Key Features */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">ATS-Optimized</h3>
            <p className="text-purple-200">Our templates are designed to pass Applicant Tracking Systems with flying colors.</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Edit className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Easy Customization</h3>
            <p className="text-purple-200">Drag-and-drop editor with real-time preview makes resume building effortless.</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Professional Templates</h3>
            <p className="text-purple-200">50+ stunning templates designed by career experts and hiring managers.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-white mb-2">2M+</div>
            <div className="text-purple-200">Resumes Created</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">500K+</div>
            <div className="text-purple-200">Happy Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-purple-200">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-purple-200">Templates</div>
          </div>
        </div>
      </div>
    </div>
  )}


  export default AboutPage;