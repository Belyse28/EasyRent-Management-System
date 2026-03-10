<template>
  <div class="login-container">
    <div class="login-box">
      
      <h2>{{ isRegister ? 'Register' : 'Login' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div v-if="isRegister" class="form-group">
          <label for="name">Full Name *</label>
          <input id="name" v-model="form.name" type="text" required />
        </div>
        <div class="form-group">
          <label for="username">Username *</label>
          <input id="username" v-model="form.username" type="text" required />
        </div>
        <div class="form-group">
          <label for="password">Password *</label>
          <input id="password" v-model="form.password" type="password" required />
        </div>
        <div v-if="isRegister" class="form-group">
          <label for="role">Role *</label>
          <select id="role" v-model="form.role" required>
            <option value="">Select Role</option>
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>
        </div>
        <div v-if="isRegister" class="form-group">
          <label for="email">Email *</label>
          <input id="email" v-model="form.email" type="email" required />
        </div>
        <div v-if="isRegister" class="form-group">
          <label for="contact">Contact (10-15 digits) *</label>
          <input id="contact" v-model="form.contact" type="text" pattern="\d{10,15}" required />
        </div>
        <button type="submit" class="btn-primary">{{ isRegister ? 'Register' : 'Login' }}</button>
      </form>
      <button @click="isRegister = !isRegister" class="btn-toggle">
        {{ isRegister ? 'Already have an account? Login' : "Don't have an account? Register here" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const emit = defineEmits(['alert'])
const router = useRouter()
const authStore = useAuthStore()

const isRegister = ref(false)
const form = ref({
  username: '',
  password: '',
  name: '',
  role: '',
  email: '',
  contact: ''
})

const handleSubmit = async () => {
  try {
    if (isRegister.value) {
      await authStore.register(form.value)
      emit('alert', 'Registration successful! Please login.', 'success')
      isRegister.value = false
      form.value = { username: '', password: '', name: '', role: '', email: '', contact: '' }
    } else {
      await authStore.login(form.value.username, form.value.password)
      emit('alert', 'Login successful', 'success')
      router.push('/dashboard')
    }
  } catch (error) {
    emit('alert', error.message, 'error')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 10px;
  font-size: 24px;
}

h2 {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
}

.btn-primary:hover {
  background: #5568d3;
}

.btn-toggle {
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  background: transparent;
  color: #667eea;
  border: 1px solid #667eea;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
}

.btn-toggle:hover {
  background: #f0f4ff;
}

.demo-info {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.demo-info p {
  margin: 5px 0;
}
</style>
