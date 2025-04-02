
-- Original invoice columns
ALTER TABLE invoices ADD COLUMN client_address VARCHAR(255) DEFAULT NULL;
ALTER TABLE invoices ADD COLUMN client_phone VARCHAR(50) DEFAULT NULL;
ALTER TABLE invoices ADD COLUMN client_tax_number VARCHAR(50) DEFAULT NULL;
ALTER TABLE invoices ADD COLUMN company_name VARCHAR(100) DEFAULT 'Vilart Production';
ALTER TABLE invoices ADD COLUMN company_tax_number VARCHAR(50) DEFAULT '1865480/V/A/M/000';
ALTER TABLE invoices ADD COLUMN company_address VARCHAR(255) DEFAULT 'A3, Imm La Coupole, rue Windermere, Lac 1, Tunis 1053';
ALTER TABLE invoices ADD COLUMN company_phone VARCHAR(50) DEFAULT '+216 54 754 704';
ALTER TABLE invoices ADD COLUMN company_email VARCHAR(100) DEFAULT 'vilartprod@gmail.com';

-- Add category support to invoices
ALTER TABLE invoices ADD COLUMN category_id CHAR(36) DEFAULT NULL;
ALTER TABLE invoices ADD COLUMN subcategory_id CHAR(36) DEFAULT NULL;

-- Add category support to files
ALTER TABLE files ADD COLUMN category_id CHAR(36) DEFAULT NULL;
ALTER TABLE files ADD COLUMN subcategory_id CHAR(36) DEFAULT NULL;

-- Add category support to events
ALTER TABLE events ADD COLUMN category_id CHAR(36) DEFAULT NULL;
ALTER TABLE events ADD COLUMN subcategory_id CHAR(36) DEFAULT NULL;

-- Add category support to tasks
ALTER TABLE tasks ADD COLUMN category_id CHAR(36) DEFAULT NULL;
ALTER TABLE tasks ADD COLUMN subcategory_id CHAR(36) DEFAULT NULL;

-- Add category support to projects
ALTER TABLE projects ADD COLUMN category_id CHAR(36) DEFAULT NULL;
ALTER TABLE projects ADD COLUMN subcategory_id CHAR(36) DEFAULT NULL;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL, -- 'invoice', 'file', 'event', 'task', 'project'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id CHAR(36) NOT NULL
);

-- Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category_id CHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id CHAR(36) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
