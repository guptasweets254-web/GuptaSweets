-- Create Inquiry table
CREATE TABLE "Inquiry" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "subject" TEXT,
  "message" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Unread',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT now()
);
