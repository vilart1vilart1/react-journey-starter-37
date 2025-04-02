
-- Add category columns to password_vault table
ALTER TABLE password_vault
ADD COLUMN category_id CHAR(36) NULL,
ADD COLUMN subcategory_id CHAR(36) NULL;

-- Add category columns to tasks table
ALTER TABLE tasks
ADD COLUMN category_id CHAR(36) NULL,
ADD COLUMN subcategory_id CHAR(36) NULL;

-- Add category columns to events table
ALTER TABLE events
ADD COLUMN category_id CHAR(36) NULL,
ADD COLUMN subcategory_id CHAR(36) NULL;

-- Add category columns to files table
ALTER TABLE files
ADD COLUMN category_id CHAR(36) NULL,
ADD COLUMN subcategory_id CHAR(36) NULL;

-- Add category columns to transactions table
ALTER TABLE transactions
ADD COLUMN category_id CHAR(36) NULL,
ADD COLUMN subcategory_id CHAR(36) NULL;

-- Add category columns to projects table
ALTER TABLE projects
ADD COLUMN category_id CHAR(36) NULL,
ADD COLUMN subcategory_id CHAR(36) NULL;

-- Add category columns to project_tasks table
ALTER TABLE project_tasks
ADD COLUMN category_id CHAR(36) NULL,
ADD COLUMN subcategory_id CHAR(36) NULL;

-- Create indexes for improved performance
CREATE INDEX idx_password_vault_category ON password_vault(category_id);
CREATE INDEX idx_password_vault_subcategory ON password_vault(subcategory_id);
CREATE INDEX idx_tasks_category ON tasks(category_id);
CREATE INDEX idx_tasks_subcategory ON tasks(subcategory_id);
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_subcategory ON events(subcategory_id);
CREATE INDEX idx_files_category ON files(category_id);
CREATE INDEX idx_files_subcategory ON files(subcategory_id);
CREATE INDEX idx_transactions_category ON transactions(category_id);
CREATE INDEX idx_transactions_subcategory ON transactions(subcategory_id);
CREATE INDEX idx_projects_category ON projects(category_id);
CREATE INDEX idx_projects_subcategory ON projects(subcategory_id);
CREATE INDEX idx_project_tasks_category ON project_tasks(category_id);
CREATE INDEX idx_project_tasks_subcategory ON project_tasks(subcategory_id);

-- Create views for easier querying of categorized data
CREATE OR REPLACE VIEW view_categorized_tasks AS
SELECT t.*, c.name as category_name, s.name as subcategory_name
FROM tasks t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN subcategories s ON t.subcategory_id = s.id;

CREATE OR REPLACE VIEW view_categorized_events AS
SELECT e.*, c.name as category_name, s.name as subcategory_name
FROM events e
LEFT JOIN categories c ON e.category_id = c.id
LEFT JOIN subcategories s ON e.subcategory_id = s.id;

CREATE OR REPLACE VIEW view_categorized_files AS
SELECT f.*, c.name as category_name, s.name as subcategory_name
FROM files f
LEFT JOIN categories c ON f.category_id = c.id
LEFT JOIN subcategories s ON f.subcategory_id = s.id;

CREATE OR REPLACE VIEW view_categorized_passwords AS
SELECT p.*, c.name as category_name, s.name as subcategory_name
FROM password_vault p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN subcategories s ON p.subcategory_id = s.id;

CREATE OR REPLACE VIEW view_categorized_transactions AS
SELECT t.*, c.name as category_name, s.name as subcategory_name
FROM transactions t
LEFT JOIN categories c ON t.category_id = c.id
LEFT JOIN subcategories s ON t.subcategory_id = s.id;

CREATE OR REPLACE VIEW view_categorized_projects AS
SELECT p.*, c.name as category_name, s.name as subcategory_name
FROM projects p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN subcategories s ON p.subcategory_id = s.id;

CREATE OR REPLACE VIEW view_categorized_project_tasks AS
SELECT pt.*, c.name as category_name, s.name as subcategory_name
FROM project_tasks pt
LEFT JOIN categories c ON pt.category_id = c.id
LEFT JOIN subcategories s ON pt.subcategory_id = s.id;
