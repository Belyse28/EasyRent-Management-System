<template>
  <div class="management">
    <div class="page-header">
      <button @click="$emit('back')" class="btn-back" aria-label="Back to dashboard">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M12 4L6 10L12 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Back to Dashboard
      </button>
      <h2>Booking Requests</h2>
    </div>

    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Tenant</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in requests" :key="request.id">
          <td>
            <div>
              <strong>{{ request.property_name || getPropertyName(request.property_id) }}</strong>
              <br><small class="text-muted">{{ request.property_address }}</small>
            </div>
          </td>
          <td>
            <div>
              <strong>{{ request.tenant_name || getTenantName(request.tenant_id) }}</strong>
              <br><small class="text-muted">{{ request.tenant_email }}</small>
              <br><small class="text-muted">{{ request.tenant_contact }}</small>
            </div>
          </td>
          <td>{{ new Date().toLocaleDateString() }}</td>
          <td><span :class="['status', request.status.toLowerCase()]">{{ request.status }}</span></td>
          <td>
            <button v-if="request.status === 'Pending'" @click="approve(request.id)" class="btn-approve">Approve</button>
            <button v-if="request.status === 'Pending'" @click="reject(request.id)" class="btn-reject">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePropertyStore } from '../stores/property'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['alert', 'back'])

const propertyStore = usePropertyStore()
const authStore = useAuthStore()

const requests = computed(() => propertyStore.getBookingRequests)

// Load data when component mounts
onMounted(async () => {
  await propertyStore.fetchBookings()
  await propertyStore.fetchProperties()
  await authStore.fetchUsers()
})

const getPropertyName = (propertyId) => {
  const property = propertyStore.properties.find(p => p.id === propertyId)
  return property ? property.name : 'Unknown Property'
}

const getTenantName = (tenantId) => {
  // First check in users array
  const user = authStore.users.find(u => u.id === tenantId)
  if (user) return user.name
  
  // If not found in users, check in the default users from localStorage
  const allUsers = JSON.parse(localStorage.getItem('users') || '[]')
  const tenant = allUsers.find(u => u.id === tenantId)
  return tenant ? tenant.name : 'Unknown Tenant'
}

const approve = async (requestId) => {
  try {
    await propertyStore.approveBookingRequest(requestId)
    emit('alert', 'Booking request approved', 'success')
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}

const reject = async (requestId) => {
  try {
    await propertyStore.rejectBookingRequest(requestId)
    emit('alert', 'Booking request rejected', 'info')
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}
</script>

<style scoped>
@import './shared-styles.css';

.btn-approve {
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn-approve:hover {
  background: #059669;
  transform: translateY(-1px);
}

.btn-reject {
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  margin-left: 8px;
}

.btn-reject:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

.status {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
}

.status.pending {
  background: #fef3c7;
  color: #92400e;
}

.status.approved {
  background: #d1fae5;
  color: #065f46;
}

.status.rejected {
  background: #fee2e2;
  color: #991b1b;
}

.text-muted {
  color: #6b7280;
  font-size: 12px;
}

td div {
  line-height: 1.4;
}
</style>
