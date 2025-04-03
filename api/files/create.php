
<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $database = new Database();
    $db = $database->getConnection();
    
    // Check if file was uploaded
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $fileName = $file['name'];
        $fileType = $file['type'];
        $fileSize = $file['size'];
        $fileTmpName = $file['tmp_name'];
        
        // Generate a unique ID for the file
        $fileId = uniqid();
        
        // Define upload directory (relative to this script's location)
        $uploadDir = '../uploads/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        // Ensure the file name is unique
        $uniqueFileName = $fileId . '_' . $fileName;
        $uploadPath = $uploadDir . $uniqueFileName;
        
        // Generate the file URL (adjust according to your server setup)
        $fileUrl = 'https://api.vilartprod.ch/api/uploads/' . $uniqueFileName;
        
        // Get other form data
        $userId = isset($_POST['user_id']) ? $_POST['user_id'] : null;
        $categoryId = isset($_POST['category_id']) ? $_POST['category_id'] : null;
        $subcategoryId = isset($_POST['subcategory_id']) ? $_POST['subcategory_id'] : null;
        
        // Move the uploaded file to the destination
        if (move_uploaded_file($fileTmpName, $uploadPath)) {
            try {
                // Insert file information into the database
                $query = "INSERT INTO files (id, name, type, size, url, category_id, subcategory_id, user_id) 
                          VALUES (:id, :name, :type, :size, :url, :category_id, :subcategory_id, :user_id)";
                
                $stmt = $db->prepare($query);
                
                $stmt->bindParam(":id", $fileId);
                $stmt->bindParam(":name", $fileName);
                $stmt->bindParam(":type", $fileType);
                $stmt->bindParam(":size", $fileSize);
                $stmt->bindParam(":url", $fileUrl);
                $stmt->bindParam(":category_id", $categoryId);
                $stmt->bindParam(":subcategory_id", $subcategoryId);
                $stmt->bindParam(":user_id", $userId);
                
                if ($stmt->execute()) {
                    // Return the file information as the response
                    $fileInfo = array(
                        "id" => $fileId,
                        "name" => $fileName,
                        "type" => $fileType,
                        "size" => $fileSize,
                        "url" => $fileUrl,
                        "category_id" => $categoryId,
                        "subcategory_id" => $subcategoryId,
                        "user_id" => $userId
                    );
                    
                    http_response_code(201);
                    echo json_encode($fileInfo);
                } else {
                    // If database insert fails, delete the uploaded file
                    unlink($uploadPath);
                    http_response_code(503);
                    echo json_encode(array("message" => "Failed to record file information in database."));
                }
            } catch(PDOException $e) {
                // If database error occurs, delete the uploaded file
                unlink($uploadPath);
                http_response_code(503);
                echo json_encode(array("message" => "Database error: " . $e->getMessage()));
            }
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to move uploaded file."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "No file uploaded."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
