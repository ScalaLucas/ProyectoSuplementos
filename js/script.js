/* ============================================================
   MUTANTS SUPLEMENTOS — script.js
   Vanilla JS · sin dependencias · sin build
   Catálogo, carrito (localStorage), filtros, buscador, render
   ============================================================ */
(function(){
'use strict';

/* ---------------- CONFIG ---------------- */
var WHATSAPP = '5491161190004'; // ← reemplazar por el número real (formato internacional, sin +)
var IMG = 'assets/products/';

/* ---------------- CATÁLOGO ---------------- */
var CATALOG = [
  {id:'mm-van', name:'Mutant Mass 5KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Vainilla · 55 tomas', price:105000, priceCard:115500, rating:4.9, reviews:212, badge:'MÁS VENDIDO', pop:99, img:IMG+'mutant-mass-vanilla.png'},
  {id:'mm-cho', name:'Mutant Mass 5KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Chocolate suizo · 55 tomas', price:105000, priceCard:115500, rating:4.9, reviews:187, pop:95, img:IMG+'mutant-mass-chocolate.png'},
  {id:'mm-fru', name:'Mutant Mass 5KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Frutilla · 55 tomas', price:105000, priceCard:115500, rating:4.8, reviews:103, pop:90, img:IMG+'mutant-mass-frutilla.png'},
  {id:'mm-coo', name:'Mutant Mass 5KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Cookies & Cream · 55 tomas', price:105000, priceCard:115500, rating:4.9, reviews:118, pop:92, img:IMG+'mutant-mass-cookies.png'},
  {id:'mm-str', name:'Mutant Mass 1.53KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Frutilla · 17 tomas', price:39500, priceCard:43450, rating:4.8, reviews:96, pop:74, img:IMG+'mutant-mass-strawberry.png'},
  {id:'mm-str-van', name:'Mutant Mass 1.53KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Vainilla · 17 tomas', price:39500, priceCard:43450, rating:4.8, reviews:88, pop:73, img:IMG+'mutant-mass-153-vanilla.png'},
  {id:'mm-str-cho', name:'Mutant Mass 1.53KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Chocolate suizo · 17 tomas', price:39500, priceCard:43450, rating:4.8, reviews:82, pop:72, img:IMG+'mutant-mass-153-chocolate.png'},
  {id:'mm-str-coo', name:'Mutant Mass 1.53KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Cookies & Cream · 17 tomas', price:39500, priceCard:43450, rating:4.8, reviews:79, pop:71, img:IMG+'mutant-mass-153-cookies.png'},
  {id:'bcaa-grn', name:'MTOR BCAA', brand:'Star Nutrition', cat:'Aminoácidos', goal:'Recuperación', flavor:'Green Lemonade · 20 serv', price:24000, priceCard:26400, rating:4.9, reviews:143, pop:88, img:IMG+'mtor-bcaa-green.png'},
  {id:'bcaa-fr', name:'MTOR BCAA', brand:'Star Nutrition', cat:'Aminoácidos', goal:'Recuperación', flavor:'Frutos Rojos · 20 serv', price:24000, priceCard:26400, rating:4.7, reviews:88, pop:70, img:IMG+'mtor-bcaa-frutos.png'},
  {id:'bcaa-sl', name:'MTOR BCAA', brand:'Star Nutrition', cat:'Aminoácidos', goal:'Recuperación', flavor:'Frutilla–Lima · 20 serv', price:24000, priceCard:26400, rating:4.8, reviews:67, pop:65, img:IMG+'mtor-bcaa-strawberry.png'},
  {id:'crea-300', name:'Creatina Monohidrato Pote 300g', brand:'Star Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 60 serv', price:25000, priceCard:27500, rating:4.9, reviews:320, badge:'TOP', pop:98, img:IMG+'creatine-300.png'},
  {id:'crea-1k', name:'Creatina Monohidrato 1KG', brand:'Star Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 200 serv', price:71000, priceCard:78500, rating:4.9, reviews:110, pop:80, img:IMG+'creatine-1000.png'},
  {id:'crea-bag-sin', name:'Creatina Monohidrato Doypack 300g', brand:'Star Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 60 serv', price:23000, priceCard:25300, rating:4.9, reviews:96, pop:84, splitCards:true, img:IMG+'star-creatine-sin-bag.png'},
  {id:'crea-bag', name:'Creatina Monohidrato Doypack 300g', brand:'Star Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Frutos Rojos · 60 serv', price:23000, priceCard:25300, rating:4.8, reviews:74, pop:72, splitCards:true, img:IMG+'star-creatine-fr-bag.png'},
  {id:'col-fr', name:'Colágeno Hidrolizado', brand:'Star Nutrition', cat:'Colágeno', goal:'Recuperación', flavor:'Frutos Rojos · 210g', price:16500, priceCard:18200, rating:4.8, reviews:74, pop:68, img:IMG+'collagen-frutos.png'},
  {id:'col-lim', name:'Colágeno Hidrolizado', brand:'Star Nutrition', cat:'Colágeno', goal:'Recuperación', flavor:'Limón · 210g · 20 serv', price:16500, priceCard:18200, rating:4.8, reviews:63, pop:67, img:IMG+'collagen-limon.png'},
  {id:'star-col-sport', name:'Colágeno Sport', brand:'Star Nutrition', cat:'Colágeno', goal:'Recuperación', flavor:'Naranja · 360g · 30 serv', price:19000, priceCard:20900, rating:4.8, reviews:47, pop:66, img:IMG+'collagen-sport-naranja.png'},
  {id:'col-pl', name:'Colágeno Plus', brand:'Star Nutrition', cat:'Colágeno', goal:'Recuperación', flavor:'Limón · 360g', price:19000, priceCard:20900, rating:4.7, reviews:51, pop:60, img:IMG+'collagen-plus-limon.png'},
  {id:'mag', name:'Citrato de Magnesio', brand:'Star Nutrition', cat:'Citrato de Magnesio', goal:'Recuperación', flavor:'Frutos Rojos · 500g · 142 serv', price:25000, priceCard:27500, rating:4.8, reviews:129, pop:75, img:IMG+'magnesio.png'},
  {id:'mag-neutro', name:'Citrato de Magnesio', brand:'Star Nutrition', cat:'Citrato de Magnesio', goal:'Recuperación', flavor:'Sin sabor (neutro) · 500g · 142 serv', price:25000, priceCard:27500, rating:4.8, reviews:84, pop:74, img:IMG+'magnesio-neutro.png'},
  {id:'star-mag-caps', name:'Citrato de Magnesio', brand:'Star Nutrition', cat:'Citrato de Magnesio', goal:'Recuperación', flavor:'60 cápsulas', price:14000, priceCard:15400, rating:4.8, reviews:112, pop:76, img:IMG+'star-magnesio-caps.png'},
  {id:'star-zma', name:'ZMA', brand:'Star Nutrition', cat:'Resto de suplementos', goal:'Recuperación', flavor:'The Real ZMA · 90 cápsulas', price:14800, priceCard:16280, rating:4.8, reviews:67, pop:70, img:IMG+'star-zma.png'},
  {id:'hyd-li', name:'Hydro Plus Resistencia', brand:'Star Nutrition', cat:'Hidratación', goal:'Resistencia', flavor:'Lima Limón · rinde 10L', price:16000, priceCard:17600, rating:4.6, reviews:42, pop:55, img:IMG+'hydro-plus-lima.png'},
  {id:'hyd-bl', name:'Hydro Plus Resistencia', brand:'Star Nutrition', cat:'Hidratación', goal:'Resistencia', flavor:'Blue Raz · rinde 10L', price:16000, priceCard:17600, rating:4.7, reviews:38, pop:54, img:IMG+'hydro-plus-bluraz.png'},
  {id:'caf', name:'Cafeína 200', brand:'Star Nutrition', cat:'Energía', goal:'Energía', flavor:'200mg · 30 cápsulas', price:8500, priceCard:9400, rating:4.9, reviews:156, badge:'TOP', pop:90, img:IMG+'caffeine-200.png'},
  {id:'cla', name:'CLA 1000', brand:'Star Nutrition', cat:'Quemadores', goal:'Definición', flavor:'90 cápsulas', price:20000, priceCard:22000, rating:4.5, reviews:63, pop:58, img:IMG+'cla-1000.png'},
  {id:'lcar', name:'L-Carnitina 1000', brand:'Star Nutrition', cat:'Quemadores', goal:'Definición', flavor:'60 comprimidos', price:17000, priceCard:18700, rating:4.6, reviews:71, pop:62, img:IMG+'l-carnitine.png'},
  {id:'plant', name:'Proteína Vegetal Just Plant', brand:'Star Nutrition', cat:'Proteínas', goal:'Definición', flavor:'Vegana · 2LB · 30 serv', price:36500, priceCard:40200, rating:4.7, reviews:45, badge:'NUEVO', pop:66, img:IMG+'plant-protein.png'},
  {id:'multi', name:'Multivitamínico Todo en Uno', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'60 comprimidos', price:18000, priceCard:19800, rating:4.8, reviews:98, pop:78, img:IMG+'multivitamin.png'},
  {id:'iron', name:'IRON Pack Multivitamínico', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'Fruit Punch · 44 serv', price:85000, priceCard:93500, rating:4.7, reviews:52, pop:64, img:IMG+'iron-pack.png'},

  /* ===== ENA ===== */
  {id:'ena-whey-cho', name:'Proteína Whey Truemade', brand:'ENA', cat:'Proteínas', goal:'Volumen', flavor:'Double Rich Chocolate · 930g', price:69500, priceCard:76500, rating:4.9, reviews:176, badge:'NUEVO', pop:92, img:IMG+'ena-whey-chocolate.png'},
  {id:'ena-whey-van', name:'Proteína Whey Truemade', brand:'ENA', cat:'Proteínas', goal:'Volumen', flavor:'Vanilla Ice Cream · 930g', price:69500, priceCard:76500, rating:4.8, reviews:131, pop:86, img:IMG+'ena-whey-vainilla.png'},
  {id:'ena-whey-fru', name:'Proteína Whey Truemade', brand:'ENA', cat:'Proteínas', goal:'Volumen', flavor:'Strawberry Milkshake · 930g', price:69500, priceCard:76500, rating:4.8, reviews:98, pop:80, img:IMG+'ena-whey-frutilla.png'},
  {id:'ena-whey-coo', name:'Proteína Whey Truemade', brand:'ENA', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 930g', price:69500, priceCard:76500, rating:4.9, reviews:142, pop:88, img:IMG+'ena-whey-cookies.png'},
  {id:'ena-um-cho', name:'Ultra Mass Ganador de Masa', brand:'ENA', cat:'Ganadores de masa', goal:'Volumen', flavor:'Chocolate · 1.5kg', price:43000, priceCard:47300, rating:4.7, reviews:64, pop:75, img:IMG+'ena-ultramass-chocolate.png'},
  {id:'ena-um-van', name:'Ultra Mass Ganador de Masa', brand:'ENA', cat:'Ganadores de masa', goal:'Volumen', flavor:'Vainilla · 1.5kg', price:43000, priceCard:47300, rating:4.7, reviews:51, pop:72, img:IMG+'ena-ultramass-vainilla.png'},
  {id:'ena-pw-fp', name:'Pre War Pre-Entreno', brand:'ENA', cat:'Pre-entrenos', goal:'Energía', flavor:'Fruit Punch · 400g', price:27500, priceCard:30250, rating:4.8, reviews:89, badge:'TOP', pop:90, img:IMG+'ena-prewar-fruitpunch.png'},
  {id:'ena-pw-lem', name:'Pre War Pre-Entreno', brand:'ENA', cat:'Pre-entrenos', goal:'Energía', flavor:'Lemonade · 400g', price:27500, priceCard:30250, rating:4.7, reviews:62, pop:78, img:IMG+'ena-prewar-lemonade.png'},
  {id:'ena-crea-1k', name:'Creatina Monohidrato 1KG', brand:'ENA', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 1kg · 200 ingestas', price:72000, priceCard:79200, rating:4.9, reviews:120, pop:84, img:IMG+'ena-creatina-1000.png'},
  {id:'ena-crea-fp', name:'Creatina Monohidrato', brand:'ENA', cat:'Creatinas', goal:'Fuerza', flavor:'Frutos Rojos · 300g', price:24000, priceCard:26400, rating:4.8, reviews:77, pop:70, img:IMG+'ena-creatina-fruitpunch.png', splitCards:true},
  {id:'ena-crea-nar', name:'Creatina Monohidrato', brand:'ENA', cat:'Creatinas', goal:'Fuerza', flavor:'Naranja · 342g', price:24000, priceCard:26400, rating:4.8, reviews:58, pop:68, img:IMG+'ena-creatina-naranja.png', splitCards:true},
  {id:'ena-crea-sin', name:'Creatina Monohidrato', brand:'ENA', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 300g · 60 ingestas', price:24000, priceCard:26400, rating:4.8, reviews:64, pop:69, img:IMG+'ena-creatina-sinsabor.png', splitCards:true},
  {id:'ena-col', name:'Colágeno Sport', brand:'ENA', cat:'Colágeno', goal:'Recuperación', flavor:'Naranja · 407g', price:28000, priceCard:30800, rating:4.7, reviews:49, pop:62, img:IMG+'ena-colageno-sport.png'},
  {id:'ena-mag-c', name:'Citrato de Magnesio', brand:'ENA', cat:'Citrato de Magnesio', goal:'Recuperación', flavor:'60 cápsulas', price:13000, priceCard:14300, rating:4.8, reviews:96, pop:73, img:IMG+'ena-magnesio-caps.png'},
  {id:'ena-mag-p', name:'Citrato de Magnesio Polvo', brand:'ENA', cat:'Citrato de Magnesio', goal:'Recuperación', flavor:'Lemonade · 192g', price:16400, priceCard:18100, rating:4.7, reviews:54, pop:64, img:IMG+'ena-magnesio-polvo.png'},
  {id:'ena-multi', name:'Multivitamínico', brand:'ENA', cat:'Vitaminas', goal:'Salud', flavor:'Con cafeína · 60 comp', price:17000, priceCard:18700, rating:4.8, reviews:88, pop:74, img:IMG+'ena-multivitamin.png'},
  {id:'ena-zma', name:'ZMA', brand:'ENA', cat:'Resto de suplementos', goal:'Recuperación', flavor:'Zinc + Magnesio + B6 · 60 caps', price:13000, priceCard:14300, rating:4.7, reviews:43, pop:60, img:IMG+'ena-zma.png'},
  {id:'ena-omega3', name:'Omega 3 Fish Oil', brand:'ENA', cat:'Vitaminas', goal:'Salud', flavor:'DHA + EPA · 60 cápsulas', price:25000, priceCard:27500, rating:4.8, reviews:58, pop:68, img:IMG+'ena-omega3.png'},
  {id:'ena-caf', name:'Cafeína 200', brand:'ENA', cat:'Energía', goal:'Energía', flavor:'200mg · 60 cápsulas', price:11500, priceCard:12700, rating:4.8, reviews:71, pop:76, img:IMG+'ena-cafeina.png'},

  /* ===== GOLD NUTRITION ===== */
  {id:'gold-whey-cho', name:'Proteína Whey', brand:'Gold Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate', price:58000, priceCard:63000, rating:4.8, reviews:104, pop:85, img:IMG+'gold-whey-chocolate.png'},
  {id:'gold-whey-coo', name:'Proteína Whey', brand:'Gold Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Vainilla', price:58000, priceCard:63000, rating:4.8, reviews:79, pop:79, img:IMG+'gold-whey-cookies.png'},
  {id:'gold-whey-fru', name:'Proteína Whey', brand:'Gold Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Frutilla', price:58000, priceCard:63000, rating:4.7, reviews:66, pop:75, img:IMG+'gold-whey-frutilla.png'},
  {id:'gold-crea', name:'Creatina Monohidrato', brand:'Gold Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 300g', price:21000, priceCard:23100, rating:4.8, reviews:91, pop:80, img:IMG+'gold-creatine.png'},
  {id:'gold-creapure', name:'Creatina Creapure®', brand:'Gold Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Premium · sin sabor', price:29500, priceCard:32450, rating:4.9, reviews:58, badge:'PREMIUM', pop:82, img:IMG+'gold-creapure.png'},
  {id:'gold-testo', name:'Testo Gold', brand:'Gold Nutrition', cat:'Salud y Bienestar', goal:'Salud', flavor:'Testosterona natural · caps', price:26800, priceCard:29500, rating:4.6, reviews:37, pop:58, img:IMG+'gold-testo.png'},
  {id:'gold-mag', name:'Citrato de Magnesio', brand:'Gold Nutrition', cat:'Citrato de Magnesio', goal:'Recuperación', flavor:'Caps', price:15000, priceCard:16500, rating:4.7, reviews:48, pop:62, img:IMG+'gold-magnesio.png'},
  {id:'gold-omega3', name:'Omega 3 Aceite de Pescado', brand:'Gold Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'Caps', price:25500, priceCard:28100, rating:4.7, reviews:55, pop:66, img:IMG+'gold-omega3.png'},

  /* ===== ONE FIT NUTRITION ===== */
  {id:'onefit-crea', name:'Creatina Micronizada Poweraded 500g', brand:'One Fit Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 500g', price:27000, priceCard:29700, rating:4.7, reviews:62, pop:72, img:IMG+'onefit-creatine.png'},
  {id:'onefit-whey', name:'Proteína Whey Classic', brand:'One Fit Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate · 907g · 2LB', price:38000, priceCard:41800, rating:4.7, reviews:54, pop:70, img:IMG+'onefit-whey.png'},
  {id:'onefit-whey-van', name:'Proteína Whey Classic', brand:'One Fit Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Vainilla · 907g · 2LB', price:38000, priceCard:41800, rating:4.7, reviews:48, pop:69, img:IMG+'onefit-whey.png'},
  {id:'onefit-whey-fru', name:'Proteína Whey Classic', brand:'One Fit Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Frutilla · 907g · 2LB', price:38000, priceCard:41800, rating:4.7, reviews:45, pop:68, img:IMG+'onefit-whey.png'},
  {id:'onefit-mag', name:'Citrato de Magnesio 450g', brand:'One Fit Nutrition', cat:'Citrato de Magnesio', goal:'Recuperación', flavor:'Sin sabor · 450g', price:19000, priceCard:20900, rating:4.7, reviews:41, pop:60, img:IMG+'onefit-magnesio.png'},
  {id:'onefit-omega3', name:'Omega 3 Diario', brand:'One Fit Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'Caps', price:20500, priceCard:22600, rating:4.6, reviews:38, pop:58, img:IMG+'onefit-omega3.png'},
  {id:'onefit-fric', name:'Friction 3.2 Pre-Entreno', brand:'One Fit Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Uva · 300g · 30 serv', price:19000, priceCard:20900, rating:4.7, reviews:47, pop:74, img:IMG+'onefit-friction.png'},
  {id:'onefit-fric-lim', name:'Friction 3.2 Pre-Entreno', brand:'One Fit Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Limón · 300g · 30 serv', price:19000, priceCard:20900, rating:4.7, reviews:41, pop:73, img:IMG+'onefit-friction-limon.png'},
  {id:'onefit-multi', name:'Multivitamínico', brand:'One Fit Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'Caps', price:13500, priceCard:14900, rating:4.7, reviews:44, pop:62, img:IMG+'onefit-multivitamins.png'},
  {id:'onefit-crea-200', name:'Creatina Micronizada Poweraded', brand:'One Fit Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 200g · 40 serv', price:13500, priceCard:14900, rating:4.7, reviews:48, pop:67, img:IMG+'onefit-creatine-200.png'},
  {id:'onefit-mag-150', name:'Citrato de Magnesio 150g', brand:'One Fit Nutrition', cat:'Citrato de Magnesio', goal:'Recuperación', flavor:'Sin sabor · 150g · 60 serv', price:9000, priceCard:9900, rating:4.7, reviews:36, pop:56, img:IMG+'onefit-magnesio-150.png'},

  /* ===== LEGUILAB ===== */
  {id:'legui-aza', name:'Azafrán + Vitamina B6', brand:'Leguilab', cat:'Vitaminas', goal:'Salud', flavor:'Health & Care · caps', price:25000, priceCard:27500, rating:4.7, reviews:33, badge:'NUEVO', pop:56, img:IMG+'leguilab-azafran.png'},
  {id:'legui-zinc', name:'Bisglicinato de Zinc', brand:'Leguilab', cat:'Salud y Bienestar', goal:'Salud', flavor:'60 cápsulas vegetales', price:25000, priceCard:27500, rating:4.7, reviews:41, pop:58, img:IMG+'leguilab-zinc.png'},

  /* ===== MERVICK LAB ===== */
  {id:'mervick-fram', name:'Barra Proteica Whey Frambuesa 65g', brand:'Mervick Lab', cat:'Barras', goal:'Definición', flavor:'Frambuesa · 65g · caja x12', price:24000, priceCard:26400, rating:4.6, reviews:52, pop:68, img:IMG+'mervick-bar-frambuesa.png'},
  {id:'mervick-ban', name:'Barra Proteica Whey Banana 46g', brand:'Mervick Lab', cat:'Barras', goal:'Definición', flavor:'Banana · 46g · caja x12', price:19000, priceCard:20900, rating:4.6, reviews:47, pop:66, img:IMG+'mervick-bar-banana.png'},

  /* ===== ULTIMATE NUTRITION ===== */
  {id:'ult-mela', name:'Melatonina 3mg', brand:'Ultimate Nutrition', cat:'Salud y Bienestar', goal:'Salud', flavor:'60 cápsulas', price:23500, priceCard:25900, rating:4.8, reviews:73, pop:70, img:IMG+'ultimate-melatonin.png'},

  /* ===== XBODY EVOLUTION ===== */
  {id:'xbody-crea', name:'Creatina Micronizada', brand:'XBody Evolution', cat:'Creatinas', goal:'Fuerza', flavor:'5000mg · 300g · 60 serv', price:16500, priceCard:18200, rating:4.7, reviews:60, pop:71, img:IMG+'xbody-creatine.png'},

  /* ===== INNOVA NATURALS ===== */
  {id:'innova-b12', name:'Vitamina B12', brand:'Innova Naturals', cat:'Vitaminas', goal:'Salud', flavor:'Metilcobalamina · caps', price:20000, priceCard:22000, rating:4.7, reviews:39, pop:57, img:IMG+'innova-b12.png'},
  {id:'innova-mag', name:'Citrato de Magnesio', brand:'Innova Naturals', cat:'Citrato de Magnesio', goal:'Recuperación', flavor:'Caps', price:19000, priceCard:20900, rating:4.7, reviews:35, pop:55, img:IMG+'innova-magnesio.png'},

  /* ===== STAR NUTRITION — Proteínas (nuevas) ===== */
  {id:'star-whey-van', name:'Proteína Whey', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Vainilla Ice Cream · 908g · 2LB', price:54000, priceCard:59400, rating:4.9, reviews:240, badge:'MÁS VENDIDO', pop:97, img:IMG+'star-whey-vainilla.png'},
  {id:'star-whey-cho', name:'Proteína Whey', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate Suizo · 908g · 2LB', price:54000, priceCard:59400, rating:4.9, reviews:218, pop:96, img:IMG+'star-whey-chocolate.png'},
  {id:'star-whey-coo', name:'Proteína Whey', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 908g · 2LB', price:54000, priceCard:59400, rating:4.9, reviews:172, pop:90, img:IMG+'star-whey-cookies.png'},
  {id:'star-whey-fru', name:'Proteína Whey', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Strawberry Cream · 908g · 2LB', price:54000, priceCard:59400, rating:4.8, reviews:121, pop:84, img:IMG+'star-whey-frutilla.png'},
  {id:'star-whey-ban', name:'Proteína Whey', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Banana Cream · 908g · 2LB', price:54000, priceCard:59400, rating:4.8, reviews:104, pop:82, img:IMG+'star-whey-banana.png'},
  {id:'star-plat-cho', name:'Proteína Whey Platinum', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate Suizo · 908g · 2LB', price:58000, priceCard:63800, rating:4.9, reviews:156, badge:'PREMIUM', pop:91, img:IMG+'star-platinum-chocolate.png'},
  {id:'star-plat-van', name:'Proteína Whey Platinum', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Vanilla Ice Cream · 908g · 2LB', price:58000, priceCard:63800, rating:4.9, reviews:132, pop:88, img:IMG+'star-platinum-vainilla.png'},
  {id:'star-plat-coo', name:'Proteína Whey Platinum', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 908g · 2LB', price:58000, priceCard:63800, rating:4.8, reviews:98, pop:83, img:IMG+'star-platinum-cookies.png'},
  {id:'star-plat-fru', name:'Proteína Whey Platinum', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Strawberry Cream · 908g · 2LB', price:58000, priceCard:63800, rating:4.8, reviews:76, pop:78, img:IMG+'star-platinum-frutilla.png'},
  {id:'star-plat-ban', name:'Proteína Whey Platinum', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Banana Cream · 908g · 2LB', price:58000, priceCard:63800, rating:4.8, reviews:69, pop:76, img:IMG+'star-platinum-banana.png'},
  {id:'star-plat3k-cho', name:'Proteína Whey Platinum 3KG', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate Suizo · 3KG · 100 serv', price:175000, priceCard:192500, rating:4.9, reviews:64, badge:'PACK PRO', pop:80, img:IMG+'star-platinum3k-chocolate.png'},
  {id:'star-plat3k-van', name:'Proteína Whey Platinum 3KG', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Vanilla Ice Cream · 3KG · 100 serv', price:175000, priceCard:192500, rating:4.9, reviews:51, pop:77, img:IMG+'star-platinum3k-vainilla.png'},
  {id:'star-plat3k-coo', name:'Proteína Whey Platinum 3KG', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 3KG · 100 serv', price:175000, priceCard:192500, rating:4.8, reviews:43, pop:74, img:IMG+'star-platinum3k-cookies.png'},
  {id:'star-plat3k-fru', name:'Proteína Whey Platinum 3KG', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Strawberry Cream · 3KG · 100 serv', price:175000, priceCard:192500, rating:4.8, reviews:38, pop:71, img:IMG+'star-platinum3k-frutilla.png'},
  {id:'star-plat3k-ban', name:'Proteína Whey Platinum 3KG', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Banana Cream · 3KG · 100 serv', price:175000, priceCard:192500, rating:4.8, reviews:35, pop:70, img:IMG+'star-platinum3k-banana.png'},

  /* ===== STAR NUTRITION — Pre-entrenos / Quemadores / Vitaminas (nuevos) ===== */
  {id:'star-v8-lima', name:'Pump V8', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Citrus Slush (Lima) · 285g · 30 serv', price:27500, priceCard:30300, rating:4.8, reviews:118, badge:'TOP', pop:92, img:IMG+'star-v8-lima.png'},
  {id:'star-v8-sand', name:'Pump V8', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Watermelon (Sandía) · 285g · 30 serv', price:27500, priceCard:30300, rating:4.8, reviews:97, pop:88, img:IMG+'star-v8-sandia.png'},
  {id:'star-v8-uva', name:'Pump V8', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Grape Attack (Uva) · 285g · 30 serv', price:27500, priceCard:30300, rating:4.7, reviews:81, pop:85, img:IMG+'star-v8-uva.png'},
  {id:'star-v8-acai', name:'Pump V8', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Açaí Power · 285g · 30 serv', price:27500, priceCard:30300, rating:4.8, reviews:73, pop:84, img:IMG+'star-v8-acai.png'},
  {id:'star-3d-fl', name:'Pump 3Di Ripped', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Definición', flavor:'Strawberry Lime · 315g · 45 serv', price:31500, priceCard:34700, rating:4.8, reviews:64, pop:82, img:IMG+'star-3dripped-frutillalima.png'},
  {id:'star-3d-lem', name:'Pump 3Di Ripped', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Definición', flavor:'Lemonade · 315g · 45 serv', price:31500, priceCard:34700, rating:4.7, reviews:52, pop:79, img:IMG+'star-3dripped-limonada.png'},
  {id:'star-thermo', name:'Thermo Fuel Max', brand:'Star Nutrition', cat:'Quemadores', goal:'Definición', flavor:'120 cápsulas · 30 serv', price:18500, priceCard:20500, rating:4.6, reviews:58, pop:64, img:IMG+'star-thermofuel.png'},
  {id:'star-glut', name:'L-Glutamina', brand:'Star Nutrition', cat:'Resto de suplementos', goal:'Recuperación', flavor:'100% micronizada · 300g · 60 serv', price:25000, priceCard:27500, rating:4.8, reviews:71, pop:70, img:IMG+'star-glutamine.png'},
  {id:'star-hmb', name:'HMB Fuerza y Recuperación', brand:'Star Nutrition', cat:'Resto de suplementos', goal:'Fuerza', flavor:'180 cápsulas · 90 serv', price:22500, priceCard:24750, rating:4.7, reviews:44, pop:62, img:IMG+'star-hmb.png'},
  {id:'star-resv', name:'Resveratrol 500', brand:'Star Nutrition', cat:'Salud y Bienestar', goal:'Salud', flavor:'100% natural · 60 cápsulas', price:18500, priceCard:20500, rating:4.7, reviews:39, pop:58, img:IMG+'star-resveratrol.png'},
  {id:'star-vitc', name:'Vitamina C', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'60 cápsulas', price:8500, priceCard:9400, rating:4.8, reviews:86, pop:72, img:IMG+'star-vitaminac.png'},
  {id:'star-k2d3', name:'Vitaminas K2 + D3', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'60 cápsulas', price:19500, priceCard:21450, rating:4.8, reviews:63, pop:68, img:IMG+'star-k2d3.png'},
  {id:'star-omega3', name:'Omega 3 Aceite de Pescado', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'1000mg · 60 cápsulas', price:27000, priceCard:29700, rating:4.8, reviews:91, pop:74, img:IMG+'star-omega3.png'},

  /* ===== STAR / XTRENGHT — Accesorios ===== */
  {id:'star-shk-got', name:'Shaker Got Protein', brand:'Star Nutrition', cat:'Accesorios', goal:'Salud', flavor:'600ml · con resorte mezclador', price:8500, priceCard:9400, rating:4.7, reviews:54, pop:60, img:IMG+'star-shaker-gotprotein.png'},
  {id:'star-shk-v8', name:'Shaker Pump V8', brand:'Star Nutrition', cat:'Accesorios', goal:'Salud', flavor:'400ml · con compartimento', price:8500, priceCard:9400, rating:4.7, reviews:41, pop:58, img:IMG+'star-shaker-pumpv8.png'},
  {id:'xt-shk', name:'Shaker Xtrenght', brand:'Xtrenght', cat:'Accesorios', goal:'Salud', flavor:'600ml · con resorte mezclador', price:8500, priceCard:9400, rating:4.6, reviews:33, pop:55, img:IMG+'xt-shaker.png'},

  /* ===== XTRENGHT — Proteínas / Creatinas / Quemadores (nuevos) ===== */
  {id:'xt-adv-van', name:'Proteína Whey Advanced', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Vainilla · 907g · 2LB · 30 serv', price:70000, priceCard:77000, rating:4.9, reviews:88, badge:'PREMIUM', pop:86, img:IMG+'xt-advanced-vainilla.png'},
  {id:'xt-adv-cho', name:'Proteína Whey Advanced', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate · 907g · 2LB · 30 serv', price:70000, priceCard:77000, rating:4.9, reviews:79, pop:84, img:IMG+'xt-advanced-chocolate.png'},
  {id:'xt-adv-coo', name:'Proteína Whey Advanced', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 907g · 2LB', price:70000, priceCard:77000, rating:4.8, reviews:61, pop:80, img:IMG+'xt-advanced-cookies.png'},
  {id:'xt-adv-ban', name:'Proteína Whey Advanced', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Banana · 907g · 2LB · 30 serv', price:70000, priceCard:77000, rating:4.8, reviews:48, pop:76, img:IMG+'xt-advanced-banana.png'},
  {id:'xt-adv-fru', name:'Proteína Whey Advanced', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Frutilla · 907g · 2LB · 30 serv', price:70000, priceCard:77000, rating:4.8, reviews:52, pop:77, img:IMG+'xt-advanced-frutilla.png'},
  {id:'xt-best-ban', name:'Proteína Whey Best', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Banana · 907g · 2LB · 30 serv', price:54500, priceCard:60000, rating:4.8, reviews:57, pop:78, img:IMG+'xt-best-banana.png'},
  {id:'xt-best-cho', name:'Proteína Whey Best', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate · 907g · 2LB · 30 serv', price:54500, priceCard:60000, rating:4.8, reviews:66, badge:'OFERTA', pop:81, img:IMG+'xt-best-chocolate.png'},
  {id:'xt-best-coo', name:'Proteína Whey Best', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 907g · 2LB', price:54500, priceCard:60000, rating:4.8, reviews:49, pop:75, img:IMG+'xt-best-cookies.png'},
  {id:'xt-best-fru', name:'Proteína Whey Best', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Frutilla · 907g · 2LB · 30 serv', price:54500, priceCard:60000, rating:4.7, reviews:41, pop:72, img:IMG+'xt-best-frutilla.png'},
  {id:'xt-best-van', name:'Proteína Whey Best', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Vainilla · 907g · 2LB · 30 serv', price:54500, priceCard:60000, rating:4.8, reviews:55, pop:74, img:IMG+'xt-best-vainilla.png'},
  {id:'xt-crea-500', name:'Creatina Grado Farmacéutico 500g', brand:'Xtrenght', cat:'Creatinas', goal:'Fuerza', flavor:'Micronizada · 500g · 100 serv', price:30000, priceCard:33000, rating:4.9, reviews:72, badge:'TOP', pop:85, img:IMG+'xt-creatine-500.png'},
  {id:'xt-crea-250', name:'Creatina Grado Farmacéutico 250g', brand:'Xtrenght', cat:'Creatinas', goal:'Fuerza', flavor:'Micronizada · 250g · 50 serv', price:18000, priceCard:19800, rating:4.8, reviews:54, pop:73, img:IMG+'xt-creatine-250.png'},
  {id:'xt-cutter', name:'Cutter Termogénico Quemador', brand:'Xtrenght', cat:'Quemadores', goal:'Definición', flavor:'120 cápsulas · 60 serv', price:14000, priceCard:15400, rating:4.6, reviews:47, pop:66, img:IMG+'xt-cutter.png'},

  /* ===== ONE FIT NUTRITION / LABS NUTRITION — nuevos ===== */
  {id:'onefit-gainer-van', name:'The Best Gainer Mass', brand:'One Fit Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Vainilla · 1.5kg', price:34000, priceCard:37400, rating:4.7, reviews:12, badge:'NUEVO', pop:65, img:IMG+'onefit-gainer-mass.png'},
  {id:'onefit-gainer-fru', name:'The Best Gainer Mass', brand:'One Fit Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Frutilla · 1.5kg', price:34000, priceCard:37400, rating:4.7, reviews:9, pop:63, img:IMG+'onefit-gainer-mass.png'},
  {id:'onefit-oxido', name:'Óxido Nítrico 5.1', brand:'One Fit Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Limón · 210g · 30 serv', price:18000, priceCard:19800, rating:4.7, reviews:8, badge:'NUEVO', pop:62, img:IMG+'onefit-oxido-nitrico-limon.png'},
  {id:'labs-nac', name:'NAC', brand:'Labs Nutrition', cat:'Salud y Bienestar', goal:'Salud', flavor:'N-Acetilcisteína · 60 cápsulas', price:20000, priceCard:22000, rating:4.7, reviews:6, badge:'NUEVO', pop:58, img:IMG+'labs-nac.png'}
];
window.MUTANTS_CATALOG = CATALOG;

var CATEGORIES = ['Proteínas','Ganadores de masa','Creatinas','Aminoácidos','Pre-entrenos','Energía','Quemadores','Vitaminas','Colágeno','Citrato de Magnesio','Hidratación','Salud y Bienestar','Barras','Resto de suplementos','Accesorios'];
var CAT_IMG = {'Proteínas':'star-whey-chocolate','Ganadores de masa':'mutant-mass-chocolate','Creatinas':'creatine-300','Aminoácidos':'mtor-bcaa-green','Pre-entrenos':'star-v8-lima','Energía':'caffeine-200','Quemadores':'cla-1000','Vitaminas':'multivitamin','Colágeno':'collagen-frutos','Citrato de Magnesio':'magnesio','Resto de suplementos':'star-glutamine','Hidratación':'hydro-plus-lima','Salud y Bienestar':'ultimate-melatonin','Barras':'mervick-bar-frambuesa','Accesorios':'star-shaker-gotprotein'};
var BRANDS = ['Star Nutrition','ENA','Gold Nutrition','One Fit Nutrition','Xtrenght','Ultimate Nutrition','XBody Evolution','Leguilab','Mervick Lab','Innova Naturals','Labs Nutrition'];
var GOALS = ['Volumen','Fuerza','Definición','Recuperación','Energía','Resistencia','Salud'];

/* ---------------- HELPERS ---------------- */
function money(n){ return '$' + Number(n).toLocaleString('es-AR'); }
/* precio NORMAL con tarjeta (valor explícito del listado; fallback +10%) */
function cardPrice(p){ return p.priceCard || Math.round(p.price*1.1); }
/* texto sin acentos para búsquedas */
function norm(s){ return (s==null?'':String(s)).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
function byId(id){ return CATALOG.filter(function(p){return p.id===id;})[0]; }
function qs(s,r){ return (r||document).querySelector(s); }
function qsa(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
function el(tag,cls,html){ var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }
function svg(p,w){ w=w||20; return '<svg width="'+w+'" height="'+w+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'+p+'</svg>'; }
function waLink(text){ return 'https://wa.me/'+WHATSAPP+(text?('?text='+encodeURIComponent(text)):''); }
/* group variants (same brand + same name = same product, distinct flavor) */
function groupKey(p){ return p.brand+'|'+p.name; }
function variantsOf(p){ var k=groupKey(p); return CATALOG.filter(function(x){return groupKey(x)===k;}); }
function collapse(list){
  var seen={}, out=[];
  list.forEach(function(p){
    if(p.splitCards){ out.push(p); return; } // always shown as its own card, even though it has flavor variants
    var k=groupKey(p); if(seen[k])return; seen[k]=1;
    // representative: prefer one with a badge, else this one
    var grp=list.filter(function(x){return groupKey(x)===k;});
    var rep=grp.filter(function(x){return x.badge;})[0]||grp[0];
    out.push(rep);
  });
  return out;
}

/* ---------------- CART (localStorage) ---------------- */
var CART_KEY = 'mutants_cart_v1';
function loadCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||[]; }catch(e){ return []; } }
function saveCart(c){ try{ localStorage.setItem(CART_KEY, JSON.stringify(c)); }catch(e){} }
function cartCount(){ return loadCart().reduce(function(a,i){return a+i.qty;},0); }
/* subtotal con tarjeta (precio normal) */
function cartSubtotal(){ return loadCart().reduce(function(a,i){var p=byId(i.id);return a+(p?cardPrice(p)*i.qty:0);},0); }
/* subtotal con transferencia/efectivo (precio de lista) */
function cartSubtotalTransfer(){ return loadCart().reduce(function(a,i){var p=byId(i.id);return a+(p?p.price*i.qty:0);},0); }
function addToCart(id,qty){
  qty=qty||1; var c=loadCart(); var ex=c.filter(function(i){return i.id===id;})[0];
  if(ex) ex.qty+=qty; else c.push({id:id,qty:qty});
  saveCart(c); syncCartUI(); var p=byId(id); if(p) toast(p.name+' agregado'); openDrawer();
}
function setQty(id,qty){ var c=loadCart().map(function(i){return i.id===id?{id:id,qty:Math.max(1,qty)}:i;}); saveCart(c); syncCartUI(); }
function removeFromCart(id){ saveCart(loadCart().filter(function(i){return i.id!==id;})); syncCartUI(); }

/* ---------------- TOAST ---------------- */
var toastTimer;
function toast(msg){
  var t=qs('#toast'); if(!t) return;
  qs('#toast-msg').textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(function(){ t.classList.remove('show'); },2300);
}

/* ---------------- DRAWER / MENU ---------------- */
function openDrawer(){ var d=qs('#drawer'),o=qs('#overlay'); if(d){d.classList.add('open');} if(o){o.classList.add('open');} }
function closeDrawer(){ var d=qs('#drawer'),o=qs('#overlay'),m=qs('#mmenu'); if(d)d.classList.remove('open'); if(m)m.classList.remove('open'); if(o)o.classList.remove('open'); }
function toggleMenu(){ var m=qs('#mmenu'),o=qs('#overlay'); if(!m)return; var open=m.classList.toggle('open'); if(o)o.classList.toggle('open',open); }

/* ---------------- RENDER: product card ---------------- */
function productCard(p){
  var c=el('div','prod-card');
  var vc=p.splitCards?1:variantsOf(p).length;
  c.innerHTML =
    '<div class="prod-media">'+
      '<a href="producto.html?id='+p.id+'" style="position:absolute;inset:0;z-index:1"></a>'+
      '<img src="'+p.img+'" alt="'+p.name+'" loading="lazy" decoding="async">'+
      (p.badge?'<span class="badge">'+p.badge+'</span>':'')+
      (p.disc?'<span class="disc">-'+p.disc+'%</span>':'')+
    '</div>'+
    '<div class="prod-body">'+
      '<div class="prod-top"><span class="prod-brand">'+p.brand+'</span>'+
        '<span class="prod-rate">★ '+p.rating.toFixed(1)+' <small>('+p.reviews+')</small></span></div>'+
      '<a href="producto.html?id='+p.id+'" class="prod-name">'+p.name+'</a>'+
      '<div class="prod-flavor">'+(vc>1?(vc+' sabores disponibles'):p.flavor)+'</div>'+
      '<div class="prod-foot"><div class="price-block">'+
        '<div class="price">'+money(cardPrice(p))+'</div>'+
        '<div class="price-cap">con tarjeta</div>'+
        '<div class="price-transfer"><b>'+money(p.price)+'</b><span>transferencia / efectivo</span></div></div>'+
        '<button class="add-btn" data-add="'+p.id+'" title="Agregar al carrito">'+svg('<path d="M12 5v14M5 12h14"></path>')+'</button>'+
      '</div>'+
    '</div>';
  return c;
}
function renderGrid(container, list){
  container.innerHTML='';
  if(!list.length){
    container.innerHTML='<div class="no-results" style="grid-column:1/-1"><b>Sin resultados</b>Probá con otra marca, sabor u objetivo.</div>';
    return;
  }
  list.forEach(function(p){ container.appendChild(productCard(p)); });
}

/* ---------------- SHARED UI INIT ---------------- */
function syncCartUI(){
  var n=cartCount();
  qsa('[data-cart-count]').forEach(function(e){ e.textContent=n; e.style.display=n?'':'none'; });
  renderDrawer();
  // checkout/cart pages
  if(window.__renderCartPage) window.__renderCartPage();
  if(window.__renderCheckout) window.__renderCheckout();
}
function renderDrawer(){
  var body=qs('#drawer-body'); if(!body) return;
  var c=loadCart();
  if(!c.length){
    body.innerHTML='<div class="cart-empty"><div class="ic">'+svg('<path d="M6 6h15l-1.5 9h-12z"></path><circle cx="9" cy="20" r="1.4"></circle><circle cx="18" cy="20" r="1.4"></circle>',28)+'</div><b>Tu carrito está vacío</b><div style="font-size:13px">Sumá productos y potenciá tu progreso.</div></div>';
  } else {
    body.innerHTML='';
    c.forEach(function(i){
      var p=byId(i.id); if(!p) return;
      var row=el('div','cart-item');
      row.innerHTML=
        '<div class="thumb"><img src="'+p.img+'" alt=""></div>'+
        '<div style="flex:1;min-width:0"><div class="nm">'+p.name+'</div><div class="fl">'+p.flavor+'</div>'+
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px">'+
          '<div class="qty"><button data-dec="'+p.id+'">−</button><span>'+i.qty+'</span><button data-inc="'+p.id+'">+</button></div>'+
          '<div class="line-price">'+money(cardPrice(p)*i.qty)+'</div></div></div>'+
        '<button class="remove" data-rm="'+p.id+'">'+svg('<path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13"></path>',16)+'</button>';
      body.appendChild(row);
    });
  }
  var st=qs('#drawer-subtotal'); if(st) st.textContent=money(cartSubtotal());
}

/* event delegation for add/qty/remove + drawer/menu controls */
document.addEventListener('click', function(e){
  var t=e.target.closest('[data-add],[data-inc],[data-dec],[data-rm],[data-open-cart],[data-close],[data-toggle-menu]');
  if(!t) return;
  if(t.hasAttribute('data-add')){ e.preventDefault(); addToCart(t.getAttribute('data-add')); }
  else if(t.hasAttribute('data-inc')){ var id=t.getAttribute('data-inc'); var it=loadCart().filter(function(i){return i.id===id;})[0]; setQty(id,(it?it.qty:1)+1); }
  else if(t.hasAttribute('data-dec')){ var id2=t.getAttribute('data-dec'); var it2=loadCart().filter(function(i){return i.id===id2;})[0]; setQty(id2,(it2?it2.qty:1)-1); }
  else if(t.hasAttribute('data-rm')){ removeFromCart(t.getAttribute('data-rm')); }
  else if(t.hasAttribute('data-open-cart')){ openDrawer(); }
  else if(t.hasAttribute('data-close')){ closeDrawer(); }
  else if(t.hasAttribute('data-toggle-menu')){ toggleMenu(); }
});

/* scroll reveal */
var __revealObserver=null;
function observeReveal(els){
  if(!els||!els.length) return;
  if(__revealObserver){ els.forEach(function(el){ __revealObserver.observe(el); }); }
  else { els.forEach(function(el){ el.classList.add('in'); }); }
}
function initReveal(){
  var els=qsa('[data-reveal]');
  if('IntersectionObserver' in window){
    __revealObserver=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); __revealObserver.unobserve(en.target);} }); },{threshold:.08});
    els.forEach(function(el){ __revealObserver.observe(el); });
    // safety net: si el observer no disparó (algunos entornos), revelar todo
    setTimeout(function(){ qsa('[data-reveal]:not(.in)').forEach(function(el){ var r=el.getBoundingClientRect(); if(r.top < window.innerHeight+200) el.classList.add('in'); }); },1200);
    window.addEventListener('scroll',function(){ qsa('[data-reveal]:not(.in)').forEach(function(el){ var r=el.getBoundingClientRect(); if(r.top < window.innerHeight-40) el.classList.add('in'); }); },{passive:true});
  } else { els.forEach(function(el){ el.classList.add('in'); }); }
}
window.__observeReveal=observeReveal;
/* counters */
function initCounters(){
  var els=qsa('[data-count]');
  function run(el){
    var t=parseInt(el.getAttribute('data-count'),10)||0, suf=el.getAttribute('data-suffix')||'', dur=1500, st=null;
    function step(ts){ if(!st)st=ts; var pr=Math.min(1,(ts-st)/dur); var v=Math.floor((1-Math.pow(1-pr,3))*t); el.textContent=v.toLocaleString('es-AR')+suf; if(pr<1)requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(en){ if(en.isIntersecting){ run(en.target); io.unobserve(en.target);} }); },{threshold:.4});
    els.forEach(function(el){ io.observe(el); });
  } else els.forEach(run);
}
/* hero particles */
function initParticles(){
  var c=qs('#particles'); if(!c) return;
  var ctx=c.getContext('2d'), w=1,h=1;
  function resize(){ var p=c.parentElement; if(!p)return; var r=p.getBoundingClientRect(); w=c.width=r.width; h=c.height=r.height; }
  resize(); window.addEventListener('resize',resize);
  var parts=[]; for(var i=0;i<44;i++)parts.push({x:Math.random(),y:Math.random(),r:Math.random()*1.8+.5,s:Math.random()*.18+.04,o:Math.random()*.5+.2,col:Math.random()>.5?'124,255,79':'157,78,221'});
  (function tick(){
    ctx.clearRect(0,0,w,h);
    parts.forEach(function(p){ p.y-=p.s/100; if(p.y<-.02){p.y=1.02;p.x=Math.random();}
      ctx.beginPath(); ctx.arc(p.x*w,p.y*h,p.r,0,6.3); ctx.fillStyle='rgba('+p.col+','+p.o+')'; ctx.shadowBlur=7; ctx.shadowColor='rgba('+p.col+',.8)'; ctx.fill(); });
    requestAnimationFrame(tick);
  })();
}

/* set WhatsApp links */
function initWhatsApp(){ qsa('[data-wa]').forEach(function(a){ a.href=waLink(a.getAttribute('data-wa')||'Hola Mutants! Quiero hacer una consulta.'); }); }

/* ============================================================
   PAGE INITIALIZERS
   ============================================================ */

/* HOME */
function initHome(){
  // categories
  var cg=qs('#home-categories');
  if(cg){ CATEGORIES.forEach(function(name){
    var cnt=CATALOG.filter(function(p){return p.cat===name;}).length;
    var a=el('a','cat-card'); a.href='productos.html?cat='+encodeURIComponent(name);
    a.setAttribute('data-reveal','');
    a.innerHTML='<div class="glow"></div><div class="pic"><img src="'+IMG+CAT_IMG[name]+'.png" alt=""></div>'+
      '<div><div class="ttl">'+name+'</div><div class="cnt">'+cnt+' productos</div></div>';
    cg.appendChild(a);
  }); observeReveal(qsa('.cat-card[data-reveal]',cg)); setTimeout(function(){ qsa('.cat-card[data-reveal]',cg).forEach(function(el){ el.classList.add('in'); }); },250); }
  // featured products + search + chips
  var grid=qs('#home-products');
  if(grid){
    var state={cat:'Todos',q:''};
    function render(){
      var list=CATALOG.slice();
      if(state.cat!=='Todos') list=list.filter(function(p){return p.cat===state.cat;});
      if(state.q){ var q=norm(state.q); list=list.filter(function(p){return norm(p.name+' '+p.brand+' '+p.flavor+' '+p.cat+' '+p.goal).indexOf(q)>-1;}); }
      renderGrid(grid,collapse(list));
    }
    var chipsWrap=qs('#home-chips');
    if(chipsWrap){ ['Todos'].concat(CATEGORIES).forEach(function(label){
      var b=el('button','chip'+(label==='Todos'?' active':'')); b.textContent=label;
      b.onclick=function(){ state.cat=label; qsa('.chip',chipsWrap).forEach(function(c){c.classList.remove('active');}); b.classList.add('active'); render(); };
      chipsWrap.appendChild(b);
    }); }
    var search=qs('#home-search');
    if(search){ search.addEventListener('input',function(){ state.q=search.value; render(); }); }
    var lupa=qs('#search-trigger');
    if(lupa){ lupa.onclick=function(){ var sec=qs('#productos'); if(sec) window.scrollTo({top:sec.offsetTop-70,behavior:'smooth'}); setTimeout(function(){ if(search) search.focus(); },420); }; }
    render();
  }
  // brands marquee
  var bt=qs('#brands-track');
  if(bt){ var html=''; BRANDS.concat(BRANDS).forEach(function(b){ html+='<a href="productos.html?brand='+encodeURIComponent(b)+'" style="text-decoration:none;color:inherit"><span>'+b.toUpperCase()+'</span></a>'; }); bt.innerHTML=html; }
  initParticles(); initCounters();
}

/* Scroll-spy: highlight nav link for the section in view (home only) */
function initNavSpy(){
  var links=qsa('.nav-links a, .mmenu-links a').filter(function(a){return (a.getAttribute('href')||'').indexOf('#')>-1;});
  if(!links.length) return;
  var map=links.map(function(a){ var id=a.getAttribute('href').split('#')[1]; return {a:a, id:id, sec:document.getElementById(id)}; }).filter(function(m){return m.sec;});
  function clearAll(){ links.forEach(function(a){a.classList.remove('active');}); }
  function spy(){
    var y=window.scrollY+120, best=null;
    map.forEach(function(m){ if(m.sec.offsetTop<=y) best=m; });
    clearAll();
    if(best && window.scrollY>200) best.a.classList.add('active');
    else fromHash();
  }
  function fromHash(){
    var h=(location.hash||'').replace('#','');
    if(!h) return false;
    var hit=map.filter(function(m){return m.id===h;});
    if(hit.length){ clearAll(); hit.forEach(function(m){m.a.classList.add('active');}); return true; }
    return false;
  }
  window.addEventListener('scroll', spy, {passive:true});
  window.addEventListener('hashchange', function(){ if(!fromHash()) spy(); });
  window.addEventListener('load', function(){ setTimeout(function(){ if(!fromHash()) spy(); }, 250); });
  if(!fromHash()) spy();
}

/* Set the active nav item (desktop + mobile) per page */
function initNav(){
  var path=(location.pathname.split('/').pop()||'index.html').toLowerCase();
  var params=new URLSearchParams(location.search);
  var navs=qsa('.nav-links a, .mmenu-links a');
  navs.forEach(function(a){a.classList.remove('active');});
  function mark(pred){ navs.forEach(function(a){ if(pred(a.getAttribute('href')||'')) a.classList.add('active'); }); }
  if(path==='productos.html'){
    if(params.get('ofertas')) mark(function(h){return h.indexOf('ofertas=1')>-1;});
    else mark(function(h){return h==='productos.html';});
  } else if(path==='contacto.html'){
    mark(function(h){return h.indexOf('contacto.html')>-1;});
  } else if(path===''||path==='index.html'){
    initNavSpy(); // home: highlight section in view
  }
  // carrito / checkout: nothing highlighted
}

/* CATALOG (productos.html) */
function initCatalog(){
  var grid=qs('#catalog-grid'); if(!grid) return;
  var params=new URLSearchParams(location.search);
  var state={ cats:[], brands:[], goals:[], max:170000, sort:'pop', q:params.get('q')||'' };
  if(params.get('cat')) state.cats=[params.get('cat')];
  if(params.get('brand')) state.brands=[params.get('brand')];

  // build filter checkboxes
  function checkboxes(host, items, key){
    items.forEach(function(it){
      var lab=el('label','filter-opt');
      var checked = state[key].indexOf(it)>-1 ? ' checked' : '';
      lab.innerHTML='<input type="checkbox" value="'+it+'"'+checked+'> '+it;
      lab.querySelector('input').addEventListener('change',function(e){
        if(e.target.checked) state[key].push(it); else state[key]=state[key].filter(function(x){return x!==it;});
        render();
      });
      host.appendChild(lab);
    });
  }
  checkboxes(qs('#f-cats'), CATEGORIES, 'cats');
  checkboxes(qs('#f-brands'), BRANDS, 'brands');
  checkboxes(qs('#f-goals'), GOALS, 'goals');

  var priceInput=qs('#f-price'), priceVal=qs('#f-price-val');
  if(priceInput){ priceInput.addEventListener('input',function(){ state.max=+priceInput.value; if(priceVal)priceVal.textContent=money(state.max); render(); }); }
  var sortSel=qs('#f-sort');
  if(sortSel){ sortSel.addEventListener('change',function(){ state.sort=sortSel.value; render(); }); }
  var searchEl=qs('#catalog-search');
  if(searchEl){ searchEl.value=state.q; searchEl.addEventListener('input',function(){ state.q=searchEl.value; render(); }); }
  var clearBtn=qs('#f-clear');
  if(clearBtn){ clearBtn.onclick=function(){ state.cats=[];state.brands=[];state.goals=[];state.max=170000; if(priceInput){priceInput.value=170000;} if(priceVal)priceVal.textContent=money(170000);
    qsa('.filters input[type=checkbox]').forEach(function(c){c.checked=false;}); render(); }; }
  var ftoggle=qs('#filters-toggle');
  if(ftoggle){ ftoggle.onclick=function(){ qs('#filters').classList.toggle('collapsed'); }; }

  function render(){
    var list=CATALOG.slice();
    if(state.cats.length) list=list.filter(function(p){return state.cats.indexOf(p.cat)>-1;});
    if(state.brands.length) list=list.filter(function(p){return state.brands.indexOf(p.brand)>-1;});
    if(state.goals.length) list=list.filter(function(p){return state.goals.indexOf(p.goal)>-1;});
    list=list.filter(function(p){return p.price<=state.max;});
    if(state.q){ var q=norm(state.q); list=list.filter(function(p){return norm(p.name+' '+p.brand+' '+p.flavor+' '+p.cat+' '+p.goal).indexOf(q)>-1;}); }
    if(state.sort==='price-asc') list.sort(function(a,b){return a.price-b.price;});
    else if(state.sort==='price-desc') list.sort(function(a,b){return b.price-a.price;});
    else if(state.sort==='rating') list.sort(function(a,b){return b.rating-a.rating;});
    else list.sort(function(a,b){return b.pop-a.pop;});
    var col=collapse(list);
    renderGrid(grid,col);
    var cnt=qs('#catalog-count'); if(cnt) cnt.textContent=col.length+' producto'+(col.length===1?'':'s');
  }
  render();
}

/* PRODUCT (producto.html) */
function initProduct(){
  var root=qs('#product-root'); if(!root) return;
  var params=new URLSearchParams(location.search);
  var id=params.get('id')||'mm-van';
  var p=byId(id)||CATALOG[0];

  // group flavors of the SAME product (same brand + same name) — distinct sizes stay separate
  var family=variantsOf(p);
  var gallery=[p.img].concat(family.map(function(f){return f.img;})).filter(function(v,i,a){return a.indexOf(v)===i;}).slice(0,4);
  var qty=1, activeImg=p.img;

  qs('#pd-brand').textContent=p.brand;
  qs('#pd-name').textContent=p.name;
  var badgeEl=qs('#pd-badge'); if(badgeEl){ if(p.badge){ badgeEl.textContent=p.badge; badgeEl.style.display=''; } else { badgeEl.style.display='none'; } }
  qs('#pd-rating').innerHTML='★★★★★ <span style="color:#cfd3da;font-size:13px">'+p.rating.toFixed(1)+'</span>';
  qs('#pd-reviews').textContent=p.reviews+' reseñas';
  qs('#pd-flavor').textContent=p.flavor;
  function priceUI(){
    qs('#pd-now').textContent=money(cardPrice(p));
    qs('#pd-old').style.display='none';
    qs('#pd-save').style.display='none';
    qs('#pd-cuota').textContent=money(Math.round(cardPrice(p)/3));
    var tEl=qs('#pd-transfer'); if(tEl) tEl.textContent=money(p.price);
    qs('#pd-total').textContent=money(cardPrice(p)*qty);
  }
  // gallery
  var main=qs('#pd-zoom'), thumbs=qs('#pd-thumbs');
  function setMain(src){ activeImg=src; main.style.backgroundImage="url('"+src+"')"; qsa('.pd-thumb',thumbs).forEach(function(t){ t.classList.toggle('active', t.getAttribute('data-src')===src); }); }
  gallery.forEach(function(src,i){
    var b=el('button','pd-thumb'+(i===0?' active':'')); b.setAttribute('data-src',src);
    b.innerHTML='<img src="'+src+'" alt="">'; b.onclick=function(){ setMain(src); };
    thumbs.appendChild(b);
  });
  setMain(p.img);
  // zoom
  main.addEventListener('mousemove',function(e){ var r=main.getBoundingClientRect(); main.style.backgroundSize='200%'; main.style.backgroundPosition=((e.clientX-r.left)/r.width*100)+'% '+((e.clientY-r.top)/r.height*100)+'%'; });
  main.addEventListener('mouseleave',function(){ main.style.backgroundSize='contain'; main.style.backgroundPosition='center'; });

  // flavor variants (family)
  var fopts=qs('#pd-flavors');
  if(fopts && family.length>1){
    family.forEach(function(f){
      var b=el('button','flavor-opt'+(f.id===p.id?' active':''));
      var short=f.flavor.split('·')[0].trim();
      b.innerHTML='<img src="'+f.img+'" alt="">'+short;
      b.onclick=function(){ location.href='producto.html?id='+f.id; };
      fopts.appendChild(b);
    });
  } else if(qs('#pd-flavor-block')){ qs('#pd-flavor-block').style.display='none'; }

  // qty
  qs('#pd-inc').onclick=function(){ qty++; qs('#pd-qty').textContent=qty; priceUI(); };
  qs('#pd-dec').onclick=function(){ qty=Math.max(1,qty-1); qs('#pd-qty').textContent=qty; priceUI(); };
  qs('#pd-add').onclick=function(){ addToCart(p.id,qty); };
  qs('#pd-buy').onclick=function(){ addToCart(p.id,qty); location.href='checkout.html'; };

  // nutrition + related
  fillInfo(p);
  var rel=qs('#pd-related');
  if(rel){ CATALOG.filter(function(x){return x.id!==p.id;}).sort(function(a,b){return b.pop-a.pop;}).slice(0,4).forEach(function(rp){ rel.appendChild(productCard(rp)); }); }

  priceUI();
}

/* Información por categoría (valores de referencia) */
function nutriProfile(c){
  if(c==='Colágeno'||c==='Citrato de Magnesio'||c==='Resto de suplementos') c='Recuperación';
  var M={
    'Proteínas':{serv:'Porción 30g',rows:[['Valor energético','120 kcal'],['Proteínas','24 g',1],['Carbohidratos','3 g'],['de los cuales azúcares','2 g'],['Grasas totales','1.5 g'],['Sodio','90 mg']],usage:['Mezclá 1 medida (30g) con 200–300ml de agua o leche.','Tomá 1 a 2 porciones por día según tu requerimiento proteico.','Ideal después de entrenar o entre comidas.'],ing:['Proteína de suero','Aislado de suero','Aminoácidos esenciales','Enzimas digestivas'],ben:[['24g de proteína','Por porción, para construir y mantener masa muscular.'],['Rápida absorción','Ideal para el post-entrenamiento.'],['Bajo en azúcares','Apto para etapas de definición.'],['Mezcla instantánea','Se disuelve fácil, sin grumos.']]},
    'Ganadores de masa':{serv:'Porción 100g',rows:[['Valor energético','380 kcal'],['Proteínas','23 g',1],['Carbohidratos','68 g'],['de los cuales azúcares','9 g'],['Grasas totales','2.5 g'],['Sodio','140 mg']],usage:['Mezclá la porción indicada con 400–500ml de agua o leche.','Tomá 1 porción por día, o según tu plan de volumen.','Ideal post-entreno o entre comidas para sumar calorías.'],ing:['Proteína de suero','Carbohidratos complejos','Vitaminas y minerales','Enzimas digestivas'],ben:[['Alto aporte calórico','Calorías de calidad para tu etapa de volumen.'],['Ratio carbo–proteína','Balance optimizado para ganar masa.'],['Fácil de tomar','Una toma cubre gran parte del excedente calórico.'],['Con micronutrientes','Vitaminas y minerales por porción.']]},
    'Creatinas':{serv:'Porción 5g',rows:[['Valor energético','0 kcal'],['Creatina monohidrato','5 g',1],['Carbohidratos','0 g'],['Grasas totales','0 g'],['Sodio','0 mg']],usage:['Disolvé 1 porción (5g) en agua o tu bebida preferida.','Tomá 5g por día de forma constante, todos los días.','Podés tomarla en cualquier momento del día.'],ing:['Creatina monohidrato micronizada'],ben:[['+ Fuerza y potencia','Mejora el rendimiento en entrenamientos intensos.'],['Más volumen','Favorece la ganancia de masa muscular.'],['Micronizada','Mejor disolución y absorción.'],['Uso diario','5g por día, sin necesidad de carga.']]},
    'Aminoácidos':{serv:'Porción 10g',rows:[['Valor energético','35 kcal'],['L-Leucina','3.5 g',1],['L-Isoleucina','1.75 g'],['L-Valina','1.75 g'],['Carbohidratos','1 g'],['Sodio','60 mg']],usage:['Disolvé 1 porción en 300–500ml de agua.','Tomá durante o después del entrenamiento.','Podés usarlo también entre comidas.'],ing:['L-Leucina','L-Isoleucina','L-Valina','Electrolitos'],ben:[['BCAA 2:1:1','Ratio óptimo para la recuperación muscular.'],['Anti-catabólico','Ayuda a preservar la masa muscular.'],['Mejor recuperación','Reduce la fatiga post-entrenamiento.'],['Refrescante','Ideal para tomar durante el entreno.']]},
    'Pre-entrenos':{serv:'Porción según producto',rows:[['Cafeína','200 mg',1],['Beta-alanina','2 g'],['Citrulina malato','3 g'],['Carbohidratos','1 g'],['Valor energético','5 kcal']],usage:['Disolvé 1 porción en 250–350ml de agua.','Tomá 20–30 min antes de entrenar.','No exceder la dosis diaria recomendada.'],ing:['Cafeína','Beta-alanina','Citrulina malato','Taurina'],ben:[['Energía y foco','Cafeína para potenciar tu entrenamiento.'],['Más bombeo','Citrulina para mejorar la congestión muscular.'],['Menos fatiga','Beta-alanina para sostener la intensidad.'],['Rendimiento','Entrenás más fuerte y por más tiempo.']]},
    'Energía':{serv:'Porción 1 cápsula',rows:[['Cafeína','200 mg',1],['Valor energético','0 kcal'],['Carbohidratos','0 g'],['Sodio','0 mg']],usage:['Tomá 1 cápsula con un vaso de agua.','Ideal 20–30 min antes de entrenar o de la actividad.','No exceder la dosis diaria recomendada.'],ing:['Cafeína anhidra'],ben:[['Energía y foco','Cafeína para activarte cuando lo necesitás.'],['Práctico','Dosis exacta en cápsula.'],['Sin calorías','No suma azúcar ni calorías.'],['Rendimiento','Mayor concentración en el entreno.']]},
    'Quemadores':{serv:'Porción según producto',rows:[['Componente activo','Según fórmula',1],['Valor energético','0 kcal'],['Carbohidratos','0 g'],['Sodio','0 mg']],usage:['Tomá la dosis indicada con un vaso de agua.','Ideal antes de la actividad física.','Acompañá con dieta y entrenamiento.'],ing:['L-Carnitina','CLA','Cafeína','Extractos termogénicos'],ben:[['Apoyo en definición','Complemento para etapas de pérdida de grasa.'],['Más energía','Ayuda a sostener el gasto calórico.'],['Uso práctico','Cápsulas fáciles de dosificar.'],['Sin azúcar','No suma calorías a tu plan.']]},
    'Vitaminas':{serv:'Porción 1 cápsula/comprimido',rows:[['Vitaminas y minerales','Según fórmula',1],['Valor energético','0 kcal'],['Carbohidratos','0 g'],['Sodio','0 mg']],usage:['Tomá 1 porción por día con un vaso de agua.','Preferentemente con una comida.','Sostené el consumo de forma regular.'],ing:['Vitaminas','Minerales','Antioxidantes'],ben:[['Salud y bienestar','Apoya tu sistema inmune y tu energía.'],['Cubre déficits','Aporte de micronutrientes esenciales.'],['Uso diario','Práctico y fácil de incorporar.'],['Calidad garantizada','Producto original y certificado.']]},
    'Hidratación':{serv:'Porción según rinde',rows:[['Sodio','Según fórmula',1],['Potasio','Según fórmula'],['Magnesio','Según fórmula'],['Carbohidratos','Según fórmula'],['Valor energético','Según fórmula']],usage:['Disolvé la porción indicada en agua según el rinde.','Tomá durante la actividad física prolongada.','Ideal para reponer electrolitos.'],ing:['Electrolitos','Sodio','Potasio','Magnesio'],ben:[['Hidratación','Repone líquidos y electrolitos.'],['Más resistencia','Sostiene el rendimiento en esfuerzos largos.'],['Rinde mucho','Una compra rinde varios litros.'],['Refrescante','Sabores ideales para entrenar.']]},
    'Recuperación':{serv:'Porción según producto',rows:[['Componente principal','Según fórmula',1],['Valor energético','Según fórmula'],['Carbohidratos','Según fórmula'],['Sodio','Según fórmula']],usage:['Tomá la porción indicada según el producto.','Ideal antes de dormir o en el post-entreno.','Sostené el consumo de forma regular.'],ing:['Colágeno / Magnesio / Glutamina','Vitaminas','Minerales'],ben:[['Mejor recuperación','Favorece la reparación muscular y articular.'],['Descanso','Apoya la calidad del descanso.'],['Articulaciones','Cuida tus articulaciones y tejidos.'],['Uso diario','Práctico de incorporar a tu rutina.']]},
    'Barras':{serv:'Por barra',rows:[['Valor energético','200 kcal'],['Proteínas','20 g',1],['Carbohidratos','18 g'],['de los cuales azúcares','2 g'],['Grasas totales','7 g']],usage:['Consumí 1 barra como snack proteico.','Ideal entre comidas o en el post-entreno.','Práctica para llevar a cualquier lado.'],ing:['Proteína de suero','Colágeno','Cobertura sabor','Edulcorantes'],ben:[['20g de proteína','Snack proteico práctico y rico.'],['Para llevar','La llevás a cualquier lado.'],['Baja en azúcar','Apta para tu plan.'],['Saciante','Ideal para cortar el hambre.']]},
    'Salud y Bienestar':{serv:'Porción 1 cápsula',rows:[['Componente activo','Según fórmula',1],['Valor energético','0 kcal'],['Carbohidratos','0 g']],usage:['Tomá 1 porción por día con agua.','Seguí las indicaciones del envase.','Sostené el consumo de forma regular.'],ing:['Activo principal','Excipientes de calidad'],ben:[['Bienestar','Apoya tu salud general.'],['Calidad','Producto original y certificado.'],['Uso diario','Fácil de incorporar.'],['Confianza','Marca reconocida del mercado.']]}
  };
  return M[c]||{serv:'—',rows:[['Producto','Accesorio deportivo',1]],usage:['Lavá antes del primer uso.','Apto para tus batidos y suplementos.','No apto para microondas.'],ing:['Libre de BPA','Material resistente'],ben:[['Práctico','Ideal para tus batidos diarios.'],['Resistente','Material de calidad y durable.'],['Hermético','Cierre seguro anti-derrames.'],['Fácil de limpiar','Mantenimiento simple.']]};
}
function fillInfo(p){
  var P=nutriProfile(p.cat);
  var serv=qs('#pd-nutri-serv'); if(serv) serv.textContent=P.serv;
  var rowsEl=qs('#pd-nutri-rows'); if(rowsEl){ rowsEl.innerHTML=P.rows.map(function(r){return '<div class="nutri-row'+(r[2]?' hl':'')+'"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>';}).join(''); }
  var us=qs('#pd-usage'); if(us){ us.innerHTML=P.usage.map(function(t,i){return '<div class="step"><div class="n">'+(i+1)+'</div><div class="tx">'+t+'</div></div>';}).join(''); }
  var ing=qs('#pd-ingredients'); if(ing){ ing.innerHTML=P.ing.map(function(t){return '<span>'+t+'</span>';}).join(''); }
  var ben=qs('#pd-benefits'); if(ben){ ben.innerHTML=P.ben.map(function(b){return '<div style="display:flex;gap:14px;align-items:flex-start"><div class="ic" style="flex:none;width:44px;height:44px;border-radius:12px;background:rgba(124,255,79,.1);border:1px solid rgba(124,255,79,.22);display:flex;align-items:center;justify-content:center;color:var(--green)">'+svg('<path d="M5 12l5 5L20 7"></path>',22)+'</div><div><b style="font-family:var(--display);font-size:15px;display:block;margin-bottom:4px">'+b[0]+'</b><span class="muted" style="font-size:12.5px;line-height:1.5">'+b[1]+'</span></div></div>';}).join(''); }
  if(p.cat==='Accesorios'){ var nu=qs('#pd-nutri'); if(nu) nu.style.display='none'; }
}

/* CART PAGE (carrito.html) */
function initCartPage(){
  var root=qs('#cart-page'); if(!root) return;
  window.__renderCartPage=function(){
    var list=qs('#cart-list'), c=loadCart();
    if(!c.length){ list.innerHTML='<div class="cart-empty" style="padding:80px 10px"><div class="ic">'+svg('<path d="M6 6h15l-1.5 9h-12z"></path><circle cx="9" cy="20" r="1.4"></circle><circle cx="18" cy="20" r="1.4"></circle>',28)+'</div><b>Tu carrito está vacío</b><div style="font-size:14px;margin-bottom:18px">Descubrí los mejores suplementos del mercado.</div><a href="productos.html" class="btn btn-primary">Ver catálogo</a></div>';
      qs('#cart-summary').style.display='none'; return; }
    qs('#cart-summary').style.display='';
    list.innerHTML='';
    c.forEach(function(i){
      var p=byId(i.id); if(!p)return;
      var row=el('div','cart-item'); row.style.padding='18px 0';
      row.innerHTML=
        '<div class="thumb" style="width:84px;height:84px"><img src="'+p.img+'" alt=""></div>'+
        '<div style="flex:1;min-width:0"><div class="nm" style="font-size:15px">'+p.name+'</div><div class="fl">'+p.flavor+' · '+p.brand+'</div>'+
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:6px">'+
          '<div class="qty"><button data-dec="'+p.id+'">−</button><span>'+i.qty+'</span><button data-inc="'+p.id+'">+</button></div>'+
          '<div class="line-price" style="font-size:17px">'+money(cardPrice(p)*i.qty)+'</div></div></div>'+
        '<button class="remove" data-rm="'+p.id+'">'+svg('<path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13"></path>',18)+'</button>';
      list.appendChild(row);
    });
    var sub=cartSubtotal();
    qs('#cart-subtotal').textContent=money(sub);
    qs('#cart-ship').textContent= sub>=160000 ? 'Gratis' : 'Se calcula en el checkout';
    qs('#cart-total').textContent= money(sub);
  };
  window.__renderCartPage();
}

/* CHECKOUT (checkout.html) */
function initCheckout(){
  var root=qs('#checkout-page'); if(!root) return;
  window.__renderCheckout=function(){
    var box=qs('#checkout-items'), c=loadCart();
    box.innerHTML='';
    c.forEach(function(i){ var p=byId(i.id); if(!p)return;
      var row=el('div','summary-item');
      row.innerHTML='<div class="th"><img src="'+p.img+'" alt=""></div><div style="flex:1;min-width:0"><div style="font-family:var(--display);font-weight:600;font-size:13px">'+p.name+'</div><div style="font-size:11.5px;color:var(--muted2)">'+i.qty+' × '+money(cardPrice(p))+'</div></div><div style="font-family:var(--display);font-weight:700;font-size:13px">'+money(cardPrice(p)*i.qty)+'</div>';
      box.appendChild(row);
    });
    var sub=cartSubtotal(), ship=shipCost(sub);
    var active=qs('.pay-opt.active'); var disc=(active&&active.getAttribute('data-discount'))?(sub-cartSubtotalTransfer()):0;
    qs('#co-subtotal').textContent=money(sub);
    var dRow=qs('#co-discount-row'); if(dRow){ dRow.style.display=disc?'':'none'; var dEl=qs('#co-discount'); if(dEl)dEl.textContent='−'+money(disc); }
    qs('#co-ship').textContent = isPickup() ? 'Retiro en local' : (sub>=160000 ? 'Gratis' : (ship===null ? 'Seleccioná tu zona' : money(ship)));
    qs('#co-total').textContent=money(sub-disc+(ship||0));
  };
  function isPickup(){ var sel=qs('#ship-method'); return sel && sel.value==='retiro'; }
  function shipCost(sub){
    if(isPickup()) return 0;
    if(sub>=160000) return 0;
    var zoneSel=qs('#ship-zone');
    if(!zoneSel || !zoneSel.value) return null;
    return parseInt(zoneSel.value,10)||0;
  }
  function toggleZoneField(){
    var wrap=qs('#ship-zone-wrap'); if(!wrap) return;
    wrap.style.display = isPickup() ? 'none' : '';
    var zoneSel=qs('#ship-zone'); if(zoneSel) zoneSel.required = !isPickup();
  }
  var shipSel=qs('#ship-method'); if(shipSel) shipSel.addEventListener('change', function(){ toggleZoneField(); window.__renderCheckout(); });
  var zoneSel=qs('#ship-zone'); if(zoneSel) zoneSel.addEventListener('change', window.__renderCheckout);
  toggleZoneField();
  window.__renderCheckout();
  function syncPayButton(){
    var btn=qs('#checkout-form button[type=submit]'); if(!btn) return;
    var active=qs('.pay-opt.active');
    btn.textContent = (active && active.getAttribute('data-online')) ? 'Pagar con tarjeta' : 'Confirmar pedido';
  }
  // payment selection
  qsa('.pay-opt').forEach(function(o){ o.addEventListener('click',function(){ qsa('.pay-opt').forEach(function(x){x.classList.remove('active');}); o.classList.add('active'); var r=o.querySelector('input'); if(r)r.checked=true; window.__renderCheckout(); syncPayButton(); }); });
  syncPayButton();
  // submit
  var form=qs('#checkout-form');
  if(form){ form.addEventListener('submit',function(e){ e.preventDefault();
    var cart=loadCart();
    if(!cart.length){ toast('Tu carrito está vacío'); return; }
    if(!isPickup() && cartSubtotal()<160000 && shipCost(cartSubtotal())===null){ toast('Seleccioná tu zona de envío'); return; }
    var active=qs('.pay-opt.active');
    var isOnline = active && active.getAttribute('data-online');

    // ---- PAGO ONLINE CON TARJETA (Mercado Pago) ----
    if(isOnline){
      var btn=qs('#checkout-form button[type=submit]');
      if(btn){ btn.disabled=true; btn.textContent='Redirigiendo a Mercado Pago…'; }
      fetch('api/crear-preferencia.php', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ cart: cart, pickup: isPickup(), shipPrice: shipCost(cartSubtotal()) })
      }).then(function(r){ return r.json(); }).then(function(d){
        if(d && d.init_point){ window.location.href = d.init_point; }
        else { throw new Error((d && d.error) || 'Error'); }
      }).catch(function(){
        if(btn){ btn.disabled=false; btn.textContent='Pagar con tarjeta'; }
        // Respaldo: si el backend no está disponible, cerrar por WhatsApp
        var orderNo='#MUT-2026-'+Math.floor(1000+Math.random()*9000);
        var sub=cartSubtotal(), ship=shipCost(sub)||0, total=sub+ship;
        var msg='*Nuevo pedido Mutants* '+orderNo+'\n\n';
        cart.forEach(function(i){ var p=byId(i.id); if(p) msg+='• '+i.qty+'x '+p.name+' ('+p.flavor+') — '+money(cardPrice(p)*i.qty)+'\n'; });
        msg+='\nEnvío: '+(ship?money(ship):'Gratis')+'\nPago: Tarjeta\n*Total: '+money(total)+'*';
        toast('Te derivamos a WhatsApp para coordinar el pago.');
        window.open(waLink(msg), '_blank');
      });
      return;
    }

    // ---- TRANSFERENCIA / EFECTIVO (cierre por WhatsApp) ----
    var orderNo='#MUT-2026-'+Math.floor(1000+Math.random()*9000);
    var sub=cartSubtotal(), ship=shipCost(sub)||0;
    var disc=(active&&active.getAttribute('data-discount'))?(sub-cartSubtotalTransfer()):0;
    var total=sub-disc+ship;
    var paySel=qs('.pay-opt.active b'); var payName=paySel?paySel.textContent:'A coordinar';
    var msg='*Nuevo pedido Mutants* '+orderNo+'\n\n';
    cart.forEach(function(i){ var p=byId(i.id); if(p) msg+='• '+i.qty+'x '+p.name+' ('+p.flavor+') — '+money(cardPrice(p)*i.qty)+'\n'; });
    msg+='\nEnvío: '+(ship?money(ship):'Gratis')+(disc?('\nDescuento 10% (transf./efectivo): −'+money(disc)):'')+'\nPago: '+payName+'\n*Total: '+money(total)+'*';
    var waEl=qs('#wa-order'); if(waEl) waEl.href=waLink(msg);
    var onEl=qs('#order-no'); if(onEl) onEl.textContent=orderNo;
    var done=qs('#checkout-done'), main=qs('#checkout-main');
    if(done&&main){ main.style.display='none'; done.style.display='block'; window.scrollTo({top:0,behavior:'smooth'}); saveCart([]); syncCartUI(); }
  }); }
}

/* CONTACT (contacto.html) */
function initContact(){
  var form=qs('#contact-form'); if(!form) return;
  form.addEventListener('submit',function(e){ e.preventDefault();
    var ok=qs('#contact-ok'); if(ok){ form.style.display='none'; ok.style.display='block'; }
  });
}

/* NEWSLETTER (any page) */
function initNewsletter(){
  qsa('[data-newsletter]').forEach(function(f){ f.addEventListener('submit',function(e){ e.preventDefault(); toast('¡Listo! Revisá tu mail para el 10% OFF'); f.reset(); }); });
}

/* ---------------- BOOT ---------------- */
document.addEventListener('DOMContentLoaded', function(){
  syncCartUI(); initReveal(); initWhatsApp(); initNewsletter(); initNav();
  var page=document.body.getAttribute('data-page');
  if(page==='home') initHome();
  else if(page==='catalog') initCatalog();
  else if(page==='product') initProduct();
  else if(page==='cart') initCartPage();
  else if(page==='checkout') initCheckout();
  else if(page==='contact') initContact();
});

/* expose a few for inline use if needed */
window.MUTANTS = { addToCart:addToCart, money:money, waLink:waLink };
})();
