import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const usePropertyStore = defineStore('property', () => {
  const properties = ref([])
  const bookingRequests = ref([])

  const getProperties = computed(() => properties.value)
  const getBookingRequests = computed(() => bookingRequests.value)

  async function fetchProperties() {
    try {
      properties.value = await api.getProperties()
    } catch (error) {
      console.error('Error fetching properties:', error)
    }
  }

  async function addProperty(property) {
    if (!property.name || !property.address || !property.rent) throw new Error('All fields required')
    await api.createProperty(property)
    await fetchProperties()
  }

  async function updateProperty(id, updates) {
    await api.updateProperty(id, updates)
    await fetchProperties()
  }

  async function deleteProperty(id) {
    await api.deleteProperty(id)
    await fetchProperties()
  }

  async function fetchBookings() {
    try {
      bookingRequests.value = await api.getBookings()
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  async function createBookingRequest(propertyId, tenantId) {
    const property = properties.value.find(p => p.id === propertyId)
    if (!property) throw new Error('Property not found')
    if (property.status === 'Occupied') throw new Error('Property is already occupied')
    
    await api.createBooking(propertyId)
    await fetchBookings()
  }

  async function approveBookingRequest(requestId) {
    await api.updateBookingStatus(requestId, 'Approved')
    await fetchBookings()
    await fetchProperties()
  }

  async function rejectBookingRequest(requestId) {
    await api.updateBookingStatus(requestId, 'Rejected')
    await fetchBookings()
  }

  return {
    properties,
    bookingRequests,
    getProperties,
    getBookingRequests,
    fetchProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    fetchBookings,
    createBookingRequest,
    approveBookingRequest,
    rejectBookingRequest
  }
})
