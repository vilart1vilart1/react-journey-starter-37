
<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();
    
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->title) && !empty($data->date) && !empty($data->location)) {
        try {
            $query = "INSERT INTO events (title, description, date, location, category_id, subcategory_id, user_id) 
                      VALUES (:title, :description, :date, :location, :category_id, :subcategory_id, :user_id)";
            
            $stmt = $db->prepare($query);
            
            // Set default value for description if not provided
            $description = property_exists($data, 'description') ? $data->description : null;
            $category_id = property_exists($data, 'category_id') ? $data->category_id : null;
            $subcategory_id = property_exists($data, 'subcategory_id') ? $data->subcategory_id : null;
            
            $stmt->bindParam(":title", $data->title);
            $stmt->bindParam(":description", $description);
            $stmt->bindParam(":date", $data->date);
            $stmt->bindParam(":location", $data->location);
            $stmt->bindParam(":category_id", $category_id);
            $stmt->bindParam(":subcategory_id", $subcategory_id);
            $stmt->bindParam(":user_id", $data->user_id);
            
            if ($stmt->execute()) {
                $event_id = $db->lastInsertId();
                
                http_response_code(201);
                echo json_encode(array(
                    "message" => "Event created successfully.",
                    "id" => $event_id
                ));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create event."));
            }
        } catch(PDOException $e) {
            http_response_code(503);
            echo json_encode(array("message" => "Database error: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create event. Data is incomplete."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
