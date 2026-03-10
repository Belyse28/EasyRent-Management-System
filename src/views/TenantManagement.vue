<template>
  <div class="management">
    <div class="page-header">
      <button @click="$emit('back')" class="btn-back" aria-label="Back to dashboard">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to Dashboard
      </button>
      <button @click="showForm = true; editingId = null; resetForm()" class="btn-add">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Add Tenant
      </button>
    </div>

    <div v-if="showForm" class="form-modal" @click="showForm = false">
      <div class="form-container" @click.stop>
        <h3>{{ editingId ? 'Edit' : 'Add' }} Tenant</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Tenant Name *</label>
            <input v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Contact *</label>
            <input v-model="form.contact" required />
          </div>
          <div class="form-group">
            <label>Property *</label>
            <select v-model.number="form.property_id" required>
              <option value="">Select Property</option>
              <option v-for="prop in availableProperties" :key="prop.id" :value="prop.id">
                {{ prop.name }} - {{ prop.address }}
              </option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">{{ editingId ? 'Update' : 'Add' }}</button>
            <button type="button" @click="showForm = false" class="btn-cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Property ID</th>
          <th>Property</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tenant in tenants" :key="tenant.id">
          <td>{{ tenant.id }}</td>
          <td>{{ tenant.name }}</td>
          <td>{{ tenant.email }}</td>
          <td>{{ tenant.contact }}</td>
          <td>{{ tenant.property_id }}</td>
          <td>{{ tenant.property_name || getPropertyName(tenant.property_id) }}</td>
          <td>
            <button @click="editTenant(tenant)" class="btn-edit">Edit</button>
            <button @click="deleteTenant(tenant.id)" class="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePropertyStore } from '../stores/property'
import { useTenantStore } from '../stores/tenant'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['alert', 'back'])

const tenantStore = useTenantStore()
const propertyStore = usePropertyStore()
const authStore = useAuthStore()

const tenants = computed(() => tenantStore.getTenants)
const properties = computed(() => propertyStore.getProperties)
const availableProperties = computed(() => 
  properties.value.filter(p => p.status === 'Available' || (editingId.value && p.id === form.value.property_id))
)

const showForm = ref(false)
const editingId = ref(null)
const form = ref({ name: '', email: '', contact: '', property_id: '' })

const resetForm = () => {
  form.value = { name: '', email: '', contact: '', property_id: '' }
}

const getPropertyName = (propertyId) => {
  const property = propertyStore.properties.find(p => p.id === propertyId)
  return property ? property.name : 'N/A'
}

const editTenant = (tenant) => {
  editingId.value = tenant.id
  form.value = { ...tenant }
  showForm.value = true
}

const handleSubmit = async () => {
  try {
    const data = {
      ...form.value,
      landlord_id: authStore.currentUser.id
    }
    
    if (editingId.value) {
      await tenantStore.updateTenant(editingId.value, data)
      emit('alert', 'Tenant updated successfully', 'success')
    } else {
      await tenantStore.addTenant(data)
      emit('alert', 'Tenant added successfully', 'success')
    }
    
    showForm.value = false
    resetForm()
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}

const deleteTenant = async (id) => {
  if (confirm('Are you sure you want to delete this tenant?')) {
    try {
      await tenantStore.deleteTenant(id)
      emit('alert', 'Tenant deleted successfully', 'success')
    } catch (error) {
      emit('alert', error.message, 'error')
    }
  }
}
</script>

<style scoped>
@import './shared-styles.css';
</style>
