
<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $database = new Database();
    $db = $database->getConnection();
    
    if (isset($_GET['id'])) {
        try {
            $query = "SELECT p.*, a.name as artist_name 
                    FROM projects p
                    LEFT JOIN artists a ON p.artist_id = a.id
                    WHERE p.id = :id";
            
            if (isset($_GET['user_id'])) {
                $query .= " AND p.user_id = :user_id";
            }
            
            $stmt = $db->prepare($query);
            
            $stmt->bindParam(":id", $_GET['id']);
            if (isset($_GET['user_id'])) {
                $stmt->bindParam(":user_id", $_GET['user_id']);
            }
            
            $stmt->execute();
            
            if ($stmt->rowCount() > 0) {
                $project = $stmt->fetch(PDO::FETCH_ASSOC);
                http_response_code(200);
                echo json_encode($project);
            } else {
                http_response_code(404);
                echo json_encode(array("message" => "Project not found."));
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
