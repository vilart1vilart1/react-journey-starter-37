
-- Add category_id and subcategory_id to tasks table
ALTER TABLE tasks 
ADD COLUMN category_id VARCHAR(36) DEFAULT NULL,
ADD COLUMN subcategory_id VARCHAR(36) DEFAULT NULL;

-- Add category_id and subcategory_id to events table
ALTER TABLE events 
ADD COLUMN category_id VARCHAR(36) DEFAULT NULL,
ADD COLUMN subcategory_id VARCHAR(36) DEFAULT NULL;

-- Add category_id and subcategory_id to passwords table
ALTER TABLE passwords 
ADD COLUMN category_id VARCHAR(36) DEFAULT NULL,
ADD COLUMN subcategory_id VARCHAR(36) DEFAULT NULL;

-- Add category_id and subcategory_id to transactions table
ALTER TABLE transactions 
ADD COLUMN category_id VARCHAR(36) DEFAULT NULL,
ADD COLUMN subcategory_id VARCHAR(36) DEFAULT NULL;

-- Add category_id and subcategory_id to files table
ALTER TABLE files 
ADD COLUMN category_id VARCHAR(36) DEFAULT NULL,
ADD COLUMN subcategory_id VARCHAR(36) DEFAULT NULL;

-- Add category_id and subcategory_id to invoices table
ALTER TABLE invoices 
ADD COLUMN category_id VARCHAR(36) DEFAULT NULL,
ADD COLUMN subcategory_id VARCHAR(36) DEFAULT NULL;

-- Add category_id and subcategory_id to projects table
ALTER TABLE projects 
ADD COLUMN category_id VARCHAR(36) DEFAULT NULL,
ADD COLUMN subcategory_id VARCHAR(36) DEFAULT NULL;

-- Add category_id and subcategory_id to artists table
ALTER TABLE artists 
ADD COLUMN category_id VARCHAR(36) DEFAULT NULL,
ADD COLUMN subcategory_id VARCHAR(36) DEFAULT NULL;

-- Add category_id and subcategory_id to reservations table
ALTER TABLE reservations 
ADD COLUMN category_id VARCHAR(36) DEFAULT NULL,
ADD COLUMN subcategory_id VARCHAR(36) DEFAULT NULL;

-- Add foreign key constraints
ALTER TABLE tasks
ADD CONSTRAINT fk_tasks_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_tasks_subcategory
FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

ALTER TABLE events
ADD CONSTRAINT fk_events_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_events_subcategory
FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

ALTER TABLE passwords
ADD CONSTRAINT fk_passwords_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_passwords_subcategory
FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

ALTER TABLE transactions
ADD CONSTRAINT fk_transactions_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_transactions_subcategory
FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

ALTER TABLE files
ADD CONSTRAINT fk_files_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_files_subcategory
FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

ALTER TABLE invoices
ADD CONSTRAINT fk_invoices_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_invoices_subcategory
FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

ALTER TABLE projects
ADD CONSTRAINT fk_projects_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_projects_subcategory
FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

ALTER TABLE artists
ADD CONSTRAINT fk_artists_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_artists_subcategory
FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

ALTER TABLE reservations
ADD CONSTRAINT fk_reservations_category
FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_reservations_subcategory
FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL;

-- Create views for easier querying with category and subcategory names
CREATE OR REPLACE VIEW tasks_with_categories AS
SELECT t.*, c.name as category_name, s.name as subcategory_name
FROM tasks t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN subcategories s ON t.subcategory_id = s.id;

CREATE OR REPLACE VIEW events_with_categories AS
SELECT e.*, c.name as category_name, s.name as subcategory_name
FROM events e
LEFT JOIN categories c ON e.category_id = c.id
LEFT JOIN subcategories s ON e.subcategory_id = s.id;

CREATE OR REPLACE VIEW passwords_with_categories AS
SELECT p.*, c.name as category_name, s.name as subcategory_name
FROM passwords p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN subcategories s ON p.subcategory_id = s.id;

CREATE OR REPLACE VIEW transactions_with_categories AS
SELECT t.*, c.name as category_name, s.name as subcategory_name
FROM transactions t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN subcategories s ON t.subcategory_id = s.id;

CREATE OR REPLACE VIEW files_with_categories AS
SELECT f.*, c.name as category_name, s.name as subcategory_name
FROM files f
LEFT JOIN categories c ON f.category_id = c.id
LEFT JOIN subcategories s ON f.subcategory_id = s.id;

CREATE OR REPLACE VIEW invoices_with_categories AS
SELECT i.*, c.name as category_name, s.name as subcategory_name
FROM invoices i
LEFT JOIN categories c ON i.category_id = c.id
LEFT JOIN subcategories s ON i.subcategory_id = s.id;

CREATE OR REPLACE VIEW projects_with_categories AS
SELECT p.*, c.name as category_name, s.name as subcategory_name
FROM projects p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN subcategories s ON p.subcategory_id = s.id;

CREATE OR REPLACE VIEW artists_with_categories AS
SELECT a.*, c.name as category_name, s.name as subcategory_name
FROM artists a
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN subcategories s ON a.subcategory_id = s.id;

CREATE OR REPLACE VIEW reservations_with_categories AS
SELECT r.*, c.name as category_name, s.name as subcategory_name
FROM reservations r
LEFT JOIN categories c ON r.category_id = c.id
LEFT JOIN subcategories s ON r.subcategory_id = s.id;
