<?php
/* ============================================================
   Crea una preferencia de pago en Mercado Pago a partir del
   carrito que envía el sitio. Devuelve la URL de pago (init_point).
   Los PRECIOS se toman SIEMPRE de este archivo (server-side),
   nunca del navegador — así nadie puede alterar el monto.
   ============================================================ */
require __DIR__ . '/config.php';
header('Content-Type: application/json; charset=utf-8');

// --- Tabla de precios (precio con TARJETA / Mercado Pago) ---
$PRECIOS = [
  'mm-van' => ['title' => 'Mutant Mass 5KG - Vainilla · 55 tomas', 'price' => 115500],
  'mm-str' => ['title' => 'Mutant Mass 1.53KG - Frutilla · 17 tomas', 'price' => 43450],
  'mm-cho' => ['title' => 'Mutant Mass 5KG - Chocolate suizo', 'price' => 115500],
  'mm-fru' => ['title' => 'Mutant Mass 5KG - Frutilla · 55 tomas', 'price' => 115500],
  'mm-coo' => ['title' => 'Mutant Mass 5KG - Cookies & Cream · 55 tomas', 'price' => 115500],
  'mm-str-van' => ['title' => 'Mutant Mass 1.53KG - Vainilla · 17 tomas', 'price' => 43450],
  'mm-str-cho' => ['title' => 'Mutant Mass 1.53KG - Chocolate suizo · 17 tomas', 'price' => 43450],
  'mm-str-coo' => ['title' => 'Mutant Mass 1.53KG - Cookies & Cream · 17 tomas', 'price' => 43450],
  'bcaa-grn' => ['title' => 'MTOR BCAA - Green Lemonade · 20 serv', 'price' => 26400],
  'bcaa-fr' => ['title' => 'MTOR BCAA - Frutos Rojos · 20 serv', 'price' => 26400],
  'bcaa-sl' => ['title' => 'MTOR BCAA - Frutilla–Lima · 20 serv', 'price' => 26400],
  'crea-300' => ['title' => 'Creatina Monohidrato Pote 300g - Sin sabor · 60 serv', 'price' => 27500],
  'crea-1k' => ['title' => 'Creatina Monohidrato 1KG - Sin sabor · 200 serv', 'price' => 78500],
  'crea-bag' => ['title' => 'Creatina Monohidrato Doypack 300g - Frutos Rojos · 60 serv', 'price' => 25300],
  'crea-bag-sin' => ['title' => 'Creatina Monohidrato Doypack 300g - Sin sabor · 60 serv', 'price' => 25300],
  'col-fr' => ['title' => 'Colágeno Hidrolizado - Frutos Rojos · 210g', 'price' => 18200],
  'col-lim' => ['title' => 'Colágeno Hidrolizado - Limón · 210g · 20 serv', 'price' => 18200],
  'col-pl' => ['title' => 'Colágeno Plus - Limón · 360g', 'price' => 20900],
  'star-col-sport' => ['title' => 'Colágeno Sport - Naranja · 360g · 30 serv', 'price' => 20900],
  'star-mag-caps' => ['title' => 'Citrato de Magnesio - 60 cápsulas', 'price' => 15400],
  'star-zma' => ['title' => 'ZMA The Real - 90 cápsulas', 'price' => 16280],
  'mag' => ['title' => 'Citrato de Magnesio - Frutos Rojos · 500g', 'price' => 27500],
  'mag-neutro' => ['title' => 'Citrato de Magnesio - Sin sabor (neutro) · 500g · 142 serv', 'price' => 27500],
  'hyd-li' => ['title' => 'Hydro Plus Resistencia - Lima Limón · rinde 10L', 'price' => 17600],
  'hyd-bl' => ['title' => 'Hydro Plus Resistencia - Blue Raz · rinde 10L', 'price' => 17600],
  'caf' => ['title' => 'Cafeína 200 - 200mg · 30 cápsulas', 'price' => 9400],
  'cla' => ['title' => 'CLA 1000 - 90 cápsulas', 'price' => 22000],
  'lcar' => ['title' => 'L-Carnitina 1000 - 60 comprimidos', 'price' => 18700],
  'plant' => ['title' => 'Proteína Vegetal Just Plant - Vegana · 2LB · 30 serv', 'price' => 40200],
  'multi' => ['title' => 'Multivitamínico Todo en Uno - 60 comprimidos', 'price' => 19800],
  'iron' => ['title' => 'IRON Pack Multivitamínico - Fruit Punch · 44 serv', 'price' => 93500],
  'ena-whey-cho' => ['title' => 'Proteína Whey Truemade - Double Rich Chocolate · 930g', 'price' => 76500],
  'ena-whey-van' => ['title' => 'Proteína Whey Truemade - Vanilla Ice Cream · 930g', 'price' => 76500],
  'ena-whey-fru' => ['title' => 'Proteína Whey Truemade - Strawberry Milkshake · 930g', 'price' => 76500],
  'ena-whey-coo' => ['title' => 'Proteína Whey Truemade - Cookies & Cream · 930g', 'price' => 76500],
  'ena-um-cho' => ['title' => 'Ultra Mass Ganador de Masa - Double Rich Chocolate · 1.5kg', 'price' => 47300],
  'ena-um-van' => ['title' => 'Ultra Mass Ganador de Masa - Vanilla Ice Cream · 1.5kg', 'price' => 47300],
  'ena-pw-fp' => ['title' => 'Pre War Pre-Entreno - Fruit Punch · 400g', 'price' => 30250],
  'ena-pw-lem' => ['title' => 'Pre War Pre-Entreno - Lemonade · 400g', 'price' => 30250],
  'ena-crea-1k' => ['title' => 'Creatina Monohidrato - Sin sabor · 1000g · 200 serv', 'price' => 79200],
  'ena-crea-fp' => ['title' => 'Creatina Monohidrato - Frutos Rojos · 300g', 'price' => 26400],
  'ena-crea-nar' => ['title' => 'Creatina Monohidrato - Naranja · 342g', 'price' => 26400],
  'ena-crea-sin' => ['title' => 'Creatina Monohidrato - Sin sabor · 300g · 60 ingestas', 'price' => 26400],
  'ena-col' => ['title' => 'Colágeno Sport - Naranja · 407g', 'price' => 30800],
  'ena-mag-c' => ['title' => 'Citrato de Magnesio - 60 cápsulas', 'price' => 14300],
  'ena-mag-p' => ['title' => 'Citrato de Magnesio Polvo - Lemonade · 192g', 'price' => 18100],
  'ena-multi' => ['title' => 'Multivitamínico - Con cafeína · 60 comp', 'price' => 18700],
  'ena-zma' => ['title' => 'ZMA - Zinc + Magnesio + B6 · 60 caps', 'price' => 14300],
  'ena-omega3' => ['title' => 'Omega 3 Fish Oil - DHA + EPA · 60 cápsulas', 'price' => 27500],
  'ena-caf' => ['title' => 'Cafeína 200 - 200mg · 60 cápsulas', 'price' => 12700],
  'gold-whey-cho' => ['title' => 'Proteína Whey - Chocolate', 'price' => 63000],
  'gold-whey-coo' => ['title' => 'Proteína Whey - Cookies & Cream', 'price' => 63000],
  'gold-whey-fru' => ['title' => 'Proteína Whey - Frutilla', 'price' => 63000],
  'gold-crea' => ['title' => 'Creatina Monohidrato - Sin sabor · 300g', 'price' => 23100],
  'gold-creapure' => ['title' => 'Creatina Creapure® - Premium · sin sabor', 'price' => 32450],
  'gold-testo' => ['title' => 'Testo Gold - Testosterona natural · caps', 'price' => 29500],
  'gold-mag' => ['title' => 'Citrato de Magnesio - Caps', 'price' => 16500],
  'gold-omega3' => ['title' => 'Omega 3 Aceite de Pescado - Caps', 'price' => 28100],
  'onefit-crea' => ['title' => 'Creatina Micronizada Poweraded - Sin sabor · 500g', 'price' => 29700],
  'onefit-whey' => ['title' => 'Proteína Whey Classic - 2LB', 'price' => 41800],
  'onefit-whey-van' => ['title' => 'Proteína Whey Classic - Vainilla · 907g · 2LB', 'price' => 41800],
  'onefit-whey-fru' => ['title' => 'Proteína Whey Classic - Frutilla · 907g · 2LB', 'price' => 41800],
  'onefit-mag' => ['title' => 'Citrato de Magnesio - 450g', 'price' => 20900],
  'onefit-omega3' => ['title' => 'Omega 3 Diario - Caps', 'price' => 22600],
  'onefit-fric' => ['title' => 'Friction 3.2 Pre-Entreno - Explosive Energy', 'price' => 20900],
  'onefit-fric-lim' => ['title' => 'Friction 3.2 Pre-Entreno - Limón · 300g · 30 serv', 'price' => 20900],
  'onefit-multi' => ['title' => 'Multivitamínico - Caps', 'price' => 14900],
  'onefit-crea-200' => ['title' => 'Creatina Micronizada Poweraded - Sin sabor · 200g · 40 serv', 'price' => 14900],
  'onefit-mag-150' => ['title' => 'Citrato de Magnesio - 150g · 60 serv', 'price' => 9900],
  'legui-aza' => ['title' => 'Azafrán + Vitamina B6 - Health & Care · caps', 'price' => 27500],
  'legui-zinc' => ['title' => 'Bisglicinato de Zinc - 60 cápsulas vegetales', 'price' => 27500],
  'mervick-fram' => ['title' => 'Barra Proteica Whey - Frambuesa · 65g · caja x12', 'price' => 26400],
  'mervick-ban' => ['title' => 'Barra Proteica Whey - Banana · 46g · caja x12', 'price' => 20900],
  'ult-mela' => ['title' => 'Melatonina 3mg - 60 cápsulas', 'price' => 25900],
  'xbody-crea' => ['title' => 'Creatina Micronizada - 5000mg · 300g · 60 serv', 'price' => 18200],
  'innova-b12' => ['title' => 'Vitamina B12 - Metilcobalamina · caps', 'price' => 22000],
  'innova-mag' => ['title' => 'Citrato de Magnesio - Caps', 'price' => 20900],
  'star-whey-van' => ['title' => 'Proteína Whey - Vainilla Ice Cream · 908g · 2LB', 'price' => 59400],
  'star-whey-cho' => ['title' => 'Proteína Whey - Chocolate Suizo · 908g · 2LB', 'price' => 59400],
  'star-whey-coo' => ['title' => 'Proteína Whey - Cookies & Cream · 908g · 2LB', 'price' => 59400],
  'star-whey-fru' => ['title' => 'Proteína Whey - Strawberry Cream · 908g · 2LB', 'price' => 59400],
  'star-whey-ban' => ['title' => 'Proteína Whey - Banana Cream · 908g · 2LB', 'price' => 59400],
  'star-plat-cho' => ['title' => 'Proteína Whey Platinum - Chocolate Suizo · 908g · 2LB', 'price' => 63800],
  'star-plat-van' => ['title' => 'Proteína Whey Platinum - Vanilla Ice Cream · 908g · 2LB', 'price' => 63800],
  'star-plat-coo' => ['title' => 'Proteína Whey Platinum - Cookies & Cream · 908g · 2LB', 'price' => 63800],
  'star-plat-fru' => ['title' => 'Proteína Whey Platinum - Strawberry Cream · 908g · 2LB', 'price' => 63800],
  'star-plat-ban' => ['title' => 'Proteína Whey Platinum - Banana Cream · 908g · 2LB', 'price' => 63800],
  'star-plat3k-cho' => ['title' => 'Proteína Whey Platinum 3KG - Chocolate Suizo · 3KG · 100 serv', 'price' => 192500],
  'star-plat3k-van' => ['title' => 'Proteína Whey Platinum 3KG - Vanilla Ice Cream · 3KG · 100 serv', 'price' => 192500],
  'star-plat3k-coo' => ['title' => 'Proteína Whey Platinum 3KG - Cookies & Cream · 3KG · 100 serv', 'price' => 192500],
  'star-plat3k-fru' => ['title' => 'Proteína Whey Platinum 3KG - Strawberry Cream · 3KG · 100 serv', 'price' => 192500],
  'star-plat3k-ban' => ['title' => 'Proteína Whey Platinum 3KG - Banana Cream · 3KG · 100 serv', 'price' => 192500],
  'star-v8-lima' => ['title' => 'Pump V8 - Citrus Slush (Lima) · 285g · 30 serv', 'price' => 30300],
  'star-v8-sand' => ['title' => 'Pump V8 - Watermelon (Sandía) · 285g · 30 serv', 'price' => 30300],
  'star-v8-uva' => ['title' => 'Pump V8 - Grape Attack (Uva) · 285g · 30 serv', 'price' => 30300],
  'star-v8-acai' => ['title' => 'Pump V8 - Açaí Power · 285g · 30 serv', 'price' => 30300],
  'star-3d-fl' => ['title' => 'Pump 3Di Ripped - Strawberry Lime · 315g · 45 serv', 'price' => 34700],
  'star-3d-lem' => ['title' => 'Pump 3Di Ripped - Lemonade · 315g · 45 serv', 'price' => 34700],
  'star-thermo' => ['title' => 'Thermo Fuel Max - 120 cápsulas · 30 serv', 'price' => 20500],
  'star-glut' => ['title' => 'L-Glutamina - 100% micronizada · 300g · 60 serv', 'price' => 27500],
  'star-hmb' => ['title' => 'HMB Fuerza y Recuperación - 180 cápsulas · 90 serv', 'price' => 24750],
  'star-resv' => ['title' => 'Resveratrol 500 - 100% natural · 60 cápsulas', 'price' => 20500],
  'star-vitc' => ['title' => 'Vitamina C - 60 cápsulas', 'price' => 9400],
  'star-k2d3' => ['title' => 'Vitaminas K2 + D3 - 60 cápsulas', 'price' => 21450],
  'star-omega3' => ['title' => 'Omega 3 Aceite de Pescado - 1000mg · 60 cápsulas', 'price' => 29700],
  'star-shk-got' => ['title' => 'Shaker Got Protein - 600ml · con resorte mezclador', 'price' => 9400],
  'star-shk-v8' => ['title' => 'Shaker Pump V8 - 400ml · con compartimento', 'price' => 9400],
  'xt-shk' => ['title' => 'Shaker Xtrenght - 600ml · con resorte mezclador', 'price' => 9400],
  'xt-adv-van' => ['title' => 'Proteína Whey Advanced - Vainilla · 907g · 2LB · 30 serv', 'price' => 77000],
  'xt-adv-cho' => ['title' => 'Proteína Whey Advanced - Chocolate · 907g · 2LB · 30 serv', 'price' => 77000],
  'xt-adv-coo' => ['title' => 'Proteína Whey Advanced - Cookies & Cream · 907g · 2LB', 'price' => 77000],
  'xt-adv-ban' => ['title' => 'Proteína Whey Advanced - Banana · 907g · 2LB · 30 serv', 'price' => 77000],
  'xt-adv-fru' => ['title' => 'Proteína Whey Advanced - Frutilla · 907g · 2LB · 30 serv', 'price' => 77000],
  'xt-best-ban' => ['title' => 'Proteína Whey Best - Banana · 907g · 2LB · 30 serv', 'price' => 60000],
  'xt-best-cho' => ['title' => 'Proteína Whey Best - Chocolate · 907g · 2LB · 30 serv', 'price' => 60000],
  'xt-best-coo' => ['title' => 'Proteína Whey Best - Cookies & Cream · 907g · 2LB', 'price' => 60000],
  'xt-best-fru' => ['title' => 'Proteína Whey Best - Frutilla · 907g · 2LB · 30 serv', 'price' => 60000],
  'xt-best-van' => ['title' => 'Proteína Whey Best - Vainilla · 907g · 2LB · 30 serv', 'price' => 60000],
  'xt-crea-500' => ['title' => 'Creatina Grado Farmacéutico - Micronizada · 500g · 100 serv', 'price' => 33000],
  'xt-crea-250' => ['title' => 'Creatina Grado Farmacéutico - Micronizada · 250g · 50 serv', 'price' => 19800],
  'xt-cutter' => ['title' => 'Cutter Termogénico Quemador - 120 cápsulas · 60 serv', 'price' => 15400],
  'onefit-gainer-van' => ['title' => 'The Best Gainer Mass - Vainilla · 1.5kg', 'price' => 37400],
  'onefit-gainer-fru' => ['title' => 'The Best Gainer Mass - Frutilla · 1.5kg', 'price' => 37400],
  'onefit-oxido' => ['title' => 'Óxido Nítrico 5.1 - Limón · 210g · 30 serv', 'price' => 19800],
  'labs-nac' => ['title' => 'NAC - N-Acetilcisteína · 60 cápsulas', 'price' => 22000],
];

