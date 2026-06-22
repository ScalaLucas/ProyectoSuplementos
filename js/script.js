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
  {id:'mm-van', name:'Mutant Mass 5KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Vainilla · 55 tomas', price:99000, rating:4.9, reviews:212, badge:'MÁS VENDIDO', pop:99, img:IMG+'mutant-mass-vanilla.jpeg'},
  {id:'mm-str', name:'Mutant Mass 1.53KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Frutilla · 17 tomas', price:38300, rating:4.8, reviews:96, pop:74, img:IMG+'mutant-mass-strawberry.jpeg'},
  {id:'mm-cho', name:'Mutant Mass 5KG', brand:'Star Nutrition', cat:'Ganadores de masa', goal:'Volumen', flavor:'Chocolate suizo', price:99000, rating:4.9, reviews:187, pop:95, img:IMG+'mutant-mass-chocolate.jpeg'},
  {id:'bcaa-grn', name:'MTOR BCAA', brand:'Star Nutrition', cat:'Aminoácidos', goal:'Recuperación', flavor:'Green Lemonade · 20 serv', price:24000, rating:4.9, reviews:143, pop:88, img:IMG+'mtor-bcaa-green.jpeg'},
  {id:'bcaa-fr', name:'MTOR BCAA', brand:'Star Nutrition', cat:'Aminoácidos', goal:'Recuperación', flavor:'Frutos Rojos · 20 serv', price:24000, rating:4.7, reviews:88, pop:70, img:IMG+'mtor-bcaa-frutos.jpeg'},
  {id:'bcaa-sl', name:'MTOR BCAA', brand:'Star Nutrition', cat:'Aminoácidos', goal:'Recuperación', flavor:'Frutilla–Lima · 20 serv', price:24000, rating:4.8, reviews:67, pop:65, img:IMG+'mtor-bcaa-strawberry.jpeg'},
  {id:'crea-300', name:'Creatine Monohydrate 300G', brand:'Star Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 60 serv', price:23000, rating:4.9, reviews:320, badge:'TOP', pop:98, img:IMG+'creatine-300.jpeg'},
  {id:'crea-1k', name:'Creatine Monohydrate 1KG', brand:'Star Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 200 serv', price:71000, rating:4.9, reviews:110, pop:80, img:IMG+'creatine-1000.jpeg'},
  {id:'crea-bag', name:'Creatine Monohydrate 300G', brand:'Star Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Frutos Rojos · 60 serv', price:23000, rating:4.8, reviews:74, pop:72, img:IMG+'creatine-bag.jpeg'},
  {id:'col-fr', name:'Collagen Hidrolizado', brand:'Star Nutrition', cat:'Recuperación', goal:'Recuperación', flavor:'Frutos Rojos · 210g', price:16000, rating:4.8, reviews:74, pop:68, img:IMG+'collagen-frutos.jpeg'},
  {id:'col-pl', name:'Collagen Plus', brand:'Star Nutrition', cat:'Recuperación', goal:'Recuperación', flavor:'Limón · 360g', price:18600, rating:4.7, reviews:51, pop:60, img:IMG+'collagen-plus-limon.jpeg'},
  {id:'mag', name:'Citrato de Magnesio', brand:'Star Nutrition', cat:'Recuperación', goal:'Recuperación', flavor:'Frutos Rojos · 500g', price:24000, rating:4.8, reviews:129, pop:75, img:IMG+'magnesio.jpeg'},
  {id:'hyd-li', name:'Hydro Plus Endurance', brand:'Star Nutrition', cat:'Aminoácidos', goal:'Resistencia', flavor:'Lima Limón · rinde 10L', price:16000, rating:4.6, reviews:42, pop:55, img:IMG+'hydro-plus-lima.jpeg'},
  {id:'hyd-bl', name:'Hydro Plus Endurance', brand:'Star Nutrition', cat:'Aminoácidos', goal:'Resistencia', flavor:'Blue Raz · rinde 10L', price:16000, rating:4.7, reviews:38, pop:54, img:IMG+'hydro-plus-bluraz.jpeg'},
  {id:'caf', name:'Caffeine 200', brand:'ENA', cat:'Pre-entrenos', goal:'Energía', flavor:'200mg · 30 cápsulas', price:8300, rating:4.9, reviews:156, badge:'TOP', pop:90, img:IMG+'caffeine-200.jpeg'},
  {id:'cla', name:'CLA 1000', brand:'Star Nutrition', cat:'Quemadores', goal:'Definición', flavor:'90 cápsulas', price:20000, rating:4.5, reviews:63, pop:58, img:IMG+'cla-1000.jpeg'},
  {id:'lcar', name:'L-Carnitine 1000', brand:'Star Nutrition', cat:'Quemadores', goal:'Definición', flavor:'60 comprimidos', price:12500, rating:4.6, reviews:71, pop:62, img:IMG+'l-carnitine.jpeg'},
  {id:'plant', name:'Just Plant Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Definición', flavor:'Vegana · 2LB · 30 serv', price:35000, rating:4.7, reviews:45, badge:'NUEVO', pop:66, img:IMG+'plant-protein.jpeg'},
  {id:'multi', name:'Multivitamin All In One', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'60 comprimidos', price:18000, rating:4.8, reviews:98, pop:78, img:IMG+'multivitamin.jpeg'},
  {id:'iron', name:'IRON Multivitamin Pack', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'Fruit Punch · 44 serv', price:85000, rating:4.7, reviews:52, pop:64, img:IMG+'iron-pack.jpeg'},

  /* ===== ENA ===== */
  {id:'ena-whey-cho', name:'Truemade Whey Protein', brand:'ENA', cat:'Proteínas', goal:'Volumen', flavor:'Double Rich Chocolate · 930g', price:65500, rating:4.9, reviews:176, badge:'NUEVO', pop:92, img:IMG+'ena-whey-chocolate.jpeg'},
  {id:'ena-whey-van', name:'Truemade Whey Protein', brand:'ENA', cat:'Proteínas', goal:'Volumen', flavor:'Vanilla Ice Cream · 930g', price:65500, rating:4.8, reviews:131, pop:86, img:IMG+'ena-whey-vainilla.jpeg'},
  {id:'ena-whey-fru', name:'Truemade Whey Protein', brand:'ENA', cat:'Proteínas', goal:'Volumen', flavor:'Strawberry Milkshake · 930g', price:65500, rating:4.8, reviews:98, pop:80, img:IMG+'ena-whey-frutilla.jpeg'},
  {id:'ena-whey-coo', name:'Truemade Whey Protein', brand:'ENA', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 930g', price:65500, rating:4.9, reviews:142, pop:88, img:IMG+'ena-whey-cookies.jpeg'},
  {id:'ena-um-cho', name:'Ultra Mass Weight Gainer', brand:'ENA', cat:'Ganadores de masa', goal:'Volumen', flavor:'Double Rich Chocolate · 1.5kg', price:43000, rating:4.7, reviews:64, pop:75, img:IMG+'ena-ultramass-chocolate.jpeg'},
  {id:'ena-um-van', name:'Ultra Mass Weight Gainer', brand:'ENA', cat:'Ganadores de masa', goal:'Volumen', flavor:'Vanilla Ice Cream · 1.5kg', price:43000, rating:4.7, reviews:51, pop:72, img:IMG+'ena-ultramass-vainilla.jpeg'},
  {id:'ena-pw-fp', name:'Pre War Pre-Workout', brand:'ENA', cat:'Pre-entrenos', goal:'Energía', flavor:'Fruit Punch · 400g', price:27500, rating:4.8, reviews:89, badge:'TOP', pop:90, img:IMG+'ena-prewar-fruitpunch.jpeg'},
  {id:'ena-pw-lem', name:'Pre War Pre-Workout', brand:'ENA', cat:'Pre-entrenos', goal:'Energía', flavor:'Lemonade · 400g', price:27500, rating:4.7, reviews:62, pop:78, img:IMG+'ena-prewar-lemonade.jpeg'},
  {id:'ena-crea-1k', name:'Creatina Monohidrato', brand:'ENA', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 1000g · 200 serv', price:72000, rating:4.9, reviews:120, pop:84, img:IMG+'ena-creatina-1000.jpeg'},
  {id:'ena-crea-fp', name:'Creatina Monohidrato', brand:'ENA', cat:'Creatinas', goal:'Fuerza', flavor:'Fruit Punch · 300g', price:24000, rating:4.8, reviews:77, pop:70, img:IMG+'ena-creatina-fruitpunch.jpeg'},
  {id:'ena-crea-nar', name:'Creatina Monohidrato', brand:'ENA', cat:'Creatinas', goal:'Fuerza', flavor:'Naranja · 342g', price:24000, rating:4.8, reviews:58, pop:68, img:IMG+'ena-creatina-naranja.jpeg'},
  {id:'ena-col', name:'Colágeno Sport', brand:'ENA', cat:'Recuperación', goal:'Recuperación', flavor:'Naranja · 407g', price:28000, rating:4.7, reviews:49, pop:62, img:IMG+'ena-colageno-sport.jpeg'},
  {id:'ena-mag-c', name:'Magnesio Citrato', brand:'ENA', cat:'Recuperación', goal:'Recuperación', flavor:'60 cápsulas', price:13000, rating:4.8, reviews:96, pop:73, img:IMG+'ena-magnesio-caps.jpeg'},
  {id:'ena-mag-p', name:'Citrato de Magnesio Polvo', brand:'ENA', cat:'Recuperación', goal:'Recuperación', flavor:'Lemonade · 192g', price:16400, rating:4.7, reviews:54, pop:64, img:IMG+'ena-magnesio-polvo.jpeg'},
  {id:'ena-multi', name:'Multivitamin', brand:'ENA', cat:'Vitaminas', goal:'Salud', flavor:'Con cafeína · 60 comp', price:17000, rating:4.8, reviews:88, pop:74, img:IMG+'ena-multivitamin.jpeg'},
  {id:'ena-zma', name:'ZMA', brand:'ENA', cat:'Recuperación', goal:'Recuperación', flavor:'Zinc + Magnesio + B6 · 60 caps', price:13000, rating:4.7, reviews:43, pop:60, img:IMG+'ena-zma.jpeg'},
  {id:'ena-caf', name:'Cafeína 200', brand:'ENA', cat:'Pre-entrenos', goal:'Energía', flavor:'200mg · 60 cápsulas', price:11500, rating:4.8, reviews:71, pop:76, img:IMG+'ena-cafeina.jpeg'},

  /* ===== GOLD NUTRITION ===== */
  {id:'gold-whey-cho', name:'Whey Protein', brand:'Gold Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate', price:58000, rating:4.8, reviews:104, pop:85, img:IMG+'gold-whey-chocolate.jpeg'},
  {id:'gold-whey-coo', name:'Whey Protein', brand:'Gold Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream', price:58000, rating:4.8, reviews:79, pop:79, img:IMG+'gold-whey-cookies.jpeg'},
  {id:'gold-whey-fru', name:'Whey Protein', brand:'Gold Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Frutilla', price:58000, rating:4.7, reviews:66, pop:75, img:IMG+'gold-whey-frutilla.jpeg'},
  {id:'gold-crea', name:'Creatine Monohydrate', brand:'Gold Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 300g', price:21000, rating:4.8, reviews:91, pop:80, img:IMG+'gold-creatine.jpeg'},
  {id:'gold-creapure', name:'Creatine Creapure®', brand:'Gold Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Premium · sin sabor', price:29500, rating:4.9, reviews:58, badge:'PREMIUM', pop:82, img:IMG+'gold-creapure.jpeg'},
  {id:'gold-testo', name:'Testo Gold', brand:'Gold Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'Testosterona natural · caps', price:26800, rating:4.6, reviews:37, pop:58, img:IMG+'gold-testo.jpeg'},
  {id:'gold-mag', name:'Magnesium Citrate', brand:'Gold Nutrition', cat:'Recuperación', goal:'Recuperación', flavor:'Caps', price:15000, rating:4.7, reviews:48, pop:62, img:IMG+'gold-magnesio.jpeg'},
  {id:'gold-omega3', name:'Omega 3 Fish Oil', brand:'Gold Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'Caps', price:25500, rating:4.7, reviews:55, pop:66, img:IMG+'gold-omega3.jpeg'},

  /* ===== ONE FIT NUTRITION ===== */
  {id:'onefit-crea', name:'Poweraded Creatine Micronized', brand:'One Fit Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 500g', price:24000, rating:4.7, reviews:62, pop:72, img:IMG+'onefit-creatine.jpeg'},
  {id:'onefit-whey', name:'Classic Whey Protein', brand:'One Fit Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'2LB', price:31500, rating:4.7, reviews:54, pop:70, img:IMG+'onefit-whey.jpeg'},
  {id:'onefit-mag', name:'Citrato de Magnesio', brand:'One Fit Nutrition', cat:'Recuperación', goal:'Recuperación', flavor:'450g', price:17000, rating:4.7, reviews:41, pop:60, img:IMG+'onefit-magnesio.jpeg'},
  {id:'onefit-omega3', name:'Daily Omega 3', brand:'One Fit Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'Caps', price:18000, rating:4.6, reviews:38, pop:58, img:IMG+'onefit-omega3.jpeg'},
  {id:'onefit-fric', name:'Friction 3.2 Pre-Workout', brand:'One Fit Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Explosive Energy', price:18000, rating:4.7, reviews:47, pop:74, img:IMG+'onefit-friction.jpeg'},
  {id:'onefit-multi', name:'Multi + Vitamins', brand:'One Fit Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'Caps', price:11500, rating:4.7, reviews:44, pop:62, img:IMG+'onefit-multivitamins.jpeg'},
  {id:'onefit-crea-200', name:'Poweraded Creatine Micronized', brand:'One Fit Nutrition', cat:'Creatinas', goal:'Fuerza', flavor:'Sin sabor · 200g · 40 serv', price:12000, rating:4.7, reviews:48, pop:67, img:IMG+'onefit-creatine-200.jpeg'},
  {id:'onefit-mag-150', name:'Citrato de Magnesio', brand:'One Fit Nutrition', cat:'Recuperación', goal:'Recuperación', flavor:'150g · 60 serv', price:8000, rating:4.7, reviews:36, pop:56, img:IMG+'onefit-magnesio-150.jpeg'},

  /* ===== LEGUILAB ===== */
  {id:'legui-aza', name:'Azafrán + Vitamina B6', brand:'Leguilab', cat:'Vitaminas', goal:'Salud', flavor:'Health & Care · caps', price:25000, rating:4.7, reviews:33, badge:'NUEVO', pop:56, img:IMG+'leguilab-azafran.jpeg'},
  {id:'legui-zinc', name:'Bisglicinato de Zinc', brand:'Leguilab', cat:'Vitaminas', goal:'Salud', flavor:'60 cápsulas vegetales', price:25000, rating:4.7, reviews:41, pop:58, img:IMG+'leguilab-zinc.jpeg'},

  /* ===== MERVICK LAB ===== */
  {id:'mervick-fram', name:'Whey Protein Bar', brand:'Mervick Lab', cat:'Barras', goal:'Definición', flavor:'Frambuesa · 65g · caja x12', price:24000, rating:4.6, reviews:52, pop:68, img:IMG+'mervick-bar-frambuesa.jpeg'},
  {id:'mervick-ban', name:'Whey Protein Bar', brand:'Mervick Lab', cat:'Barras', goal:'Definición', flavor:'Banana · 46g · caja x12', price:19000, rating:4.6, reviews:47, pop:66, img:IMG+'mervick-bar-banana.jpeg'},

  /* ===== ULTIMATE NUTRITION ===== */
  {id:'ult-mela', name:'Melatonin 3mg', brand:'Ultimate Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'60 cápsulas', price:23500, rating:4.8, reviews:73, pop:70, img:IMG+'ultimate-melatonin.jpeg'},

  /* ===== XBODY EVOLUTION ===== */
  {id:'xbody-crea', name:'Creatine Micronized', brand:'XBody Evolution', cat:'Creatinas', goal:'Fuerza', flavor:'5000mg · 300g · 60 serv', price:16500, rating:4.7, reviews:60, pop:71, img:IMG+'xbody-creatine.jpeg'},

  /* ===== INNOVA NATURALS ===== */
  {id:'innova-b12', name:'Vitamina B12', brand:'Innova Naturals', cat:'Vitaminas', goal:'Salud', flavor:'Metilcobalamina · caps', price:20000, rating:4.7, reviews:39, pop:57, img:IMG+'innova-b12.jpeg'},
  {id:'innova-mag', name:'Citrato de Magnesio', brand:'Innova Naturals', cat:'Recuperación', goal:'Recuperación', flavor:'Caps', price:19000, rating:4.7, reviews:35, pop:55, img:IMG+'innova-magnesio.jpeg'},

  /* ===== STAR NUTRITION — Proteínas (nuevas) ===== */
  {id:'star-whey-van', name:'Whey Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Vainilla Ice Cream · 908g · 2LB', price:52500, rating:4.9, reviews:240, badge:'MÁS VENDIDO', pop:97, img:IMG+'star-whey-vainilla.jpeg'},
  {id:'star-whey-cho', name:'Whey Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate Suizo · 908g · 2LB', price:52500, rating:4.9, reviews:218, pop:96, img:IMG+'star-whey-chocolate.jpeg'},
  {id:'star-whey-coo', name:'Whey Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 908g · 2LB', price:52500, rating:4.9, reviews:172, pop:90, img:IMG+'star-whey-cookies.jpeg'},
  {id:'star-whey-fru', name:'Whey Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Strawberry Cream · 908g · 2LB', price:52500, rating:4.8, reviews:121, pop:84, img:IMG+'star-whey-frutilla.jpeg'},
  {id:'star-whey-ban', name:'Whey Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Banana Cream · 908g · 2LB', price:52500, rating:4.8, reviews:104, pop:82, img:IMG+'star-whey-banana.jpeg'},
  {id:'star-plat-cho', name:'Platinum Whey Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate Suizo · 908g · 2LB', price:56000, rating:4.9, reviews:156, badge:'PREMIUM', pop:91, img:IMG+'star-platinum-chocolate.jpeg'},
  {id:'star-plat-van', name:'Platinum Whey Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Vanilla Ice Cream · 908g · 2LB', price:56000, rating:4.9, reviews:132, pop:88, img:IMG+'star-platinum-vainilla.jpeg'},
  {id:'star-plat-coo', name:'Platinum Whey Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 908g · 2LB', price:56000, rating:4.8, reviews:98, pop:83, img:IMG+'star-platinum-cookies.jpeg'},
  {id:'star-plat-fru', name:'Platinum Whey Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Strawberry Cream · 908g · 2LB', price:56000, rating:4.8, reviews:76, pop:78, img:IMG+'star-platinum-frutilla.jpeg'},
  {id:'star-plat-ban', name:'Platinum Whey Protein', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Banana Cream · 908g · 2LB', price:56000, rating:4.8, reviews:69, pop:76, img:IMG+'star-platinum-banana.jpeg'},
  {id:'star-plat3k-cho', name:'Platinum Whey Protein 3KG', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate Suizo · 3KG · 100 serv', price:162000, rating:4.9, reviews:64, badge:'PACK PRO', pop:80, img:IMG+'star-platinum3k-chocolate.jpeg'},
  {id:'star-plat3k-van', name:'Platinum Whey Protein 3KG', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Vanilla Ice Cream · 3KG · 100 serv', price:162000, rating:4.9, reviews:51, pop:77, img:IMG+'star-platinum3k-vainilla.jpeg'},
  {id:'star-plat3k-coo', name:'Platinum Whey Protein 3KG', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 3KG · 100 serv', price:162000, rating:4.8, reviews:43, pop:74, img:IMG+'star-platinum3k-cookies.jpeg'},
  {id:'star-plat3k-fru', name:'Platinum Whey Protein 3KG', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Strawberry Cream · 3KG · 100 serv', price:162000, rating:4.8, reviews:38, pop:71, img:IMG+'star-platinum3k-frutilla.jpeg'},
  {id:'star-plat3k-ban', name:'Platinum Whey Protein 3KG', brand:'Star Nutrition', cat:'Proteínas', goal:'Volumen', flavor:'Banana Cream · 3KG · 100 serv', price:162000, rating:4.8, reviews:35, pop:70, img:IMG+'star-platinum3k-banana.jpeg'},

  /* ===== STAR NUTRITION — Pre-entrenos / Quemadores / Vitaminas (nuevos) ===== */
  {id:'star-v8-lima', name:'Pump V8 Next Gen', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Citrus Slush (Lima) · 285g · 30 serv', price:26000, rating:4.8, reviews:118, badge:'TOP', pop:92, img:IMG+'star-v8-lima.jpeg'},
  {id:'star-v8-sand', name:'Pump V8 Next Gen', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Watermelon (Sandía) · 285g · 30 serv', price:26000, rating:4.8, reviews:97, pop:88, img:IMG+'star-v8-sandia.jpeg'},
  {id:'star-v8-uva', name:'Pump V8 Next Gen', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Grape Attack (Uva) · 285g · 30 serv', price:26000, rating:4.7, reviews:81, pop:85, img:IMG+'star-v8-uva.jpeg'},
  {id:'star-v8-acai', name:'Pump V8 Next Gen', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Energía', flavor:'Açaí Power · 285g · 30 serv', price:26000, rating:4.8, reviews:73, pop:84, img:IMG+'star-v8-acai.jpeg'},
  {id:'star-3d-fl', name:'Pump 3Di Ripped', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Definición', flavor:'Strawberry Lime · 315g · 45 serv', price:30500, rating:4.8, reviews:64, pop:82, img:IMG+'star-3dripped-frutillalima.jpeg'},
  {id:'star-3d-lem', name:'Pump 3Di Ripped', brand:'Star Nutrition', cat:'Pre-entrenos', goal:'Definición', flavor:'Lemonade · 315g · 45 serv', price:30500, rating:4.7, reviews:52, pop:79, img:IMG+'star-3dripped-limonada.jpeg'},
  {id:'star-thermo', name:'Thermo Fuel Max', brand:'Star Nutrition', cat:'Quemadores', goal:'Definición', flavor:'120 cápsulas · 30 serv', price:18500, rating:4.6, reviews:58, pop:64, img:IMG+'star-thermofuel.jpeg'},
  {id:'star-glut', name:'L-Glutamine', brand:'Star Nutrition', cat:'Recuperación', goal:'Recuperación', flavor:'100% micronizada · 300g · 60 serv', price:24500, rating:4.8, reviews:71, pop:70, img:IMG+'star-glutamine.jpeg'},
  {id:'star-hmb', name:'HMB Strength & Recovery', brand:'Star Nutrition', cat:'Recuperación', goal:'Fuerza', flavor:'180 cápsulas · 90 serv', price:22500, rating:4.7, reviews:44, pop:62, img:IMG+'star-hmb.jpeg'},
  {id:'star-resv', name:'Resveratrol 500', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'100% natural · 60 cápsulas', price:18500, rating:4.7, reviews:39, pop:58, img:IMG+'star-resveratrol.jpeg'},
  {id:'star-vitc', name:'Vitamina C', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'60 cápsulas', price:8500, rating:4.8, reviews:86, pop:72, img:IMG+'star-vitaminac.jpeg'},
  {id:'star-k2d3', name:'Vitaminas K2 + D3', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'60 cápsulas', price:19500, rating:4.8, reviews:63, pop:68, img:IMG+'star-k2d3.jpeg'},
  {id:'star-omega3', name:'Omega 3 Fish Oil', brand:'Star Nutrition', cat:'Vitaminas', goal:'Salud', flavor:'1000mg · 60 cápsulas', price:26500, rating:4.8, reviews:91, pop:74, img:IMG+'star-omega3.jpeg'},

  /* ===== STAR / XTRENGHT — Accesorios ===== */
  {id:'star-shk-got', name:'Shaker Got Protein', brand:'Star Nutrition', cat:'Accesorios', goal:'Salud', flavor:'600ml · con resorte mezclador', price:9000, rating:4.7, reviews:54, pop:60, img:IMG+'star-shaker-gotprotein.jpeg'},
  {id:'star-shk-v8', name:'Shaker Pump V8', brand:'Star Nutrition', cat:'Accesorios', goal:'Salud', flavor:'400ml · con compartimento', price:8500, rating:4.7, reviews:41, pop:58, img:IMG+'star-shaker-pumpv8.jpeg'},
  {id:'xt-shk', name:'Shaker Xtrenght', brand:'Xtrenght', cat:'Accesorios', goal:'Salud', flavor:'600ml · con resorte mezclador', price:8500, rating:4.6, reviews:33, pop:55, img:IMG+'xt-shaker.jpeg'},

  /* ===== XTRENGHT — Proteínas / Creatinas / Quemadores (nuevos) ===== */
  {id:'xt-adv-van', name:'Advanced Whey', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Vainilla · 907g · 2LB · 30 serv', price:70000, rating:4.9, reviews:88, badge:'PREMIUM', pop:86, img:IMG+'xt-advanced-vainilla.jpeg'},
  {id:'xt-adv-cho', name:'Advanced Whey', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate · 907g · 2LB · 30 serv', price:70000, rating:4.9, reviews:79, pop:84, img:IMG+'xt-advanced-chocolate.jpeg'},
  {id:'xt-adv-coo', name:'Advanced Whey', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 907g · 2LB', price:70000, rating:4.8, reviews:61, pop:80, img:IMG+'xt-advanced-cookies.jpeg'},
  {id:'xt-adv-ban', name:'Advanced Whey', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Banana · 907g · 2LB · 30 serv', price:70000, rating:4.8, reviews:48, pop:76, img:IMG+'xt-advanced-banana.jpeg'},
  {id:'xt-adv-fru', name:'Advanced Whey', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Frutilla · 907g · 2LB · 30 serv', price:70000, rating:4.8, reviews:52, pop:77, img:IMG+'xt-advanced-frutilla.jpeg'},
  {id:'xt-best-ban', name:'Best Whey', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Banana · 907g · 2LB · 30 serv', price:54500, rating:4.8, reviews:57, pop:78, img:IMG+'xt-best-banana.jpeg'},
  {id:'xt-best-cho', name:'Best Whey', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Chocolate · 907g · 2LB · 30 serv', price:54500, rating:4.8, reviews:66, badge:'OFERTA', pop:81, img:IMG+'xt-best-chocolate.jpeg'},
  {id:'xt-best-coo', name:'Best Whey', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Cookies & Cream · 907g · 2LB', price:54500, rating:4.8, reviews:49, pop:75, img:IMG+'xt-best-cookies.jpeg'},
  {id:'xt-best-fru', name:'Best Whey', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Frutilla · 907g · 2LB · 30 serv', price:54500, rating:4.7, reviews:41, pop:72, img:IMG+'xt-best-frutilla.jpeg'},
  {id:'xt-best-van', name:'Best Whey', brand:'Xtrenght', cat:'Proteínas', goal:'Volumen', flavor:'Vainilla · 907g · 2LB · 30 serv', price:54500, rating:4.8, reviews:55, pop:74, img:IMG+'xt-best-vainilla.jpeg'},
  {id:'xt-crea-500', name:'Creatine Pharmaceutical Grade', brand:'Xtrenght', cat:'Creatinas', goal:'Fuerza', flavor:'Micronizada · 500g · 100 serv', price:30000, rating:4.9, reviews:72, badge:'TOP', pop:85, img:IMG+'xt-creatine-500.jpeg'},
  {id:'xt-crea-250', name:'Creatine Pharmaceutical Grade', brand:'Xtrenght', cat:'Creatinas', goal:'Fuerza', flavor:'Micronizada · 250g · 50 serv', price:18000, rating:4.8, reviews:54, pop:73, img:IMG+'xt-creatine-250.jpeg'},
  {id:'xt-cutter', name:'Cutter Thermogenic Fat Burner', brand:'Xtrenght', cat:'Quemadores', goal:'Definición', flavor:'120 cápsulas · 60 serv', price:14000, rating:4.6, reviews:47, pop:66, img:IMG+'xt-cutter.jpeg'}
];
window.MUTANTS_CATALOG = CATALOG;

var CATEGORIES = ['Proteínas','Ganadores de masa','Creatinas','Aminoácidos','Pre-entrenos','Quemadores','Vitaminas','Recuperación','Barras','Accesorios'];
var CAT_IMG = {'Proteínas':'star-whey-chocolate','Ganadores de masa':'mutant-mass-chocolate','Creatinas':'creatine-300','Aminoácidos':'mtor-bcaa-green','Pre-entrenos':'star-v8-lima','Quemadores':'cla-1000','Vitaminas':'multivitamin','Recuperación':'collagen-frutos','Barras':'mervick-bar-frambuesa','Accesorios':'star-shaker-gotprotein'};
var BRANDS = ['Star Nutrition','ENA','Gold Nutrition','One Fit Nutrition','Xtrenght','Ultimate Nutrition','XBody Evolution','Leguilab','Mervick Lab','Innova Naturals'];
var GOALS = ['Volumen','Fuerza','Definición','Recuperación','Energía','Resistencia','Salud'];

/* ---------------- HELPERS ---------------- */
function money(n){ return '$' + Number(n).toLocaleString('es-AR'); }
function byId(id){ return CATALOG.filter(function(p){return p.id===id;})[0]; }
function qs(s,r){ return (r||document).querySelector(s); }
function qsa(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
function el(tag,cls,html){ var e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }
function svg(p,w){ w=w||20; return '<svg width="'+w+'" height="'+w+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'+p+'</svg>'; }
function waLink(text){ return 'https://wa.me/'+WHATSAPP+(text?('?text='+encodeURIComponent(text)):''); }

/* ---------------- CART (localStorage) ---------------- */
var CART_KEY = 'mutants_cart_v1';
function loadCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||[]; }catch(e){ return []; } }
function saveCart(c){ try{ localStorage.setItem(CART_KEY, JSON.stringify(c)); }catch(e){} }
function cartCount(){ return loadCart().reduce(function(a,i){return a+i.qty;},0); }
function cartSubtotal(){ return loadCart().reduce(function(a,i){var p=byId(i.id);return a+(p?p.price*i.qty:0);},0); }
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
  c.innerHTML =
    '<div class="prod-media">'+
      '<a href="producto.html?id='+p.id+'" style="position:absolute;inset:0;z-index:1"></a>'+
      '<img src="'+p.img+'" alt="'+p.name+'">'+
      (p.badge?'<span class="badge">'+p.badge+'</span>':'')+
      (p.disc?'<span class="disc">-'+p.disc+'%</span>':'')+
    '</div>'+
    '<div class="prod-body">'+
      '<div class="prod-top"><span class="prod-brand">'+p.brand+'</span>'+
        '<span class="prod-rate">★ '+p.rating.toFixed(1)+' <small>('+p.reviews+')</small></span></div>'+
      '<a href="producto.html?id='+p.id+'" class="prod-name">'+p.name+'</a>'+
      '<div class="prod-flavor">'+p.flavor+'</div>'+
      '<div class="prod-foot"><div>'+
        (p.old?'<div class="price-old">'+money(p.old)+'</div>':'')+
        '<div class="price">'+money(p.price)+'</div>'+
        '<div class="price-transfer">'+money(Math.round(p.price*0.9))+' <span>transf./efectivo</span></div></div>'+
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
          '<div class="line-price">'+money(p.price*i.qty)+'</div></div></div>'+
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
    a.innerHTML='<div class="glow"></div><div class="pic"><img src="'+IMG+CAT_IMG[name]+'.jpeg" alt=""></div>'+
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
      if(state.q){ var q=state.q.toLowerCase(); list=list.filter(function(p){return (p.name+' '+p.brand+' '+p.flavor+' '+p.cat).toLowerCase().indexOf(q)>-1;}); }
      renderGrid(grid,list);
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
  if(bt){ var html=''; BRANDS.concat(BRANDS).forEach(function(b){ html+='<span>'+b.toUpperCase()+'</span>'; }); bt.innerHTML=html; }
  initParticles(); initCounters();
}

/* CATALOG (productos.html) */
function initCatalog(){
  var grid=qs('#catalog-grid'); if(!grid) return;
  var params=new URLSearchParams(location.search);
  var state={ cats:[], brands:[], goals:[], max:170000, sort:'pop', q:params.get('q')||'' };
  if(params.get('cat')) state.cats=[params.get('cat')];

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
    if(state.q){ var q=state.q.toLowerCase(); list=list.filter(function(p){return (p.name+' '+p.brand+' '+p.flavor+' '+p.cat).toLowerCase().indexOf(q)>-1;}); }
    if(state.sort==='price-asc') list.sort(function(a,b){return a.price-b.price;});
    else if(state.sort==='price-desc') list.sort(function(a,b){return b.price-a.price;});
    else if(state.sort==='rating') list.sort(function(a,b){return b.rating-a.rating;});
    else list.sort(function(a,b){return b.pop-a.pop;});
    renderGrid(grid,list);
    var cnt=qs('#catalog-count'); if(cnt) cnt.textContent=list.length+' producto'+(list.length===1?'':'s');
  }
  render();
}

/* PRODUCT (producto.html) */
function initProduct(){
  var root=qs('#product-root'); if(!root) return;
  var params=new URLSearchParams(location.search);
  var id=params.get('id')||'mm-van';
  var p=byId(id)||CATALOG[0];

  // group flavors of same base product (by name root) for Mutant Mass-like variants
  var family=CATALOG.filter(function(x){return x.name.split(' ')[0]===p.name.split(' ')[0] && x.cat===p.cat;});
  var gallery=[p.img].concat(family.map(function(f){return f.img;})).filter(function(v,i,a){return a.indexOf(v)===i;}).slice(0,4);
  var qty=1, activeImg=p.img;

  qs('#pd-brand').textContent=p.brand;
  qs('#pd-name').textContent=p.name;
  qs('#pd-rating').innerHTML='★★★★★ <span style="color:#cfd3da;font-size:13px">'+p.rating.toFixed(1)+'</span>';
  qs('#pd-reviews').textContent=p.reviews+' reseñas';
  qs('#pd-flavor').textContent=p.flavor;
  function priceUI(){
    qs('#pd-now').textContent=money(p.price);
    qs('#pd-old').textContent=p.old?money(p.old):'';
    qs('#pd-old').style.display=p.old?'':'none';
    qs('#pd-save').textContent=p.old?('Ahorrás '+money(p.old-p.price)):'';
    qs('#pd-save').style.display=p.old?'':'none';
    qs('#pd-cuota').textContent=money(Math.round(p.price/3));
    var tEl=qs('#pd-transfer'); if(tEl) tEl.textContent=money(Math.round(p.price*0.9));
    qs('#pd-total').textContent=money(p.price*qty);
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
  var rel=qs('#pd-related');
  if(rel){ CATALOG.filter(function(x){return x.id!==p.id;}).sort(function(a,b){return b.pop-a.pop;}).slice(0,4).forEach(function(rp){ rel.appendChild(productCard(rp)); }); }

  priceUI();
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
          '<div class="line-price" style="font-size:17px">'+money(p.price*i.qty)+'</div></div></div>'+
        '<button class="remove" data-rm="'+p.id+'">'+svg('<path d="M4 7h16M9 7V5h6v2M7 7l1 13h8l1-13"></path>',18)+'</button>';
      list.appendChild(row);
    });
    var sub=cartSubtotal();
    qs('#cart-subtotal').textContent=money(sub);
    qs('#cart-ship').textContent= sub>=60000 ? 'Gratis' : money(4999);
    qs('#cart-total').textContent= money(sub>=60000 ? sub : sub+ (sub>0?4999:0));
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
      row.innerHTML='<div class="th"><img src="'+p.img+'" alt=""></div><div style="flex:1;min-width:0"><div style="font-family:var(--display);font-weight:600;font-size:13px">'+p.name+'</div><div style="font-size:11.5px;color:var(--muted2)">'+i.qty+' × '+money(p.price)+'</div></div><div style="font-family:var(--display);font-weight:700;font-size:13px">'+money(p.price*i.qty)+'</div>';
      box.appendChild(row);
    });
    var sub=cartSubtotal(), ship=sub>=60000?0:(sub>0?4999:0);
    var active=qs('.pay-opt.active'); var disc=(active&&active.getAttribute('data-discount'))?Math.round(sub*0.1):0;
    qs('#co-subtotal').textContent=money(sub);
    var dRow=qs('#co-discount-row'); if(dRow){ dRow.style.display=disc?'':'none'; var dEl=qs('#co-discount'); if(dEl)dEl.textContent='−'+money(disc); }
    qs('#co-ship').textContent=ship?money(ship):'Gratis';
    qs('#co-total').textContent=money(sub-disc+ship);
  };
  window.__renderCheckout();
  // payment selection
  qsa('.pay-opt').forEach(function(o){ o.addEventListener('click',function(){ qsa('.pay-opt').forEach(function(x){x.classList.remove('active');}); o.classList.add('active'); var r=o.querySelector('input'); if(r)r.checked=true; window.__renderCheckout(); }); });
  // submit
  var form=qs('#checkout-form');
  if(form){ form.addEventListener('submit',function(e){ e.preventDefault();
    var cart=loadCart();
    if(!cart.length){ toast('Tu carrito está vacío'); return; }
    // build WhatsApp order BEFORE clearing
    var orderNo='#MUT-2026-'+Math.floor(1000+Math.random()*9000);
    var sub=cartSubtotal(), ship=sub>=60000?0:(sub>0?4999:0);
    var active=qs('.pay-opt.active'); var disc=(active&&active.getAttribute('data-discount'))?Math.round(sub*0.1):0;
    var total=sub-disc+ship;
    var paySel=qs('.pay-opt.active b'); var payName=paySel?paySel.textContent:'A coordinar';
    var msg='*Nuevo pedido Mutants* '+orderNo+'\n\n';
    cart.forEach(function(i){ var p=byId(i.id); if(p) msg+='• '+i.qty+'x '+p.name+' ('+p.flavor+') — '+money(p.price*i.qty)+'\n'; });
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
  syncCartUI(); initReveal(); initWhatsApp(); initNewsletter();
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
