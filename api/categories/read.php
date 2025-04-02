
<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get database connection
    $database = new Database();
    $db = $database->getConnection();
    
    try {
        $query = "SELECT * FROM categories WHERE 1=1";
        $params = array();
        
        // Filter by user_id if provided
        if (isset($_GET['user_id'])) {
            $query .= " AND user_id = :user_id";
            $params[':user_id'] = $_GET['user_id'];
        }
        
        // Filter by entity_type if provided
        if (isset($_GET['entity_type'])) {
            $query .= " AND entity_type = :entity_type";
            $params[':entity_type'] = $_GET['entity_type'];
        }
        
        // Order by name
        $query .= " ORDER BY name ASC";
        
        $stmt = $db->prepare($query);
        
        // Bind parameters
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->execute();
        
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode($categories);
    } catch (PDOException $e) {
        http_response_code(503);
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
