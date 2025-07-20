import { Lightbulb} from 'lucide-react';

const HelpPage = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
        <p className="text-purple-200 text-lg max-w-2xl mx-auto">
          Everything you need to know to create an outstanding resume that gets results.
        </p>
      </div>

      {/* Quick Start Guide */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
          <Lightbulb className="w-6 h-6 mr-3 text-purple-400" />
          Quick Start Guide
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-lg">1</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Choose Template</h3>
            <p className="text-purple-200">Select from our collection of professional, ATS-friendly templates designed for your industry.</p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Fill Content</h3>
            <p className="text-purple-200">Use our guided prompts and AI suggestions to craft compelling content for each section.</p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-lg">3</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">Download & Share</h3>
            <p className="text-purple-200">Export your resume as PDF or share directly with potential employers through our platform.</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="bg-white/5 rounded-lg border border-white/10">
            <summary className="p-4 text-white font-medium cursor-pointer hover:bg-white/10 transition-colors">
              How do I customize my resume template?
            </summary>
            <div className="p-4 pt-0 text-purple-200">
              <p>Our drag-and-drop editor allows you to easily modify colors, fonts, layout, and sections. Simply click on any element to edit it, and use the sidebar panel to adjust styling options.</p>
            </div>
          </details>
          
          <details className="bg-white/5 rounded-lg border border-white/10">
            <summary className="p-4 text-white font-medium cursor-pointer hover:bg-white/10 transition-colors">
              Are the templates ATS-friendly?
            </summary>
            <div className="p-4 pt-0 text-purple-200">
              <p>Yes! All our templates are specifically designed to pass Applicant Tracking Systems. We use standard fonts, proper heading structures, and avoid complex graphics that might confuse ATS software.</p>
            </div>
          </details>
          
          <details className="bg-white/5 rounded-lg border border-white/10">
            <summary className="p-4 text-white font-medium cursor-pointer hover:bg-white/10 transition-colors">
              Can I download my resume in different formats?
            </summary>
            <div className="p-4 pt-0 text-purple-200">
              <p>Currently, we support PDF downloads which maintain formatting across all devices and platforms. We're working on adding Word document support in future updates.</p>
            </div>
          </details>
          
          <details className="bg-white/5 rounded-lg border border-white/10">
            <summary className="p-4 text-white font-medium cursor-pointer hover:bg-white/10 transition-colors">
              How do I optimize my resume for specific jobs?
            </summary>
            <div className="p-4 pt-0 text-purple-200">
              <p>Use our AI-powered keyword suggestions feature. Simply paste the job description, and we'll recommend relevant keywords and phrases to include in your resume to match the position requirements.</p>
            </div>
          </details>
        </div>
      </div>

      {/* Tips Section */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold text-white mb-6">Resume Writing Tips</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Content Guidelines</h3>
            <ul className="space-y-2 text-purple-200">
              <li>• Keep it to 1-2 pages maximum</li>
              <li>• Use action verbs to start bullet points</li>
              <li>• Quantify achievements with numbers</li>
              <li>• Tailor content for each application</li>
              <li>• Include relevant keywords from job postings</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Formatting Best Practices</h3>
            <ul className="space-y-2 text-purple-200">
              <li>• Use consistent font and sizing</li>
              <li>• Maintain proper white space</li>
              <li>• Ensure contact info is prominent</li>
              <li>• Use bullet points for readability</li>
              <li>• Proofread for errors thoroughly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage