<template>
  <div class="auth-container">
    <!-- Background Elements -->
    <div class="bg-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    
    <!-- Main Content -->
    <div class="auth-content">
      <div class="auth-content-inner">
        <!-- Left Side - Branding -->
        <div class="auth-branding" :class="isRegister ? 'register-bg' : 'login-bg'">
          <div v-if="!isRegister" class="brand-content">
            <div class="brand-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <rect width="60" height="60" rx="12" fill="url(#brandGradient)"/>
                <path d="M15 25h30v20H15V25z" fill="white" opacity="0.9"/>
                <path d="M20 20l10-5 10 5v5H20v-5z" fill="white" opacity="0.8"/>
                <rect x="22" y="30" width="6" height="8" fill="url(#brandGradient)"/>
                <rect x="32" y="30" width="6" height="8" fill="url(#brandGradient)"/>
                <rect x="25" y="38" width="10" height="7" fill="url(#brandGradient)"/>
                <defs>
                  <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#667eea"/>
                    <stop offset="100%" stop-color="#764ba2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 class="brand-title">EasyRent</h1>
            <p class="brand-subtitle">Manage your properties with ease and efficiency</p>
            
            <!-- Demo Accounts Info - Only show on login -->
            <div class="demo-accounts">
              <h3>Demo Accounts</h3>
              <div class="demo-grid">
                <div class="demo-card">
                  <div class="demo-content">
                    <div class="demo-role">Admin</div>
                    <div class="demo-creds">admin / admin123</div>
                    <div class="demo-desc">Full system access</div>
                  </div>
                </div>
                <div class="demo-card">
                  <div class="demo-content">
                    <div class="demo-role">Landlord</div>
                    <div class="demo-creds">landlord1 / land123</div>
                    <div class="demo-desc">Manage properties</div>
                  </div>
                </div>
                <div class="demo-card">
                  <div class="demo-content">
                    <div class="demo-role">Tenant</div>
                    <div class="demo-creds">tenant1 / tenant123</div>
                    <div class="demo-desc">Browse & book properties</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Side - Form -->
        <div class="auth-form-container">
          <div class="auth-form">
            <div class="form-header">
              <h2>{{ isRegister ? 'Create Account' : 'Welcome Back' }}</h2>
              <p>{{ isRegister ? 'Join our property management platform' : 'Sign in to your account' }}</p>
            </div>
            
            <form @submit.prevent="handleSubmit" class="form">
              <!-- Registration Fields -->
              <div v-if="isRegister" class="form-row">
                <div class="form-group">
                  <label for="name">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                    Full Name
                  </label>
                  <input id="name" v-model="form.name" type="text" placeholder="Enter your full name" required />
                </div>
              </div>
              
              <!-- Username -->
              <div class="form-group">
                <label for="username">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  </svg>
                  Username
                </label>
                <input id="username" v-model="form.username" type="text" placeholder="Enter your username" required />
              </div>
              
              <!-- Password -->
              <div class="form-group">
                <label for="password">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  </svg>
                  Password
                </label>
                <input id="password" v-model="form.password" type="password" placeholder="Enter your password" required />
              </div>
              
              <!-- Registration Additional Fields -->
              <div v-if="isRegister">
                <div class="form-group">
                  <label for="role">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                      <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                    </svg>
                    Role
                  </label>
                  <select id="role" v-model="form.role" required>
                    <option value="">Select your role</option>
                    <option value="tenant">Tenant - Looking for properties</option>
                    <option value="landlord">Landlord - Managing properties</option>
                  </select>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label for="email">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                      </svg>
                      Email
                    </label>
                    <input id="email" v-model="form.email" type="email" placeholder="your@email.com" required />
                  </div>
                  
                  <div class="form-group">
                    <label for="contact">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                      </svg>
                      Contact
                    </label>
                    <input id="contact" v-model="form.contact" type="text" placeholder="10-15 digits" pattern="\d{10,15}" required />
                  </div>
                </div>
              </div>
              
              <!-- Submit Button -->
              <button type="submit" class="btn-submit">
                <span>{{ isRegister ? 'Create Account' : 'Sign In' }}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              </button>
            </form>
            
            <!-- Toggle Button -->
            <div class="form-footer">
              <p>{{ isRegister ? 'Already have an account?' : "Don't have an account?" }}</p>
              <button @click="toggleForm" class="btn-toggle">
                {{ isRegister ? 'Sign In' : 'Create Account' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['alert'])
const router = useRouter()
const authStore = useAuthStore()

const isRegister = ref(false)
const form = ref({
  username: '',
  password: '',
  name: '',
  role: '',
  email: '',
  contact: ''
})

const toggleForm = () => {
  isRegister.value = !isRegister.value
  // Clear form when switching
  form.value = {
    username: '',
    password: '',
    name: '',
    role: '',
    email: '',
    contact: ''
  }
}

const handleSubmit = async () => {
  try {
    if (isRegister.value) {
      await authStore.register(form.value)
      emit('alert', 'Registration successful! Please login.', 'success')
      isRegister.value = false
      form.value = { username: '', password: '', name: '', role: '', email: '', contact: '' }
    } else {
      await authStore.login(form.value.username, form.value.password)
      emit('alert', 'Login successful', 'success')
      router.push('/dashboard')
    }
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}
</script>

<style scoped>
/* Main Container */
.auth-container {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  overflow: hidden;
}

/* Animated Background Shapes */
.bg-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

/* Main Content Layout */
.auth-content {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.auth-content-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  max-width: 1000px;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

/* Left Side - Branding */
.auth-branding {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: white;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.5s ease;
  min-height: 500px;
}

/* Login page background */
.auth-branding.login-bg {
  background-image: url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=1200&fit=crop');
}

/* Register page background - Premium property */
.auth-branding.register-bg {
  background-image: url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1200&fit=crop');
}

.auth-branding.register-bg::before {
  display: none;
}

.auth-branding::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(102, 126, 234, 0.7) 50%, rgba(118, 75, 162, 0.6) 100%);
  z-index: 1;
}

.brand-content {
  max-width: 500px;
  text-align: center;
  position: relative;
  z-index: 2;
}

.brand-icon {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.brand-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  color: white;
}

.brand-subtitle {
  font-size: 1rem;
  opacity: 0.95;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  color: white;
}

/* Demo Accounts */
.demo-accounts {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.demo-accounts h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.demo-grid {
  display: grid;
  gap: 1rem;
}

.demo-card {
  position: relative;
  border-radius: 16px;
  padding: 1.2rem;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.demo-overlay {
  display: none;
}

.demo-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.demo-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.25);
}

.demo-role {
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.demo-creds {
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  margin-bottom: 0.3rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.demo-desc {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Register Content */
.register-content {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.register-features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: white;
}

.feature-item h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.feature-item p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Right Side - Form */
.auth-form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  background: white;
}

.auth-form {
  width: 100%;
  max-width: 480px;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #6b7280;
  font-size: 1.1rem;
}

/* Form Styling */
.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group label svg {
  color: #667eea;
}

.form-group input,
.form-group select {
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.form-group input::placeholder {
  color: #9ca3af;
}

.form-group select {
  cursor: pointer;
}

/* Submit Button */
.btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.btn-submit:active {
  transform: translateY(0);
}

/* Form Footer */
.form-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.form-footer p {
  color: #6b7280;
  margin-bottom: 1rem;
}

.btn-toggle {
  color: #667eea;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.3s ease;
}

.btn-toggle:hover {
  color: #5a67d8;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .auth-content-inner {
    grid-template-columns: 1fr;
    max-width: 500px;
  }
  
  .auth-branding {
    padding: 1rem;
    min-height: 300px;
  }
  
  .brand-title {
    font-size: 2rem;
  }
  
  .demo-accounts {
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .auth-content {
    padding: 1rem;
  }
  
  .auth-form-container {
    padding: 2rem 1rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .brand-title {
    font-size: 1.8rem;
  }
  
  .form-header h2 {
    font-size: 2rem;
  }
  
  .register-features {
    gap: 1.5rem;
  }
  
  .feature-item {
    padding: 1rem;
  }
  
  .feature-icon {
    width: 50px;
    height: 50px;
  }
  
  .feature-item h4 {
    font-size: 1.1rem;
  }
  
  .feature-item p {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .auth-container {
    padding: 0.5rem;
  }
  
  .brand-content {
    padding: 1rem;
  }
  
  .demo-accounts {
    padding: 1rem;
  }
  
  .register-content {
    padding: 1rem;
  }
  
  .feature-item {
    padding: 0.8rem;
  }
  
  .feature-icon {
    width: 40px;
    height: 40px;
  }
  
  .feature-item h4 {
    font-size: 1rem;
  }
  
  .feature-item p {
    font-size: 0.8rem;
  }
}

/* Loading Animation */
.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Focus Styles for Accessibility */
.btn-submit:focus,
.btn-toggle:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Smooth Transitions */
* {
  transition: all 0.3s ease;
}
</style>
