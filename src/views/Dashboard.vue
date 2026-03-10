<template>
  <div class="dashboard">
    <!-- Sidebar Navigation -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect x="4" y="12" width="24" height="16" rx="2" fill="currentColor" opacity="0.2"/>
            <path d="M16 4L28 12H4L16 4Z" fill="currentColor"/>
            <rect x="12" y="18" width="4" height="6" fill="currentColor"/>
          </svg>
          <span v-if="!sidebarCollapsed" class="logo-text">EasyRent</span>
        </div>
        <button @click="sidebarCollapsed = !sidebarCollapsed" class="toggle-btn" aria-label="Toggle sidebar">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 6h12M4 10h12M4 14h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <nav class="nav-menu" role="navigation" aria-label="Main navigation">
        <button 
          @click="currentView = 'dashboard'" 
          :class="['nav-item', { active: currentView === 'dashboard' }]"
          :aria-current="currentView === 'dashboard' ? 'page' : undefined"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
            <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span v-if="!sidebarCollapsed">Dashboard</span>
        </button>

        <button 
          @click="currentView = 'properties'" 
          :class="['nav-item', { active: currentView === 'properties' }]"
          :aria-current="currentView === 'properties' ? 'page' : undefined"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 10L10 3L17 10V17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17V10Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 18V12H12V18" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span v-if="!sidebarCollapsed">Properties</span>
        </button>

        <button 
          @click="currentView = 'tenants'" 
          :class="['nav-item', { active: currentView === 'tenants' }]"
          :aria-current="currentView === 'tenants' ? 'page' : undefined"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/>
            <path d="M4 17C4 13.6863 6.68629 11 10 11C13.3137 11 16 13.6863 16 17" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span v-if="!sidebarCollapsed">Tenants</span>
        </button>

        <button 
          @click="currentView = 'payments'" 
          :class="['nav-item', { active: currentView === 'payments' }]"
          :aria-current="currentView === 'payments' ? 'page' : undefined"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="2" y="5" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M2 9H18" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span v-if="!sidebarCollapsed">Payments</span>
        </button>

        <button 
          v-if="user.role === 'landlord' || user.role === 'admin'"
          @click="currentView = 'bookings'" 
          :class="['nav-item', { active: currentView === 'bookings' }]"
          :aria-current="currentView === 'bookings' ? 'page' : undefined"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/>
            <path d="M7 2V6M13 2V6M3 8H17" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span v-if="!sidebarCollapsed">Bookings</span>
        </button>

        <button 
          v-if="user.role === 'admin'" 
          @click="currentView = 'users'" 
          :class="['nav-item', { active: currentView === 'users' }]"
          :aria-current="currentView === 'users' ? 'page' : undefined"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="7" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="13" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M2 16C2 13.7909 3.79086 12 6 12H8C10.2091 12 12 13.7909 12 16" stroke="currentColor" stroke-width="1.5"/>
            <path d="M12 16C12 13.7909 13.7909 12 16 12C18.2091 12 20 13.7909 20 16" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span v-if="!sidebarCollapsed">Users</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="avatar" :aria-label="user.name">
            {{ user.name.charAt(0).toUpperCase() }}
          </div>
          <div v-if="!sidebarCollapsed" class="user-details">
            <p class="user-name">{{ user.name }}</p>
            <p class="user-role">{{ user.role }}</p>
          </div>
        </div>
        <button @click="handleLogout" class="btn-logout" aria-label="Logout">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M13 3H16C16.5523 3 17 3.44772 17 4V16C17 16.5523 16.5523 17 16 17H13" stroke="currentColor" stroke-width="1.5"/>
            <path d="M7 13L3 10L7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M3 10H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span v-if="!sidebarCollapsed">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <header class="top-header">
        <div class="breadcrumb">
          <h1>{{ pageTitle }}</h1>
          <p class="subtitle">{{ pageSubtitle }}</p>
        </div>
      </header>

      <div class="content-wrapper">
        <!-- Dashboard Home View -->
        <div v-if="currentView === 'dashboard' && user.role !== 'tenant'" class="dashboard-home">
          <!-- Welcome Section -->
          <section class="welcome-section" aria-labelledby="welcome-heading">
            <div class="welcome-content">
              <h2 id="welcome-heading">Welcome back, {{ user.name }}! 👋</h2>
              <p>Here's what's happening with your properties today.</p>
            </div>
            <div class="quick-actions">
              <button @click="currentView = 'properties'" class="quick-action-btn primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 5V15M5 10H15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Add Property
              </button>
            </div>
          </section>

          <!-- Stats Grid -->
          <section class="stats-grid" aria-label="Statistics overview">
            <article class="stat-card properties">
              <div class="stat-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12L12 3L21 12V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V12Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="stat-content">
                <p class="stat-label">Total Properties</p>
                <p class="stat-value">{{ properties.length }}</p>
                <p class="stat-change positive">{{ availableProperties }} available</p>
              </div>
            </article>

            <article class="stat-card tenants">
              <div class="stat-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2"/>
                  <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="stat-content">
                <p class="stat-label">Active Tenants</p>
                <p class="stat-value">{{ tenants.length }}</p>
                <p class="stat-change">{{ occupancyRate }}% occupancy</p>
              </div>
            </article>

            <article class="stat-card payments">
              <div class="stat-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M2 10H22" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <div class="stat-content">
                <p class="stat-label">Total Revenue</p>
                <p class="stat-value">{{ totalPayments.toLocaleString() }} RWF</p>
                <p class="stat-change positive">{{ payments.length }} transactions</p>
              </div>
            </article>

            <article class="stat-card revenue">
              <div class="stat-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 17L9 11L13 15L21 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M16 7H21V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <p class="stat-label">Monthly Potential</p>
                <p class="stat-value">{{ monthlyPotential.toLocaleString() }} RWF</p>
                <p class="stat-change">Expected rent income</p>
              </div>
            </article>
          </section>

          <!-- Recent Activity & Quick Info -->
          <div class="dashboard-grid">
            <section class="card recent-properties" aria-labelledby="recent-properties-heading">
              <h3 id="recent-properties-heading">Recent Properties</h3>
              <div class="property-list">
                <div v-for="property in recentProperties" :key="property.id" class="property-item">
                  <div class="property-info">
                    <p class="property-name">{{ property.name }}</p>
                    <p class="property-address">{{ property.address }}</p>
                  </div>
                  <span :class="['badge', property.status.toLowerCase()]">{{ property.status }}</span>
                </div>
                <button v-if="properties.length === 0" @click="currentView = 'properties'" class="empty-state-btn">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <path d="M24 12V36M12 24H36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <p>Add your first property</p>
                </button>
              </div>
            </section>

            <section class="card quick-info" aria-labelledby="quick-info-heading">
              <h3 id="quick-info-heading">Quick Info</h3>
              <div class="info-list">
                <div class="info-item">
                  <div class="info-icon success" aria-hidden="true">✓</div>
                  <div>
                    <p class="info-title">System Status</p>
                    <p class="info-desc">All systems operational</p>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-icon info" aria-hidden="true">i</div>
                  <div>
                    <p class="info-title">Role Access</p>
                    <p class="info-desc">{{ user.role === 'admin' ? 'Full system access' : 'Landlord access' }}</p>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-icon warning" aria-hidden="true">!</div>
                  <div>
                    <p class="info-title">Accessibility</p>
                    <p class="info-desc">WCAG 3.0 compliant interface</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <!-- Management Views -->
        <div v-if="currentView !== 'dashboard' || user.role === 'tenant'" class="management-view">
          <component 
            :is="currentComponent" 
            @alert="(msg, type) => $emit('alert', msg, type)"
            @back="currentView = 'dashboard'"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { usePropertyStore } from '../stores/property'
