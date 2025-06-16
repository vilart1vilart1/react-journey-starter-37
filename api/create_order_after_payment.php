<?php
error_reporting(E_ALL);
ini_set('display_errors', 1); // Display errors for debug (disable in prod)
ini_set('display_startup_errors', 1);

ob_start();

// --- Shutdown handler in case of a fatal error outside try/catch ---
function shutdownHandler() {
    $error = error_get_last();
    if ($error !== null && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
        http_response_code(500);
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode([
            'success' => false,
            'fatal_error' => true,
            'type' => $error['type'],
            'message' => '[SHUTDOWN] Fatal PHP error: ' . $error['message'],
            'file' => $error['file'],
            'line' => $error['line']
        ]);
        ob_end_flush();
        exit;
    }
}
register_shutdown_function('shutdownHandler');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config/Database.php';

// Include the order confirmation email function
function sendOrderConfirmationEmail($orderData) {
    $to = $orderData['customer_email'];
    $subject = "🎉 Confirmation de votre commande MyLittle - Commande #" . $orderData['order_number'];
    
    // Headers for HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: MyLittle <respizen@respizenmedical.com>" . "\r\n";
    $headers .= "Reply-To: respizen@respizenmedical.com" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Format children list
    $childrenList = '';
    foreach ($orderData['children'] as $child) {
        $childrenList .= '<div style="background: #f8fafc; border-radius: 8px; padding: 15px; margin: 10px 0; border-left: 4px solid #ff6b6b;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 20px; margin-right: 8px;">📚</span>
                <span style="font-weight: bold; color: #2d3748; font-size: 16px;">Livre pour ' . htmlspecialchars($child['name']) . '</span>
            </div>
            <div style="color: #4a5568; font-size: 14px; margin-left: 28px;">
                <div>Âge: ' . htmlspecialchars($child['age']) . ' ans</div>';
        
        if (!empty($child['objective'])) {
            $childrenList .= '<div>Objectif: ' . htmlspecialchars($child['objective']) . '</div>';
        }
        
        if (!empty($child['message'])) {
            $childrenList .= '<div>Message personnel: ' . htmlspecialchars($child['message']) . '</div>';
        }
        
        $childrenList .= '</div></div>';
    }

    // Plan details
    $planTitle = ($orderData['plan_type'] === 'subscription') ? 'Abonnement mensuel' : 'Paiement unique';

    // Beautiful HTML email template in French
    $message = '
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation de commande MyLittle</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: linear-gradient(135deg, #87CEEB 0%, #FFB6C1 25%, #DDA0DD 50%, #98FB98 75%, #F0E68C 100%); min-height: 100vh;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); margin-top: 20px; margin-bottom: 20px;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #10b981, #34d399, #6ee7b7); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
                <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 40px;">✅</span>
                </div>
                <h1 style="color: white; font-size: 32px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); font-weight: bold;">Commande Confirmée !</h1>
                <p style="color: white; font-size: 18px; margin: 10px 0 0 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">Votre aventure magique va bientôt commencer</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h2 style="color: #2d3748; font-size: 24px; margin: 0 0 15px 0; font-weight: bold;">Merci ' . htmlspecialchars($orderData['customer_name']) . ' ! 🎈</h2>
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0;">
                        Nous avons bien reçu votre commande et nous commençons déjà à préparer les livres magiques pour vos enfants !
                    </p>
                </div>

                <!-- Order Summary -->
                <div style="background: linear-gradient(135deg, #fff5f5, #f0fff4); border-radius: 15px; padding: 25px; margin: 25px 0; border: 2px solid #10b981;">
                    <h3 style="color: #2d3748; font-size: 20px; margin: 0 0 20px 0; display: flex; align-items: center;">
                        <span style="font-size: 24px; margin-right: 10px;">📋</span>
                        Résumé de votre commande
                    </h3>
                    
                    <div style="background: white; border-radius: 10px; padding: 20px; margin-bottom: 15px; border-left: 4px solid #10b981;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="font-weight: bold; color: #2d3748;">Numéro de commande:</span>
                            <span style="color: #10b981; font-weight: bold; font-family: monospace;">' . htmlspecialchars($orderData['order_number']) . '</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="font-weight: bold; color: #2d3748;">Plan sélectionné:</span>
                            <span style="color: #4a5568;">' . $planTitle . '</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="font-weight: bold; color: #2d3748;">Montant total:</span>
                            <span style="color: #10b981; font-weight: bold; font-size: 18px;">' . number_format($orderData['total_amount'], 2) . '€</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="font-weight: bold; color: #2d3748;">Date de commande:</span>
                            <span style="color: #4a5568;">' . date('d/m/Y à H:i') . '</span>
                        </div>
                    </div>
                </div>

                <!-- Children List -->
                <div style="margin: 30px 0;">
                    <h3 style="color: #2d3748; font-size: 20px; margin: 0 0 20px 0; display: flex; align-items: center;">
                        <span style="font-size: 24px; margin-right: 10px;">👶</span>
                        Livres commandés
                    </h3>
                    ' . $childrenList . '
                </div>

                <!-- Delivery Info -->
                <div style="background: #eff6ff; border-radius: 12px; padding: 20px; margin: 25px 0; border-left: 4px solid #3b82f6;">
                    <h4 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px; display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 8px;">🚚</span>
                        Informations de livraison
                    </h4>
                    <div style="color: #4a5568; font-size: 14px; line-height: 1.6;">
                        <div><strong>Adresse:</strong> ' . htmlspecialchars($orderData['customer_address']) . '</div>
                        <div><strong>Ville:</strong> ' . htmlspecialchars($orderData['customer_city']) . '</div>
                        <div><strong>Code postal:</strong> ' . htmlspecialchars($orderData['customer_postal_code']) . '</div>
                        <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #cbd5e0;">
                            <strong>Délai de livraison:</strong> 5-7 jours ouvrés<br>
                            <strong>Livraison:</strong> Gratuite partout en France
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="background: #2d3748; color: white; padding: 25px 30px; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">Merci de faire confiance à MyLittle ! 💝</p>
                <p style="margin: 0 0 15px 0; font-size: 14px; opacity: 0.8;">
                    Votre commande #' . htmlspecialchars($orderData['order_number']) . ' sera traitée avec le plus grand soin
                </p>
                <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 15px; margin-top: 15px;">
                    <p style="margin: 0; font-size: 12px; opacity: 0.7;">
                        © 2024 MyLittle - Tous droits réservés<br>
                        Cet email a été envoyé à ' . htmlspecialchars($orderData['customer_email']) . '
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>';

    return mail($to, $subject, $message, $headers);
}

$database = new Database();
$db = $database->getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Only POST requests are accepted.',
        'request_method' => $_SERVER['REQUEST_METHOD'],
        'headers' => getallheaders()
    ]);
    exit;
}

