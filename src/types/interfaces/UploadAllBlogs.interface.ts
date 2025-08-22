export interface UploadMasiveBlog {
 slug: string;              // Ej: "discover-the-scandinavian-city-home-to-iconic-painting-the-scream"
 titleNews: string;         // Ej: "Are you an expert traveller? Test your knowledge..."
 titlePunch: string;        // Ej: "Discover the Scandinavian City Home..."
 textRefined: string;       // Ej: "Are you an expert traveller?..."
 category: string;          // Ej: "Australia"
 author: string | null;     // Puede venir vacío en el CSV
 descriptionSeo: string | null; // Puede venir vacío
 postImages: string | null; // Puede ser una URL o quedar vacío
 createdAt: string;         // Ej: "2025-08-21T23:12:57.508Z" (ISO date string)
}