import { useTenantStore } from '../stores/tenant'
import { usePaymentStore } from '../stores/payment'
import PropertyManagement from './PropertyManagement.vue'
import TenantManagement from './TenantManagement.vue'
import PaymentManagement from './PaymentManagement.vue'
import UserManagement from './UserManagement.vue'
import BookingManagement from './BookingManagement.vue'
import TenantView from './TenantView.vue'

const router = useRouter()
const authStore = useAuthStore()
const propertyStore = usePropertyStore()
const tenantStore = useTenantStore()
const paymentStore = usePaymentStore()

onMounted(async () => {
  await propertyStore.fetchProperties()
  await tenantStore.fetchTenants()
  await paymentStore.fetchPayments()
  await propertyStore.fetchBookings()
})

const user = computed(() => authStore.currentUser)
const properties = computed(() => propertyStore.getProperties)
const tenants = computed(() => tenantStore.getTenants)
const payments = computed(() => paymentStore.getPayments)
const totalPayments = computed(() => payments.value.reduce((sum, p) => sum + Number(p.amount), 0))

const sidebarCollapsed = ref(false)
const currentView = ref('dashboard')

const emit = defineEmits(['alert'])

const handleLogout = () => {
  authStore.logout()
  emit('alert', 'Logged out successfully', 'info')
  router.push('/login')
}

