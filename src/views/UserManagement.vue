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
        Add User
      </button>
    </div>

    <div v-if="showForm" class="form-modal" @click="showForm = false">
      <div class="form-container" @click.stop>
        <h3>{{ editingId ? 'Edit' : 'Add' }} User</h3>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Name *</label>
            <input v-model="form.name" required />
          </div>
          <div class="form-group">
            <label>Username *</label>
            <input v-model="form.username" required />
          </div>
          <div class="form-group">
            <label>Password *</label>
            <input v-model="form.password" type="text" required />
          </div>
          <div class="form-group">
            <label>Role *</label>
            <select v-model="form.role" required>
              <option value="admin">Admin</option>
              <option value="landlord">Landlord</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="form.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Contact *</label>
            <input v-model="form.contact" pattern="\d{10,15}" required />
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
          <th>Username</th>
          <th>Password</th>
          <th>Role</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in allUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td><span class="role-badge">{{ user.role }}</span></td>
          <td>{{ user.email }}</td>
          <td>{{ user.contact }}</td>
          <td>
            <button @click="editUser(user)" class="btn-edit">Edit</button>
            <button @click="deleteUserHandler(user.id)" class="btn-delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['alert', 'back'])

const authStore = useAuthStore()

const allUsers = computed(() => authStore.users)
const showForm = ref(false)
const editingId = ref(null)
const form = ref({ name: '', username: '', password: '', role: 'landlord', email: '', contact: '' })

onMounted(async () => {
  try {
    await authStore.fetchUsers()
  } catch (error) {
    emit('alert', error.message, 'error')
  }
})

const resetForm = () => {
  form.value = { name: '', username: '', password: '', role: 'landlord', email: '', contact: '' }
}

const editUser = (user) => {
  editingId.value = user.id
  form.value = { 
    name: user.name, 
    username: user.username, 
    password: user.password,
    role: user.role,
    email: user.email,
    contact: user.contact
  }
  showForm.value = true
}

const handleSubmit = async () => {
  try {
    if (editingId.value) {
      await authStore.updateUser(editingId.value, form.value)
      emit('alert', 'User updated successfully', 'success')
    } else {
      await authStore.addUser(form.value)
      emit('alert', 'User added successfully', 'success')
    }
    
    showForm.value = false
    resetForm()
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}

const deleteUserHandler = async (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await authStore.deleteUser(id)
      emit('alert', 'User deleted successfully', 'success')
    } catch (error) {
      emit('alert', error.message, 'error')
    }
  }
}
</script>

<style scoped>
@import './shared-styles.css';
</style>
