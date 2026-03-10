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
        Add Payment
      </button>
    </div>

    <div v-if="showForm" class="form-modal" @click="showForm = false">
      <div class="form-container" @click.stop>
        <h3>{{ editingId ? 'Edit' : 'Add' }} Payment</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Tenant *</label>
            <select v-model.number="form.tenant_id" @change="onTenantChange" required>
              <option value="">Select Tenant</option>
              <option v-for="tenant in tenants" :key="tenant.id" :value="tenant.id">
                {{ tenant.name }} (Property: {{ tenant.property_name || 'N/A' }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Property *</label>
            <select v-model.number="form.property_id" required :disabled="!form.tenant_id">
              <option value="">Select Property</option>
              <option v-for="prop in filteredProperties" :key="prop.id" :value="prop.id">
                {{ prop.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Amount *</label>
            <input v-model.number="form.amount" type="number" step="0.01" required />
          </div>
          <div class="form-group">
            <label>Date *</label>
            <input v-model="form.date" type="date" required />
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
          <th>Tenant</th>
          <th>Property</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.id }}</td>
          <td>{{ payment.tenant_name || getTenantName(payment.tenant_id) }}</td>
          <td>{{ payment.property_name || getPropertyName(payment.property_id) }}</td>
          <td>{{ payment.amount }} RWF</td>
          <td>{{ payment.date }}</td>
          <td>
            <button @click="editPayment(payment)" class="btn-edit">Edit</button>
            <button @click="deletePayment(payment.id)" class="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePaymentStore } from '../stores/payment'
import { useTenantStore } from '../stores/tenant'
import { usePropertyStore } from '../stores/property'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['alert', 'back'])

const paymentStore = usePaymentStore()
const tenantStore = useTenantStore()
const propertyStore = usePropertyStore()
const authStore = useAuthStore()

const payments = computed(() => paymentStore.getPayments)
const tenants = computed(() => tenantStore.getTenants)
const properties = computed(() => propertyStore.getProperties)

const showForm = ref(false)
const editingId = ref(null)
const form = ref({ tenant_id: '', property_id: '', amount: 0, date: '' })

const resetForm = () => {
  const today = new Date().toISOString().split('T')[0]
  form.value = { tenant_id: '', property_id: '', amount: 0, date: today }
}

const filteredProperties = computed(() => {
  if (!form.value.tenant_id) return properties.value
  const selectedTenant = tenants.value.find(t => t.id === form.value.tenant_id)
  if (selectedTenant?.property_id) {
    return properties.value.filter(p => p.id === selectedTenant.property_id)
  }
  return properties.value
})

const getTenantName = (tenantId) => {
  const tenant = tenantStore.tenants.find(t => t.id === tenantId)
  return tenant ? tenant.name : 'N/A'
}

const getPropertyName = (propertyId) => {
  const property = propertyStore.properties.find(p => p.id === propertyId)
  return property ? property.name : 'N/A'
}

const onTenantChange = () => {
  const selectedTenant = tenants.value.find(t => t.id === form.value.tenant_id)
  if (selectedTenant?.property_id) {
    form.value.property_id = selectedTenant.property_id
  } else {
    form.value.property_id = ''
  }
}

const editPayment = (payment) => {
  editingId.value = payment.id
  form.value = { ...payment }
  showForm.value = true
}

const handleSubmit = async () => {
  try {
    const data = {
      ...form.value,
      landlord_id: authStore.currentUser.id
    }
    
    if (editingId.value) {
      await paymentStore.updatePayment(editingId.value, data)
      emit('alert', 'Payment updated successfully', 'success')
    } else {
      await paymentStore.addPayment(data)
      emit('alert', 'Payment added successfully', 'success')
    }
    
    showForm.value = false
    resetForm()
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}

const deletePayment = async (id) => {
  if (confirm('Are you sure you want to delete this payment?')) {
    try {
      await paymentStore.deletePayment(id)
      emit('alert', 'Payment deleted successfully', 'success')
    } catch (error) {
      emit('alert', error.message, 'error')
    }
  }
}
</script>

<style scoped>
@import './shared-styles.css';
</style>