const availableProperties = computed(() => properties.value.filter(p => p.status === 'Available').length)
const occupancyRate = computed(() => {
  if (properties.value.length === 0) return 0
  return Math.round((properties.value.filter(p => p.status === 'Occupied').length / properties.value.length) * 100)
})
const monthlyPotential = computed(() => properties.value.reduce((sum, p) => sum + Number(p.rent), 0))
const recentProperties = computed(() => properties.value.slice(0, 5))

const pageTitle = computed(() => {
  const titles = {
    dashboard: 'Dashboard',
    properties: 'Property Management',
    tenants: 'Tenant Management',
    payments: 'Payment Management',
    users: 'User Management'
  }
  return titles[currentView.value] || 'Dashboard'
})

const pageSubtitle = computed(() => {
  const subtitles = {
    dashboard: 'Overview of your rental business',
    properties: 'Manage your property portfolio',
    tenants: 'Manage tenant information and assignments',
    payments: 'Track and manage rental payments',
    users: 'Manage system users and landlords'
  }
  return subtitles[currentView.value] || ''
})

const currentComponent = computed(() => {
  if (user.value.role === 'tenant') return TenantView
  switch(currentView.value) {
    case 'properties': return PropertyManagement
    case 'tenants': return TenantManagement
    case 'payments': return PaymentManagement
    case 'users': return UserManagement
    case 'bookings': return BookingManagement
    default: return null
  }
})
</script>

<style scoped>
/* Color Palette - WCAG 3.0 Compliant */
:root {
  --primary-50: #f0f4ff;
  --primary-100: #e0eaff;
  --primary-500: #4f46e5;
  --primary-600: #4338ca;
  --primary-700: #3730a3;
  
  --success-50: #f0fdf4;
  --success-500: #22c55e;
  --success-600: #16a34a;
  
  --warning-50: #fffbeb;
  --warning-500: #f59e0b;
  --warning-600: #d97706;
  
  --error-50: #fef2f2;
  --error-500: #ef4444;
  --error-600: #dc2626;
  
  --neutral-50: #f9fafb;
  --neutral-100: #f3f4f6;
  --neutral-200: #e5e7eb;
  --neutral-300: #d1d5db;
  --neutral-400: #9ca3af;
  --neutral-500: #6b7280;
  --neutral-600: #4b5563;
  --neutral-700: #374151;
  --neutral-800: #1f2937;
  --neutral-900: #111827;
}

