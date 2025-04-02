
<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $database = new Database();
    $db = $database->getConnection();
    
    if (isset($_GET['id'])) {
        try {
            $query = "SELECT e.*, c.name as category_name, s.name as subcategory_name 
                    FROM events e
                    LEFT JOIN categories c ON e.category_id = c.id
                    LEFT JOIN subcategories s ON e.subcategory_id = s.id
                    WHERE e.id = :id";
                    
            if (isset($_GET['user_id'])) {
                $query .= " AND e.user_id = :user_id";
            }
            
            $stmt = $db->prepare($query);
            
            $stmt->bindParam(":id", $_GET['id']);
            if (isset($_GET['user_id'])) {
                $stmt->bindParam(":user_id", $_GET['user_id']);
            }
            
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                $event = $stmt->fetch(PDO::FETCH_ASSOC);
                http_response_code(200);
                echo json_encode($event);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Event not found."));
            }
        } catch(PDOException $e) {
            http_response_code(503);
            echo json_encode(array("message" => "Database error: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Missing ID parameter."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
