
<?php
require_once '../../config/database.php';

// Handle POST request to create a new subcategory
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // Get posted data
    $data = json_decode(file_get_contents("php://input"));
    
    // Validate required fields
    if (
        empty($data->name) ||
        empty($data->category_id) ||
        empty($data->user_id)
    ) {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create subcategory. Required data is missing."));
        exit;
    }
    
    try {
        // Generate UUID v4
        $uuid = sprintf(
            '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
        
        // Insert query
        $query = "INSERT INTO subcategories (id, name, category_id, user_id, created_at) 
                  VALUES (:id, :name, :category_id, :user_id, NOW())";
        
        $stmt = $db->prepare($query);
        
        // Bind values
        $stmt->bindParam(":id", $uuid);
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":category_id", $data->category_id);
        $stmt->bindParam(":user_id", $data->user_id);
        
        // Execute query
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array(
                "message" => "Subcategory created successfully.",
                "id" => $uuid
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("message" => "Unable to create subcategory."));
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
