import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const usePaymentStore = defineStore('payment', () => {
  const payments = ref([])

  const getPayments = computed(() => payments.value)

  async function fetchPayments() {
    try {
      payments.value = await api.getPayments()
    } catch (error) {
      console.error('Error fetching payments:', error)
    }
  }

  async function addPayment(payment) {
    if (!payment.amount || payment.amount <= 0) throw new Error('Amount must be greater than zero')
    if (!payment.date) throw new Error('Date is required')
    
    await api.createPayment(payment)
    await fetchPayments()
  }

  async function updatePayment(id, updates) {
    await api.updatePayment(id, updates)
    await fetchPayments()
  }

  async function deletePayment(id) {
    await api.deletePayment(id)
    await fetchPayments()
  }

  return { payments, getPayments, fetchPayments, addPayment, updatePayment, deletePayment }
})
