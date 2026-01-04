-- Create SiteSetting table to store site settings as JSON
CREATE TABLE "SiteSetting" (
  "id" SERIAL PRIMARY KEY,
  "data" JSONB NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT now()
);
