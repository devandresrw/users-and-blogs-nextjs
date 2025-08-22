export async function uploadAllBlogs(data: { blogsData: any }) {
 const res = await fetch("/api/blogs/import", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });
 if (!res.ok) throw new Error("Error en la importación");
 return res.json();
}