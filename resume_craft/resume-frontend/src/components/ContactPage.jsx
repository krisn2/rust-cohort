import { Mail, Phone, MapPin} from 'lucide-react';
    
    const ContactPage = () => {
    return (
        <div className="space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-purple-200 text-lg max-w-2xl mx-auto">
            Have questions about our resume builder? Need support? We're here to help you craft the perfect resume.
          </p>
        </div>
  
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-purple-200 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-purple-200 mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-purple-200 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm">
                  <option value="" className="bg-slate-800">Select a topic</option>
                  <option value="support" className="bg-slate-800">Technical Support</option>
                  <option value="billing" className="bg-slate-800">Billing Question</option>
                  <option value="feature" className="bg-slate-800">Feature Request</option>
                  <option value="other" className="bg-slate-800">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-purple-200 mb-2">Message</label>
                <textarea 
                  rows="4" 
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
  
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Email</p>
                    <p className="text-white font-medium">support@resumebuilder.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Phone</p>
                    <p className="text-white font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Address</p>
                    <p className="text-white font-medium">123 Business Ave<br />San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Business Hours</h3>
              <div className="space-y-2 text-purple-200">
                <p><span className="text-white font-medium">Monday - Friday:</span> 9:00 AM - 6:00 PM PST</p>
                <p><span className="text-white font-medium">Saturday:</span> 10:00 AM - 4:00 PM PST</p>
                <p><span className="text-white font-medium">Sunday:</span> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default ContactPage