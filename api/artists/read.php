
<?php
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $database = new Database();
    $db = $database->getConnection();
    
    try {
        $query = "SELECT * FROM artists";
        if (isset($_GET['user_id'])) {
            $query .= " WHERE user_id = :user_id";
        }
        $query .= " ORDER BY name ASC";
        
        $stmt = $db->prepare($query);
        
        if (isset($_GET['user_id'])) {
            $stmt->bindParam(":user_id", $_GET['user_id']);
        }
        
        $stmt->execute();
        
        $artists = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Parse social media JSON if it exists
            $social = [];
            if (!empty($row['social'])) {
                $social = json_decode($row['social'], true) ?? [];
            } else {
                // Fallback for legacy data
                if (!empty($row['instagram'])) {
                    $social['instagram'] = $row['instagram'];
                }
                if (!empty($row['facebook'])) {
                    $social['facebook'] = $row['facebook'];
                }
                if (!empty($row['twitter'])) {
                    $social['twitter'] = $row['twitter'];
                }
            }
            
            // Get count of past events (simplified version)
            $eventsQuery = "SELECT COUNT(*) as count FROM events WHERE 
                          JSON_CONTAINS(artists, '\"".$row['name']."\"', '$') OR artist_id = :artist_id";
            $eventsStmt = $db->prepare($eventsQuery);
            $eventsStmt->bindParam(":artist_id", $row['id']);
            $eventsStmt->execute();
            $eventsCount = $eventsStmt->fetch(PDO::FETCH_ASSOC)['count'] ?? 0;
            
            // Convert to frontend format
            $artist = [
                'id' => $row['id'],
                'nom' => $row['name'],
                'genre' => $row['genre'] ?? '',
                'photo' => $row['photo'] ?? 'https://via.placeholder.com/150',
                'bio' => $row['bio'] ?? '',
                'email' => $row['email'] ?? '',
                'telephone' => $row['phone'] ?? '',
                'adresse' => $row['address'] ?? '',
                'social' => $social,
                'evenementsPassés' => (int)$eventsCount,
                'rehearsalHours' => (float)$row['rehearsal_hours'] ?? 0,
                'totalRevenue' => (float)$row['total_revenue'] ?? 0,
                'user_id' => $row['user_id']
            ];
            
            $artists[] = $artist;
        }
        
        http_response_code(200);
        echo json_encode($artists);
    } catch(PDOException $e) {
        http_response_code(503);
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}
?>
