import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useTenantStore = defineStore('tenant', () => {
  const tenants = ref([])

  const getTenants = computed(() => tenants.value)

  async function fetchTenants() {
    try {
      tenants.value = await api.getTenants()
    } catch (error) {
      console.error('Error fetching tenants:', error)
    }
  }

  async function addTenant(tenant) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(tenant.email)) throw new Error('Invalid email format')
    if (!/^\d{10,15}$/.test(tenant.contact)) throw new Error('Contact must be 10-15 digits')
    
    await api.createTenant(tenant)
    await fetchTenants()
  }

  async function updateTenant(id, updates) {
    await api.updateTenant(id, updates)
    await fetchTenants()
  }

  async function deleteTenant(id) {
    await api.deleteTenant(id)
    await fetchTenants()
  }

  return { tenants, getTenants, fetchTenants, addTenant, updateTenant, deleteTenant }
})