// --- Leer carrito enviado por el sitio ---
$body = json_decode(file_get_contents('php://input'), true);
$cart = isset($body['cart']) ? $body['cart'] : [];
$pickup = !empty($body['pickup']);
if (!is_array($cart) || count($cart) === 0) {
  http_response_code(400);
  echo json_encode(['error' => 'Carrito vacío']);
  exit;
}

// --- Armar items validando contra la tabla de precios ---
$items = [];
foreach ($cart as $line) {
  $id  = isset($line['id'])  ? $line['id'] : '';
  $qty = isset($line['qty']) ? (int)$line['qty'] : 0;
  if ($qty < 1 || !isset($PRECIOS[$id])) continue;
  $p = $PRECIOS[$id];
  $items[] = [
    'title'       => $p['title'],
    'quantity'    => $qty,
    'unit_price'  => (float)$p['price'],
    'currency_id' => 'ARS',
  ];
}
if (count($items) === 0) {
  http_response_code(400);
  echo json_encode(['error' => 'No hay items válidos']);
  exit;
}

// --- Costo de envío por zona (Buenos Aires) — el precio recibido se valida contra esta lista ---
$ZONAS_VALIDAS = [4500, 5000, 5500, 6000, 6500, 7500, 8500];
$shipPrice = isset($body['shipPrice']) ? (int)$body['shipPrice'] : null;

