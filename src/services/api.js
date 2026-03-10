const API_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('token');

const api = {
  // Auth
  async login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    localStorage.setItem('token', data.token);
    return data.user;
  },

  async register(userData) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  // Properties
  async getProperties() {
    const res = await fetch(`${API_URL}/properties`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  async createProperty(property) {
    const formData = new FormData();
    formData.append('name', property.name);
    formData.append('address', property.address);
    formData.append('rent', property.rent);
    if (property.owner_id) formData.append('owner_id', property.owner_id);
    if (property.imageFile) formData.append('image', property.imageFile);
    
    const res = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData
    });
    return res.json();
  },

  async updateProperty(id, property) {
    const formData = new FormData();
    formData.append('name', property.name);
    formData.append('address', property.address);
    formData.append('rent', property.rent);
    formData.append('status', property.status);
    if (property.image) formData.append('image', property.image);
    if (property.imageFile) formData.append('image', property.imageFile);
    
    const res = await fetch(`${API_URL}/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData
    });
    return res.json();
  },

  async deleteProperty(id) {
    const res = await fetch(`${API_URL}/properties/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  // Tenants
  async getTenants() {
    const res = await fetch(`${API_URL}/tenants`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  async createTenant(tenant) {
    const res = await fetch(`${API_URL}/tenants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(tenant)
    });
    return res.json();
  },

  async updateTenant(id, tenant) {
    const res = await fetch(`${API_URL}/tenants/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(tenant)
    });
    return res.json();
  },

  async deleteTenant(id) {
    const res = await fetch(`${API_URL}/tenants/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  // Payments
  async getPayments() {
    const res = await fetch(`${API_URL}/payments`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  async createPayment(payment) {
    const res = await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(payment)
    });
    return res.json();
  },

  async updatePayment(id, payment) {
    const res = await fetch(`${API_URL}/payments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(payment)
    });
    return res.json();
  },

  async deletePayment(id) {
    const res = await fetch(`${API_URL}/payments/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  // Bookings
  async getBookings() {
    const res = await fetch(`${API_URL}/bookings`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  async createBooking(property_id) {
    const res = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ property_id })
    });
    return res.json();
  },

  async updateBookingStatus(id, status) {
    const res = await fetch(`${API_URL}/bookings/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ status })
    });
    return res.json();
  },

  // Users
  async getUsers() {
    const res = await fetch(`${API_URL}/users`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return res.json();
  },

  async createUser(user) {
    const res = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(user)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async updateUser(id, user) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(user)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  async deleteUser(id) {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  }
};

export default api;
