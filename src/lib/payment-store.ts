// This is a temporary in-memory store for payment status
// In a real app, you would use a Database (Prisma/PostgreSQL)
export const payments: Record<string, boolean> = {};
