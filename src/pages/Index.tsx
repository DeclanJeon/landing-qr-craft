
const Index = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <div className="logo">QR<span>Craft</span></div>
          <nav>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Create Beautiful QR Codes in Seconds</h1>
            <p>Generate customized QR codes for your business, personal use, or marketing campaigns with our easy-to-use tool.</p>
            <div className="cta-buttons">
              <a href="#try-now" className="btn btn-primary">Try For Free</a>
              <a href="#learn-more" className="btn btn-secondary">Learn More</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="qr-code-preview">
              <div className="qr-code-frame"></div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="features" className="features">
        <div className="container">
          <h2>Why Choose QRCraft?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon icon-customize"></div>
              <h3>Customizable Design</h3>
              <p>Create QR codes that match your brand with custom colors, logos, and styles.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-analytics"></div>
              <h3>Detailed Analytics</h3>
              <p>Track scans and user engagement with comprehensive reporting tools.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-dynamic"></div>
              <h3>Dynamic QR Codes</h3>
              <p>Update your QR code destination anytime without reprinting materials.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-secure"></div>
              <h3>Secure & Reliable</h3>
              <p>Enterprise-grade security for all your QR code campaigns and data.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose Content</h3>
              <p>Select what your QR code will link to: website, text, contact, Wi-Fi, etc.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Customize Design</h3>
              <p>Personalize your QR code with colors, shapes, and your own logo.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Download & Share</h3>
              <p>Get your QR code in high-resolution formats ready to use anywhere.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="pricing" className="pricing">
        <div className="container">
          <h2>Simple, Transparent Pricing</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="plan-name">Free</div>
              <div className="plan-price">$0</div>
              <ul className="plan-features">
                <li>Basic QR code generation</li>
                <li>Standard designs</li>
                <li>JPG downloads</li>
                <li>5 QR codes per month</li>
              </ul>
              <a href="#signup-free" className="btn btn-outline">Get Started</a>
            </div>
            <div className="pricing-card popular">
              <div className="popular-tag">Most Popular</div>
              <div className="plan-name">Pro</div>
              <div className="plan-price">$12<span>/month</span></div>
              <ul className="plan-features">
                <li>Advanced customization</li>
                <li>Logo integration</li>
                <li>PDF, SVG, PNG downloads</li>
                <li>Unlimited QR codes</li>
                <li>Basic analytics</li>
              </ul>
              <a href="#signup-pro" className="btn btn-primary">Get Started</a>
            </div>
            <div className="pricing-card">
              <div className="plan-name">Business</div>
              <div className="plan-price">$29<span>/month</span></div>
              <ul className="plan-features">
                <li>Everything in Pro</li>
                <li>Dynamic QR codes</li>
                <li>Advanced analytics</li>
                <li>Bulk generation</li>
                <li>API access</li>
                <li>Priority support</li>
              </ul>
              <a href="#signup-business" className="btn btn-outline">Get Started</a>
            </div>
          </div>
        </div>
      </section>
      
      <section id="contact" className="contact">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p className="contact-intro">Join thousands of businesses and individuals creating effective QR codes today.</p>
          <a href="#signup" className="btn btn-large btn-primary">Create Your First QR Code</a>
          <div className="contact-options">
            <p>Have questions? <a href="#contact-sales">Contact our sales team</a> or <a href="#faq">read our FAQ</a>.</p>
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="logo footer-logo">QR<span>Craft</span></div>
              <p>Making QR codes beautiful and functional since 2023.</p>
              <div className="social-links">
                <a href="#" className="social-link"></a>
                <a href="#" className="social-link"></a>
                <a href="#" className="social-link"></a>
              </div>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Examples</a></li>
                <li><a href="#">Documentation</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Privacy</a></li>
                <li><a href="#">Cookies</a></li>
                <li><a href="#">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            © 2023 QRCraft. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
