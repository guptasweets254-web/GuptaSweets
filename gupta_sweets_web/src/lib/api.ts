import { getCsrf } from './auth';

const API = import.meta.env.VITE_API_URL ?? '';

export async function getProducts() {
  const res = await fetch(`${API}/products`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function deleteProduct(id: number) {
  const csrf = await getCsrf();
  const res = await fetch(`${API}/products/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'x-csrf-token': csrf,
    },
  });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}

export async function getGallery() {
  const res = await fetch(`${API}/gallery`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch gallery images');
  return res.json();
}

export async function deleteGalleryImage(id: number) {
  const csrf = await getCsrf();
  const res = await fetch(`${API}/gallery/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'x-csrf-token': csrf },
  });
  if (!res.ok) throw new Error('Failed to delete gallery image');
  return res.json();
}

export async function getTestimonials() {
  const res = await fetch(`${API}/testimonials`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch testimonials');
  return res.json();
}

export async function deleteTestimonial(id: number) {
  const csrf = await getCsrf();
  const res = await fetch(`${API}/testimonials/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'x-csrf-token': csrf },
  });
  if (!res.ok) throw new Error('Failed to delete testimonial');
  return res.json();
}

// Categories
export async function getCategories() {
  const res = await fetch(`${API}/categories`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function createCategory(name: string) {
  const csrf = await getCsrf();
  const res = await fetch(`${API}/categories`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return res.json();
}

export async function updateCategory(id: number, data: any) {
  const csrf = await getCsrf();
  const res = await fetch(`${API}/categories/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update category');
  return res.json();
}

export async function deleteCategory(id: number) {
  const csrf = await getCsrf();
  const res = await fetch(`${API}/categories/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'x-csrf-token': csrf },
  });
  if (!res.ok) throw new Error('Failed to delete category');
  return res.json();
}

// Products
export async function updateProduct(id: number, data: any) {
  const csrf = await getCsrf();
  const res = await fetch(`${API}/products/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'x-csrf-token': csrf },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}
