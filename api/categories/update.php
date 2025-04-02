
<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Get database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // Get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // Validate required fields
    if (
        empty($data->id) ||
        empty($data->name) ||
        empty($data->user_id)
    ) {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to update category. Required data is missing."));
        exit;
    }
    
    try {
        // Update query
        $query = "UPDATE categories SET 
                  name = :name 
                  WHERE id = :id AND user_id = :user_id";
        
        $stmt = $db->prepare($query);
        
        // Bind values
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":id", $data->id);
        $stmt->bindParam(":user_id", $data->user_id);
        
        // Execute query
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(array("message" => "Category updated successfully."));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to update category."));
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
