<template>
  <div class="tenant-view">
    <h2>Available Properties</h2>
    
    <div class="properties-grid">
      <article v-for="property in availableProperties" :key="property.id" class="property-card">
        <img 
          :src="property.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'" 
          :alt="property.name" 
          class="property-image"
          @error="handleImageError"
        />
        <div class="property-content">
          <h3>{{ property.name }}</h3>
          <p class="address">{{ property.address }}</p>
          <p class="rent">{{ property.rent }} RWF/month</p>
          <span :class="['status-badge', property.status.toLowerCase()]">{{ property.status }}</span>
          <button 
            v-if="property.status === 'Available'" 
            @click="bookProperty(property.id)" 
            class="btn-book"
            :aria-label="`Book ${property.name}`"
          >
            Request Booking
          </button>
          <button v-else class="btn-occupied" disabled>Occupied</button>
        </div>
      </article>
    </div>

    <section class="my-bookings">
      <h2>My Booking Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in myRequests" :key="request.id">
            <td>{{ request.property_name || getPropertyName(request.property_id) }}</td>
            <td><span :class="['status-badge', request.status.toLowerCase()]">{{ request.status }}</span></td>
            <td>{{ new Date().toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { usePropertyStore } from '../stores/property'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['alert'])

const propertyStore = usePropertyStore()
const authStore = useAuthStore()

const availableProperties = computed(() => propertyStore.getProperties)
const myRequests = computed(() => propertyStore.getBookingRequests)

// Load data when component mounts
onMounted(async () => {
  await propertyStore.fetchProperties()
  await propertyStore.fetchBookings()
})

const getPropertyName = (propertyId) => {
  const property = propertyStore.properties.find(p => p.id === propertyId)
  return property ? property.name : 'Property Not Found'
}

const bookProperty = async (propertyId) => {
  try {
    await propertyStore.createBookingRequest(propertyId, authStore.currentUser.id)
    emit('alert', 'Booking request submitted successfully', 'success')
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}

const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'
}
</script>

<style scoped>
.tenant-view {
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #1f2937;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.property-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.property-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.property-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.property-content {
  padding: 20px;
}

.property-content h3 {
  font-size: 20px;
  margin: 0 0 8px 0;
  color: #1f2937;
}

.address {
  color: #6b7280;
  font-size: 14px;
  margin: 0 0 12px 0;
}

.rent {
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  margin: 0 0 12px 0;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}

.status-badge.available {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.occupied {
  background: #fee2e2;
  color: #991b1b;
}

.status-badge.pending {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.approved {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.rejected {
  background: #fee2e2;
  color: #991b1b;
}

.btn-book {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-book:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-occupied {
  width: 100%;
  padding: 12px;
  background: #e5e7eb;
  color: #6b7280;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: not-allowed;
}

.my-bookings {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

thead {
  background: #f9fafb;
}

th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 2px solid #e5e7eb;
}

td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

tbody tr:hover {
  background: #f9fafb;
}
</style>