try {
    $raw_input = file_get_contents('php://input');
    $input = json_decode($raw_input, true);

    if (!$input) {
        throw new Exception('Invalid JSON input');
    }

    // Validate required fields
    $required_fields = ['user_id', 'plan_type', 'children', 'customer_info'];
    foreach ($required_fields as $field) {
        if (!isset($input[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    $user_id = $input['user_id'];
    $plan_type = $input['plan_type'];
    $children = $input['children'];
    $customer_info = $input['customer_info'];
    $payment_intent_id = $input['payment_intent_id'] ?? null;
    $stripe_session_id = $input['stripe_session_id'] ?? null;
    
    // Validate plan_type against database enum
    if (!in_array($plan_type, ['onetime', 'subscription'])) {
        throw new Exception('Invalid plan type. Must be onetime or subscription');
    }
    
    // STEP 1: Identify the user
    // user_id comes from frontend, but may not be from a connected user
    $user_id = $input['user_id'];
    $customer_email = $customer_info['email'];

    // 1. Is the user CONNECTED? (user_id exists in DB)
    $user_check_query = "SELECT id FROM users WHERE id = :user_id";
    $user_check_stmt = $db->prepare($user_check_query);
    $user_check_stmt->bindParam(':user_id', $user_id);
    $user_check_stmt->execute();
    $is_connected = ($user_check_stmt->rowCount() > 0);

    if ($is_connected) {
        // User is connected; use user_id from session, don't create a new user!
        // (no additional action)
    } else {
        // Not connected; check if the email is already registered
        $email_check_query = "SELECT id FROM users WHERE email = :email LIMIT 1";
        $email_check_stmt = $db->prepare($email_check_query);
        $email_check_stmt->bindParam(':email', $customer_email);
        $email_check_stmt->execute();

        if ($email_check_stmt->rowCount() > 0) {
            // Email exists, use this user's ID (never duplicate!)
            $existing_user = $email_check_stmt->fetch(PDO::FETCH_ASSOC);
            $user_id = $existing_user['id'];
        } else {
            // No matching user_id nor email: create new user
            $create_user_query = "INSERT INTO users (id, email, first_name, phone) VALUES (:id, :email, :first_name, :phone)";
            $create_user_stmt = $db->prepare($create_user_query);

            // Extract first name
            $name_parts = explode(' ', $customer_info['name'], 2);
            $first_name = $name_parts[0];

            $create_user_stmt->bindParam(':id', $user_id);
            $create_user_stmt->bindParam(':email', $customer_info['email']);
            $create_user_stmt->bindParam(':first_name', $first_name);
            $create_user_stmt->bindParam(':phone', $customer_info['phone']);
            $create_user_stmt->execute();
            // $user_id remains the generated one from frontend/request
        }
    }

    // Sanity check that we have a valid user_id (non-empty, non-zero)
    if (empty($user_id) || $user_id === "0") {
        throw new Exception('Erreur critique: utilisateur non identifié, commande annulée.');
    }

    // Calculate total amount based on plan and number of children
    $amount_per_book = ($plan_type === 'onetime') ? 29.99 : 22.49;
    $total_amount = $amount_per_book * count($children);
    
    // Generate unique order number
    $order_number = 'ORD-' . strtoupper(uniqid());
    
    // Generate UUID for order
    $order_id = bin2hex(random_bytes(16));
    $order_id = substr($order_id, 0, 8) . '-' . substr($order_id, 8, 4) . '-' . substr($order_id, 12, 4) . '-' . substr($order_id, 16, 4) . '-' . substr($order_id, 20, 12);
    
    // Start database transaction
    $db->beginTransaction();

    try {
        // Insert order with proper schema fields including phone
        $customer_name = $customer_info['name'];
        $customer_email = $customer_info['email'];
        $customer_phone = $customer_info['phone'];
        $customer_address = $customer_info['address'];
        $customer_city = $customer_info['city'];
        $customer_postal_code = $customer_info['postalCode'];

        $order_query = "INSERT INTO orders (id, user_id, order_number, plan_type, total_amount, currency, status, payment_intent_id, customer_name, customer_email, customer_phone, customer_address, customer_city, customer_postal_code, stripe_session_id) 
                       VALUES (:id, :user_id, :order_number, :plan_type, :total_amount, :currency, :status, :payment_intent_id, :customer_name, :customer_email, :customer_phone, :customer_address, :customer_city, :customer_postal_code, :stripe_session_id)";
        
        $order_stmt = $db->prepare($order_query);
        $order_stmt->bindParam(':id', $order_id);
        $order_stmt->bindParam(':user_id', $user_id);
        $order_stmt->bindParam(':order_number', $order_number);
        $order_stmt->bindParam(':plan_type', $plan_type);
        $order_stmt->bindParam(':total_amount', $total_amount);
        $order_stmt->bindValue(':currency', 'EUR');
        $order_stmt->bindValue(':status', 'paid'); // Since payment is already completed
        $order_stmt->bindParam(':payment_intent_id', $payment_intent_id);
        $order_stmt->bindParam(':customer_name', $customer_name);
        $order_stmt->bindParam(':customer_email', $customer_email);
        $order_stmt->bindParam(':customer_phone', $customer_phone);
        $order_stmt->bindParam(':customer_address', $customer_address);
        $order_stmt->bindParam(':customer_city', $customer_city);
        $order_stmt->bindParam(':customer_postal_code', $customer_postal_code);
        $order_stmt->bindParam(':stripe_session_id', $stripe_session_id);
        
        $order_stmt->execute();

        // Insert order items with all child information
        $item_query = "INSERT INTO order_items (id, order_id, child_id, child_name, child_age, child_objective, child_message, child_photo_url, book_title, book_description, price) 
                      VALUES (:id, :order_id, :child_id, :child_name, :child_age, :child_objective, :child_message, :child_photo_url, :book_title, :book_description, :price)";
        $item_stmt = $db->prepare($item_query);

        // Child insert/update query with proper UUID handling
        $child_upsert_query = "INSERT INTO children (id, user_id, name, age, objective, message, photo_url) 
                              VALUES (:id, :user_id, :name, :age, :objective, :message, :photo_url)
                              ON DUPLICATE KEY UPDATE 
                              name = VALUES(name), 
                              age = VALUES(age), 
                              objective = VALUES(objective), 
                              message = VALUES(message), 
                              photo_url = VALUES(photo_url),
                              updated_at = CURRENT_TIMESTAMP";
        $child_stmt = $db->prepare($child_upsert_query);

        foreach ($children as $child) {
            // Generate UUID for child if not provided
            if (empty($child['id'])) {
                $child_id = bin2hex(random_bytes(16));
                $child_id = substr($child_id, 0, 8) . '-' . substr($child_id, 8, 4) . '-' . substr($child_id, 12, 4) . '-' . substr($child_id, 16, 4) . '-' . substr($child_id, 20, 12);
            } else {
                $child_id = $child['id'];
            }
            
            // Validate age constraint
            $age = (int)$child['age'];
            if ($age < 1 || $age > 18) {
                throw new Exception('Child age must be between 1 and 18');
            }
            
            // Handle photo URL from frontend (uploaded via upload_image.php and already a full URL)
            $photo_url = $child['photoUrl'] ?? '';
            $child_name = $child['name'];
            $child_objective = $child['objective'] ?? '';
            $child_message = $child['message'] ?? '';
            
            // Insert/Update child data
            $child_stmt->bindParam(':id', $child_id);
            $child_stmt->bindParam(':user_id', $user_id);
            $child_stmt->bindParam(':name', $child_name);
            $child_stmt->bindParam(':age', $age);
            $child_stmt->bindParam(':objective', $child_objective);
            $child_stmt->bindParam(':message', $child_message);
            $child_stmt->bindParam(':photo_url', $photo_url);
            $child_stmt->execute();
            
            // Create order item with UUID and ALL child information
            $item_id = bin2hex(random_bytes(16));
            $item_id = substr($item_id, 0, 8) . '-' . substr($item_id, 8, 4) . '-' . substr($item_id, 12, 4) . '-' . substr($item_id, 16, 4) . '-' . substr($item_id, 20, 12);

            $book_title = "Livre personnalisé pour " . $child_name;
            $book_description = "Un livre magique où " . $child_name . " (" . $age . " ans) devient le héros de sa propre aventure.";
            if (!empty($child_objective)) {
                $book_description .= " Objectif: " . $child_objective;
            }
            if (!empty($child_message)) {
                $book_description .= " Message personnel: " . $child_message;
            }

            $item_stmt->bindParam(':id', $item_id);
            $item_stmt->bindParam(':order_id', $order_id);
            $item_stmt->bindParam(':child_id', $child_id);
            $item_stmt->bindParam(':child_name', $child_name);
            $item_stmt->bindParam(':child_age', $age);
            $item_stmt->bindParam(':child_objective', $child_objective);
            $item_stmt->bindParam(':child_message', $child_message);
            $item_stmt->bindParam(':child_photo_url', $photo_url); // store photo URL in order_items
            $item_stmt->bindParam(':book_title', $book_title);
            $item_stmt->bindParam(':book_description', $book_description);
            $item_stmt->bindValue(':price', $amount_per_book);
            $item_stmt->execute();
        }

        // Commit transaction (order, children, order_items) before touching subscription
        $db->commit();

        // === Handle Stripe subscription ID saving (for plan_type = subscription) ===
        if ($plan_type === 'subscription' && !empty($stripe_session_id)) {
            // Stripe secret key
            $stripe_key = 'sk_test_51RZrq1RAsAdv0igo4Kz31GhsHmDS3cRIDniROzHZXWj4cPlEUF0ebq3Lv91YVD2iJ5HfJsRjg08NHJaWz5BtAv3p00z3pEz5TZ';

            // Fetch session from Stripe to get the subscription ID
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, 'https://api.stripe.com/v1/checkout/sessions/' . $stripe_session_id);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Authorization: Bearer ' . $stripe_key
            ]);
            $session_response = curl_exec($ch);

            if (curl_errno($ch)) {
                error_log('[STRIPE][ERROR] curl error when checking session: ' . curl_error($ch));
                $subscription_id = null;
            } else {
                $session_obj = json_decode($session_response, true);
                $subscription_id = $session_obj['subscription'] ?? null;
            }
            curl_close($ch);

            if (!empty($subscription_id)) {
                // Insert/upsert in subscriptions table, or update if already present
                $current_time = date('Y-m-d H:i:s');
                $status = 'active';
                $period_days = 30; // Set to 1 month, adjust if needed
                $start = $current_time;
                $end = date('Y-m-d H:i:s', strtotime("+$period_days days"));

                $sub_sql = "INSERT INTO subscriptions (
                                user_id, 
                                stripe_subscription_id, 
                                order_id,
                                status, 
                                current_period_start, 
                                current_period_end, 
                                cancel_at_period_end, 
                                updated_at
                            )
                            VALUES (
                                :user_id, :stripe_subscription_id, :order_id, :status, :current_period_start, :current_period_end, 0, NOW()
                            )
                            ON DUPLICATE KEY UPDATE 
                                status=:status, 
                                stripe_subscription_id=IFNULL(:stripe_subscription_id, stripe_subscription_id), 
                                order_id=:order_id,
                                current_period_start=:current_period_start, 
                                current_period_end=:current_period_end,
                                cancel_at_period_end=0,
                                updated_at=NOW()
                            ";
                $sub_stmt = $db->prepare($sub_sql);
                $sub_stmt->bindParam(':user_id', $user_id);
                $sub_stmt->bindParam(':stripe_subscription_id', $subscription_id);
                $sub_stmt->bindParam(':order_id', $order_id);
                $sub_stmt->bindParam(':status', $status);
                $sub_stmt->bindParam(':current_period_start', $start);
                $sub_stmt->bindParam(':current_period_end', $end);
                $sub_stmt->execute();
            }
        }

        // Send confirmation email
        $email_data = [
            'order_number' => $order_number,
            'customer_name' => $customer_info['name'],
            'customer_email' => $customer_info['email'],
            'customer_address' => $customer_info['address'],
            'customer_city' => $customer_info['city'],
            'customer_postal_code' => $customer_info['postalCode'],
            'plan_type' => $plan_type,
            'total_amount' => $total_amount,
            'children' => $children
        ];
        
        sendOrderConfirmationEmail($email_data);

        // Return success response
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'data' => [
                'order_id' => $order_id,
                'order_number' => $order_number,
                'total_amount' => $total_amount,
                'currency' => 'EUR'
            ]
        ]);

    } catch (Exception $e) {
        $db->rollBack();
        // Add error logging with context
        error_log("DB TRANSACTION ERROR in create_order_after_payment.php: " . $e->getMessage() . " | TRACE: " . $e->getTraceAsString());
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Erreur lors de l\'insertion en base de données: ' . $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        exit;
    }

} catch (Exception $e) {
    $debug_output = ob_get_clean();

    // On any error, return extra context for debugging
    $error_response = [
        'success' => false,
        'message' => 'Erreur côté serveur: ' . $e->getMessage(),
        'trace' => $e->getTraceAsString(),
        'php_input' => isset($raw_input) ? $raw_input : null,
        'decoded_input' => isset($input) ? $input : null,
        'headers' => getallheaders(),
        'request_method' => $_SERVER['REQUEST_METHOD'],
        'server_params' => [
            'REMOTE_ADDR' => $_SERVER['REMOTE_ADDR'] ?? null,
            'HTTP_USER_AGENT' => $_SERVER['HTTP_USER_AGENT'] ?? null,
        ],
        'php_debug_output' => $debug_output, // Any warnings/errors captured
        // You can add more context (last DB query, etc.) if helpful
    ];
    error_log('[TOPLEVEL] Create order error (create_order_after_payment.php): ' . $e->getMessage() . ' | TRACE: ' . $e->getTraceAsString());

    http_response_code(500);
    echo json_encode($error_response);
}
?>