$subtotal = 0;
foreach ($items as $it) { $subtotal += $it['unit_price'] * $it['quantity']; }
if (!$pickup && $subtotal < 160000) {
  if ($shipPrice === null || !in_array($shipPrice, $ZONAS_VALIDAS, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Zona de envío inválida']);
    exit;
  }
  $items[] = [
    'title' => 'Envío', 'quantity' => 1, 'unit_price' => (float)$shipPrice, 'currency_id' => 'ARS',
  ];
}

// --- Crear preferencia ---
$payload = [
  'items' => $items,
  'back_urls' => [
    'success' => SITE_URL . '/pago-exito.html',
    'failure' => SITE_URL . '/pago-error.html',
    'pending' => SITE_URL . '/pago-pendiente.html',
  ],
  'auto_return' => 'approved',
  'statement_descriptor' => 'MUTANTS',
  'binary_mode' => false,
];

$ch = curl_init('https://api.mercadopago.com/checkout/preferences');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Content-Type: application/json',
    'Authorization: Bearer ' . MP_ACCESS_TOKEN,
  ],
  CURLOPT_POSTFIELDS => json_encode($payload),
  CURLOPT_TIMEOUT => 25,
]);
$resp = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);

if ($resp === false) {
  http_response_code(500);
  echo json_encode(['error' => 'No se pudo conectar con Mercado Pago', 'detail' => $err]);
  exit;
}
$data = json_decode($resp, true);
if ($code >= 400 || !isset($data['init_point'])) {
  http_response_code(500);
  echo json_encode(['error' => 'Mercado Pago rechazó la solicitud', 'detail' => $data]);
  exit;
}

echo json_encode(['init_point' => $data['init_point']]);
