const API_URL = (import.meta.env.VITE_API_URL || 'https://tmback.netlify.app').replace(/\/+$/, '');

export async function login(email: string, password: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to login');
    }

    const { token } = await response.json();
    localStorage.setItem('admin_token', token);
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : 'Network error occurred');
  }
}

export async function logout(): Promise<void> {
  localStorage.removeItem('admin_token');
}

export async function isValidAdmin(): Promise<boolean> {
  const token = localStorage.getItem('admin_token');
  if (!token) return false;

  try {
    const response = await fetch(`${API_URL}/api/verify`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
    });
    const data = await response.json();
    return data.valid;
  } catch {
    return false;
  }
}

// Admins CRUD
export async function getAdmins(): Promise<any[]> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/admins`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch admins');
  }

  return await response.json();
}

export async function createAdmin(email: string, password: string): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/admins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to create admin');
  }

  return await response.json();
}

export async function updateAdmin(id: string, email: string, password?: string): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/admins/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to update admin');
  }

  return await response.json();
}

export async function deleteAdmin(id: string): Promise<void> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/admins/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to delete admin');
  }
}

// Employees CRUD
export async function getEmployees(): Promise<any[]> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/employees`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch employees');
  }

  return await response.json();
}

export async function createEmployee(data: { name: string; email: string; position: string; joining_date: string; salary: number }): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/employees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to create employee');
  }

  return await response.json();
}

export async function updateEmployee(id: string, data: { name: string; email: string; position: string; joining_date: string; salary: number }): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to update employee');
  }

  return await response.json();
}

export async function deleteEmployee(id: string): Promise<void> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/employees/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to delete employee');
  }
}

// Attendance CRUD
export async function getAttendance(): Promise<any[]> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/attendance`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch attendance');
  }

  return await response.json();
}

export async function createAttendance(data: { employee_id: string; date: string; status: string }): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/attendance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to create attendance');
  }

  return await response.json();
}

export async function updateAttendance(id: string, data: { employee_id: string; date: string; status: string }): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/attendance/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to update attendance');
  }

  return await response.json();
}

export async function deleteAttendance(id: string): Promise<void> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/attendance/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to delete attendance');
  }
}

// Tasks CRUD
export async function getTasks(): Promise<any[]> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch tasks');
  }

  return await response.json();
}

export async function createTask(data: { employee_id: string; title: string; description: string; status: string; due_date: string }): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to create task');
  }

  return await response.json();
}

export async function updateTask(id: string, data: { employee_id: string; title: string; description: string; status: string; due_date: string }): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to update task');
  }

  return await response.json();
}

export async function deleteTask(id: string): Promise<void> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to delete task');
  }
}

// Certificates CRUD
export async function getCertificates(): Promise<any[]> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/certificates`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch certificates');
  }

  return await response.json();
}

export async function createCertificate(data: { name: string; start_date: string; end_date: string; type: string }): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/certificates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to create certificate');
  }

  return await response.json();
}

export async function updateCertificate(id: string, data: { name: string; start_date: string; end_date: string; type: string }): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/certificates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to update certificate');
  }

  return await response.json();
}

export async function deleteCertificate(id: string): Promise<void> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/certificates/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to delete certificate');
  }
}
// Licenses

export async function getLicenses(): Promise<any[]> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/license/list`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch licenses');
  }

  return await response.json();
}

export async function approveLicense(licenseNumber: string): Promise<void> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/license/approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ licenseNumber }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to approve license');
  }
}

// Invoices CRUD
export async function getInvoices(): Promise<any[]> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/invoices`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch invoices');
  }

  return await response.json();
}

export async function getInvoiceById(id: string): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/invoices/${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch invoice');
  }

  return await response.json();
}

export async function createInvoice(data: any): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/invoices`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to create invoice');
  }

  return await response.json();
}

export async function updateInvoice(id: string, data: any): Promise<any> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/invoices/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to update invoice');
  }

  return await response.json();
}

export async function deleteInvoice(id: string): Promise<void> {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_URL}/api/invoices/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to delete invoice');
  }
}