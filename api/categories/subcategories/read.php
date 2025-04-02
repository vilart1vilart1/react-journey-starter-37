
<?php
require_once '../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get database connection
    $database = new Database();
    $db = $database->getConnection();
    
    try {
        $query = "SELECT * FROM subcategories WHERE 1=1";
        $params = array();
        
        // Filter by user_id if provided
        if (isset($_GET['user_id'])) {
            $query .= " AND user_id = :user_id";
            $params[':user_id'] = $_GET['user_id'];
        }
        
        // Filter by category_id if provided
        if (isset($_GET['category_id'])) {
            $query .= " AND category_id = :category_id";
            $params[':category_id'] = $_GET['category_id'];
        }
        
        // Order by name
        $query .= " ORDER BY name ASC";
        
        $stmt = $db->prepare($query);
        
        // Bind parameters
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        
        $stmt->execute();
        
        $subcategories = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        http_response_code(200);
        echo json_encode($subcategories);
    } catch (PDOException $e) {
        http_response_code(503);
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
