const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function handle401(res: Response) {
  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/';
    throw new Error('Unauthorized');
  }
}

export async function fetchUser() {
  const res = await fetch(`${API_URL}/user`, {
    headers: { ...getAuthHeaders() }
  });
  handle401(res);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function updateUser(data: any) {
  const res = await fetch(`${API_URL}/user`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  handle401(res);
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
}

export async function fetchApplications() {
  const res = await fetch(`${API_URL}/applications`, {
    headers: { ...getAuthHeaders() }
  });
  handle401(res);
  if (!res.ok) throw new Error("Failed to fetch applications");
  return res.json();
}

export async function addApplication(data: any) {
  const res = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  handle401(res);
  if (!res.ok) throw new Error("Failed to add application");
  return res.json();
}

export async function updateApplication(id: number, data: any) {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(data),
  });
  handle401(res);
  if (!res.ok) throw new Error("Failed to update application");
  return res.json();
}

export async function deleteApplication(id: number) {
  const res = await fetch(`${API_URL}/applications/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() }
  });
  handle401(res);
  if (!res.ok) throw new Error("Failed to delete application");
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid email or password");
  return res.json();
}

export async function signup(data: any) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
} 