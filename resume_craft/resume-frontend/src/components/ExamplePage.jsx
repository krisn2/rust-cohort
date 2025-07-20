import {Download, Eye,Star, ArrowRight} from 'lucide-react';

const ExamplePage = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Resume Examples</h1>
        <p className="text-purple-200 text-lg max-w-2xl mx-auto">
          Get inspired by these professionally crafted resume examples across different industries and experience levels.
        </p>
      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Entry Level</h3>
            <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-purple-200 mb-4">Perfect for recent graduates and career changers</p>
          <div className="text-sm text-purple-300">15+ templates available</div>
        </div>
        
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Mid-Level</h3>
            <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-purple-200 mb-4">For professionals with 2-8 years experience</p>
          <div className="text-sm text-purple-300">20+ templates available</div>
        </div>
        
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Executive</h3>
            <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-purple-200 mb-4">Senior leadership and C-level positions</p>
          <div className="text-sm text-purple-300">12+ templates available</div>
        </div>
      </div>

      {/* Featured Examples */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6">Featured Examples</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Example 1 */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Software Engineer</h3>
                <p className="text-purple-300 text-sm">Tech Industry • 3 years experience</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-4 mb-4 text-xs text-gray-300 font-mono">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-white">John Smith</span>
                  <span>john@email.com</span>
                </div>
                <div className="text-purple-300">Full-Stack Developer</div>
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="font-semibold text-white mb-1">EXPERIENCE</div>
                  <div>Senior Developer • TechCorp • 2022-Present</div>
                  <div className="text-gray-400">• Led team of 5 developers...</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-purple-200 text-sm">4.9/5 rating</span>
              </div>
              <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm group-hover:underline">
                Use this template →
              </button>
            </div>
          </div>

          {/* Example 2 */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Marketing Manager</h3>
                <p className="text-purple-300 text-sm">Marketing • 5 years experience</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-4 mb-4 text-xs text-gray-300 font-mono">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-white">Sarah Johnson</span>
                  <span>sarah@email.com</span>
                </div>
                <div className="text-purple-300">Digital Marketing Expert</div>
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="font-semibold text-white mb-1">ACHIEVEMENTS</div>
                  <div>• Increased ROI by 150%</div>
                  <div className="text-gray-400">• Managed $2M marketing budget...</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-purple-200 text-sm">4.8/5 rating</span>
              </div>
              <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm group-hover:underline">
                Use this template →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Examples */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6">Browse by Industry</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Technology', 'Healthcare', 'Finance', 'Education', 'Sales', 'Design', 'Engineering', 'Consulting'].map((industry) => (
            <button
              key={industry}
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-purple-200 hover:text-white transition-all duration-200 hover:scale-105"
            >
              {industry}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExamplePage