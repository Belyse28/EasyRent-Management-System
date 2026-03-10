import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)
  const users = ref([])

  const isAuthenticated = computed(() => !!currentUser.value)

  async function login(username, password) {
    try {
      const user = await api.login(username, password)
      currentUser.value = user
      return user
    } catch (error) {
      throw new Error(error.message || 'Invalid credentials')
    }
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('token')
  }

  async function register(userData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) throw new Error('Invalid email format')
    if (!/^\d{10,15}$/.test(userData.contact)) throw new Error('Contact must be 10-15 digits')
    
    try {
      await api.register(userData)
    } catch (error) {
      throw new Error(error.message || 'Registration failed')
    }
  }

  async function fetchUsers() {
    try {
      const data = await api.getUsers()
      users.value = data
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users')
    }
  }

  async function addUser(userData) {
    try {
      await api.createUser(userData)
      await fetchUsers()
    } catch (error) {
      throw new Error(error.message || 'Failed to add user')
    }
  }

  async function updateUser(id, userData) {
    try {
      await api.updateUser(id, userData)
      await fetchUsers()
    } catch (error) {
      throw new Error(error.message || 'Failed to update user')
    }
  }

  async function deleteUser(id) {
    try {
      await api.deleteUser(id)
      await fetchUsers()
    } catch (error) {
      throw new Error(error.message || 'Failed to delete user')
    }
  }

  return { currentUser, users, isAuthenticated, login, logout, register, fetchUsers, addUser, updateUser, deleteUser }
})
