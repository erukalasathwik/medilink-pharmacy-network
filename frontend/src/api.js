const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) {
    let message = `API request failed: ${response.status}`;
    try { const body = await response.json(); message = body.message || message; } catch {}
    throw new Error(message);
  }
  return response.status === 204 ? null : response.json();
}

export const api = {
  search: (q = "") => request(`/search/medicines?q=${encodeURIComponent(q)}`),
  inventory: () => request(`/medicines`),
  pharmacies: () => request(`/pharmacies`),
  pharmacyInventory: (id) => request(`/pharmacies/${id}/inventory`),
  updateInventory: (id, quantity) => request(`/pharmacies/inventory/${id}`, { method: "PUT", body: JSON.stringify({ quantity }) }),
  createInquiry: (data) => request(`/inquiries`, { method: "POST", body: JSON.stringify(data) }),
  adminStats: () => request(`/admin/stats`),
  health: async () => {
    const response = await fetch(`${API_BASE.replace(/\/api$/, "")}/actuator/health`);
    return response.ok;
  }
};
