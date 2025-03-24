
-- SQL to create or alter the artists table

-- Check if the table exists first
-- If you're using phpMyAdmin, you can run this directly

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS artists (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  genre VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL,
  phone VARCHAR(20) DEFAULT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_id INT(11) NOT NULL,
  address TEXT DEFAULT NULL,
  bio TEXT DEFAULT NULL,
  photo TEXT DEFAULT NULL,
  rehearsal_hours DECIMAL(10,2) DEFAULT 0.00,
  total_revenue DECIMAL(10,2) DEFAULT 0.00,
  social TEXT DEFAULT NULL,
  PRIMARY KEY (id),
  KEY user_id (user_id)
);

-- If the table already exists but needs columns added
-- You can run these ALTER statements individually

-- Add address column if missing
ALTER TABLE artists ADD COLUMN IF NOT EXISTS address TEXT DEFAULT NULL;

-- Add bio column if missing
ALTER TABLE artists ADD COLUMN IF NOT EXISTS bio TEXT DEFAULT NULL;

-- Add photo column if missing
ALTER TABLE artists ADD COLUMN IF NOT EXISTS photo TEXT DEFAULT NULL;

-- Add rehearsal_hours column if missing 
ALTER TABLE artists ADD COLUMN IF NOT EXISTS rehearsal_hours DECIMAL(10,2) DEFAULT 0.00;

-- Add total_revenue column if missing
ALTER TABLE artists ADD COLUMN IF NOT EXISTS total_revenue DECIMAL(10,2) DEFAULT 0.00;

-- Add social column if missing
ALTER TABLE artists ADD COLUMN IF NOT EXISTS social TEXT DEFAULT NULL;
