// Initialize default data
const initializeData = () => {
  if (!localStorage.getItem('users')) {
    const defaultUsers = [
      { id: 1, username: 'admin', password: 'admin123', name: 'Belyse', role: 'admin', email: 'admin@example.com', contact: '0784973858' },
      { id: 2, username: 'landlord1', password: 'land123', name: 'John L', role: 'landlord', email: 'landlord1@example.com', contact: '0782095040' },
      { id: 3, username: 'landlord2', password: 'land123', name: 'Jane L', role: 'landlord', email: 'landlord2@example.com', contact: '0782095040' },
      { id: 4, username: 'tenant1', password: 'tenant123', name: 'Ines', role: 'tenant', email: 'tenant1@example.com', contact: '0782095040' }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    localStorage.setItem('properties', JSON.stringify([
      { id: 1, name: 'Modern Apartment', address: '123 Main St, Kigali', rent: 700000, status: 'Available', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop', owner_id: 2 },
      { id: 2, name: 'Cozy House', address: '456 Oak Ave, Kigali', rent: 500000, status: 'Available', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop', owner_id: 2 },
      { id: 3, name: 'Studio Apartment', address: '789 Pine Rd, Kigali', rent: 300000, status: 'Occupied', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop', owner_id: 3 },
      { id: 4, name: 'Family Home', address: '321 Elm St, Kigali', rent: 600000, status: 'Available', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop', owner_id: 3 }
    ]));
    localStorage.setItem('tenants', JSON.stringify([]));
    localStorage.setItem('payments', JSON.stringify([]));
    localStorage.setItem('bookings', JSON.stringify([]));
    localStorage.setItem('nextId', JSON.stringify({ users: 5, properties: 5, tenants: 1, payments: 1, bookings: 1 }));
  }
};

const getNextId = (type) => {
  const nextIds = JSON.parse(localStorage.getItem('nextId') || '{}');
  const id = nextIds[type] || 1;
  nextIds[type] = id + 1;
  localStorage.setItem('nextId', JSON.stringify(nextIds));
  return id;
};

const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

const filterByRole = (data, currentUser) => {
  if (!currentUser || currentUser.role === 'admin') return data;
  if (currentUser.role === 'landlord') {
    return data.filter(item => item.landlord_id === currentUser.id || item.owner_id === currentUser.id);
  }
  if (currentUser.role === 'tenant') {
    return data.filter(item => item.tenant_id === currentUser.id);
  }
  return data;
};

const api = {
  // Auth
  async login(username, password) {
    initializeData();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    
    const token = btoa(JSON.stringify(user));
    localStorage.setItem('token', token);
    return user;
  },

  async register(userData) {
    initializeData();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === userData.username)) {
      throw new Error('Username already exists');
    }
    
    const newUser = {
      id: getNextId('users'),
      ...userData,
      role: 'tenant'
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return { message: 'Registration successful' };
  },

  // Properties
  async getProperties() {
    initializeData();
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const currentUser = getCurrentUser();
    
    // Tenants should see all properties, others get filtered
    if (currentUser && currentUser.role === 'tenant') {
      return properties;
    }
    
    return filterByRole(properties, currentUser);
  },

  async createProperty(property) {
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const currentUser = getCurrentUser();
    
    let imageUrl = null;
    if (property.imageFile) {
      // Convert image to base64 for persistence
      imageUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(property.imageFile);
      });
    }
    
    const newProperty = {
      id: getNextId('properties'),
      name: property.name,
      address: property.address,
      rent: parseFloat(property.rent),
      status: 'Available',
      image: imageUrl,
      owner_id: currentUser.role === 'admin' ? property.owner_id : currentUser.id
    };
    
    properties.push(newProperty);
    localStorage.setItem('properties', JSON.stringify(properties));
    return newProperty;
  },

  async updateProperty(id, property) {
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const index = properties.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Property not found');
    
    let imageUrl = properties[index].image;
    if (property.imageFile) {
      // Convert new image to base64
      imageUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(property.imageFile);
      });
    } else if (property.image) {
      imageUrl = property.image;
    }
    
    properties[index] = {
      ...properties[index],
      name: property.name,
      address: property.address,
      rent: parseFloat(property.rent),
      status: property.status,
      image: imageUrl
    };
    
    localStorage.setItem('properties', JSON.stringify(properties));
    return properties[index];
  },

  async deleteProperty(id) {
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const filtered = properties.filter(p => p.id !== parseInt(id));
    localStorage.setItem('properties', JSON.stringify(filtered));
    return { message: 'Property deleted' };
  },

  // Tenants
  async getTenants() {
    initializeData();
    const tenants = JSON.parse(localStorage.getItem('tenants') || '[]');
    const currentUser = getCurrentUser();
    return filterByRole(tenants, currentUser);
  },

  async createTenant(tenant) {
    const tenants = JSON.parse(localStorage.getItem('tenants') || '[]');
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const currentUser = getCurrentUser();
    
    if (tenant.property_id) {
      const property = properties.find(p => p.id === parseInt(tenant.property_id));
      if (property && property.status === 'Occupied') {
        throw new Error('Property is already occupied');
      }
      // Update property status
      const propIndex = properties.findIndex(p => p.id === parseInt(tenant.property_id));
      if (propIndex !== -1) {
        properties[propIndex].status = 'Occupied';
        localStorage.setItem('properties', JSON.stringify(properties));
      }
    }
    
    const newTenant = {
      id: getNextId('tenants'),
      ...tenant,
      property_id: tenant.property_id ? parseInt(tenant.property_id) : null,
      landlord_id: currentUser.role === 'admin' ? tenant.landlord_id : currentUser.id
    };
    
    tenants.push(newTenant);
    localStorage.setItem('tenants', JSON.stringify(tenants));
    return newTenant;
  },

  async updateTenant(id, tenant) {
    const tenants = JSON.parse(localStorage.getItem('tenants') || '[]');
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const index = tenants.findIndex(t => t.id === parseInt(id));
    if (index === -1) throw new Error('Tenant not found');
    
    const oldPropertyId = tenants[index].property_id;
    const newPropertyId = tenant.property_id ? parseInt(tenant.property_id) : null;
    
    // Update property statuses
    if (oldPropertyId && oldPropertyId !== newPropertyId) {
      const oldPropIndex = properties.findIndex(p => p.id === oldPropertyId);
      if (oldPropIndex !== -1) {
        properties[oldPropIndex].status = 'Available';
      }
    }
    
    if (newPropertyId && newPropertyId !== oldPropertyId) {
      const newPropIndex = properties.findIndex(p => p.id === newPropertyId);
      if (newPropIndex !== -1) {
        if (properties[newPropIndex].status === 'Occupied') {
          throw new Error('Property is already occupied');
        }
        properties[newPropIndex].status = 'Occupied';
      }
    }
    
    tenants[index] = {
      ...tenants[index],
      ...tenant,
      property_id: newPropertyId
    };
    
    localStorage.setItem('tenants', JSON.stringify(tenants));
    localStorage.setItem('properties', JSON.stringify(properties));
    return tenants[index];
  },

  async deleteTenant(id) {
    const tenants = JSON.parse(localStorage.getItem('tenants') || '[]');
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const tenant = tenants.find(t => t.id === parseInt(id));
    
    if (tenant && tenant.property_id) {
      const propIndex = properties.findIndex(p => p.id === tenant.property_id);
      if (propIndex !== -1) {
        properties[propIndex].status = 'Available';
        localStorage.setItem('properties', JSON.stringify(properties));
      }
    }
    
    const filtered = tenants.filter(t => t.id !== parseInt(id));
    localStorage.setItem('tenants', JSON.stringify(filtered));
    return { message: 'Tenant deleted' };
  },

  // Payments
  async getPayments() {
    initializeData();
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const currentUser = getCurrentUser();
    return filterByRole(payments, currentUser);
  },

  async createPayment(payment) {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const currentUser = getCurrentUser();
    
    const newPayment = {
      id: getNextId('payments'),
      ...payment,
      amount: parseFloat(payment.amount),
      tenant_id: parseInt(payment.tenant_id),
      property_id: parseInt(payment.property_id),
      landlord_id: currentUser.role === 'admin' ? payment.landlord_id : currentUser.id
    };
    
    payments.push(newPayment);
    localStorage.setItem('payments', JSON.stringify(payments));
    return newPayment;
  },

  async updatePayment(id, payment) {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const index = payments.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Payment not found');
    
    payments[index] = {
      ...payments[index],
      ...payment,
      amount: parseFloat(payment.amount),
      tenant_id: parseInt(payment.tenant_id),
      property_id: parseInt(payment.property_id)
    };
    
    localStorage.setItem('payments', JSON.stringify(payments));
    return payments[index];
  },

  async deletePayment(id) {
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const filtered = payments.filter(p => p.id !== parseInt(id));
    localStorage.setItem('payments', JSON.stringify(filtered));
    return { message: 'Payment deleted' };
  },

  // Bookings
  async getBookings() {
    initializeData();
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = getCurrentUser();
    
    let filteredBookings = [];
    
    if (currentUser.role === 'tenant') {
      filteredBookings = bookings.filter(b => b.tenant_id === currentUser.id);
    } else if (currentUser.role === 'landlord') {
      const landlordProperties = properties.filter(p => p.owner_id === currentUser.id).map(p => p.id);
      filteredBookings = bookings.filter(b => landlordProperties.includes(b.property_id));
    } else {
      filteredBookings = bookings;
    }
    
    // Enrich bookings with property and tenant information
    return filteredBookings.map(booking => {
      const property = properties.find(p => p.id === booking.property_id);
      const tenant = users.find(u => u.id === booking.tenant_id);
      
      return {
        ...booking,
        property_name: property ? property.name : 'Unknown Property',
        property_address: property ? property.address : '',
        tenant_name: tenant ? tenant.name : 'Unknown Tenant',
        tenant_email: tenant ? tenant.email : '',
        tenant_contact: tenant ? tenant.contact : ''
      };
    });
  },

  async createBooking(property_id) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const currentUser = getCurrentUser();
    
    const newBooking = {
      id: getNextId('bookings'),
      property_id: parseInt(property_id),
      tenant_id: currentUser.id,
      status: 'Pending'
    };
    
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return newBooking;
  },

  async updateBookingStatus(id, status) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
    const tenants = JSON.parse(localStorage.getItem('tenants') || '[]');
    
    const index = bookings.findIndex(b => b.id === parseInt(id));
    if (index === -1) throw new Error('Booking not found');
    
    bookings[index].status = status;
    
    if (status === 'Approved') {
      const booking = bookings[index];
      const propIndex = properties.findIndex(p => p.id === booking.property_id);
      if (propIndex !== -1) {
        properties[propIndex].status = 'Occupied';
      }
      
      // Create tenant record
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const tenantUser = users.find(u => u.id === booking.tenant_id);
      if (tenantUser) {
        const newTenant = {
          id: getNextId('tenants'),
          name: tenantUser.name,
          email: tenantUser.email,
          contact: tenantUser.contact,
          property_id: booking.property_id,
          landlord_id: properties[propIndex].owner_id
        };
        tenants.push(newTenant);
        localStorage.setItem('tenants', JSON.stringify(tenants));
      }
    }
    
    localStorage.setItem('bookings', JSON.stringify(bookings));
    localStorage.setItem('properties', JSON.stringify(properties));
    return bookings[index];
  },

  // Users
  async getUsers() {
    initializeData();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.filter(u => u.role !== 'admin');
  },

  async createUser(user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === user.username)) {
      throw new Error('Username already exists');
    }
    
    const newUser = {
      id: getNextId('users'),
      ...user
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  },

  async updateUser(id, user) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const index = users.findIndex(u => u.id === parseInt(id));
    if (index === -1) throw new Error('User not found');
    
    const existingUser = users.find(u => u.username === user.username && u.id !== parseInt(id));
    if (existingUser) throw new Error('Username already exists');
    
    users[index] = { ...users[index], ...user };
    localStorage.setItem('users', JSON.stringify(users));
    return users[index];
  },

  async deleteUser(id) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filtered = users.filter(u => u.id !== parseInt(id));
    localStorage.setItem('users', JSON.stringify(filtered));
    return { message: 'User deleted' };
  }
};

export default api;
