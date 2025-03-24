
<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();
    
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->name) && !empty($data->user_id)) {
        try {
            $query = "INSERT INTO artists (
                name, 
                genre, 
                email, 
                phone, 
                user_id, 
                address,
                bio,
                photo,
                social,
                rehearsal_hours,
                total_revenue
            ) VALUES (
                :name, 
                :genre, 
                :email, 
                :phone, 
                :user_id, 
                :address,
                :bio,
                :photo,
                :social,
                :rehearsal_hours,
                :total_revenue
            )";
            
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
            $stmt->bindParam(":user_id", $data->user_id);
            $stmt->bindParam(":address", $address);
            $stmt->bindParam(":bio", $bio);
            $stmt->bindParam(":photo", $photo);
            $stmt->bindParam(":social", $social);
            $stmt->bindParam(":rehearsal_hours", $rehearsal_hours);
            $stmt->bindParam(":total_revenue", $total_revenue);
            
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(array("message" => "Artist created successfully.", "id" => $db->lastInsertId()));
            } else {
                http_response_code(503);
                echo json_encode(array("message" => "Unable to create artist."));
            }
        } catch(PDOException $e) {
            http_response_code(503);
            echo json_encode(array("message" => "Database error: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Unable to create artist. Data is incomplete."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