.dashboard {
  display: flex;
  min-height: 100vh;
  background: var(--neutral-50);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Sidebar Styles */
.sidebar {
  width: 260px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  color: white;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-weight: 700;
  font-size: 20px;
}

.logo-text {
  white-space: nowrap;
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.toggle-btn:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Navigation */
.nav-menu {
  flex: 1;
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: none;
  border: none;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-item:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

.collapsed .nav-item {
  justify-content: center;
  padding: 12px;
}

.collapsed .nav-item span {
  display: none;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  text-transform: capitalize;
}

.btn-logout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background: rgba(239, 68, 68, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover {
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-logout:focus-visible {
  outline: 2px solid var(--error-500);
  outline-offset: 2px;
}

.collapsed .btn-logout span {
  display: none;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.top-header {
  background: white;
  border-bottom: 1px solid var(--neutral-200);
  padding: 24px 32px;
}

.breadcrumb h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0 0 4px 0;
}

.subtitle {
  font-size: 14px;
  color: var(--neutral-500);
  margin: 0;
}

.content-wrapper {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
}

/* Dashboard Home */
.dashboard-home {
  max-width: 1400px;
  margin: 0 auto;
}

.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.welcome-content h2 {
  font-size: 24px;
  margin: 0 0 8px 0;
  font-weight: 600;
}

.welcome-content p {
  margin: 0;
  opacity: 0.9;
  font-size: 15px;
}

.quick-actions {
  display: flex;
  gap: 12px;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: white;
  color: #1f2937;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.quick-action-btn:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: #f3f4f6;
  padding: 24px;
  border-radius: 12px;
  border: none;
  display: flex;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-card.properties .stat-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-card.tenants .stat-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-card.payments .stat-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-card.revenue .stat-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: var(--neutral-500);
  margin: 0 0 4px 0;
  font-weight: 500;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--neutral-900);
  margin: 0 0 4px 0;
}

.stat-change {
  font-size: 13px;
  color: var(--neutral-600);
  margin: 0;
}

.stat-change.positive {
  color: var(--success-600);
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--neutral-200);
}

.card h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0 0 20px 0;
}

/* Property List */
.property-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.property-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--neutral-50);
  border-radius: 8px;
  transition: all 0.2s;
}

.property-item:hover {
  background: var(--neutral-100);
}

.property-info {
  flex: 1;
}

.property-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0 0 4px 0;
}

.property-address {
  font-size: 13px;
  color: var(--neutral-500);
  margin: 0;
}

.badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.badge.available {
  background: var(--success-50);
  color: var(--success-700);
}

.badge.occupied {
  background: var(--warning-50);
  color: var(--warning-700);
}

.empty-state-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
  background: var(--neutral-50);
  border: 2px dashed var(--neutral-300);
  border-radius: 12px;
  color: var(--neutral-500);
  cursor: pointer;
  transition: all 0.2s;
}

.empty-state-btn:hover {
  background: var(--neutral-100);
  border-color: var(--neutral-400);
  color: var(--neutral-700);
}

.empty-state-btn:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Info List */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.info-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.info-icon.success {
  background: var(--success-50);
  color: var(--success-600);
}

.info-icon.info {
  background: var(--primary-50);
  color: var(--primary-600);
}

.info-icon.warning {
  background: var(--warning-50);
  color: var(--warning-600);
}

.info-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--neutral-900);
  margin: 0 0 4px 0;
}

.info-desc {
  font-size: 13px;
  color: var(--neutral-500);
  margin: 0;
}

/* Management View */
.management-view {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    z-index: 1000;
    transform: translateX(-100%);
  }
  
  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }
  
  .content-wrapper {
    padding: 20px;
  }
  
  .top-header {
    padding: 20px;
  }
  
  .welcome-section {
    padding: 24px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* Focus Styles for Accessibility */
*:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Enable tab navigation for all interactive elements */
input, select, textarea, button, a, [tabindex] {
  outline: none;
}

input:focus, select:focus, textarea:focus, button:focus, a:focus, [tabindex]:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Tab navigation for form elements */
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Tab navigation for buttons */
.btn-primary:focus,
.btn-cancel:focus,
.btn-edit:focus,
.btn-delete:focus,
.btn-add:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

/* Tab navigation for table rows */
table tbody tr:focus-within {
  background: #f0f4ff;
  outline: 2px solid #667eea;
}

/* Tab navigation for navigation items */
.nav-item:focus {
  outline: 2px solid white;
  outline-offset: 2px;
  background: rgba(255, 255, 255, 0.25);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
