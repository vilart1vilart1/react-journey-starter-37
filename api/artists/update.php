
<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $database = new Database();
    $db = $database->getConnection();
    
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->id)) {
        try {
            $query = "UPDATE artists 
                    SET name = :name, 
                        genre = :genre, 
                        email = :email, 
                        phone = :phone,
                        address = :address,
                        bio = :bio,
                        photo = :photo,
                        social = :social,
                        rehearsal_hours = :rehearsal_hours,
                        total_revenue = :total_revenue,
                        updated_at = NOW()
                    WHERE id = :id AND user_id = :user_id";
            
            $stmt = $db->prepare($query);
            
            // Convert empty strings to NULL
            $genre = !empty($data->genre) ? $data->genre : null;
            $email = !empty($data->email) ? $data->email : null;
            $phone = !empty($data->phone) ? $data->phone : null;
            $address = !empty($data->address) ? $data->address : null;
            $bio = !empty($data->bio) ? $data->bio : null;
            $photo = !empty($data->photo) ? $data->photo : null;
            $social = !empty($data->social) ? $data->social : null;
            $rehearsal_hours = isset($data->rehearsal_hours) ? $data->rehearsal_hours : 0;
            $total_revenue = isset($data->total_revenue) ? $data->total_revenue : 0;
            
            $stmt->bindParam(":name", $data->name);
            $stmt->bindParam(":genre", $genre);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":phone", $phone);
            $stmt->bindParam(":address", $address);
            $stmt->bindParam(":bio", $bio);
            $stmt->bindParam(":photo", $photo);
            $stmt->bindParam(":social", $social);
            $stmt->bindParam(":rehearsal_hours", $rehearsal_hours);
            $stmt->bindParam(":total_revenue", $total_revenue);
            $stmt->bindParam(":id", $data->id);
            $stmt->bindParam(":user_id", $data->user_id);
            
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Artist updated successfully."));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to update artist."));
            }
        } catch(PDOException $e) {
            http_response_code(503);
            echo json_encode(array("message" => "Database error: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to update artist. Data is incomplete."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
