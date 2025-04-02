
<?php
require_once '../../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // Get ID from URL
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : null;
    
    if (empty($id) || empty($user_id)) {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to delete subcategory. Missing ID or user_id."));
        exit;
    }
    
    try {
        $query = "DELETE FROM subcategories WHERE id = :id AND user_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":user_id", $user_id);
        
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(array("message" => "Subcategory deleted successfully."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to delete subcategory."));
        }
    } catch (PDOException $e) {
        http_response_code(503);
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
