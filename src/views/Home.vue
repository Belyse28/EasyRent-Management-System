<template>
  <div class="landing-page">
    <!-- Navigation Bar -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="4" y="12" width="24" height="16" rx="2" fill="currentColor" opacity="0.2"/>
            <path d="M16 4L28 12H4L16 4Z" fill="currentColor"/>
            <rect x="12" y="18" width="4" height="6" fill="currentColor"/>
          </svg>
          <span>EasyRent</span>
        </div>
        <div class="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button @click="goToLogin" class="btn-login">Login</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Easily Find and Manage Your Rental Properties</h1>
        <p class="hero-description">
          Simplifying property management for landlords and making it easy for tenants to find their perfect home. 
          View properties with pictures, check availability, and request bookings all in one place.
        </p>
        <button @click="goToLogin" class="btn-get-started">Get Started</button>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <h2>Key Features</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M8 24L24 8L40 24V40C40 41.1046 39.1046 42 38 42H10C8.89543 42 8 41.1046 8 40V24Z" stroke="currentColor" stroke-width="3"/>
              <path d="M18 42V26H30V42" stroke="currentColor" stroke-width="3"/>
            </svg>
          </div>
          <h3>Browse Properties</h3>
          <p>View all available rental properties with high-quality images, detailed descriptions, and pricing information.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="6" y="12" width="36" height="24" rx="4" stroke="currentColor" stroke-width="3"/>
              <path d="M6 20H42" stroke="currentColor" stroke-width="3"/>
            </svg>
          </div>
          <h3>Easy Booking</h3>
          <p>Tenants can request property bookings with just a few clicks. Track your booking status in real-time.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="16" r="8" stroke="currentColor" stroke-width="3"/>
              <path d="M8 40C8 31.1634 15.1634 24 24 24C32.8366 24 40 31.1634 40 40" stroke="currentColor" stroke-width="3"/>
            </svg>
          </div>
          <h3>Property Management</h3>
          <p>Landlords can manage properties, tenants, and payments efficiently from a single dashboard.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M8 34L20 22L28 30L40 18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              <path d="M32 18H40V26" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <h3>Payment Tracking</h3>
          <p>Keep track of all rental payments with detailed records and automatic status updates.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="10" width="32" height="32" rx="4" stroke="currentColor" stroke-width="3"/>
              <path d="M16 6V14M32 6V14M8 20H40" stroke="currentColor" stroke-width="3"/>
            </svg>
          </div>
          <h3>Booking Requests</h3>
          <p>Landlords can review and approve or reject tenant booking requests with ease.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="currentColor" stroke-width="3"/>
              <path d="M24 12V24L32 28" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          <h3>Real-Time Updates</h3>
          <p>Get instant notifications about property availability, booking status, and payment confirmations.</p>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="about-content">
        <h2>About Us</h2>
        <p>
          EasyRent is a web-based platform designed to help property owners manage their rental properties efficiently and help tenants easily to find available properties.
        </p>
        
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2026RentEasy. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.landing-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #1f2937;
}

/* Navigation Bar */
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 700;
  color: #667eea;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-links a {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #667eea;
}

.btn-login {
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 32px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 24px;
  font-weight: 700;
}

.hero-description {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 32px;
  opacity: 0.95;
}

.btn-get-started {
  padding: 16px 48px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-get-started:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Features Section */
.features {
  padding: 80px 32px;
  background: #f9fafb;
}

.features h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 48px;
  color: #1f2937;
}

.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
}

.feature-card {
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.feature-card h3 {
  font-size: 22px;
  margin-bottom: 12px;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
  font-size: 15px;
}

/* About Section */
.about {
  padding: 80px 32px;
  background: white;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
}

.about h2 {
  font-size: 36px;
  margin-bottom: 32px;
  text-align: center;
  color: #1f2937;
}

.about p {
  font-size: 18px;
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 20px;
}

.about strong {
  color: #667eea;
  font-weight: 600;
}

/* Footer */
.footer {
  background: #1f2937;
  color: white;
  text-align: center;
  padding: 32px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }

  .hero-description {
    font-size: 16px;
  }

  .features h2,
  .about h2 {
    font-size: 28px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .nav-links {
    gap: 16px;
  }
}
</style>
