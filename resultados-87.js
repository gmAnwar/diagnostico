/* resultados-87.js · Diagnóstico Express 8.7
   Parte 2 de 2: todo lo de la pantalla de resultados. Depende de index.html (state, QUIZ, track, sendWebhook…).
   No se abre solo. Si cambias este archivo, cámbiale el número (resultados-88.js) y el de index.html: así el navegador no mezcla versiones. */
const STAGE_COPY = {
 1:{dolor:'Probando si puedo vender',
    dentro:['Estás probando: todavía no hay un flujo constante de gente preguntando.','Tú haces de todo.','Contestas desde tu WhatsApp personal.','Los números viven en una libreta o en tu cabeza.'],
    frenaLead:'La oferta y el cliente.',
    frena:'En esta etapa ESE es el trabajo: saber qué vendes y a quién. Medir lo demás todavía es humo.',
    pasarTit:'Para pasar a la etapa 2 necesitas:',
    pasar:['Saber qué vendes y a quién, en una frase','Un ticket promedio que dé para pagar anuncios y aun así ganar','Que de cada 10 que preguntan, compre un número que puedas predecir','Poder decir por qué te compran a ti y no a otro']},
 2:{dolor:'Un mes vendo bien, otro no tanto',
    dentro:['Ya vendes, pero sube y baja sin que sepas por qué.','Tú sigues siendo el vendedor principal; alguien más contesta el WhatsApp.','Llevas las cuentas en WhatsApp Business y a veces en Excel.','Ves el Ads Manager, pero no lo cruzas con lo que de verdad se vendió.'],
    frenaLead:'La respuesta, el equipo y la automatización básica.',
    frena:'Tu venta se cae DESPUÉS del clic, no antes: el anuncio funciona y el lead se enfría esperando.',
    pasarTit:'Para pasar a la etapa 3 necesitas:',
    pasar:['Campañas que corren 4 semanas seguidas sin que las apagues por pánico','Todo lead respondido el mismo día, siempre','UNA hoja donde cada venta trae de dónde vino','Que el mes malo deje de ser un misterio']},
 3:{dolor:'Le subo al presupuesto y vendo lo mismo',
    dentro:['Vendes bien y llevas meses en el mismo número.','Ya operas un equipo de ventas, quizá con agencia.','CRM a medias, un bot que nadie mantiene, Ads Manager a diario.','Tus números son globales, y el CAC global es el que miente.'],
    frenaLead:'La tasa por etapa, el CAC por campaña y la utilidad.',
    frena:'Estás optimizando promedios, y el promedio esconde la campaña que te está costando dinero.',
    pasarTit:'Para pasar a la etapa 4 necesitas:',
    pasar:['Tasa de cierre por cada etapa de tu venta, no una sola','CAC por campaña, para saber cuál apagar','Que el negocio venda un mes entero sin que tú toques la operación','Decidir con TU hoja, no con el Ads Manager']},
 4:{dolor:'Vendo mucho, pero de ahí no paso',
    dentro:['Vendes mucho y tocaste techo.','Diriges un equipo completo con agencia o traficker.','Tienes CRM, tableros y reportes.','Tus números viven en tres lugares (Facebook, tu CRM y tu banco) y no cuadran entre sí.'],
    frenaLead:'Cada peso más de presupuesto te trae menos ventas.',
    frena:'Y como Meta no sabe quién te compró, te sigue buscando gente que escribe, no gente que compra.',
    pasarTit:'Para dejar de topar necesitas:',
    pasar:['Regresarle a Meta cada venta cerrada (CAPI), para que optimice hacia quien paga, no hacia quien escribe','Saber cuánto te deja cada tipo de cliente en un año, no solo en la primera compra','Ventas y anuncios en un solo lugar, con el dato del día, no con el del mes pasado'],
    nota:'Aquí no hay etapa 5. Cada vez que mueves un área, el tope se pasa a otra. Lo que sigue es verla venir antes de que te frene.'}
};
const STAGE_DESC = ["Estás probando, aún sin flujo constante","Vendes, pero sube y baja sin control","Vendes bien, pero llevas meses igual","Vendes mucho, pero llegaste a un techo"];
const TABLE = [
 ["Menos de $10K/mes","$10K a $40K/mes","$40K a $150K/mes","Más de $150K/mes"],
 ["Le pico al botón azul","Ads Manager pero irregular","Ads Manager con estructura","Equipo + agencia"],
 ["Contesto yo mismo","1 persona sin proceso","2 a 3 sin estándar","Equipo con líder y guion"],
 ["No mido nada","Solo leads y ventas","Sabes por mensaje, no por paciente","Control completo de números"],
 ["Todo manual","Embudo básico sin CRM","CRM básico","CRM robusto + automatizaciones"],
 ["Bajas e impredecibles","Moderadas con altibajos","Buen volumen con picos","Altas y predecibles"],
 ["Aún validando","Validación parcial","Validada, optimizando","Totalmente validada"],
 ["Idea general","Definición inicial","Perfil claro con datos","Segmentación avanzada"],
 ["Sin reglas, horas tarde","Intento rápido sin regla fija","Horarios y guiones","Tiempo medido + revisión semanal"],
 ["Orgánicas genéricas","Pruebas sin estrategia","A/B testing con proceso","Banco ganador + calendario"]
];

/* ---------- Tabla Hormozi 11 áreas · Etapa 3 (frena / para pasar) ---------- */
const HZ = [
 ["Presupuesto","Inviertes sin saber qué porcentaje regresa como cliente.","Conocer tu costo por cliente real, no por lead."],
 ["Campañas","Cambias cosas sin un proceso claro de prueba.","Cada prueba con su presupuesto apartado; se decide con clientes, no con días."],
 ["Equipo","Cada quien vende a su manera. Depende de quién conteste.","Que los 2-3 cierren igual: un guion que todos siguen y se mide quién lo cumple."],
 ["Métricas","Sabes cuánto pagas por mensaje pero no cuánto te cuesta cada paciente que paga.","4 números: costo por mensaje, por paciente, valor por paciente, margen."],
 ["Automatización","Ya tienes un CRM básico, pero el seguimiento es manual: depende de que alguien se acuerde.","Un CRM que trabaje solo: estatus por lead y seguimiento automático que nadie tenga que empujar a mano."],
 ["Ventas","Ya tienes buen volumen, pero con picos y valles que no puedes predecir.","Metes X, salen Y leads, Z cierran, quedan $W."],
 ["Oferta","Validada pero no optimizada. Sin variaciones.","2 o 3 versiones probadas. Saber cuál convierte más."],
 ["Cliente ideal","Perfil claro pero le hablas igual a todos.","Al menos 2 segmentos con mensajes diferentes."],
 ["Respuesta","Ya tienes horarios y guiones, pero no mides si de verdad contestas a tiempo.","Tiempo de respuesta medido bajo 5 minutos y revisado cada semana."],
 ["Creatividades","A/B testing sin banco. Cada mes de cero.","Banco organizado. Lo que funciona, se escala."],
 ["Asistencia","Confirmas, pero sin anticipo se te sigue cayendo más de la mitad de los que agendan.","Anticipo + recordatorio 24h + confirmación → que se presente al menos el 75%."]
];

/* ---------- Tabla 11 áreas · Etapa 4 (techo: frena / para romper el techo) ---------- */
const HZ4 = [
 ["Presupuesto","Inviertes fuerte, pero cada peso extra rinde menos: el costo sube y el volumen ya no acompaña.","Saber qué campaña y qué anuncio te dan CLIENTES, no mensajes, y mover el dinero ahí."],
 ["Campañas","Estructura sólida, pero el canal que te trajo aquí ya muestra saturación: el mismo peso compra menos.","Diversificar con método: nueva audiencia, canal u oferta, una a la vez, con piloto."],
 ["Equipo","El equipo cierra parejo con guion, pero nadie revisa sus conversaciones: no sabes por qué se gana o se pierde cada trato.","QA de conversaciones: cada conversación analizada y coaching con evidencia, no con opinión."],
 ["Métricas","Mides todo, pero los números viven regados (plataforma, hojas, CRM) y llegan tarde para decidir.","Ventas y ads en un solo lugar, actualizados en automático: decidir con el dato del día."],
 ["Automatización","CRM robusto, pero tus cierres reales nunca regresan a Meta: el algoritmo optimiza a ciegas.","Cerrar el loop: ventas reales de vuelta a Meta para que compre clientes, no clics."],
 ["Ventas","Predecibles pero planas: creces 5% cuando quieres 50%.","Un motor nuevo validado: segmento, oferta o plaza. Con piloto, no con fe."],
 ["Oferta","Optimizada para el cliente de hoy; sin escalera para subir el ticket.","Escalera de valor: entrada, core y premium que suben el promedio."],
 ["Cliente ideal","Segmentas bien, pero llevas años exprimiendo el mismo pool.","Abrir el segmento adyacente con mensaje propio, medido contra el actual."],
 ["Respuesta","Respondes en minutos; lo que se fuga es el seguimiento a 30-90 días.","Cadencia de recontacto automática: ningún calificado se enfría."],
 ["Creatividades","Tienes banco ganador, pero los ganadores duran cada vez menos.","Sistema de relevo: producción constante que sustituye al ganador antes de que muera."],
 ["Asistencia","Se presentan y compran; lo que nadie mide es cuántos regresan.","Retención medida: recompra y referidos como canal propio."]
];

/* ---------- Tabla 11 áreas · Etapa 1 (validación: frena / para pasar de etapa) ---------- */
const HZ1 = [
 ["Presupuesto","Metes dinero a ads sin saber si tu oferta ya jala. Cada peso te dice poco porque aún no sabes qué funciona.","Confirmar que ya ganas con lo que vendes hoy, aunque sea en chico, antes de escalar el gasto."],
 ["Campañas","Le picas al botón de promocionar. No hay campaña, hay impulsos sueltos.","Una campaña bien armada con un objetivo claro, no el botón azul, para ver si el canal te trae compradores."],
 ["Equipo","Vendes tú todo. Cuando no estás, no se vende: el negocio eres tú.","Vender con un mismo paso a paso cada vez: que el resultado no dependa de tu día."],
 ["Métricas","No mides nada. No sabes qué anuncio, qué mensaje ni qué cliente te deja dinero.","Lo básico: cuántos te escriben, cuántos compran, y tu costo por venta a grandes rasgos."],
 ["Automatización","Todo a mano. Los leads viven en tu WhatsApp y se pierden entre la conversación.","Un lugar simple donde no se te caiga ningún interesado, aunque sea una hoja o un embudo básico."],
 ["Ventas","Ventas bajas e impredecibles. Un día cae algo, otro nada, sin patrón.","Que llegar a una venta deje de ser suerte: repetir a propósito lo que funcionó la última vez."],
 ["Oferta","Aún estás validando qué vendes y a qué precio. No hay certeza de que lo quieran a lo que pides.","Tus primeras ventas reales: gente que paga tu oferta al precio de hoy sin que la tengas que convencer a la fuerza."],
 ["Cliente ideal","Le vendes a quien caiga. Todavía no sabes quién es tu mejor cliente.","Una idea clara de a quién le sirve más lo que vendes, para dejar de hablarle a todos."],
 ["Respuesta","Contestas cuando puedes, a veces horas después: responder rápido todavía no es prioridad.","Un compromiso simple: responder en minutos, no en horas. Ahí es donde se cierra."],
 ["Creatividades","Publicas lo orgánico o lo primero que se te ocurre, sin probar qué conecta.","Probar 2 o 3 mensajes distintos y quedarte con el que más gente responde."],
 ["Asistencia","Los que dicen que van, muchos no llegan. Y ni cuenta te das.","Empezar a llevar la cuenta y mandar un recordatorio simple antes de la cita."]
];

/* ---------- Tabla 11 áreas · Etapa 2 (inestable: frena / para pasar de etapa) ---------- */
const HZ2 = [
 ["Presupuesto","Inviertes entre $10K y $40K, pero subes y bajas el gasto por corazonada. No sabes cuánto puedes meter sin perder.","Gastar de forma sostenida a un nivel que te dé volumen constante, en vez de arranques y frenones."],
 ["Campañas","Armas campañas cuando te acuerdas: corren a ratos, sin que trabajen parejo.","Una estructura de campañas corriendo estable, no a arranques, para que el flujo no dependa de tu ánimo."],
 ["Equipo","Tienes UNA persona ayudando, pero sin proceso: si falta, paras tú.","Ese paso a paso escrito y entregable, para que tu ayudante venda sin ti encima."],
 ["Métricas","Ves leads y ventas, pero nada más. No sabes qué campaña ni qué mensaje los trajo.","Conectar la venta con su origen: saber qué anuncio y qué mensaje te traen a los que sí compran."],
 ["Automatización","Tienes un embudo básico pero sin CRM: los leads entran y se pierden sin rastro.","Un CRM simple donde cada lead tenga estatus, para que ninguno se caiga por olvido."],
 ["Ventas","Vendes moderado pero con altibajos fuertes: un mes bueno, otro flojo.","Sostener un piso de ventas: que el mes flojo deje de caer tanto."],
 ["Oferta","Vende, pero no parejo: no sabes si el freno es el precio o cómo está armado el paquete.","Fijar precio y paquete que se vendan solos: el mismo pitch cierra, sin regateo, mes con mes."],
 ["Cliente ideal","Tienes una idea de tu cliente, pero sin datos que la confirmen: es más corazonada que perfil.","Un perfil claro basado en quién SÍ te compra, no en suposición."],
 ["Respuesta","Intentas contestar rápido pero sin regla fija: a veces 5 minutos, a veces medio día.","Una regla de tiempo que se cumpla siempre, no solo cuando te acuerdas."],
 ["Creatividades","Haces pruebas sueltas, sin estrategia: cambias el anuncio sin saber qué estás probando.","Un A/B con método: probar una cosa a la vez y anotar cuál ganó."],
 ["Asistencia","Sabes que faltan seguido, pero confirmas solo a veces y a mano.","Un recordatorio fijo para todos los que agendan, no cuando te acuerdas."]
];


/* ---------- Meta por etapa (tarjetas "Tu etapa", estilo Hormozi p.4-5) ---------- */
const STAGE_META = {
 1:{rol:"Haces de todo tú", inv:"Menos de $10K/mes", punto:"Validar antes de acelerar", grad:"Oferta y cliente validados"},
 2:{rol:"Vendedor principal", inv:"$10K a $40K/mes", punto:"Te falta estructura, no presupuesto", grad:"Campañas ordenadas + proceso de respuesta"},
 3:{rol:"Operador", inv:"$40K a $150K/mes", punto:"El cuello de botella ya no está en los ads", grad:"Ver tu negocio completo"},
 4:{rol:"", inv:"Más de $150K/mes", punto:"Cada peso más de presupuesto te trae menos ventas", grad:"Ver venir la siguiente área que te va a frenar"}
};

/* ---------- Mapeo a 3 Ruedas y proceso horizontal ---------- */
const RUEDA_MAP = {r1:[2,6,7,8], r2:[0,1,9], r3:[3,4]};          // índices de QUIZ
const FLOW_MAP = {leadgen:[0,1,9], filtro:[7,1], seguimiento:[2,4,8], cierre:[6,3]};

function showPhoneGate(){
  $("screen-quiz").classList.add("hidden");
  const f=$("phoneName"); if(f) f.textContent = state.nombre ? esc(state.nombre.trim().split(/\s+/)[0])+", ya casi." : "Ya casi.";
  $("screen-phone").classList.remove("hidden");
  window.scrollTo({top:0});
}

/* ===== CONVERSIÓN v1.9 (borrador · pasada de voz pendiente) ===== */

/* v2.4 · Sin llamadas: un solo destino para todas las etapas = el Kit/Playbook
   (lista de espera, precio fundador). El offer canónico vive en #sec-cta. */

/* =====================================================================
   SKIN · un motor, dos pieles. C1 = "Salud y belleza" → clínicas (HTML
   base, no se toca). Cualquier otro rubro o Bloque C saltado → general.
   ===================================================================== */
function isClinica(){ return state.C[0] === 0; }

function GEN_SKIN(){ return {
  citas: {
    p: `<b>De cada 100 personas que te escriben por WhatsApp, solo 7 agendan una cita o dan el siguiente paso.</b> Las otras 93 preguntan algo y desaparecen. `,
    caso: `<b>Caso real:</b> Un negocio de servicios recibía 5,600 mensajes al mes. Solo 393 agendaban (7%). Quien contestaba respondía con el precio y esperaba. Sin guion de agendamiento, sin seguimiento, sin meta de citas por día. El 93% se perdía en WhatsApp. Y de los que sí agendaban, solo la mitad llegaba.`,
    hazlo: `<b>Hazlo hoy</b>Abre tus últimos 50 chats de WhatsApp con interesados que preguntaron pero NO avanzaron. Anota en cuántos la conversación se quedó en el precio. Si más de la mitad preguntó precio y no le ofreciste el siguiente paso, ahí está tu fuga.`,
    wl: `Tenemos un playbook con guion de agendamiento + seguimiento + protocolo de confirmación para negocios que venden por chat.`
  },
  anuncios: {
    hazlo: `<b>Hazlo hoy</b>¿Tu cliente ya decidió qué quiere? Si sí, revisa cuántos de tus anuncios abren con pregunta o con "sabías que". Reescribe la primera línea: qué vendes, a qué precio, dónde, y cuál es el siguiente paso.`,
    wl: `El sistema completo tiene 5 pasos y 5 momentos. Cada combinación produce un anuncio listo para tu negocio.`,
    ads: [
      ['bad','✗ Inmobiliaria','"¿Buscas la casa de tus sueños?"'],
      ['good','✓ Inmobiliaria','"Casa 3 recámaras en Cumbres. $2.85M. Recorridos este sábado."'],
      ['bad','✗ Servicios','"Somos expertos con 10 años de experiencia"'],
      ['good','✓ Servicios','"Instalación completa $4,900. Agenda esta semana, garantía 1 año."']
    ]
  },
  dinero: {
    p: `Mides cuánto te cuesta cada mensaje. Pero no sabes cuánto te cuesta cada <b>cliente que llega y paga.</b> Son dos números completamente diferentes:`,
    dato: `<b>Dato real de un negocio en México:</b> el costo por mensaje era $15. Parecía barato. Pero el costo por cliente que compró fue de $711. Son 47 veces más. Si solo mides el costo por mensaje, crees que todo funciona cuando en realidad estás perdiendo dinero entre cada paso.`,
    hazlo: `<b>Hazlo hoy (1 minuto)</b>Toma tu inversión del mes pasado. Divide entre el número de clientes nuevos que REALMENTE pagaron. Ese es tu costo real por cliente. Si no tienes ese número, ahí está tu primer problema.`
  },
  close: `Estas son 3 de las 11 áreas que evaluamos en negocios que venden por chat.`
};}

function applySkin(){
  if(isClinica()) return; // clínicas = HTML base intacto
  const sec = $("sec-areas");
  if(sec){
  const card = a => sec.querySelector(`.acard[data-area="${a}"]`);
  const G = GEN_SKIN();

  // Tarjeta 1 · citas
  const c1 = card("citas");
  c1.querySelector("p").innerHTML = G.citas.p;
  c1.querySelector(".caso").innerHTML = G.citas.caso;
  c1.querySelector(".hazlo").innerHTML = G.citas.hazlo;
  c1.querySelector(".wl-row span").textContent = G.citas.wl;

  // Tarjeta 2 · anuncios (ejemplos + hazlo + waitlist; la metodología es la misma)
  const c2 = card("anuncios");
  c2.querySelector(".ads-ex").innerHTML = G.anuncios.ads.map(([cls,tag,txt])=>
    `<div class="ex ${cls}"><span class="tag">${tag}</span>${txt}</div>`).join("");
  c2.querySelector(".hazlo").innerHTML = G.anuncios.hazlo;
  c2.querySelector(".wl-row span").textContent = G.anuncios.wl;

  // Tarjeta 3 · dinero
  const c3 = card("dinero");
  const ps = c3.querySelectorAll("p");
  ps[0].innerHTML = G.dinero.p;
  if(ps[1]) ps[1].innerHTML = G.dinero.dato;
  c3.querySelector(".hazlo").innerHTML = G.dinero.hazlo;

  // Cierre de sección
  sec.querySelector(".areas-close .bebas").textContent = G.close;
  }

  // Tablas y nota del diagnóstico: traducción de dominio puntual
  ["diagTable","diagNote","hzTable","diagListMobile"].forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = el.innerHTML
      .replace(/pacientes/gi,"clientes")
      .replace(/paciente/gi,"cliente")
      .replace(/dinero fuga en clínicas/gi,"dinero fuga en negocios que venden por cita");
  });
}

/* ---------- Video slots (Hormozi) · se activan al pegar links en CONFIG ---------- */
function embedHTML(url){
  let src = null;
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
  const vm = url.match(/vimeo\.com\/(\d+)/);
  const lo = url.match(/loom\.com\/(?:share|embed)\/([\w]+)/);
  if(yt) src = "https://www.youtube.com/embed/"+yt[1];
  else if(vm) src = "https://player.vimeo.com/video/"+vm[1];
  else if(lo) src = "https://www.loom.com/embed/"+lo[1];
  else src = url; // link directo de embed
  return `<iframe src="${src}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
}
function renderVideos(et){
  if(CONFIG.VIDEO_GENERAL_URL){
    $("sec-video-gen").classList.remove("hidden");
    $("vGen").innerHTML = embedHTML(CONFIG.VIDEO_GENERAL_URL);
  }
  $("etTitle").textContent = `Tu etapa: ${STAGES[et-1]}`;
  const vu = CONFIG.VIDEO_ETAPA_URLS[et];
  // v2.3: "EL PUNTO" promovido al hero; la sección etapa solo aparece si hay video
  const hp = $("heroPunto");
  if(hp){ hp.textContent = "El punto: " + STAGE_META[et].punto.toLowerCase(); hp.classList.remove("hidden"); }
  if(vu){
    $("sec-etapa").classList.remove("hidden");
    $("vEt").classList.remove("hidden");
    $("vEt").innerHTML = embedHTML(vu);
    $("etSub").textContent = "Este video te explica a detalle lo que pasa en tu etapa y cómo resolverlo.";
  }
  const m = STAGE_META[et];
  $("stageMeta").innerHTML = `
    <div class="smcard"><div class="t">👤 Tu rol</div><div class="v">${m.rol}</div></div>
    <div class="smcard"><div class="t">💰 Inversión</div><div class="v">${m.inv}</div></div>
    <div class="smcard"><div class="t">🎯 El punto</div><div class="v">${m.punto}</div></div>
    <div class="smcard"><div class="t">🎓 ${et===4?'Para dejar de topar':'Para pasar de etapa'}</div><div class="v">${m.grad}</div></div>`;
}

function renderDiagTable(){
  const et=state.etapa;
  let h = `<thead><tr><th>Área</th>`;
  STAGES.forEach((s,si)=>{
    h += `<th class="${si+1===et?'you':''}">${si+1}. ${s}${si+1===et?' · ESTÁS AQUÍ':''}<span class="st-desc">${STAGE_DESC[si]}</span></th>`;
  });
  h += `</tr></thead><tbody>`;
  QUIZ.forEach((q,qi)=>{
    h += `<tr><td class="area">${q.area}</td>`;
    for(let s=0;s<4;s++){
      const isAns = state.B[qi]===s;
      const isWeak = isAns && (s+1<et);
      let cls = isAns ? "ans" : (s+1===et ? "you-col" : "");
      if(isWeak) cls += " low";
      h += `<td class="${cls}">${isAns?'<span class="mark">→ </span>':''}${TABLE[qi][s]}${isWeak?' ⚠️':''}</td>`;
    }
    h += `</tr>`;
  });
  // Fila 11 · Asistencia: no medible desde afuera
  h += `<tr class="locked"><td class="area">Asistencia</td><td colspan="4">Esta área no se puede medir desde afuera (cuántos de los que agendan sí llegan). Es de las que más dinero fuga en clínicas, y el Kit trae el protocolo de confirmación para taparla.</td></tr>`;
  h += `</tbody>`;
  $("diagTable").innerHTML = h;

  // QW1 · vista móvil: callout de áreas débiles + lista de 1 columna + toggle a la matriz
  const weakNames0 = state.weak.map(i=>QUIZ[i].area);
  let ml = "";
  if(weakNames0.length){
    ml += `<div class="dlm-callout">Esto es lo que te frena: <b>${weakNames0.join(" · ")}</b>. El resto de tu operación ya está lista para crecer, pero esto la está deteniendo. Abajo, tu mapa área por área.</div>`;
  }
  QUIZ.forEach((q,qi)=>{
    const ans = state.B[qi]; if(ans==null) return;
    const isWeak = ans+1 < et;
    const dots = [0,1,2,3].map(d=>`<i class="${d===ans?'on':''}"></i>`).join("");
    const gap = isWeak ? `<div class="gap-note">Nivel ${ans+1} de 4: tu etapa pide ${et}</div>` : "";
    ml += `<div class="dlm-row ${isWeak?'weak':''}"><span class="a">${q.area}</span><span class="r">${TABLE[qi][ans]}${gap}</span><span class="dots">${dots}</span></div>`;
  });
  ml += `<button class="dlm-toggle" onclick="document.getElementById('sec-diag').classList.toggle('show-matrix');this.textContent=this.textContent.includes('Ver')?'Ocultar la tabla de 4 etapas ▲':'Ver la tabla completa de 4 etapas ▼'">Ver la tabla completa de 4 etapas ▼</button>`;
  $("diagListMobile").innerHTML = ml;

  const nomDash = state.nombre ? esc(state.nombre.trim().split(/\s+/)[0])+": " : "";
  const weakNames = state.weak.map(i=>QUIZ[i].area);
  if(state.weak.length){
    const pl = state.weak.length>1;
    $("diagVerdict").innerHTML = `${nomDash}Tu negocio está mayormente en <b>Etapa ${et}</b>, pero tienes <span class="crit">${state.weak.length} área${pl?'s':''} por debajo</span> de tu nivel. ${pl?'Las más urgentes':'La más urgente'}: <span class="crit">${weakNames.join(", ")}</span>. El resto de tu operación ya está lista para crecer, pero ${pl?'estas áreas lo están frenando':'esta área lo está frenando'}.`;
  } else {
    $("diagVerdict").innerHTML = `${nomDash}Tu negocio está parejo en <b>Etapa ${et}</b>. Ninguna área está rezagada, lo cual es raro y bueno. Tu siguiente movimiento es de nivel, no de parches.`;
  }
  $("diagNote").innerHTML = `Que las demás estén "a nivel" <strong>no significa que estén resueltas.</strong> Saber cuánto pagas por mensaje no es saber cuánto te cuesta cada paciente. Tener Ads Manager con estructura no significa que estés optimizando. En las siguientes secciones vas a ver qué más necesita atención.`;
}

function renderRuedas(){
  const avg = idxs => idxs.reduce((a,i)=>a+state.B[i]+1,0)/idxs.length;   // 1..4
  const vals = {r1:avg(RUEDA_MAP.r1), r2:avg(RUEDA_MAP.r2), r3:avg(RUEDA_MAP.r3)};
  const label = v => v>=3.4 ? "FUERTE" : v>=2.4 ? "A MEDIAS" : "ATORADA";
  [["m1","v1",vals.r1],["m2","v2",vals.r2],["m3","v3",vals.r3]].forEach(([m,v,val])=>{
    $(m).style.width = (val/4*100)+"%";
    $(v).textContent = label(val)+" · nivel "+val.toFixed(1)+" de 4";
  });
  const entries=[["la Estructura del negocio",vals.r1],["la Estructura de campañas",vals.r2],["las Métricas y control",vals.r3]];
  entries.sort((a,b)=>a[1]-b[1]);
  const low=entries[0], high=entries[2];
  if(high[1]-low[1] >= 0.8){
    $("desbalance").innerHTML = `Aquí está tu desbalance: estás avanzado en <b>${high[0]}</b> pero atorado en <b>${low[0]}</b>. Ese desbalance, no la falta de esfuerzo, es lo que tiene tu número detenido. El área más lenta frena a las otras dos.`;
  } else {
    $("desbalance").innerHTML = `Tus 3 áreas base están parejas. Para crecer no hay que parchar una: hay que subir el nivel de las tres juntas, en orden.`;
  }
}

function renderFlow(){
  const score = idxs => idxs.reduce((a,i)=>a+state.B[i]+1,0)/idxs.length;
  const phases=[["Lead gen","leadgen"],["Filtro","filtro"],["Seguimiento","seguimiento"],["Cierre","cierre"]];
  let worst="seguimiento", worstV=99;
  phases.forEach(([_,k])=>{ const v=score(FLOW_MAP[k]); if(v<worstV){worstV=v;worst=k;} });
  $("flowRow").innerHTML = phases.map(([nm,k],i)=>
    `<div class="step ${k===worst?'hot':''}">${nm}</div>${i<3?'<span class="arrow">→</span>':''}`).join("");
  const copyMap={
    leadgen:"tu traba principal está en la <b>generación</b>: no te llega suficiente gente, o llega sin estructura. Antes de tocar el seguimiento, hay que arreglar cómo atraes.",
    filtro:"tu traba principal está en el <b>filtro</b>: te llega gente, pero no del perfil correcto. Tus campañas están atrayendo curiosos, no compradores.",
    seguimiento:"tu traba principal está en el <b>seguimiento</b>: te llegan interesados, algunos son buenos, pero se pierden antes de cerrar. Ahí se está fugando el dinero.",
    cierre:"tu traba principal está en el <b>cierre</b>: llegas hasta la conversación final, pero no se concreta. El problema es de oferta o de proceso de cierre."};
  $("flowCopy").innerHTML = `Según tus respuestas, ${copyMap[worst]}`;
}

function renderHz(){
  const weakAreas = state.weak.map(i=>QUIZ[i].area.toLowerCase());
  const top = state.etapa===4;
  const rows = state.etapa===1 ? HZ1 : state.etapa===2 ? HZ2 : top ? HZ4 : HZ;
  const btn = document.querySelector("#hzExp button span");
  if(btn) btn.textContent = top ? "Ver el detalle de tus 11 áreas: qué te frena y qué mover para romper el techo"
                                : "Ver el detalle de tus 11 áreas: qué te frena y qué mover para pasar de etapa";
  let h = `<thead><tr><th>Área</th><th>Lo que te frena</th><th>${top?'Para romper el techo':'Para pasar de etapa'}</th></tr></thead><tbody>`;
  rows.forEach(row=>{
    const isWeak = weakAreas.some(w=>row[0].toLowerCase().startsWith(w.slice(0,5)));
    h += `<tr>${row.map((c,ci)=>`<td class="${isWeak&&ci>0?'weak-row':''}">${c}</td>`).join("")}</tr>`;
  });
  h += `</tbody>`;
  $("hzTable").innerHTML = h;
}

function toggleHz(){
  const ex=$("hzExp"); ex.classList.toggle("open");
  if(ex.classList.contains("open")) track("VerTabla11Areas",{});
}

function goCall(src){
  sendWebhook("cta_llamada",{source:src});
  track("CTA_Llamada",{source:src});
  const c = $("sec-cta");
  if(c){ c.scrollIntoView({behavior:"smooth"}); }
  else if(CONFIG.CALENDLY_URL){ window.open(CONFIG.CALENDLY_URL,"_blank"); }
}
function exportPDF(){
  track("ExportPDF",{});
  document.querySelectorAll(".expander").forEach(x=>x.classList.add("open"));
  window.print();
}
function emailMe(){
  sendWebhook("send_email",{results_url: location.href});
  track("EmailResultados",{});
  toast("Listo. Te llega el link de tu Mapa a "+ (state.email||"tu correo") +".");
}
/* =====================================================================
   CÍRCULO DE LOS ENGRANES · render de resultados (portado de engrane-wired)
   Cableado a las respuestas reales del quiz vía buildLevels().
   ===================================================================== */
const ST={
  g:{hex:'#83C341',line:'#5C9A2E',ink:'#0A2540',word:'Lo tienes',icon:'check'},
  y:{hex:'#F5A524',line:'#C97E10',ink:'#0A2540',word:'Por mejorar',icon:'half'},
  r:{hex:'#FF4438',line:'#D8271B',ink:'#FFFFFF',word:'Te falta',icon:'cross'},
  locked:{hex:'#CAD0D7',line:'#AAB2BC',ink:'#FFFFFF',word:'En tu Auditoría',icon:'lock'}
};
/* 13 dientes. g: 0=Est.Empresa 1=Est.Campaña 2=Métricas. Métricas = ancla. */
const TEETH=[
 {l:"CAC",
  sig:"CAC",
  g:2,
  x:"Cuánto te cuesta conseguir un cliente que paga, no un mensaje.",
  def:"CAC significa <b>Costo de Adquisición de Cliente</b>: cuánto dinero te cuesta conseguir UN cliente que paga. No un mensaje, no un like, un cliente.",
  why:"Una clínica real: el mensaje le costaba <b>$15</b> y se veía barato. El cliente que COMPRÓ le costó <b>$711, 47 veces más</b>. Si solo ves el costo por mensaje, crees que vas bien mientras pierdes dinero entre cada paso.",
  hoy:"Divide lo que invertiste el mes pasado entre los clientes nuevos que SÍ pagaron. Ese es tu CAC real. Si no tienes ese número, ahí está tu primer problema.",
  why34:"Tu CAC global (lo que gastaste en anuncios entre los clientes que te pagaron) ya lo conoces. Te dice si ganas o pierdes en total, pero no qué anuncio apagar ni a cuál subirle. El anuncio con los mensajes más baratos puede ser el que te trae los clientes más caros. En tu etapa, el CAC se saca por campaña, por conjunto de anuncios y por anuncio.",
  hoy34:"Ponle una clave a cada anuncio (A1.1, A1.2…) en el mensaje que se abre en WhatsApp cuando lo pican. Tu equipo apunta por chat: fecha · clave · ¿compró? Cuando cada anuncio haya gastado dos veces y media tu CAC global, divides lo gastado entre los que compraron, y sabes qué anuncio te trae clientes de verdad.",
  pasos34:["Cuando alguien pica tu anuncio, se le abre WhatsApp con un <b>mensaje ya escrito</b> (el clásico \"Hola, me interesa…\"). Ese mensaje lo decides TÚ al crear el anuncio. Ponle una <b>clave distinta a cada anuncio</b>: A1.1, A1.2, B2.1… La letra es la campaña, el primer número es el conjunto de anuncios y el segundo es el anuncio.<div class=\"wa-mock\"><div class=\"wa-b\">Hola, me interesa 😊 <mark>(A1.1)</mark></div><div class=\"wa-b\">Hola, me interesa 😊 <mark>(A1.2)</mark></div><div class=\"wa-cap\">Así te llega el chat: la clave viaja sola, sin que el cliente haga nada. (Si alguien la borra, pregúntale de qué anuncio te encontró.)</div></div><div class=\"tell-box\">¿Alguien más te maneja las campañas? Mándale esto tal cual: <i>\"Cámbiame el mensaje de bienvenida de cada anuncio para que traiga una clave distinta entre paréntesis: (A1.1), (A1.2)…\"</i></div>","Tu equipo apunta 3 cosas de cada chat que llegue, en papel o en Excel, da igual:<table class=\"reg-mock\"><tr><th>Fecha</th><th>Clave</th><th>¿Compró?</th></tr><tr><td>3 jul</td><td>A1.1</td><td>❌</td></tr><tr><td>3 jul</td><td>A1.2</td><td>✅</td></tr><tr><td>4 jul</td><td>A1.2</td><td>✅</td></tr></table>","Cuando cada anuncio haya gastado dos veces y media tu CAC global (lo que hoy te cuesta un cliente en promedio), haz una cuenta por cada clave: <b>lo que gastaste en ese anuncio ÷ sus compradores</b>. Ejemplo: gastaste $1,500 en A1.2 y te compraron 5 → cada cliente de A1.2 te costó <b>$300</b>. Ese es tu CAC por anuncio."],
  reto34:"Haz la cuenta con dos anuncios y ponlos lado a lado. Si el de los mensajes más baratos no es el de los clientes más baratos, ya sabes a cuál subirle.",
  hoyPasos:["Suma lo que gastaste en anuncios el mes pasado.","Cuenta los clientes nuevos que SÍ pagaron ese mes. No mensajes, no citas: los que pagaron.","Divide. Ese es tu costo por cliente de hoy.","Compáralo con lo que te deja un cliente después de costos. Si el costo por cliente se come más de la mitad de lo que te deja, ahí está tu freno, no en los anuncios.","Para la semana que entra: ponle una clave a cada anuncio en el mensaje que abre WhatsApp (A1.1, A1.2). Tu equipo apunta fecha, clave y si compró. Cuando cada anuncio haya gastado lo de una prueba completa (dos veces y media lo que te cuesta un cliente), divides por anuncio."],
  cl:{"def":"CAC significa <b>Costo de Adquisición de Cliente</b>: cuánto dinero te cuesta conseguir UN paciente que paga. No un mensaje, no una cita agendada, un paciente que llegó y pagó.","why":"Una clínica real: el mensaje le costaba <b>$15</b> y se veía barato. El paciente que PAGÓ le costó <b>$711, 47 veces más</b>. Si solo ves el costo por mensaje, crees que vas bien mientras pierdes dinero entre cada paso.","hoy":"Divide lo que invertiste el mes pasado entre los pacientes nuevos que SÍ pagaron. Ese es tu CAC real. Si no tienes ese número, ahí está tu primer problema.","hoyPasos":["Suma lo que gastaste en anuncios el mes pasado.","Cuenta los pacientes nuevos que SÍ pagaron ese mes. No mensajes, no citas agendadas: las que llegaron y pagaron.","Divide. Ese es tu costo por paciente de hoy.","Compáralo con lo que te deja un paciente después de insumos y cabina. Si el costo por paciente se come más de la mitad de lo que te deja, ahí está tu freno, no en los anuncios.","Para la semana que entra: ponle una clave a cada anuncio en el mensaje que abre WhatsApp (A1.1, A1.2). Tu recepción apunta fecha, clave y si agendó y llegó. Cuando cada anuncio haya gastado lo de una prueba completa (dos veces y media lo que te cuesta un paciente nuevo), divides por anuncio."],"ofWin":"Saber, campaña por campaña, cuáles te traen pacientes a un costo que te deja dinero y cuáles te lo cobran. Con eso apagas la que se pasa y le subes a la que aguanta, con números, no a ojo. No te prometo un número: depende de tu margen y de tu zona.","why34":"Tu CAC global (lo que gastaste en anuncios entre los pacientes que te pagaron) ya lo conoces. Te dice si ganas o pierdes en total, pero no qué anuncio apagar ni a cuál subirle. El anuncio con los mensajes más baratos puede ser el que te trae los pacientes más caros. En tu etapa, el CAC se saca por campaña, por conjunto de anuncios y por anuncio.","hoy34":"Ponle una clave a cada anuncio (A1.1, A1.2…) en el mensaje que se abre en WhatsApp cuando lo pican. Tu equipo apunta por chat: fecha · clave · ¿pagó? Cuando cada anuncio haya gastado dos veces y media tu CAC global, divides lo gastado entre los que pagaron, y sabes qué anuncio te trae pacientes de verdad.","pasos34":["Cuando alguien pica tu anuncio, se le abre WhatsApp con un <b>mensaje ya escrito</b> (el clásico \"Hola, me interesa…\"). Ese mensaje lo decides TÚ al crear el anuncio. Ponle una <b>clave distinta a cada anuncio</b>: A1.1, A1.2, B2.1… La letra es la campaña, el primer número es el conjunto de anuncios y el segundo es el anuncio.<div class=\"wa-mock\"><div class=\"wa-b\">Hola, me interesa 😊 <mark>(A1.1)</mark></div><div class=\"wa-b\">Hola, me interesa 😊 <mark>(A1.2)</mark></div><div class=\"wa-cap\">Así te llega el chat: la clave viaja sola, sin que el paciente haga nada. (Si alguien la borra, pregúntale de qué anuncio te encontró.)</div></div><div class=\"tell-box\">¿Alguien más te maneja las campañas? Mándale esto tal cual: <i>\"Cámbiame el mensaje de bienvenida de cada anuncio para que traiga una clave distinta entre paréntesis: (A1.1), (A1.2)…\"</i></div>","Tu equipo apunta 3 cosas de cada chat que llegue, en papel o en Excel, da igual:<table class=\"reg-mock\"><tr><th>Fecha</th><th>Clave</th><th>¿Pagó?</th></tr><tr><td>3 jul</td><td>A1.1</td><td>❌</td></tr><tr><td>3 jul</td><td>A1.2</td><td>✅</td></tr><tr><td>4 jul</td><td>A1.2</td><td>✅</td></tr></table>","Cuando cada anuncio haya gastado dos veces y media tu CAC global (lo que hoy te cuesta un paciente en promedio), haz una cuenta por cada clave: <b>lo que gastaste en ese anuncio ÷ los pacientes que pagaron</b>. Ejemplo: gastaste $1,500 en A1.2 y te pagaron 5 → cada paciente de A1.2 te costó <b>$300</b>. Ese es tu CAC por anuncio."],"reto34":"Haz la cuenta con dos anuncios y ponlos lado a lado. Si el de los mensajes más baratos no es el de los pacientes más baratos, ya sabes a cuál subirle.","why4":"Tu CAC por anuncio ya lo tienes. Lo que no te dice es cuánto te cuesta el paciente <b>EXTRA</b> cuando le subes al presupuesto. El promedio del mes se puede ver bien mientras los pacientes que te trajo el aumento te salieron mucho más caros. Si solo ves el promedio, sigues subiendo presupuesto a un costo que ya no te deja.","pasos4":["Toma los dos últimos meses en que le subiste al presupuesto. Apunta de cada uno cuánto gastaste y cuántos pacientes nuevos te pagaron.","Saca el costo de los pacientes extra: <b>lo que gastaste de más ÷ los pacientes de más</b>. Ejemplo: pasaste de $150,000 a $200,000 y de 300 a 340 pacientes. Los $50,000 extra te trajeron 40 pacientes: <b>$1,250 cada uno</b>, contra $500 que te costaban antes.","Compara ese número contra lo que te deja un paciente. Si el paciente extra te cuesta más de lo que te deja, no le sigas subiendo así. En 9 de cada 10 cuentas que reviso, eso no es que Meta ya no dé: es cómo están armadas las campañas. Antes de pensar en otra plaza, abre otros objetivos: además de mensajes, una campaña con formulario y una que agende o venda directo."],"reto4":"Tu CAC promedio te dice cuánto te costó el mes. El del paciente extra te dice si vale la pena el siguiente aumento."},
  ofName:"Cuánto puedes pagar por un cliente (tu CAC máximo)",
  ofPrice:50,
  ofHook:"Subirle al presupuesto sin saber cuánto puedes pagar por cliente es apostar. Este número te dice cuándo subirle y cuándo apagar.",
  ofWin:"Saber, campaña por campaña, cuáles te traen clientes a un costo que te deja dinero y cuáles te lo cobran. Con eso apagas la que se pasa y le subes a la que aguanta, con números, no a ojo. No te prometo un número: depende de tu margen y de tu mercado.",
  ofFor:"Es para ti si ya inviertes fuerte y llevas meses vendiendo lo mismo. No es para ti si todavía no sabes cuánto te cuesta una venta en total.",
  ofTime:"Una tarde para sacar tu número. Una semana para tener el costo por campaña.",
  ofOut:"Cuatro cosas que vas a tener escritas al terminar.",
  ofOutList:["Tu CAC máximo: lo más que puedes pagar por un cliente sin perder, sacado de tu margen.","Tu costo por cliente de hoy, en total y por campaña.","Tu regla de decisión: cuál campaña apagar, cuál dejar y a cuál subirle.","Tu clave por anuncio, para saber de qué anuncio salió cada venta aunque cierres por WhatsApp."],
  ofBullets:["Dos videos cortos:<ul class=\"g-sub\"><li><b>Video 1:</b> cómo sacar tu CAC máximo con tu precio y tus costos, y por qué el mensaje barato puede ser el cliente más caro. Con casos reales de varios giros.</li><li><b>Video 2:</b> la hoja de CAC con veredictos, en vivo. La lleno con los números de una cuenta real y te enseño a leer cuál campaña apagar y a cuál subirle.</li></ul>","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das tu precio, tus costos, lo que gastaste en anuncios y tus ventas por campaña, y te saca tu CAC máximo, tu costo por cliente de hoy y el veredicto de cada campaña. Si te faltan números, te dice cuáles juntar.","La hoja de CAC con veredictos lista para copiar, con una llena de ejemplo, y la ficha de una hoja con tu número y tu regla."],
  why4:"Tu CAC por anuncio ya lo tienes. Lo que no te dice es cuánto te cuesta el cliente <b>EXTRA</b> cuando le subes al presupuesto. El promedio del mes se puede ver bien mientras los clientes que te trajo el aumento te salieron mucho más caros. Si solo ves el promedio, sigues subiendo presupuesto a un costo que ya no te deja.",
  pasos4:["Toma los dos últimos meses en que le subiste al presupuesto. Apunta de cada uno cuánto gastaste y cuántos clientes nuevos te compraron.","Saca el costo de los clientes extra: <b>lo que gastaste de más ÷ los clientes de más</b>. Ejemplo: pasaste de $150,000 a $200,000 y de 300 a 340 clientes. Los $50,000 extra te trajeron 40 clientes: <b>$1,250 cada uno</b>, contra $500 que te costaban antes.","Compara ese número contra lo que te deja un cliente. Si el cliente extra te cuesta más de lo que te deja, no le sigas subiendo así. En 9 de cada 10 cuentas que reviso, eso no es que Meta ya no dé: es cómo están armadas las campañas. Antes de pensar en otra plaza, abre otros objetivos: además de mensajes, una campaña con formulario y una que agende o venda directo."],
  reto4:"Tu CAC promedio te dice cuánto te costó el mes. El del cliente extra te dice si vale la pena el siguiente aumento."},
 {l:"Tasa de cierre",
  sig:"T.C.",
  g:2,
  x:"De cada 10 que te escriben, cuántos compran.",
  def:"De cada 10 personas que te escriben, cuántas terminan comprando. Si te escriben 100 y compran 7, tu tasa de cierre es 7%.",
  why:"Un negocio real recibía <b>5,800 mensajes al mes y solo 380 agendaban (6 de cada 100)</b>. El otro 94% se perdía en WhatsApp sin que nadie lo midiera, y por eso nadie lo arreglaba.",
  hoy:"Cuenta tus últimos 50 chats: ¿cuántos terminaron en cita o venta? Ese porcentaje es tu tasa real de cierre.",
  why34:"Tu tasa global esconde <b>en qué paso</b> se te va la gente. Hay tres caídas: de mensaje a cita (o cotización), de cita a que llegue (o de cotización a que te conteste), y de ahí a que pague. Cada una se arregla distinto. Un negocio real: 5,800 mensajes al mes, 380 citas… y de los que agendaban, la mitad no llegaba. Eran dos fugas distintas, y arreglar la equivocada es tiempo tirado.",
  hoy34:"Toma tus últimos 50 chats y saca 3 números: cuántos pidieron cita o cotización, cuántos llegaron o te contestaron, y cuántos compraron. Tu peor caída de las tres es TU problema, no \"el cierre\" en general.",
  pasos34:["Abre tus últimos 50 chats y saca 3 números: cuántos <b>pidieron cita o cotización</b>, cuántos <b>llegaron o te contestaron</b>, cuántos <b>compraron</b>.<table class=\"reg-mock\"><tr><th>Chats</th><th>Piden cita o cotización</th><th>Llegan o contestan</th><th>Compran</th></tr><tr><td>50</td><td>15</td><td>8</td><td>5</td></tr></table>","Compara los 3 pasos y encuentra tu <b>caída más grande</b>. En el ejemplo: de 50 a 15 se fueron 35. Esa es la fuga.","Cada caída tiene su arreglo, y el primer paso de cada uno es gratis y de HOY: · <b>Pocos piden cita o cotización</b> → regla de equipo: ningún chat se termina sin ofrecer el siguiente paso con día y hora (\"¿Te agendo el jueves a las 4 o mejor el sábado?\"). · <b>Piden y no llegan</b> → si es cita: confirmación doble por WhatsApp, un mensaje la tarde anterior y otro la mañana de la cita; al que no confirma se le ofrece reagendar. Si es cotización: al día siguiente, una pregunta: \"¿Te quedó alguna duda de la cotización?\". · <b>Llegan y no compran</b> → cerrar con opciones, nunca con \"¿lo piensas?\": \"¿Te lo llevas completo o empezamos con la primera parte?\". <b>Arregla SOLO tu caída más grande y vuelve a contar tus 3 números en 2 semanas.</b>"],
  reto34:"Cuenta los tres números hoy, antes de decidir qué arreglar.",
  ofName:"Tu tasa de cierre, por paso",
  ofPrice:50,
  ofBullets:["El video donde reviso los 3 caminos de cierre: cita, cotización y directo","La hoja de los 3 caminos que te dice en qué paso estás perdiendo gente","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das tus números y te dice en qué paso se te van"],
  why4:"Tu tasa global ya la conoces. A tu nivel, lo que se te va se esconde en las diferencias: entre sucursales si tienes más de una, entre las personas que contestan, y entre las tres caídas. Dos personas o dos sucursales con los mismos mensajes pueden estar cerrando una mucho más que la otra, y el promedio te lo tapa.",
  pasos4:["Pide las <b>3 tasas</b> de los últimos 50 chats, por sucursal si tienes más de una, o por persona si no.","Compara cuántos compran de cada 100 chats en la mejor contra la peor. Esa diferencia, multiplicada por los chats que atiende la peor, son <b>las ventas que ya pagaste con anuncios y no se cerraron</b>.","Toma la caída más grande de la más floja. Ese es tu primer arreglo, y ya sabes cómo se hace: la mejor ya lo está haciendo."],
  reto4:"Antes de traer más mensajes, haz que todas cierren como la mejor.",
  cl:{"why34":"Tu tasa global esconde <b>en qué paso</b> se te va la gente. Hay tres caídas: de mensaje a cita, de cita a que llegue, y de que llega a que pague. Cada una se arregla distinto. Un negocio real: 5,800 mensajes al mes, 380 citas… y de los que agendaban, la mitad no llegaba. Eran dos fugas distintas, y arreglar la equivocada es tiempo tirado.","hoy34":"Toma tus últimos 50 chats y saca 3 números: cuántos agendaron, cuántos llegaron y cuántos pagaron. Tu peor caída de las tres es TU problema, no \"el cierre\" en general.","pasos34":["Abre tus últimos 50 chats y saca 3 números: cuántos <b>agendaron</b>, cuántos <b>llegaron</b>, cuántos <b>pagaron</b>.<table class=\"reg-mock\"><tr><th>Chats</th><th>Agendan</th><th>Llegan</th><th>Pagan</th></tr><tr><td>50</td><td>15</td><td>8</td><td>5</td></tr></table>","Compara los 3 pasos y encuentra tu <b>caída más grande</b>. En el ejemplo: de 50 a 15 se fueron 35. Esa es la fuga.","Cada caída tiene su arreglo, y el primer paso de cada uno es gratis y de HOY: · <b>Pocos agendan</b> → regla de equipo: ningún chat se termina sin ofrecer día y hora (\"¿Te agendo el jueves a las 4 o mejor el sábado?\"). · <b>Agendan y no llegan</b> → confirmación doble por WhatsApp: un mensaje la tarde anterior y otro la mañana de la cita; al que no confirma se le ofrece reagendar. · <b>Llegan y no pagan</b> → cerrar con opciones, nunca con \"¿lo piensas?\": \"¿Empezamos con el paquete completo o con la primera sesión?\". <b>Arregla SOLO tu caída más grande y vuelve a contar tus 3 números en 2 semanas.</b>"],"pasos4":["Pide las <b>3 tasas</b> de los últimos 50 chats, por sucursal si tienes más de una, o por persona si no.","Compara cuántos pagan de cada 100 chats en la mejor contra la peor. Esa diferencia, multiplicada por los chats que atiende la peor, son <b>los pacientes que ya pagaste con anuncios y no llegaron a pagar</b>.","Toma la caída más grande de la más floja. Ese es tu primer arreglo, y ya sabes cómo se hace: la mejor ya lo está haciendo."]}},
 {l:"ROAS",
  sig:"ROAS",
  g:2,
  x:"Cuántas veces recuperas lo que metes en anuncios.",
  def:"ROAS significa <b>retorno de tu inversión en anuncios</b>: por cada peso que metes a publicidad, cuántos regresan en ventas. ROAS de 3 = metes $1 y regresan $3.",
  why:"Sin este número no puedes decidir si apagar una campaña o subirle: lo decides por corazonada. Y las corazonadas en anuncios salen caras.",
  hoy:"Divide lo que vendiste en el mes por anuncios entre lo que gastaste en anuncios. Compara el resultado contra tu ROAS de equilibrio: el mínimo que necesitas para no perder dinero con lo que te deja cada venta. Si estás abajo, cada peso que le subes te hace perder.",
  why34:"Tu ROAS real lo tienes que sacar tú: <b>ventas cerradas ÷ lo que gastaste en anuncios</b>. Si vendes por WhatsApp, Meta no te lo da, porque no sabe qué mensajes terminaron en venta. Y el número del mes mezcla todo: una campaña que te regresa 5 veces lo que le metes puede estar tapando a una que pierde, mientras el promedio te dice \"vamos bien\". En tu etapa, el ROAS se saca por campaña.",
  hoy34:"Calcula tu ROAS real del mes (ventas cerradas ÷ lo que gastaste en anuncios). Luego pártelo por campaña, aunque sea a mano. La que salga abajo del promedio es la primera que revisas.",
  pasos34:["Suma tus <b>ventas cerradas del mes</b> que vinieron de anuncios (en pesos, las de verdad). ¿Aún no tienes las claves por anuncio? Usa tus clientes NUEVOS del mes como aproximación.","Divídelas entre lo que <b>gastaste en anuncios</b> ese mes. Ejemplo: vendiste $54,000 y gastaste $30,000 → ROAS real de <b>1.8</b>. Si vendes por WhatsApp, ese número Meta no te lo da: hoy decides tu presupuesto sin él. Apúntalo cada mes y decide con ése.","Repite la cuenta <b>por campaña</b> (si ya tienes las claves por anuncio, ya tienes cómo). La que salga abajo del promedio es la primera que revisas."],
  reto34:"Sin ese número, cada vez que le subes al presupuesto no sabes si te va a regresar.",
  ofName:"Tu ROAS de equilibrio y tu ROAS objetivo",
  ofPrice:50,
  ofBullets:["El video donde saco el ROAS de equilibrio y el objetivo con números reales en pantalla","La hoja donde metes precio y costo y te dice si tu ROAS de hoy gana o pierde dinero","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das tu precio y tu costo y te calcula tu ROAS de equilibrio sin que abras una hoja"],
  pasos4:["Pide de tu CRM las <b>ventas cerradas del mes, separadas por campaña</b>. Si tu CRM no te lo da en 5 minutos, anótalo: eso también es parte del diagnóstico.","Divide entre la inversión del mes → tu ROAS real. Si ya le regresas tus ventas a Meta, ponlo junto al ROAS que Meta te reporta. Si no cuadran, o a Meta no le están llegando todas tus ventas, o se está llevando crédito de ventas que no vinieron de sus anuncios: las dos cosas se revisan. Si no le regresas tus ventas, Meta no te reporta ROAS, y ese ya es el hallazgo.","Pártelo <b>por campaña</b>, y por sucursal si tienes más de una. La que salga abajo del promedio es la primera que revisas, y el tema de tu próxima junta."],
  reto4:"Si el dato tarda más en llegar que en calcularse, el problema no es el ROAS: es el acceso al número.",
  cl:{"pasos34":["Suma tus <b>ventas cerradas del mes</b> que vinieron de anuncios (en pesos, las de verdad). ¿Aún no tienes las claves por anuncio? Usa tus pacientes NUEVOS del mes como aproximación.","Divídelas entre lo que <b>gastaste en anuncios</b> ese mes. Ejemplo: vendiste $54,000 y gastaste $30,000 → ROAS real de <b>1.8</b>. Si vendes por WhatsApp, ese número Meta no te lo da: hoy decides tu presupuesto sin él. Apúntalo cada mes y decide con ése.","Repite la cuenta <b>por campaña</b> (si ya tienes las claves por anuncio, ya tienes cómo). La que salga abajo del promedio es la primera que revisas."]}},
 {l:"Atribución",
  sig:"ATRIB",
  g:2,
  x:"De cada venta, saber de qué anuncio salió.",
  def:"Atribuir = saber <b>de qué anuncio salió cada venta</b>. Sin esto, no sabes cuál anuncio te da clientes y cuál nada más gasta.",
  why:"Si no sabes de qué anuncio salió cada venta, no sabes cuál apagar ni a cuál subirle. Y es el paso antes del que sigue: que Meta también lo sepa. Hoy Meta solo ve mensajes, y si tu campaña le pide mensajes, te trae gente que manda mensajes, no gente que compra.",
  hoy:"De tus últimas 10 ventas, ¿sabes de qué anuncio salió cada una? Si no, hoy no sabes cuál anuncio te trae ventas y cuál nada más gasta.",
  why34:"Meta le busca a tu anuncio más gente que haga lo que tu campaña le pide. Si tu campaña le pide mensajes, te trae <b>gente que manda mensajes</b>, no gente que compra. Y eso pasa todos los días, con todo tu presupuesto: ningún anuncio nuevo lo compensa. Lo que toca en tu etapa son dos cosas: que tus ventas cerradas le lleguen a Meta, y que tus campañas le pidan ventas, no mensajes.",
  hoy34:"De tus últimas 10 ventas, di de qué anuncio salió cada una. Si no puedes con 10, Meta tampoco lo sabe, y sigue aprendiendo de los que no compran.",
  pasos34:["Agarra tus <b>últimas 10 ventas</b> y escribe de qué anuncio salió cada una (si ya montaste las claves de CAC, usa esas).","Cuenta cuántas pudiste responder <b>con certeza</b>. ¿Menos de 8? Entonces Meta tampoco lo sabe, y está aprendiendo de los que NO compran.","Hazle UNA pregunta a quien maneja tus campañas:<div class=\"tell-box\">Mándale esto tal cual: <i>\"¿Le estamos regresando a Meta las ventas cerradas, sí o no?\"</i> Si te dice que sí, pídele UNA prueba: una captura del <b>Administrador de Eventos</b> donde se vea el evento de compra recibido ESTA semana. Si la captura no llega en un día, la respuesta real era no.</div>"],
  reto34:"Una pregunta de sí o no. Si es no, ya sabes por qué Meta te trae gente que no compra.",
  ofName:"Saber de qué anuncio sale cada venta, y que Meta lo sepa también",
  ofPrice:149,
  ofBullets:["El video donde armo las 2 partes: llevar tú la cuenta de qué anuncio trajo cada venta, y regresarle tus ventas a Meta para que aprenda de ellas","Las claves por anuncio listas para pegar","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le cuentas cómo vendes hoy y te dice qué ruta te toca"],
  def4:"Atribuir tiene dos pasos: que TÚ sepas de qué anuncio salió cada venta, y que META lo sepa también. El primero te dice qué apagar. El segundo le enseña a Meta a quién buscarte.",
  pasos4:["Hazle UNA pregunta a quien maneja tus campañas:<div class=\"tell-box\">Mándale esto tal cual: <i>\"¿Le estamos regresando a Meta las ventas cerradas, sí o no?\"</i> Si te dice que sí, pídele una captura del <b>Administrador de Eventos</b> donde se vea el evento de compra recibido ESTA semana.</div>","Si sí llegan, compara cuántas ventas recibió Meta la semana pasada contra cuántas cerraste tú. Cada venta que no le llega es una venta de la que Meta no aprende.","Si no llegan, o llegan días después, esa es tu tarea del mes. Se conecta una vez y de ahí corre solo. Y ya que lleguen, cambia al menos una campaña para que le pida ventas a Meta, no mensajes."],
  reto4:"Si la captura no llega en un día, la respuesta real era no.",
  cl:{"why34":"Meta le busca a tu anuncio más gente que haga lo que tu campaña le pide. Si tu campaña le pide mensajes, te trae <b>gente que manda mensajes</b>, no pacientes que pagan. Y eso pasa todos los días, con todo tu presupuesto: ningún anuncio nuevo lo compensa. Lo que toca en tu etapa son dos cosas: que tus ventas cerradas le lleguen a Meta, y que tus campañas le pidan pacientes que pagan, no mensajes."}},
 {l:"Utilidad",
  sig:"UTIL",
  g:2,
  x:"Lo que de verdad te queda después de costos.",
  def:"Lo que de verdad te queda en la bolsa después de pagar todo: insumos, comisiones, publicidad, equipo.",
  why:"Puedes vender más que nunca y ganar menos que nunca. El volumen esconde el hoyo: sin utilidad por servicio, no sabes cuál te da de comer y cuál te está costando.",
  hoy:"Toma tu servicio estrella: precio menos TODOS sus costos (insumos, comisiones, anuncios). Lo que queda es tu utilidad real por venta.",
  why34:"La utilidad global esconde cosas: un producto o servicio puede estar pagando las pérdidas de otro sin que lo veas. Puedes estar metiéndole anuncios justo al que MENOS te deja, y vender más para ganar menos. En tu etapa, la utilidad se saca <b>por producto o servicio</b>, y luego por campaña.",
  hoy34:"Toma tus 2 productos o servicios más vendidos. A cada uno réstale todos sus costos: insumos, comisiones, tiempo de tu equipo y su parte de anuncios. Compara lo que te deja cada venta de uno contra el otro.",
  pasos34:["Elige tus <b>2 productos o servicios más vendidos</b>.","A cada uno réstale TODO lo que cuesta darlo: insumos, comisión de quien vende, y su parte de publicidad.<table class=\"reg-mock\"><tr><th></th><th>Precio</th><th>Costos</th><th>Te queda</th></tr><tr><td>Servicio A</td><td>$1,800</td><td>$1,350</td><td>$450</td></tr><tr><td>Servicio B</td><td>$3,500</td><td>$1,400</td><td><b>$2,100</b></td></tr></table>","Compara lo que te <b>queda</b> por venta de cada uno. Si el que más vendes no es el que más te deja, ya sabes a cuál meterle los anuncios."],
  reto34:"Haz la resta esta semana. Si el que más vendes es el que menos te deja, cada anuncio que le metes te hace trabajar más por menos.",
  ofName:"Cuánto te deja cada venta (y si aguanta subir el precio)",
  ofPrice:50,
  ofBullets:["El video donde saco cuánto deja de verdad cada venta, con los números en pantalla","La hoja que te dice cuánto te queda de cada venta y si tus costos se están comiendo tu precio","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das tu precio y tus costos y te dice si aguanta una subida"],
  why4:"Tu utilidad global ya la conoces. La pregunta de tu etapa es si la tienes <b>por producto o servicio</b>, y por sucursal si tienes más de una. Cuando el número es uno solo, uno puede estar pagando las pérdidas de los otros sin que nadie lo vea, y le puedes estar subiendo presupuesto justo al que menos te deja.",
  pasos4:["Pide a tu equipo lo que te dejó <b>cada producto o servicio</b> el mes pasado, y cada sucursal si tienes más de una. Si tardan más de un día en dártelo, ese ya es el hallazgo: decides sin ese número.","Marca el que MENOS te deja por venta, y fíjate cuánto de tu presupuesto de anuncios se le está yendo.","Decide UN cambio este mes: pasa presupuesto del que menos te deja al que más. Con el número en la mano."],
  reto4:"Un cambio al mes, con este número, antes de tocar cualquier campaña.",
  cl:{"why4":"Tu utilidad global ya la conoces. La pregunta de tu etapa es si la tienes <b>por tratamiento</b>, y por sucursal si tienes más de una. Cuando el número es uno solo, un tratamiento o una sucursal puede estar pagando las pérdidas de los demás sin que nadie lo vea, y le puedes estar subiendo presupuesto justo al que menos te deja.","why34":"La utilidad global esconde cosas: un tratamiento puede estar pagando las pérdidas de otro sin que lo veas. Puedes estar metiéndole anuncios justo al que MENOS te deja, y vender más para ganar menos. En tu etapa, la utilidad se saca <b>por tratamiento</b>, y luego por campaña.","hoy34":"Toma tus 2 tratamientos más vendidos. A cada uno réstale todos sus costos: insumos, comisiones, tiempo de tu equipo y su parte de anuncios. Compara lo que te deja cada venta de uno contra el otro.","pasos34":["Elige tus <b>2 tratamientos más vendidos</b>.","A cada uno réstale TODO lo que cuesta darlo: insumos, comisión de quien vende, y su parte de publicidad.<table class=\"reg-mock\"><tr><th></th><th>Precio</th><th>Costos</th><th>Te queda</th></tr><tr><td>Tratamiento A</td><td>$1,800</td><td>$1,350</td><td>$450</td></tr><tr><td>Tratamiento B</td><td>$3,500</td><td>$1,400</td><td><b>$2,100</b></td></tr></table>","Compara lo que te <b>queda</b> por venta de cada uno. Si el que más vendes no es el que más te deja, ya sabes a cuál meterle los anuncios."],"pasos4":["Pide a tu equipo lo que te dejó <b>cada tratamiento</b> el mes pasado, y cada sucursal si tienes más de una. Si tardan más de un día en dártelo, ese ya es el hallazgo: decides sin ese número.","Marca el que MENOS te deja por venta, y fíjate cuánto de tu presupuesto de anuncios se le está yendo.","Decide UN cambio este mes: pasa presupuesto del que menos te deja al que más. Con el número en la mano."]}},
 {l:"Venta mensual",
  sig:"VENTA",
  g:2,
  x:"Cuánto vendes al mes y qué tan predecible es.",
  def:"Cuánto vendes al mes, y si ese número sube, baja o se sostiene. En esta etapa lo que falta no es vender más: es saber cuánto deberías vender y por qué un mes sale flojo.",
  why:"Sin objetivo, cada mes es \"a ver cómo sale\". Y si no cuentas tus ventas cada semana, el mes flojo se descubre cuando ya pasó y ya no se puede arreglar.",
  hoy:"Ponle número a tu mes y cuenta tu semana. Media hora, hoy.",
  hoyPasos:["Escribe tu objetivo del mes en tres números: el mínimo (con el que no pierdes), el ideal y el espectacular.","Divide el mínimo entre lo que te paga un cliente en promedio. Esas son las ventas que necesitas al mes.","Esta semana cuenta cuántas ventas cerraste.","Compara: si las ventas de esta semana, por cuatro, no llegan a las que necesitas, ya sabes que el mes va flojo antes de que termine."],
  why34:"Vender bien este mes te dice poco si no sabes <b>de qué está hecho el número</b>: cuánto fue cliente nuevo (caro, porque lo pagaste con anuncios) y cuánto fue cliente que ya era tuyo (barato, porque ya no lo pagas otra vez). Y la pregunta de tu etapa: ¿puedes ver hoy tu venta del PRÓXIMO mes? Lo que ya tienes agendado o apartado es venta futura que ya puedes contar.",
  hoy34:"Parte tu venta del mes pasado en dos: clientes nuevos y clientes que ya eran tuyos. Luego cuenta lo que ya tienes agendado o apartado para los próximos 15 días. Si ese número está flaco, tu buen mes ya se está acabando, aunque todavía no lo sientas.",
  pasos34:["Parte tu venta del mes pasado en dos montones: <b>clientes nuevos</b> (los que trajeron los anuncios) y <b>clientes que ya eran tuyos</b>.","Cuenta lo que ya tienes <b>agendado o apartado</b> para los próximos 15 días: citas, pedidos, anticipos. Esa es tu venta futura visible.","Léelo así: mucho nuevo + poco agendado = <b>tu buen mes ya se está acabando</b>, aunque todavía no se sienta.","¿Salió flaco? Lo más barato para llenarlo no son más anuncios: son tus <b>clientes dormidos</b>. Hoy mismo manda mensaje a 20 clientes que no te compran desde hace 3 meses o más, por su nombre y con una razón para volver: \"Hola Ana, hace rato que no sabemos de ti. Esta semana tengo [algo para ti], ¿te lo aparto?\". Con que 3 compren, el hueco del próximo mes ya empezó a llenarse sin pagar anuncios."],
  reto34:"Cada lunes, revisa lo agendado a 15 días. ¿Salió flaco? Ese mismo lunes salen 20 mensajes a clientes dormidos.",
  ofName:"Tu objetivo, tu presupuesto y tus números de la semana",
  ofPrice:50,
  ofHook:"Un mes bien y otro flojo no es mala suerte. Es que nadie está viendo los números cada semana.",
  ofWin:"Saber cada semana si vas bien o mal, y por qué. Fijas tu objetivo del mes, tu presupuesto deja de subir y bajar por corazonada, y cada viernes ves en qué paso se te fue la gente: si no te escribieron, si no apartaron o si no pagaron. Con eso decides con números si le subes, la dejas igual o apagas un anuncio. No te prometo un número: depende de tu oferta y de cuánto te escriben hoy.",
  ofFor:"Es para ti si ya vendes con anuncios y un mes sale bien y otro no. No es para ti si todavía no vendes con anuncios.",
  ofTime:"Una tarde para armarlo y 10 minutos cada viernes para llenarlo.",
  ofOut:"Cuatro cosas que vas a tener escritas al terminar.",
  ofOutList:["Tu objetivo del mes en tres números: el mínimo, el ideal y el espectacular.","Tu presupuesto del mes, fijo, sacado de tu objetivo y de lo que te cuesta una venta.","Tu hoja de la semana con 4 números: mensajes, apartados, pagados y cuánto te costó cada venta.","Tu regla de cada viernes: cuándo subirle, cuándo dejarla igual y cuándo apagar un anuncio."],
  ofBullets:["Dos videos cortos:<ul class=\"g-sub\"><li><b>Video 1:</b> cómo poner tu objetivo en tres números y sacar de ahí tu presupuesto del mes. Con casos reales de varios giros.</li><li><b>Video 2:</b> la hoja de la semana, en vivo. La lleno con los números de un negocio real y te enseño a leer el veredicto de cada viernes.</li></ul>","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das tus ventas de los últimos 3 meses y lo que gastaste en anuncios, y te saca tu objetivo en tres números, tu presupuesto y cuánto te está costando cada venta. Si te faltan números, te dice cuáles juntar.","La hoja de la semana lista para copiar, con una llena de ejemplo, y la ficha de una hoja con tu objetivo y tu regla del viernes."],
  cl:{"def":"Cuánto vendes al mes, y si ese número sube, baja o se sostiene. En esta etapa lo que falta no es más pacientes: es saber cuánto deberías vender y por qué un mes sale flojo.","why":"Sin objetivo, cada mes es \"a ver cómo sale\". Y si no cuentas tus ventas cada semana, el mes flojo se descubre cuando ya pasó y ya no se puede arreglar.","hoyPasos":["Escribe tu objetivo del mes en tres números: el mínimo (con el que no pierdes), el ideal y el espectacular.","Divide el mínimo entre lo que te paga un paciente en promedio. Esos son los pacientes que necesitas al mes.","Esta semana cuenta cuántos pacientes llegaron y pagaron.","Compara: si los pacientes de esta semana, por cuatro, no llegan a los que necesitas, ya sabes que el mes va flojo antes de que termine."],"ofWin":"Saber cada semana si vas bien o mal, y por qué. Fijas tu objetivo del mes, tu presupuesto deja de subir y bajar por corazonada, y cada viernes ves en qué paso se te fue la gente: si no te escribieron, si no agendaron o si no llegaron. Con eso decides con números si le subes, la dejas igual o apagas un anuncio. No te prometo un número: depende de tus tratamientos y de cuántas te escriben hoy.","ofFor":"Es para ti si tu clínica ya agenda con anuncios y un mes sale bien y otro no. No es para ti si todavía no usas anuncios.","ofOutList":["Tu objetivo del mes en tres números: el mínimo, el ideal y el espectacular.","Tu presupuesto del mes, fijo, sacado de tu objetivo y de lo que te cuesta cada paciente nuevo.","Tu hoja de la semana con 4 números: mensajes, citas agendadas, citas que llegaron y pagaron, y cuánto te costó cada paciente.","Tu regla de cada viernes: cuándo subirle, cuándo dejarla igual y cuándo apagar un anuncio."],"ofBullets":["Dos videos cortos:<ul class=\"g-sub\"><li><b>Video 1:</b> cómo poner tu objetivo en tres números y sacar de ahí tu presupuesto del mes. Con casos reales de clínicas.</li><li><b>Video 2:</b> la hoja de la semana, en vivo. La lleno con los números de una clínica real y te enseño a leer el veredicto de cada viernes.</li></ul>","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das tus ventas de los últimos 3 meses y lo que gastaste en anuncios, y te saca tu objetivo en tres números, tu presupuesto y cuánto te está costando cada paciente nuevo. Si te faltan números, te dice cuáles juntar.","La hoja de la semana lista para copiar, con una llena de ejemplo, y la ficha de una hoja con tu objetivo y tu regla del viernes."],"why34":"Vender bien este mes te dice poco si no sabes <b>de qué está hecho el número</b>: cuánto fue paciente nuevo (caro, porque lo pagaste con anuncios) y cuánto fue paciente que regresa (barato, porque ya no lo pagas otra vez). Y la pregunta de tu etapa: ¿puedes ver hoy tu venta del PRÓXIMO mes? Las citas ya agendadas son venta futura que ya puedes contar.","hoy34":"Parte tu venta del mes pasado en dos: pacientes nuevos y pacientes que regresan. Luego cuenta las citas ya agendadas para los próximos 15 días. Si ese número está flaco, tu buen mes ya se está acabando, aunque todavía no lo sientas.","pasos34":["Parte tu venta del mes pasado en dos montones: <b>pacientes nuevos</b> (los que trajeron los anuncios) y <b>pacientes que ya eran tuyos</b>.","Cuenta las <b>citas ya agendadas</b> para los próximos 15 días. Ese número es tu venta futura visible.","Léelo así: mucho nuevo + pocas citas futuras = <b>tu buen mes ya se está acabando</b>, aunque todavía no se sienta.","¿Salieron flacas tus citas futuras? Lo más barato para llenarlas no son más anuncios: son tus <b>pacientes dormidos</b>. Hoy mismo manda mensaje a 20 pacientes que no vienen desde hace 3 meses o más, por su nombre y con una razón para volver: \"Hola Ana, ya te toca tu retoque. Esta semana tengo dos espacios, ¿te aparto uno?\". Con que 3 agenden, el hueco del próximo mes ya empezó a llenarse sin pagar anuncios."],"reto34":"Cada lunes, revisa tus citas a 15 días. ¿Salieron flacas? Ese mismo lunes salen 20 mensajes a pacientes dormidos."},
  def34:"Cuánto vendes al mes, de qué está hecho ese número, y cuánto del próximo mes ya puedes ver hoy."},
 {l:"Oferta",
  sig:"OFERTA",
  g:0,
  x:"Lo que vendes y si la gente de verdad lo quiere.",
  def:"Tu oferta es lo que prometes, a qué precio y con qué garantía. Está validada cuando la gente paga por ella sin que tengas que convencerla de a uno.",
  why:"Si tu oferta no convence, todo lo demás empuja en vano: el mejor anuncio del mundo no vende algo que la gente no quiere comprar.",
  hoy:"Revisa tus últimos 10 clientes: ¿compraron lo que TÚ querías vender, o lo que ellos pidieron? Esa diferencia te dice cuál es tu oferta real.",
  why34:"Si cada cliente te compra <b>una sola vez</b>, los anuncios tienen que pagar TODO tu crecimiento solos. Pasa cuando no hay un siguiente paso claro después de la primera compra: la venta se queda ahí. Y si tu anuncio vende directo lo más caro, cada cliente te cuesta más de conseguir.",
  hoy34:"De tus últimos 20 clientes nuevos, ¿cuántos te compraron algo más en los siguientes 60 días? Si son menos de 6, tu freno no es atraer: es que no hay un siguiente paso después de la primera compra.",
  pasos34:["De tus <b>últimos 20 clientes nuevos</b>, cuenta cuántos te compraron algo MÁS en los 60 días siguientes.","¿Salieron menos de 6? Tu freno no es atraer: es que <b>no hay un siguiente paso natural</b> que comprarte después de lo primero.","Escribe en una línea qué le ofrecerías a alguien que ACABA de comprarte, y <b>mándasela esta semana por WhatsApp a tus últimos 10 compradores</b>: \"¿Cómo te fue con [lo que compraste]? Lo que sigue después de eso es [siguiente paso]. Si te interesa, esta semana te doy [beneficio]\". Si compran 2, ya vendiste sin pagar anuncios, y probaste tu siguiente paso con dinero real."],
  reto34:"20 clientes, un número. Si sale menos de 6, ahí hay ventas que ya pagaste y no estás cobrando.",
  ofName:"¿Tu oferta ya está validada?",
  ofPrice:50,
  ofBullets:["El video donde aplico el test de 8 preguntas a una oferta real","El test que te da el veredicto: validada, a medias, o no le metas más anuncios todavía","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Te hace las 8 preguntas y te da tu veredicto"],
  cl:{"why34":"Si cada paciente viene <b>una sola vez</b>, los anuncios tienen que pagar TODO tu crecimiento solos. Pasa cuando no hay un siguiente paso claro después del primer tratamiento: la venta se queda ahí. Y si tu anuncio vende directo lo más caro, cada paciente te cuesta más de conseguir.","hoy34":"De tus últimos 20 pacientes nuevos, ¿cuántos regresaron por algo más en los siguientes 60 días? Si son menos de 6, tu freno no es atraer: es que no hay un siguiente paso después del primer tratamiento.","pasos34":["De tus <b>últimos 20 pacientes nuevos</b>, cuenta cuántos regresaron por algo MÁS en los 60 días siguientes.","¿Salieron menos de 6? Tu freno no es atraer: es que <b>no hay un siguiente paso natural</b> después de su primer tratamiento.","Escribe en una línea qué le ofrecerías a alguien que ACABA de venir, y <b>mándasela esta semana por WhatsApp a tus últimos 10 pacientes</b>: \"¿Cómo te fue con [tu tratamiento]? Lo que sigue después de eso es [siguiente paso]. Si te interesa, esta semana te doy [beneficio]\". Si agendan 2, ya vendiste sin pagar anuncios, y probaste tu siguiente paso con dinero real."],"reto34":"20 pacientes, un número. Si sale menos de 6, ahí hay ventas que ya pagaste y no estás cobrando."}},
 {l:"Cliente",
  sig:"CLIENTE",
  g:0,
  x:"Qué tan claro tienes a quién le vendes.",
  def:"Tu cliente ideal es la persona que te compra más fácil y paga sin regatear. No es \"todos los que puedan pagar\": es un perfil concreto, con nombre y apellido en tu cabeza.",
  why:"Cuando le hablas a todos, Facebook no sabe a quién buscarte, y te trae gente que pregunta pero no compra. Cuando sabes a quién le hablas, cada cliente te cuesta menos.",
  hoy:"Describe a tu mejor cliente en una línea: quién es, qué compró y por qué a ti. Si no te sale a la primera, eso es lo que te falta.",
  hoyPasos:["Escoge a tus últimos 10 compradores y anota qué comparten: edad, sexo, zona y qué te compraron.","Escríbeles por WhatsApp: \"Te doy un descuento en tu próxima compra si me contestas dos preguntas\":<ul class=\"u-sub\"><li>¿Por qué me compraste a mí?</li><li>¿Qué fue lo que más te gustó?</li></ul>","Junta las respuestas. Se van a repetir: si 6 de 10 dicen lo mismo, esa es la razón real por la que te compran.","Con lo que comparten y lo que se repite, escribe a tu cliente ideal en una línea: quién es y por qué te compra a ti."],
  why34:"Ya sabes a quién le vendes. La pregunta de tu etapa es <b>quién te deja más dinero</b>. No todos los clientes valen igual: unos compran más y regresan; otros regatean, cancelan y desaparecen. Meta te trae más gente como la que ya te escribe, no como la que te conviene, a menos que tú le enseñes cuál es.",
  hoy34:"Saca tus 10 mejores clientes del año por dinero que dejaron (no por frecuencia). Busca qué comparten: por qué servicio entraron, zona, edad, cómo llegaron. Ese patrón es tu cliente real. Compáralo con el que tenías en la cabeza.",
  pasos34:["Saca tus <b>10 mejores clientes del año</b>, por dinero que dejaron, no por caerte bien.","Busca qué comparten: por qué servicio entraron, edad, zona, cómo te encontraron.<table class=\"reg-mock\"><tr><th>Cliente</th><th>Entró por</th><th>Dejó</th></tr><tr><td>Ana</td><td>Servicio B</td><td>$18,400</td></tr><tr><td>Rocío</td><td>Servicio B</td><td>$15,900</td></tr><tr><td>Pau</td><td>Servicio A</td><td>$14,200</td></tr></table>","Escribe el patrón en UNA línea (\"mujer 30-45, entra por Servicio B, zona X\"). Compáralo con el que tus anuncios traen hoy.","Ahora úsalo. Antes, revisa que tu aviso de privacidad te permita usar esos datos para publicidad. Luego exporta tus <b>100 (o más) mejores clientes</b> (nombre y teléfono bastan) y mándaselos a quien maneja tus campañas:<div class=\"tell-box\">Mándale esto tal cual: <i>\"Sube esta lista a Meta como público de clientes, crea un público similar y pruébalo contra el público actual.\"</i></div> Es la forma más directa de decirle a Meta: tráeme MÁS de éstos, sin un peso extra de presupuesto. (El patrón se encuentra con 10; el público necesita 100+: Meta no acepta listas chicas.)"],
  reto34:"Si tu anuncio no le habla a ese patrón, estás pagando por traer al equivocado.",
  ofName:"Tu cliente, tu oferta y tu anuncio",
  ofPrice:50,
  ofHook:"Tus clientes ya te dijeron qué venderles y cómo anunciarlo. Está en tu WhatsApp.",
  ofWin:"Hacer anuncios que le hablen al cliente que sí quieres, no a todo el mundo. Eso cambia quién te escribe: más gente del tipo que buscas y menos de la que te hace perder el tiempo. Y deja de irse dinero en hablarle a quien nunca te iba a comprar. No te prometo un número: depende de tu oferta y de tu mercado.",
  ofOut:"Cuatro cosas que vas a tener escritas al terminar: tu cliente ideal en una línea. Por qué te compra a ti, con sus palabras exactas. Tu oferta en una frase, con precio. Y tu primer anuncio, hecho por ti con el prompt: el texto, el titular y qué imagen ponerle.",
  ofOutList:["Tu cliente ideal en una línea.","Por qué te compra a ti, con sus palabras exactas.","Tu oferta en una frase, con precio.","Tu primer anuncio, hecho por ti con el prompt: el texto, el titular y qué imagen ponerle."],
  ofBullets:["Dos videos cortos:<ul class=\"g-sub\"><li><b>Video 1:</b> cómo distinguir a tu cliente y sacar sus motivadores de tus chats, y cómo armar tu oferta en una frase. Con casos reales de varios giros, incluido qué hacer si tienes menos de 10 compradores.</li><li><b>Video 2:</b> tu anuncio con IA, en vivo. Cómo correr el prompt con tus chats y salir con un anuncio listo para subir.</li></ul>","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das tus chats y te va llevando: tu cliente, sus motivadores, tu oferta y tu anuncio. Si solo le das tus opiniones, te pide los chats.","La ficha de una hoja para guardar lo que salió, con una llena de ejemplo."],
  ofTime:"Una tarde. Los chats ya los tienes en tu WhatsApp.",
  ofFor:"Es para ti si vendes por mensaje y todavía le hablas a todo el mundo. No es para ti si ya sabes a quién le vendes y por qué: tu siguiente paso es otro.",
  cl:{"def":"Tu paciente ideal es la persona que te agenda más fácil y paga sin regatear. No es \"todos los que puedan pagar\": es un perfil concreto, con nombre y apellido en tu cabeza.","why":"Cuando le hablas a todos, Facebook no sabe a quién buscarte, y te trae gente que pregunta pero no agenda. Cuando sabes a quién le hablas, cada paciente te cuesta menos.","hoy":"Describe a tu mejor paciente en una línea: quién es, qué tratamiento se hizo y por qué contigo. Si no te sale a la primera, eso es lo que te falta.","hoyPasos":["Escoge a tus últimos 10 pacientes que pagaron y anota qué comparten: edad, zona y qué tratamiento se hicieron.","Escríbeles por WhatsApp: \"Te doy un descuento en tu próxima cita si me contestas dos preguntas\":<ul class=\"u-sub\"><li>¿Por qué me elegiste a mí?</li><li>¿Qué fue lo que más te gustó el tratamiento?</li></ul>","Junta las respuestas. Se van a repetir: si 6 de 10 dicen lo mismo, esa es la razón real por la que te compran.","Con lo que comparten y lo que se repite, escribe a tu paciente ideal en una línea: quién es y por qué te elige a ti."],"ofHook":"Tus pacientes ya te dijeron qué ofrecerles y cómo anunciarlo. Está en tu WhatsApp.","ofWin":"Hacer anuncios que le hablen al paciente que sí quieres, no a todo el mundo. Eso cambia quién te escribe: más gente del tipo que buscas y menos de la que pregunta precio y desaparece. Y deja de irse dinero en hablarle a quien nunca iba a agendar. No te prometo un número: depende de tu oferta y de tu zona.","ofOutList":["Tu paciente ideal en una línea.","Por qué te elige a ti, con sus palabras exactas.","Tu oferta en una frase, con precio.","Tu primer anuncio, hecho por ti con el prompt: el texto, el titular y qué imagen ponerle."],"ofFor":"Es para ti si tu clínica agenda por WhatsApp y todavía le hablas a todo el mundo. No es para ti si ya sabes a quién le hablas y por qué: tu siguiente paso es otro.","ofName":"Tu paciente, tu oferta y tu anuncio","ofBullets":["Dos videos cortos:<ul class=\"g-sub\"><li><b>Video 1:</b> cómo distinguir a tu paciente y sacar sus motivadores de tus chats, y cómo armar tu oferta en una frase. Con casos reales de clínicas, incluido qué hacer si tienes menos de 10 pacientes que pagaron.</li><li><b>Video 2:</b> tu anuncio con IA, en vivo. Cómo correr el prompt con tus chats y salir con un anuncio listo para subir.</li></ul>","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das tus chats y te va llevando: tu paciente, sus motivadores, tu oferta y tu anuncio. Si solo le das tus opiniones, te pide los chats.","La ficha de una hoja para guardar lo que salió, con una llena de ejemplo."],"why34":"Ya sabes a quién le vendes. La pregunta de tu etapa es <b>quién te deja más dinero</b>. No todos los pacientes valen igual: unos dejan más, regresan y llegan a sus citas; otros regatean, cancelan y no llegan. Meta te trae más gente como la que ya te escribe, no como la que te conviene, a menos que tú le enseñes cuál es.","hoy34":"Saca tus 10 mejores pacientes del año por dinero que dejaron (no por frecuencia). Busca qué comparten: por qué tratamiento entraron, zona, edad, cómo llegaron. Ese patrón es tu paciente real. Compáralo con el que tenías en la cabeza.","pasos34":["Saca tus <b>10 mejores pacientes del año</b>, por dinero que dejaron, no por caerte bien.","Busca qué comparten: por qué tratamiento entraron, edad, zona, cómo te encontraron.<table class=\"reg-mock\"><tr><th>Paciente</th><th>Entró por</th><th>Dejó</th></tr><tr><td>Ana</td><td>Tratamiento B</td><td>$18,400</td></tr><tr><td>Rocío</td><td>Tratamiento B</td><td>$15,900</td></tr><tr><td>Pau</td><td>Tratamiento A</td><td>$14,200</td></tr></table>","Escribe el patrón en UNA línea (\"mujer 30-45, entra por Tratamiento B, zona X\"). Compáralo con el que tus anuncios traen hoy.","Ahora úsalo. Antes, revisa que tu aviso de privacidad te permita usar esos datos para publicidad. Luego exporta tus <b>100 (o más) mejores pacientes</b> (nombre y teléfono bastan) y mándaselos a quien maneja tus campañas:<div class=\"tell-box\">Mándale esto tal cual: <i>\"Sube esta lista a Meta como público de pacientes, crea un público similar y pruébalo contra el público actual.\"</i></div> Es la forma más directa de decirle a Meta: tráeme MÁS de éstos, sin un peso extra de presupuesto. (El patrón se encuentra con 10; el público necesita 100+: Meta no acepta listas chicas.)"]}},
 {l:"Equipo de ventas",
  sig:"EQUIPO",
  g:0,
  x:"Quién contesta a quien te escribe, y si le vende.",
  def:"Es quien contesta cuando alguien te escribe: si sabe distinguir quién sí va a comprar, darle seguimiento y cerrar, o si solo contesta preguntas.",
  why:"Sin un paso a paso, cada quien contesta como puede, y tus ventas dependen del humor del día. Cuando todos siguen los mismos pasos (saludo, pregunta, precio, ofrecer apartar), sabes qué funciona y lo puedes enseñar.",
  hoy:"Lee los últimos 10 chats de tu equipo: ¿en cuántos ofrecieron agendar o cerrar, y en cuántos solo contestaron la pregunta y esperaron?",
  why34:"Con equipo, tu problema ya no es que contesten. Es que tu mejor persona puede estar cerrando mucho más que la peor con la misma gente que escribe, y no sabes por qué. Cada chat que cae con la persona equivocada es dinero de anuncios tirado. Contestar bien se puede enseñar, pero solo si lo mides.",
  hoy34:"Saca la tasa de cierre POR PERSONA de las últimas 50 personas que escribieron (cuántas le tocaron a cada quien y a cuántas les vendió). La diferencia entre la mejor y la peor, multiplicada por los chats que atiende la peor, son las ventas que se te van por no emparejar al equipo.",
  pasos34:["Cuenta <b>por persona</b>: de las últimas 50 personas que escribieron, cuántas le tocaron a cada quien y a cuántas les vendió. (¿Todos contestan del mismo WhatsApp y no sabes quién fue? Divide por turnos: mañana vs tarde. La brecha aparece igual.)<table class=\"reg-mock\"><tr><th>Persona</th><th>Chats</th><th>Cierres</th><th>Tasa</th></tr><tr><td>Karla</td><td>25</td><td>8</td><td><b>32%</b></td></tr><tr><td>Luis</td><td>25</td><td>3</td><td>12%</td></tr></table>","La diferencia entre la mejor y el resto, multiplicada por los chats que atienden los demás, son <b>las ventas que ya pagaste con anuncios y no se cerraron</b>. Ejemplo: 32% contra 12% es una diferencia de 20%. Si a los demás les tocan 250 chats al mes, son 50 ventas.","Lee 5 chats de cada quien buscando UNA diferencia: ¿la mejor OFRECE agendar y los demás solo contestan la pregunta? Cuando la encuentres, <b>conviértela en regla para todos ese mismo día</b>: \"ningún chat se termina sin ofrecer día y hora\". Vuelve a medir por persona en 2 semanas. Si la brecha se cierra, subiste ventas sin un peso más de anuncios."],
  reto34:"Multiplica la diferencia por los chats que atienden los demás. Esas son las ventas que se te van por no emparejar al equipo.",
  ofName:"El checklist de tu equipo",
  ofPrice:50,
  ofBullets:["El video donde reviso un chat real con el checklist","El checklist con puntaje que le pasas a cada persona de tu equipo","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das el chat y te da el puntaje sin que tú lo hagas"],
  why4:"Tu equipo ya tiene guion. Lo que no sabes es <b>en qué parte de la plática se pierden las ventas</b>: en el saludo, en el precio, en la cita o en el seguimiento. Sin leer los chats no hay forma de saberlo, y con tu volumen nadie tiene tiempo de leerlos todos. Un guion que nadie revisa contra los chats de verdad se queda igual por meses, aunque lo que pregunta la gente ya cambió.",
  pasos4:["Toma <b>20 chats de la semana pasada que NO terminaron en venta</b>, repartidos entre tu equipo.","En cada uno marca en qué momento se cayó: no se contestó a tiempo · se dio el precio sin explicar · no se ofreció día y hora · no hubo seguimiento · otro.","El momento que más se repite es la parte del guion que toca cambiar esta semana. Cámbiala, y en 2 semanas revisa otros 20 chats."],
  reto4:"Un guion que no se revisa contra los chats de verdad se queda viejo, aunque nadie lo note.",
  cl:{"def":"Es quien contesta cuando alguien te escribe: si sabe distinguir quién sí va a agendar, darle seguimiento y cerrar la cita, o si solo contesta preguntas.","why34":"Con recepción, tu problema ya no es que contesten. Es que tu mejor persona puede estar agendando mucho más que la peor con la misma gente que escribe, y no sabes por qué. Cada chat que cae con la persona equivocada es dinero de anuncios tirado. Contestar bien se puede enseñar, pero solo si lo mides.","why4":"Tu recepción ya tiene guion. Lo que no sabes es <b>en qué parte de la plática se pierden las citas</b>: en el saludo, en el precio, al ofrecer la cita o en el seguimiento. Sin leer los chats no hay forma de saberlo, y con tu volumen nadie tiene tiempo de leerlos todos. Un guion que nadie revisa contra los chats de verdad se queda igual por meses, aunque lo que pregunta la gente ya cambió.","pasos4":["Toma <b>20 chats de la semana pasada que NO terminaron en cita</b>, repartidos entre tu recepción.","En cada uno marca en qué momento se cayó: no se contestó a tiempo · se dio el precio sin explicar · no se ofreció día y hora · no hubo seguimiento · otro.","El momento que más se repite es la parte del guion que toca cambiar esta semana. Cámbiala, y en 2 semanas revisa otros 20 chats."],"hoy34":"Saca la tasa de citas POR PERSONA de las últimas 50 personas que escribieron (cuántas le tocaron a cada quien y a cuántas les agendó). La diferencia entre la mejor y la peor, multiplicada por los chats que atiende la peor, son las citas que se te van por no emparejar a tu recepción.","pasos34":["Cuenta <b>por persona</b>: de las últimas 50 personas que escribieron, cuántas le tocaron a cada quien y a cuántas les agendó. (¿Todos contestan del mismo WhatsApp y no sabes quién fue? Divide por turnos: mañana vs tarde. La brecha aparece igual.)<table class=\"reg-mock\"><tr><th>Persona</th><th>Chats</th><th>Citas</th><th>Tasa</th></tr><tr><td>Karla</td><td>25</td><td>8</td><td><b>32%</b></td></tr><tr><td>Luis</td><td>25</td><td>3</td><td>12%</td></tr></table>","La diferencia entre la mejor y el resto, multiplicada por los chats que atienden los demás, son <b>las citas que ya pagaste con anuncios y no se agendaron</b>. Ejemplo: 32% contra 12% es una diferencia de 20%. Si a los demás les tocan 250 chats al mes, son 50 citas.","Lee 5 chats de cada quien buscando UNA diferencia: ¿la mejor OFRECE agendar y los demás solo contestan la pregunta? Cuando la encuentres, <b>conviértela en regla para todos ese mismo día</b>: \"ningún chat se termina sin ofrecer día y hora\". Vuelve a medir por persona en 2 semanas. Si la brecha se cierra, subiste citas sin un peso más de anuncios."],"reto34":"Multiplica la diferencia por los chats que atienden los demás. Esas son las citas que se te van por no emparejar a tu recepción."}},
 {l:"Respuesta a leads",
  sig:"RESP.",
  g:0,
  x:"Qué tan rápido contestas a quien te escribe.",
  def:"Cuánto tarda alguien de tu negocio en contestar el primer mensaje, y si contesta igual a las 10 de la noche que a las 10 de la mañana.",
  why:"Un estudio publicado en Harvard Business Review revisó 2,241 empresas: las que contestaron en menos de una hora tuvieron <b>más de 6 veces más probabilidad</b> de lograr una conversación de venta con ese interesado que las que contestaron después de una hora. El que espera horas ya le escribió a otro.",
  hoy:"Saca tus últimos 10 mensajes que llegaron de anuncios y mide cuánto tardaste en contestar cada uno.",
  why34:"Ya contestas rápido… en horario de oficina. Pero una parte de la gente te escribe <b>cuando no estás</b>: en la noche y el fin de semana, que es cuando tiene tiempo de ver el celular. Si alguien te escribe el viernes a las 9 de la noche y le contestas el lunes, para entonces ya pudo haber comprado en otro lado. Tu promedio se ve bien; lo que se te va está fuera de horario.",
  hoy34:"Toma las últimas 20 personas que te escribieron, con la hora en que escribieron y la hora en que se les contestó. Sepáralas: horario de oficina y fuera de horario. El segundo número es el que te está costando.",
  pasos34:["Toma las <b>últimas 20 personas que te escribieron</b>: apunta a qué hora escribió cada una y a qué hora se le contestó.","Sepáralos en dos montones: <b>horario de oficina</b> vs <b>fuera de horario</b> (noches y fin de semana).","Saca el promedio de respuesta de cada montón. El segundo número es el que te está costando ventas.","Mientras armas quién conteste fuera de horario, arréglalo en parte HOY, gratis, en 5 minutos: WhatsApp Business → Ajustes → Herramientas para la empresa → <b>Mensaje de ausencia</b>. Prográmalo para noches y fin de semana, y que no diga \"te contestamos luego\": que AVANCE la venta: <i>\"¡Hola! Ahorita no estamos en línea. Dime qué te interesa y mañana a primera hora te mando precio y disponibilidad.\"</i> El que contesta eso ya no es alguien que se enfrió para el lunes: es una venta a medio camino."],
  reto34:"Saca tu número de fuera de horario esta semana. Si tardas horas en contestar, ahí se te están yendo ventas.",
  hoyPasos:["Apunta a qué hora llegó cada mensaje y a qué hora contestaste.","Sepáralos en dos montones: los que llegaron en tu horario y los que llegaron de noche o en fin de semana.","Cuenta cuántos pasaron de 10 minutos. Esos son los que más fácil se te van.","Hoy mismo, gratis: en WhatsApp Business pon un mensaje de ausencia para noches y fin de semana que avance la venta: \"Ahorita no estamos en línea. Dime qué te interesa y qué día te queda bien, y mañana a primera hora te lo aparto.\""],
  cl:{"pasos34":["Toma las <b>últimas 20 personas que te escribieron</b>: apunta a qué hora escribió cada una y a qué hora se le contestó.","Sepáralos en dos montones: <b>horario de oficina</b> vs <b>fuera de horario</b> (noches y fin de semana).","Saca el promedio de respuesta de cada montón. El segundo número es el que te está costando ventas.","Mientras armas quién conteste fuera de horario, arréglalo en parte HOY, gratis, en 5 minutos: WhatsApp Business → Ajustes → Herramientas para la empresa → <b>Mensaje de ausencia</b>. Prográmalo para noches y fin de semana, y que no diga \"te contestamos luego\": que AVANCE la venta: <i>\"¡Hola! Ahorita no estamos en línea. Dime qué tratamiento te interesa y qué día te gustaría venir, y mañana a primera hora te agendo.\"</i> El que contesta eso ya no es alguien que se enfrió para el lunes: es una cita a medio agendar."]}},
 {l:"Generación de ads",
  sig:"ADS",
  g:1,
  x:"Cómo produces tus anuncios: al azar o con sistema.",
  def:"Cómo produces anuncios nuevos: cuántos sacas al mes, con qué ideas y cómo decides cuál se queda.",
  why:"Sin una forma fija de hacer anuncios, cada uno es a ver si pega. Con una forma fija (qué momento del cliente, qué promesa, qué formato, qué primera línea), cada anuncio es una prueba que te enseña algo, funcione o no.",
  hoy:"Abre tus últimos 3 anuncios: ¿la primera línea dice qué, cuánto y cuándo (\"...$1,200, citas mañana\"), o abre con rodeos?",
  why34:"Ya corres campañas. El problema de tu etapa es que tus anuncios ganadores se desgastan (la misma gente los ve una y otra vez) y no hay nuevos listos para relevarlos. Cuando el ganador deja de funcionar, las ventas caen y nadie sabe por qué. Sin una forma fija de sacar anuncios nuevos (qué momento del cliente, qué promesa, qué formato, qué primera línea), cada anuncio nuevo es a ver si pega.",
  hoy34:"Abre tus 3 anuncios activos más viejos y mira su frecuencia de los últimos 30 días. Arriba de 3 es señal de que la misma gente ya lo vio varias veces y lo está ignorando. Anota cuáles necesitan relevo esta semana.",
  pasos34:["Abre tus <b>3 anuncios con más tiempo corriendo</b> y apunta su FRECUENCIA <b>de los últimos 30 días</b> (el Administrador de anuncios la muestra: es cuántas veces lo vio la misma persona. Sin la ventana de fechas, un anuncio sano puede parecer quemado).","Los que estén <b>arriba de 3</b>: márcalos. Es señal de que esa gente ya los vio varias veces y los está ignorando. Y pídele HOY a quien maneja tus campañas <b>un relevo para cada marcado esta semana</b>: misma promesa, formato distinto.","Pregunta a quien maneja tus campañas:<div class=\"tell-box\">Mándale esto tal cual: <i>\"¿Cuántos anuncios NUEVOS probamos este mes?\"</i> Si son menos de 4, no hay relevos: el día que tu anuncio ganador deje de funcionar, no hay con qué reponerlo.</div>"],
  reto34:"Revisa la frecuencia cada semana. Arriba de 3, ya toca relevo.",
  ofName:"Anuncios que venden",
  ofPrice:99,
  ofBullets:["El video donde saco ideas de anuncios de lo que tus clientes ya te dijeron","Cuándo apagar un anuncio antes de que te siga cobrando","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das tu anuncio ganador y te saca ideas nuevas cuando el tuyo deja de funcionar"],
  why4:"Que el costo suba cuando le subes al presupuesto, en 9 de cada 10 cuentas que reviso, no es que Meta ya no dé: es cómo están armadas las campañas. Meta de verdad topado se ve en tres números al mismo tiempo, durante tres meses: el alcance no crece aunque gastes más, la frecuencia sube en la gente que todavía no te conoce, y los anuncios nuevos no bajan el costo.",
  pasos4:["Pide estos tres números de los <b>últimos 3 meses</b>: a cuánta gente distinta llegaste, la frecuencia en públicos que todavía no te conocen, y lo que te cuesta cada mensaje con los anuncios nuevos contra los viejos.","Si los tres se cumplen los tres meses, Meta sí está topado para ti. Si falta uno, no: lo que toca es cómo están armadas tus campañas.","Antes de abrir otra plaza u otro canal, abre objetivos: además de campañas de mensajes, una con formulario y una que agende o venda directo."],
  reto4:"Tres números, tres meses. Si no se cumplen los tres, la plaza nueva todavía no es la respuesta.",
  cl:{"why34":"Ya corres campañas. El problema de tu etapa es que tus anuncios ganadores se desgastan (la misma gente los ve una y otra vez) y no hay nuevos listos para relevarlos. Cuando el ganador deja de funcionar, las ventas caen y nadie sabe por qué. Sin una forma fija de sacar anuncios nuevos (qué momento del paciente, qué promesa, qué formato, qué primera línea), cada anuncio nuevo es a ver si pega."}},
 {l:"Creatividades",
  sig:"CREAT.",
  g:1,
  x:"La calidad y el método detrás de tus anuncios.",
  def:"Los anuncios en sí: el video, la imagen y el texto. Se queman, y hay que saber cuándo cambiarlos.",
  why:"En Meta, el anuncio en sí (la foto, el video y el texto) es de lo que más mueve el resultado, porque Meta decide a quién enseñárselo según cómo responde la gente. Publicar \"lo que se ve bonito\" sin método es pagar por aprender lo que otros ya pagaron.",
  hoy:"De tus últimos 5 anuncios, ¿cuál trajo CLIENTES (no likes)? Si no puedes contestar con datos, empieza por ahí.",
  why34:"Ya tuviste anuncios que funcionaron. La pregunta de tu etapa: ¿sabes <b>por qué</b> funcionaron? Si no puedes desarmar tu anuncio ganador (qué promete la primera línea, a qué momento del cliente le habla, qué lo hace creíble), no lo puedes repetir: solo copiarlo hasta que deja de funcionar. Guardar anuncios ganadores sin saber por qué ganaron no te da el siguiente.",
  hoy34:"Toma tu mejor anuncio y contesta 3 cosas: ¿qué promete la primera línea? ¿le habla al que ya te conoce o al que no? ¿qué lo hace creíble? Si alguna no sale, tienes un anuncio ganador que no puedes repetir.",
  pasos34:["Toma tu <b>mejor anuncio histórico</b> (el que sí trajo clientes).","Contéstale 3 preguntas: ¿qué promete la primera línea? · ¿le habla al que ya te conoce o al que no? · ¿qué lo hace creíble (precio, foto real, testimonio)?","Escribe UNA variante cambiando <b>solo el formato</b> (misma promesa, otra foto o video). <b>Mándasela hoy a quien publica tus anuncios</b> para que corra junto al original desde esta semana. Si la variante funciona igual, ya sabes que lo que vende es la promesa, no la foto."],
  reto34:"Si las 3 preguntas no salen, tienes un anuncio ganador que no puedes repetir, y el siguiente va a depender de la suerte.",
  ofName:"Anuncios que venden",
  ofPrice:99,
  ofBullets:["El video donde saco ideas de anuncios de lo que tus clientes ya te dijeron","Cuándo apagar un anuncio antes de que te siga cobrando","El prompt: un texto listo que le pegas a Claude (una inteligencia artificial gratis, como ChatGPT). Le das tu anuncio ganador y te saca ideas nuevas cuando el tuyo deja de funcionar"],
  cl:{"why34":"Ya tuviste anuncios que funcionaron. La pregunta de tu etapa: ¿sabes <b>por qué</b> funcionaron? Si no puedes desarmar tu anuncio ganador (qué promete la primera línea, a qué momento del paciente le habla, qué lo hace creíble), no lo puedes repetir: solo copiarlo hasta que deja de funcionar. Guardar anuncios ganadores sin saber por qué ganaron no te da el siguiente.","pasos34":["Toma tu <b>mejor anuncio histórico</b> (el que sí trajo pacientes).","Contéstale 3 preguntas: ¿qué promete la primera línea? · ¿le habla al que ya te conoce o al que no? · ¿qué lo hace creíble (precio, foto real, testimonio)?","Escribe UNA variante cambiando <b>solo el formato</b> (misma promesa, otra foto o video). <b>Mándasela hoy a quien publica tus anuncios</b> para que corra junto al original desde esta semana. Si la variante funciona igual, ya sabes que lo que vende es la promesa, no la foto."]}},
 {l:"Automatización",
  sig:"AUTOM.",
  g:1,
  x:"Qué tanto de tu proceso corre solo (CRM, mensajes automáticos).",
  def:"Lo que pasa solo, sin que alguien de tu equipo lo haga a mano: respuestas, seguimientos, recordatorios.",
  why:"Lo manual aguanta hasta que creces: personas que escribieron y nadie anotó, seguimientos olvidados, ventas que se enfrían de noche. No se trata de robots: se trata de que nada se caiga.",
  hoy:"Cuenta cuántas personas que te escribieron la semana pasada NO recibieron ni un seguimiento. Cada una de esas ya la pagaste.",
  why34:"Tener CRM no es lo mismo que usarlo completo. Lo que cuesta es <b>lo que se escapa entre un paso y otro</b>: la persona que escribió y nunca quedó registrada, el seguimiento que dependía de la memoria de alguien, la venta que se cerró y nadie anotó. Cada escape es dinero que ya pagaste con anuncios. Y hay uno que cuesta doble: <b>si la venta no se anota, no puedes saber qué anuncio la trajo</b>.",
  hoy34:"Audita 5 personas que escribieron la semana pasada, de punta a punta: ¿las 5 están en tu CRM? ¿las 5 tuvieron seguimiento a tiempo? ¿las que compraron quedaron REGISTRADAS como venta? Cada \"no\" es un hoyo por donde se va dinero ya pagado.",
  pasos34:["Agarra <b>5 personas que escribieron la semana pasada</b> y síguelos de punta a punta.","Marca tres casillas por persona: ¿quedó en tu CRM? · ¿tuvo seguimiento a tiempo? · si compró, ¿quedó REGISTRADO como compra?<table class=\"reg-mock\"><tr><th>Persona</th><th>¿CRM?</th><th>¿Seguimiento?</th><th>¿Registrado?</th></tr><tr><td>1</td><td>✅</td><td>✅</td><td>✅</td></tr><tr><td>2</td><td>✅</td><td>❌</td><td>N/A</td></tr><tr><td>3</td><td>❌</td><td>N/A</td><td>N/A</td></tr></table>","Cuenta los ❌ y elige el hoyo que más se repitió: ponle una <b>regla de equipo HOY</b> (ej.: \"la venta se anota el mismo día: la anota quien cobra\", o \"el WhatsApp de anuncios se vacía cada mañana: toda persona que escribió queda en el CRM antes de las 10\"). Reaudita 5 personas la próxima semana: los tachones tienen que bajar. Los hoyos no se arreglan con más mensajes: se arreglan con reglas."],
  reto34:"5 personas, 3 casillas. Si salen más de 2 tachones, tu problema no es de anuncios.",
  ofName:"Tu CRM en una hoja",
  ofPrice:99,
  ofBullets:["La plantilla que llenan mis clientes cada día","El video de cómo operarlo y cuándo SÍ te toca bot o CRM de a de veras","La pestaña que te dice en qué paso pierdes gente"],
  why4:"Tu CRM ya existe. La pregunta es qué parte del camino corre <b>sin depender de una persona</b>. Con tu volumen, cada paso a mano es un lugar donde algo se cae todos los días: el mensaje de las 9 de la noche, el seguimiento del viernes, la venta que se cerró en persona y nunca llegó al sistema. Y lo que más cuesta: <b>ventas cerradas que no le llegan a Meta</b>. Sin eso, ninguna campaña puede pedirle ventas a Meta, y te sigue trayendo gente que escribe y no compra.",
  pasos4:["Pide UN número: de las personas que escribieron la semana pasada, ¿a cuántas se les contestó en <b>menos de 15 minutos</b>, contando noches y fines de semana?","Pide otro: ¿cuántas ventas cerradas quedaron <b>registradas el mismo día</b> (no al corte del mes)?","Esos dos números te dicen por dónde empezar. Primero, que cada venta se anote el mismo día (sin eso, ni tú ni Meta saben qué anuncio la trajo). Luego, la respuesta fuera de horario."],
  reto4:"Dos preguntas a tu equipo, dos números. Si alguno tarda en llegar, ya encontraste el primer paso manual que te está costando.",
  cl:{"why4":"Tu CRM ya existe. La pregunta es qué parte del camino corre <b>sin depender de una persona</b>. Con tu volumen, cada paso a mano es un lugar donde algo se cae todos los días: el mensaje de las 9 de la noche, el seguimiento del viernes, la venta que se cerró en persona y nunca llegó al sistema. Y lo que más cuesta: <b>ventas cerradas que no le llegan a Meta</b>. Sin eso, ninguna campaña puede pedirle pacientes que pagan a Meta, y te sigue trayendo gente que escribe y no agenda."}}
];
const LOCKED=[];  // 8.5: fuera las areas con candado (chocaban con lo gratis de E3 y con Utilidad)
/* PRE-READ corto por área (E3/E4) — la espina en 1-2 líneas; el detalle completo vive en su pantalla */
const PRE34={
 'CAC':'Tu CAC global te dice si ganas o pierdes, pero no qué anuncio apagar ni a cuál subirle. En tu etapa se saca por campaña, por conjunto de anuncios y por anuncio.',
 'Tasa de cierre':'Tu tasa global esconde en qué paso se te va la gente. Hay tres caídas, y cada una se arregla distinto.',
 'ROAS':'Si vendes por WhatsApp, Meta no te reporta ROAS. El real lo sacas tú (ventas cerradas ÷ inversión), y por campaña te dice qué apagar.',
 'Atribución':'Meta aprende de lo que le reportas. Si solo le reportas mensajes, te trae gente que manda mensajes, no gente que compra.',
 'Utilidad':'Tu utilidad global esconde qué producto o servicio paga las pérdidas de otro. Puedes estar metiéndole anuncios justo al que menos te deja.',
 'Venta mensual':'Importa de qué está hecha tu venta (clientes nuevos contra clientes que regresan) y cuánta venta del próximo mes ya puedes ver hoy.',
 'Oferta':'Si cada cliente te compra una sola vez, los anuncios tienen que pagar todo tu crecimiento solos.',
 'Cliente':'No todos los clientes valen igual. Meta te trae más de los que ya llegan, no de los que te dejan más dinero.',
 'Equipo de ventas':'Tu mejor persona puede estar cerrando mucho más que la peor con la misma gente que escribe. Esa diferencia es dinero de anuncios que ya pagaste.',
 'Respuesta a leads':'Contestas rápido… en horario de oficina. Los que te escriben a las 9 de la noche o en sábado se enfrían para el lunes.',
 'Generación de ads':'Tus anuncios ganadores se desgastan y no hay nuevos listos para relevarlos. Sin una forma fija de sacar anuncios, cada nuevo es a ver si pega.',
 'Creatividades':'Sabes cuál anuncio ganó, pero no por qué. Y lo que no puedes desarmar, no lo puedes repetir.',
 'Automatización':'Lo que importa es que nada se caiga: personas sin registrar, seguimientos olvidados, ventas sin anotar.'
};
const PRE34_CL={  // 24 sep: version clinica del pre-read (solo donde cambia)
 'Venta mensual':'Importa de qué está hecha tu venta (pacientes nuevos contra pacientes que regresan) y cuánta venta del próximo mes ya puedes ver hoy.',
 'Oferta':'Si cada paciente viene una sola vez, los anuncios tienen que pagar todo tu crecimiento solos.',
 'Equipo de ventas':'Tu mejor persona puede estar agendando mucho más que la peor con la misma gente que escribe. Esa diferencia es dinero de anuncios que ya pagaste.',
 'Atribución':'Meta aprende de lo que le reportas. Si solo le reportas mensajes, te trae gente que manda mensajes, no pacientes que pagan.',
 'Cliente':'No todos los pacientes valen igual. Meta te trae más de los que ya llegan, no de los que te dejan más dinero.'
};
function pre34(l){ return (K()==='clinicas'&&PRE34_CL[l])||PRE34[l]; }
function defE(t,et){ return (et===4&&nk(t,'def4'))||(et>=3&&nk(t,'def34'))||nk(t,'def'); }  // 24 sep: definicion por etapa
/* Ejemplo concreto por área (se enseña en la pantalla de detalle). 8.5: barrido completo + versión clínica */
function exBox(t,thead,rows,p){ return `<div class="ex-box"><div class="ex-t">📊 Ejemplo: ${t}</div><table class="ex-tbl">${thead}${rows}</table><p>${p}</p></div>`; }
const EXAMPLES={}, EXAMPLES_CL={};
EXAMPLES['CAC']=exBox('lo que el Administrador de anuncios te enseña… y lo que no',
 `<tr><th></th><th>Campaña A</th><th>Campaña B</th></tr>`,
 `<tr><td>Costo por mensaje</td><td class="fakewin">$12 · "gana"</td><td>$19</td></tr>
 <tr><td>Mensajes</td><td>250</td><td>160</td></tr>
 <tr><td>Inversión del mes</td><td>$3,000</td><td>$3,040</td></tr>
 <tr class="ex-sep"><td colspan="3">↓ Estas dos filas hoy NO las tienes: se construyen</td></tr>
 <tr><td>Clientes que COMPRARON</td><td>5</td><td>12</td></tr>
 <tr><td><b>CAC real</b></td><td><b>$600</b></td><td class="good"><b>$253 ✓</b></td></tr>`,
 `<b>Misma inversión (unos $3,000 cada una): la A te dio 5 clientes; la B, 12.</b> Viendo solo el costo por mensaje, apagas la B "porque está cara". Viendo el CAC real, la B es la buena: la A te trae gente que pregunta y no compra; la B, gente que compra.`);
EXAMPLES_CL['CAC']=EXAMPLES['CAC'].replace('Clientes que COMPRARON','Pacientes que PAGARON').replace('la A te dio 5 clientes; la B, 12.','la A te dio 5 pacientes; la B, 12.').replace('la A te trae gente que pregunta y no compra; la B, gente que compra.','la A te trae gente que pregunta y no agenda; la B, pacientes que pagan.');
EXAMPLES['Tasa de cierre']=exBox('el embudo de 100 mensajes',
 `<tr><th>Paso</th><th>Siguen</th><th>Se cayeron aquí</th></tr>`,
 `<tr><td>Te escriben</td><td>100</td><td>N/A</td></tr>
 <tr><td>Piden cita o cotización</td><td>30</td><td class="fakewin">70 se fueron sin cita ni cotización</td></tr>
 <tr><td>Llegan o contestan</td><td>15</td><td class="fakewin">15 ya no llegaron ni contestaron</td></tr>
 <tr><td><b>Compran</b></td><td><b>7</b></td><td class="fakewin">8 no compraron</td></tr>`,
 `Tasa global: 7%. Pero ese 7% no es UN problema: son <b>tres fugas distintas</b>, y la más grande (70 personas) está entre el mensaje y la cita. Arreglar la equivocada es tiempo tirado.`);
EXAMPLES_CL['Tasa de cierre']=exBox('el embudo de 100 mensajes',
 `<tr><th>Paso</th><th>Siguen</th><th>Se cayeron aquí</th></tr>`,
 `<tr><td>Te escriben</td><td>100</td><td>N/A</td></tr>
 <tr><td>Agendan cita</td><td>30</td><td class="fakewin">70 se fueron sin cita</td></tr>
 <tr><td>Llegan</td><td>15</td><td class="fakewin">15 no se presentaron</td></tr>
 <tr><td><b>Pagan</b></td><td><b>7</b></td><td class="fakewin">8 no pagaron</td></tr>`,
 `Tasa global: 7%. Pero ese 7% no es UN problema: son <b>tres fugas distintas</b>, y la más grande (70 personas) está entre el mensaje y la cita. Arreglar la equivocada es tiempo tirado.`);
EXAMPLES['ROAS']=exBox('tu ROAS real, del mes y por campaña',
 `<tr><th></th><th>Número</th></tr>`,
 `<tr><td><b>ROAS real del mes</b> (ventas cerradas ÷ inversión)</td><td><b>1.8×</b></td></tr>
 <tr class="ex-sep"><td colspan="2">↓ Y partido por campaña, el 1.8 esconde esto</td></tr>
 <tr><td>Campaña A</td><td class="good">3.5×</td></tr>
 <tr><td>Campaña B</td><td class="fakewin"><b>0.9× (pierde dinero)</b></td></tr>`,
 `El promedio te dice "más o menos". Por campaña te dice <b>qué apagar</b>.`);
EXAMPLES['Atribución']=exBox('qué aprende Meta según lo que le llega',
 `<tr><th>Hoy: Meta no se entera de tus ventas</th><th>Tus ventas le llegan a Meta</th></tr>`,
 `<tr><td>Anuncio → mensajes → ventas… y Meta <b>nunca se entera</b> de las ventas</td><td>Anuncio → mensajes → ventas → <b>la venta le llega a Meta</b></td></tr>
 <tr><td>Meta te busca: <b>más gente que manda mensajes</b></td><td class="good">Meta te busca: <b>gente parecida a la que COMPRA</b></td></tr>`,
 `Mismo presupuesto, mismo anuncio: cambia <b>a quién se lo enseña Meta</b>. Por eso el costo por mensaje puede subir mientras el costo por cliente baja.`);
EXAMPLES_CL['Atribución']=EXAMPLES['Atribución'].replace('gente parecida a la que COMPRA','gente parecida a la que PAGA').replace('el costo por cliente baja','el costo por paciente baja');
EXAMPLES['Utilidad']=exBox('dos servicios del mismo negocio',
 `<tr><th></th><th>Servicio A</th><th>Servicio B</th></tr>`,
 `<tr><td>Precio</td><td>$1,800</td><td>$3,500</td></tr>
 <tr><td>Costos (insumos + comisión + anuncios)</td><td>$1,350</td><td>$1,400</td></tr>
 <tr><td><b>Te queda por venta</b></td><td class="fakewin">$450</td><td class="good"><b>$2,100</b></td></tr>`,
 `Vendes 3 veces más del A… y el B te deja <b>más de 4 veces más por venta</b>. ¿A cuál le estás metiendo los anuncios?`);
EXAMPLES_CL['Utilidad']=EXAMPLES['Utilidad'].replace('dos servicios del mismo negocio','dos tratamientos de la misma clínica').replace(/Servicio A/g,'Tratamiento A').replace(/Servicio B/g,'Tratamiento B');
EXAMPLES['Venta mensual']=exBox('dos meses de $300,000 que NO son iguales',
 `<tr><th></th><th>Mes sano</th><th>Mes frágil</th></tr>`,
 `<tr><td>Clientes nuevos (pagados con anuncios)</td><td>$120,000</td><td class="fakewin">$240,000</td></tr>
 <tr><td>Clientes que regresan</td><td class="good">$180,000</td><td>$60,000</td></tr>
 <tr><td>Ventas ya agendadas o apartadas, próximos 15 días</td><td class="good">34</td><td class="fakewin">9</td></tr>`,
 `Mismo total, negocio distinto: el frágil tiene que pagar CADA venta con anuncios, y lo poco que tiene agendado dice que el mes que viene va a estar flojo.`);
EXAMPLES_CL['Venta mensual']=exBox('dos meses de $300,000 que NO son iguales',
 `<tr><th></th><th>Mes sano</th><th>Mes frágil</th></tr>`,
 `<tr><td>Pacientes nuevos (pagados con anuncios)</td><td>$120,000</td><td class="fakewin">$240,000</td></tr>
 <tr><td>Pacientes que regresan</td><td class="good">$180,000</td><td>$60,000</td></tr>
 <tr><td>Citas ya agendadas, próximos 15 días</td><td class="good">34</td><td class="fakewin">9</td></tr>`,
 `Mismo total, negocio distinto: el frágil tiene que pagar CADA paciente con anuncios, y sus 9 citas futuras dicen que el mes que viene va a estar flojo.`);
EXAMPLES['Oferta']=exBox('mismo costo por cliente, negocio distinto',
 `<tr><th></th><th>Sin siguiente paso</th><th>Con siguiente paso</th></tr>`,
 `<tr><td>Costo por cliente nuevo</td><td>$600</td><td>$600</td></tr>
 <tr><td>Compras por cliente (primer año)</td><td class="fakewin">1</td><td class="good">3</td></tr>
 <tr><td><b>Lo que vale cada cliente</b></td><td class="fakewin">$1,800</td><td class="good"><b>$5,400</b></td></tr>`,
 `El de la izquierda necesita que los anuncios paguen TODO su crecimiento. El de la derecha puede pagar más por cliente que su competencia, <b>y aun así ganar más</b>.`);
EXAMPLES_CL['Oferta']=exBox('mismo costo por paciente, clínica distinta',
 `<tr><th></th><th>Sin siguiente paso</th><th>Con siguiente paso</th></tr>`,
 `<tr><td>Costo por paciente nuevo</td><td>$600</td><td>$600</td></tr>
 <tr><td>Visitas por paciente (primer año)</td><td class="fakewin">1</td><td class="good">3</td></tr>
 <tr><td><b>Lo que vale cada paciente</b></td><td class="fakewin">$1,800</td><td class="good"><b>$5,400</b></td></tr>`,
 `La de la izquierda necesita que los anuncios paguen TODO su crecimiento. La de la derecha puede pagar más por paciente que su competencia, <b>y aun así ganar más</b>.`);
EXAMPLES['Cliente']=exBox('el que llega vs el que conviene',
 `<tr><th></th><th>El que llega de tus anuncios</th><th>Tu mejor cliente</th></tr>`,
 `<tr><td>Pregunta</td><td class="fakewin">"¿Cuánto cuesta?"</td><td class="good">"¿Cómo le hago para apartarlo?"</td></tr>
 <tr><td>Ticket</td><td class="fakewin">bajo</td><td class="good">más alto</td></tr>
 <tr><td>¿Regresa?</td><td class="fakewin">no</td><td class="good">sí, cada mes</td></tr>`,
 `Meta te trae más de los que ya llegan, no de los que te convienen. Hasta que TÚ le enseñes a Meta cómo se ve el bueno, te va a seguir trayendo al de la izquierda.`);
EXAMPLES_CL['Cliente']=exBox('el que llega vs el que conviene',
 `<tr><th></th><th>El que llega de tus anuncios</th><th>Tu mejor paciente</th></tr>`,
 `<tr><td>Pregunta</td><td class="fakewin">"¿Cuánto cuesta?"</td><td class="good">"¿Tienes cita el jueves?"</td></tr>
 <tr><td>Ticket</td><td class="fakewin">bajo</td><td class="good">más alto</td></tr>
 <tr><td>¿Regresa?</td><td class="fakewin">no</td><td class="good">sí, cada mes</td></tr>`,
 `Meta te trae más de los que ya llegan, no de los que te convienen. Hasta que TÚ le enseñes a Meta cómo se ve el bueno, te va a seguir trayendo al de la izquierda.`);
EXAMPLES['Equipo de ventas']=exBox('los mismos chats, resultado distinto',
 `<tr><th>Persona</th><th>Chats</th><th>Cierres</th><th>Tasa</th></tr>`,
 `<tr><td>Karla</td><td>25</td><td>8</td><td class="good"><b>32%</b></td></tr>
 <tr><td>Luis</td><td>25</td><td>3</td><td class="fakewin">12%</td></tr>`,
 `Con los mismos chats, Karla cierra <b>más del doble</b>. Si Luis cerrara como Karla: +5 ventas al mes <b>sin gastar un peso más en anuncios</b>. Eso cuesta no medir por persona.`);
EXAMPLES_CL['Equipo de ventas']=exBox('los mismos chats, resultado distinto',
 `<tr><th>Persona</th><th>Chats</th><th>Citas</th><th>Tasa</th></tr>`,
 `<tr><td>Karla</td><td>25</td><td>8</td><td class="good"><b>32%</b></td></tr>
 <tr><td>Luis</td><td>25</td><td>3</td><td class="fakewin">12%</td></tr>`,
 `Con los mismos chats, Karla agenda <b>más del doble</b>. Si Luis agendara como Karla: +5 citas al mes <b>sin gastar un peso más en anuncios</b>. Eso cuesta no medir por persona en tu recepción.`);
EXAMPLES['Respuesta a leads']=exBox('tu velocidad real, por horario',
 `<tr><th>Cuándo te escriben</th><th>Respuesta</th></tr>`,
 `<tr><td>Lun–Vie, 9am–6pm</td><td class="good">8 minutos ✓</td></tr>
 <tr><td>Noches (6pm–11pm)</td><td class="fakewin">11 horas</td></tr>
 <tr><td>Fin de semana</td><td class="fakewin">hasta el lunes</td></tr>`,
 `Tu promedio se ve bien por el horario de oficina. Pero una parte de la gente te escribe cuando por fin tiene tiempo de ver el celular, y esos se enfrían para el lunes.`);
EXAMPLES['Generación de ads']=exBox('el anuncio ganador que se está desgastando',
 `<tr><th></th><th>Anuncio ganador viejo</th><th>Relevo nuevo</th></tr>`,
 `<tr><td>Días corriendo</td><td class="fakewin">94</td><td>12</td></tr>
 <tr><td>Frecuencia (veces que lo vio la misma persona)</td><td class="fakewin">4.1</td><td class="good">1.8</td></tr>
 <tr><td>Costo por mensaje</td><td class="fakewin">$19 (era $11)</td><td class="good">$12</td></tr>`,
 `El anuncio no empeoró: <b>la misma gente ya lo vio varias veces</b>. Sin relevos listos, tus ventas caen el día que deje de funcionar, y nadie va a saber por qué.`);
EXAMPLES['Creatividades']=exBox('copiar el anuncio ganador vs entender por qué ganó',
 `<tr><th></th><th>Copiarlo</th><th>Entender por qué ganó</th></tr>`,
 `<tr><td>Qué haces</td><td class="fakewin">El mismo anuncio otra vez, con otra foto</td><td class="good">Misma promesa ("precio claro + cita rápida"), 5 formatos distintos</td></tr>
 <tr><td>Qué pasa</td><td class="fakewin">Deja de funcionar pronto</td><td class="good">Tienes varios anuncios que venden por la misma razón</td></tr>`,
 `Un anuncio ganador que no puedes explicar es suerte. Si lo desarmas en sus piezas (qué promete, a quién le habla, qué lo hace creíble), puedes sacar el siguiente <b>a propósito</b>.`);
EXAMPLES['Automatización']=exBox('5 personas de la semana, de punta a punta',
 `<tr><th>Persona</th><th>¿En CRM?</th><th>¿Seguimiento?</th><th>¿Venta registrada?</th></tr>`,
 `<tr><td>1</td><td>✅</td><td>✅</td><td>✅</td></tr>
 <tr><td>2</td><td>✅</td><td class="fakewin">❌ (se olvidó)</td><td>N/A</td></tr>
 <tr><td>3</td><td class="fakewin">❌ (nunca entró)</td><td>N/A</td><td>N/A</td></tr>
 <tr><td>4</td><td>✅</td><td>✅</td><td class="fakewin">❌ (compró y nadie lo anotó)</td></tr>
 <tr><td>5</td><td>✅</td><td>✅</td><td>✅</td></tr>`,
 `3 de 5 con hoyo. Cada ❌ es dinero <b>ya pagado</b> que se cae, y el 4 además te deja sin saber qué anuncio trajo esa venta. Los hoyos no se arreglan con más mensajes.`);
EXAMPLES_CL['Automatización']=EXAMPLES['Automatización'].replace('❌ (compró y nadie lo anotó)','❌ (pagó y nadie lo anotó)');
const GEARS_META=[{short:'Estructura de Empresa',cap:['Estructura','de Empresa']},{short:'Estructura de Campaña',cap:['Estructura','de Campaña']},{short:'Métricas',cap:['Métricas']}];

const VISUAL=[0,2,1]; // orden en el hero: Empresa · Métricas(centro) · Campaña
const PRIORITY=['Oferta','Cliente','Equipo de ventas','Respuesta a leads','Generación de ads','Creatividades','Automatización','Venta mensual','Tasa de cierre','CAC','ROAS','Utilidad','Atribución'];
/* Reponderación por traba (c4_traba) · 25 ago. Solo se define la CABEZA de cada orden;
   el resto hereda PRIORITY, así nunca puede quedar una lista inválida.
   0 pocos interesados · 1 no son del perfil · 2 no compran · 3 me queda poco · 4 todo depende de mí */
const TRABA_HEAD=[
 ['Generación de ads','Creatividades','Oferta','Cliente','CAC'],
 ['Cliente','Creatividades','Oferta','Generación de ads','Equipo de ventas'],
 ['Tasa de cierre','Equipo de ventas','Oferta','Respuesta a leads','Cliente'],
 ['CAC','Utilidad','ROAS','Atribución','Oferta'],
 ['Automatización','Equipo de ventas','Atribución','Venta mensual','Tasa de cierre']
];
function priority(){
 const c4=(state&&state.C&&state.C[3]!=null)?state.C[3]:null;
 const head=(c4!=null)?TRABA_HEAD[c4]:null;
 if(!head) return PRIORITY;
 return head.concat(PRIORITY.filter(l=>head.indexOf(l)<0));
}
function statusFor(lv){return lv<=1?'r':lv===2?'y':'g';} // 3 y 4 = verde
function slug(l){return 'playbook_'+l.toLowerCase().replace(/[^a-z0-9]+/g,'_');}

/* cableado diente -> respuesta real del quiz (state.B en 0..3 => nivel 1..4) */
function buildLevels(){
  const B = state.B || [];
  const m = state.metricas || [false,false,false,false,false];
  const g = idx => (B[idx]!=null ? B[idx]+1 : 1);   // nivel 1..4
  const chk = i => (m[i] ? 4 : 1);                   // marcado=verde / no=rojo
  return [
    chk(0),  // CAC
    chk(1),  // Tasa de cierre
    chk(2),  // ROAS
    chk(3),  // Atribución
    chk(4),  // Utilidad
    g(5),    // Venta mensual  <- B[5]
    g(6),    // Oferta         <- B[6]
    g(7),    // Cliente        <- B[7]
    g(2),    // Equipo ventas  <- B[2]
    g(8),    // Respuesta      <- B[8]
    g(1),    // Generación ads <- B[1]
    g(9),    // Creatividades  <- B[9]
    g(4)     // Automatización <- B[4]
  ];
}

/* ICONS */
function icon(t,x,y,s,c){const w=Math.max(1.7,s*0.34);
 if(t==='check')return `<path d="M ${x-0.52*s} ${y+0.02*s} L ${x-0.14*s} ${y+0.42*s} L ${x+0.58*s} ${y-0.46*s}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
 if(t==='cross')return `<path d="M ${x-0.42*s} ${y-0.42*s} L ${x+0.42*s} ${y+0.42*s} M ${x-0.42*s} ${y+0.42*s} L ${x+0.42*s} ${y-0.42*s}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
 if(t==='lock'){const bw=s*0.8,bh=s*0.62,bx=x-bw/2,by=y-bh*0.18,r2=s*0.3;
  return `<path d="M ${x-r2} ${by} a ${r2} ${r2} 0 0 1 ${2*r2} 0" fill="none" stroke="${c}" stroke-width="${Math.max(1.3,s*0.17)}"/><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${s*0.13}" fill="${c}"/>`;}
 const r=s*0.6;return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${c}" stroke-width="${Math.max(1.3,s*0.2)}"/><path d="M ${x} ${y-r} A ${r} ${r} 0 0 0 ${x} ${y+r} Z" fill="${c}"/>`;}
function iconSVG(t,c,b){return `<svg viewBox="0 0 16 16" width="${b}" height="${b}">${icon(t,8,8,8,c)}</svg>`;}
/* GEAR GEOMETRY */
function P(cx,cy,r,a){const g=(a-90)*Math.PI/180;return (cx+r*Math.cos(g)).toFixed(2)+' '+(cy+r*Math.sin(g)).toFixed(2);}
function toothUnit(cx,cy,rIn,rOut,rTip,a0,a1,c){const arc=a1-a0,bH=arc*0.34,tH=arc*0.235;
 return `M ${P(cx,cy,rIn,a0)} L ${P(cx,cy,rOut,a0)} A ${rOut} ${rOut} 0 0 1 ${P(cx,cy,rOut,c-bH)} L ${P(cx,cy,rTip,c-tH)} L ${P(cx,cy,rTip,c+tH)} L ${P(cx,cy,rOut,c+bH)} A ${rOut} ${rOut} 0 0 1 ${P(cx,cy,rOut,a1)} L ${P(cx,cy,rIn,a1)} A ${rIn} ${rIn} 0 0 0 ${P(cx,cy,rIn,a0)} Z`;}
function gear(cx,cy,teeth,cap,phase){
 const N=teeth.length,slice=360/N,gap=4,rTip=100,rOut=87,rIn=55,rDisc=57,rHub=20,rIcon=(rIn+rOut)/2+1;
 let s=`<g filter="url(#soft)"><circle cx="${cx}" cy="${cy}" r="${rDisc}" fill="url(#body)"/>`;
 for(let k=0;k<6;k++){const a=k*60,p1=P(cx,cy,rHub+4,a).split(' '),p2=P(cx,cy,rDisc-5,a).split(' ');
  s+=`<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="rgba(255,255,255,.06)" stroke-width="9" stroke-linecap="round"/>`;}
 teeth.forEach((t,i)=>{const st=ST[t.s],c=phase+i*slice,a0=c-(slice-gap)/2,a1=c+(slice-gap)/2,ip=P(cx,cy,rIcon,c).split(' ');
  const sg=t.sig||t.l; const fs=sg.length<=4?9.5:sg.length<=6?8:7;
  const ipT=P(cx,cy,rOut+6.5,c).split(' ');
  s+=`<g class="tooth" data-l="${t.l}"><path d="${toothUnit(cx,cy,rIn,rOut,rTip,a0,a1,c)}" fill="${st.hex}" stroke="${st.line}" stroke-width="1.1" stroke-linejoin="round"/>`
   +`<text x="${ip[0]}" y="${ip[1]}" text-anchor="middle" dominant-baseline="central" font-family="Manrope,Inter,sans-serif" font-weight="800" font-size="${fs}" letter-spacing=".2" fill="${st.ink}">${sg}</text>`
   +icon(st.icon,+ipT[0],+ipT[1],4.6,st.ink)+`</g>`;});
 s+=`<circle cx="${cx}" cy="${cy}" r="${rHub}" fill="#12395c" stroke="rgba(255,255,255,.10)" stroke-width="1.5"/><circle cx="${cx}" cy="${cy}" r="6.5" fill="#EA1A20"/></g>`;
 (cap||[]).forEach((ln,li)=>{ s+=`<text x="${cx}" y="${cy+rTip+22+li*17}" text-anchor="middle" font-family="Manrope,sans-serif" font-weight="800" font-size="14" fill="#0A2540">${ln}</text>`; });
 return s;}
function renderHero(byGear){
 const CX=[125,340,555],CY=118,W=680,H=286;
 let svg=`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Los 3 engranes">
  <defs><radialGradient id="body" cx="42%" cy="36%" r="72%"><stop offset="0%" stop-color="#1b466c"/><stop offset="70%" stop-color="#0d2c48"/><stop offset="100%" stop-color="#081f37"/></radialGradient>
  <filter id="soft" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#0A2540" flood-opacity="0.16"/></filter></defs>`;
 VISUAL.forEach((gi,pos)=>{svg+=gear(CX[pos],CY,byGear[gi],GEARS_META[gi].cap,pos===1?18:0);});
 svg+=`</svg>`;document.getElementById('hero').innerHTML=svg;
}
function renderLegend(){document.getElementById('legend').innerHTML=['g','y','r'].map(k=>{const st=ST[k];
 return `<div class="lg"><span class="sw" style="background:${st.hex}">${iconSVG(st.icon,st.ink,15)}</span><span class="txt"><b>${st.word}</b></span></div>`;}).join('');}

/* LA LECTURA · cruza engranes y dispara el insight por patrón (voz de Anwar) */
function laLectura(real,tg,tr){
 const st=l=>{const t=real.find(x=>x.l===l);return t?t.s:null;};
 const gGood=gi=>real.filter(t=>t.g===gi&&t.s==='g').length;
 const gReds=gi=>real.filter(t=>t.g===gi&&t.s==='r').length;
 if(state&&state.etapa===3) return `Vendes bien, pero llevas meses vendiendo lo mismo. Ya no es problema de anuncios: es que decides con promedios, y el promedio esconde la campaña que te está costando dinero. Se arregla <b>en orden, una cosa a la vez</b>. Abajo te digo por dónde empezar.`;
 if(state&&state.etapa===2) return `Ya vendes todos los meses. Lo que te falta no es presupuesto: es que el mes flojo deje de ser sorpresa. Se arregla <b>en orden, una cosa a la vez</b>. Abajo te digo por dónde empezar.`;
 if(tg<=1) return `Estás armando tu negocio desde cero, y es normal en esta etapa. La trampa es querer hacer todo a la vez: se hace <b>en orden, una cosa a la vez</b>. Abajo te digo por dónde empezar.`;
 if(st('Generación de ads')!=='r' && st('Tasa de cierre')!=='r' && (st('Atribución')==='r'||st('CAC')==='r'))
  return `Tus campañas corren, pero <b>manejas sin tablero</b>: le metes dinero a anuncios y no sabes cuál te trae ${K()==='clinicas'?'pacientes':'clientes'} de verdad. Cuando sientes que "ya no jala como antes", primero revisa si de verdad jala menos o si <b>no lo estás midiendo</b>.`;
 if(gGood(1)>=1 && (st('Equipo de ventas')==='r'||st('Respuesta a leads')==='r'))
  return `No te faltan interesados: te llega gente. El dinero se te cae <b>en la conversación</b>: llegan y no compran. Meterle más a anuncios sin arreglar eso es echarle agua a una cubeta con hoyo.`;
 if((st('Cliente')==='r'||st('Oferta')==='r') && gGood(2)>=1)
  return `Estás vendiendo, pero <b>sin saber con precisión a quién</b>. Eso funciona hasta cierto techo; después cada peso de anuncios rinde menos, porque le hablas a todos.`;
 if(tr>0){
  // 20 sep: nombrar el diente que va primero, no el engrane (el dibujo esta plegado; nadie lo ha visto).
  const PRI=priority(); let f=PRI.map(l=>real.find(t=>t.l===l)).find(t=>t&&t.s==='r');
  if(state&&state.etapa===4&&state.focoOverride){ const o=real.find(t=>t.l===state.focoOverride); if(o&&o.s!=='g') f=o; }  // 20 sep: la lectura sigue al espejo en E4, igual que la gratis
  if(f&&tr>1) return `Lo que te está frenando hoy es <b>${nombreDiente(f.l)}</b>. Traes ${tr} focos rojos, pero ese va primero: no toques los otros hasta que quede resuelto.`;
  if(f) return `Lo que te está frenando hoy es <b>${nombreDiente(f.l)}</b>. Lo demás está sólido: no lo toques hasta que eso quede resuelto.`;
  return `Traes ${tr} foco${tr>1?'s':''} rojo${tr>1?'s':''}. Se arregla en orden, uno a la vez. Abajo te digo por dónde empezar.`;
 }
 return `Todo tu sistema sale en verde. Ya no se trata de tapar un hueco: se trata de <b>crecer sin romper</b> lo que ya funciona. Abajo te digo por dónde empezar.`;
}
/* ---- Checklist Etapa 1 (mapa en lista) ---- */
const CHK1=[
 {"area": "Presupuesto", "text": "Decides cuánto le vas a meter a anuncios al mes y lo gastas parejo todo el mes, aunque un día no lleguen mensajes.", "ej": "Decides $3 mil al mes: $100 al día. Un martes no te llega ningún mensaje, y no le bajas. Al final del mes cuentas cuántos compraron.", "cl": {"ej": "Decides $3 mil al mes: $100 al día. Un martes no te llega ningún mensaje, y no le bajas. Al final del mes cuentas cuántos pacientes llegaron."}},
 {"area": "Campañas", "text": "Tienes una campaña en el administrador de anuncios de Facebook (Ads Manager), con el objetivo \"Mensajes\" (lo que le pides a Meta que te consiga) y 3 anuncios distintos adentro. Así Meta le da más dinero al anuncio que trae más mensajes.", "ej": "En vez de \"Promocionar\" una publicación: una campaña con objetivo \"Mensajes\", 3 anuncios distintos adentro y un presupuesto diario fijo.", "cl": {"ej": "En vez de \"Promocionar\" una publicación: una campaña con objetivo \"Mensajes\", 3 anuncios distintos adentro y un presupuesto diario fijo."}},
 {"area": "Equipo", "text": "Aunque el equipo seas tú, vendes con los mismos pasos cada vez: cómo saludas, qué preguntas, cómo das el precio y cómo cierras. Así no depende de tu día.", "ej": "Cada vez que alguien te escribe, sigues los mismos pasos:\n1. Saludas\n2. Le preguntas qué necesita\n3. Le das el precio\n4. Le ofreces apartar\nSiempre igual, aunque estés cansado.", "cl": {"text": "Aunque el equipo seas tú, agendas con los mismos pasos cada vez: cómo saludas, qué preguntas, cómo das el precio y cómo ofreces la cita. Así no depende de tu día.", "ej": "Cada vez que alguien te escribe, sigues los mismos pasos:\n1. Saludas\n2. Le preguntas qué tratamiento le interesa\n3. Le das el precio de la valoración o del tratamiento\n4. Le ofreces día y hora\nSiempre igual, aunque estés con un paciente."}},
 {"area": "Métricas", "text": "Cada semana anotas dos números en una hoja: cuántos te escribieron y cuántos compraron. Así sabes si tus anuncios traen gente que compra.", "ej": "Una hoja con dos columnas. Esta semana: 30 te escribieron y 3 compraron.", "cl": {"text": "Cada semana anotas tres números en una hoja: cuántos te escribieron, cuántos agendaron y cuántos llegaron. Así sabes si tus anuncios traen pacientes.", "ej": "Una hoja con tres columnas. Esta semana: 30 te escribieron, 8 agendaron y 5 llegaron."}},
 {"area": "Seguimiento", "text": "Cada interesado queda anotado en una hoja: nombre, teléfono, qué preguntó y si compró. Así sabes a quién volver a escribirle.", "ej": "La hoja la llenas cada noche en 5 minutos. Al día siguiente le escribes al que dijo \"lo pienso\".", "cl": {"text": "Cada interesado queda anotado en una hoja: nombre, teléfono, qué tratamiento preguntó y si agendó. Así sabes a quién volver a escribirle.", "ej": "La hoja la llenas cada noche en 5 minutos. Al día siguiente le escribes al que dijo \"lo pienso\"."}},
 {"area": "Ventas", "text": "Cuando tienes una buena semana, anotas qué hiciste: qué anuncio corría, qué precio diste y qué mensaje mandaste. Y la semana siguiente lo repites a propósito.", "ej": "La semana que más vendiste corría el anuncio del precio, diste el paquete de $800 y contestabas con el mismo mensaje de bienvenida. La semana siguiente repites esas tres cosas.", "cl": {"text": "Cuando tienes una buena semana de citas, anotas qué hiciste: qué anuncio corría, qué promoción diste y qué mensaje mandaste. Y la semana siguiente lo repites a propósito.", "ej": "La semana que más agendaste corría el anuncio del miedo a que duela, ofreciste la valoración a $300 y contestabas con el mismo mensaje de bienvenida. La semana siguiente repites esas tres cosas."}},
 {"area": "Oferta", "text": "Le agregas a tu servicio algo que a ti te cuesta poco y al cliente le vale mucho: una garantía, una entrega más rápida o un seguimiento. Con eso tus primeras 10 ventas pagan tu precio completo, sin regatear.", "ej": "Tu paquete cuesta $800. Le agregas una garantía: si no queda como lo pidió, se lo rehaces sin costo. Las siguientes 10 personas pagan los $800 sin pedir descuento.", "cl": {"text": "Le agregas a tu tratamiento algo que a ti te cuesta poco y al paciente le vale mucho: una revisión sin costo a las dos semanas o sus fotos de antes y después. Con eso tus primeros 10 tratamientos se pagan a tu precio completo, sin regatear.", "ej": "Tu tratamiento cuesta $1,500. Le agregas una revisión sin costo a las dos semanas. Los siguientes 10 pacientes pagan los $1,500 sin pedir descuento."}},
 {"area": "Cliente ideal", "text": "Sabes quién es tu mejor cliente y por qué te compra a ti, y lo puedes decir en una línea.", "ej": "Mujer de 30 a 45, de tu zona, que ya probó otras marcas y no le funcionaron. Te compra porque le dices la verdad de qué sí sirve.", "cl": {"text": "Sabes quién es tu mejor paciente y por qué te elige a ti, y lo puedes decir en una línea.", "ej": "Mujer de 35 a 50, de tu zona, que ya gastó en cremas y en un tratamiento barato en otro lado y sigue igual. Te elige porque le dices cuántas sesiones necesita de verdad y cuánto le va a costar todo, sin sorpresas."}},
 {"area": "Respuesta", "text": "En tu horario contestas en menos de 10 minutos. Lo que llega de noche, lo contestas a primera hora.", "ej": "Si te escriben a las 11 de la mañana, contestas antes de las 11:10. Si te escriben a las 10 de la noche, contestas a primera hora.", "cl": {"text": "En tu horario contestas en menos de 10 minutos, aunque estés en consulta. Lo que llega de noche, lo contestas a primera hora.", "ej": "Si te escriben a las 11 de la mañana, contestas antes de las 11:10, aunque estés en consulta (por eso tus pasos los puede seguir tu recepción). Si te escriben a las 10 de la noche, a primera hora."}},
 {"area": "Anuncios", "text": "Pruebas 3 anuncios que dicen cosas distintas (uno del precio, otro del resultado y otro del miedo a que salga mal) y te quedas con el que trae más mensajes.", "ej": "Los 3 anuncios gastan lo mismo. El del precio trae 12 mensajes, el del resultado 25 y el del miedo 8. Te quedas con el del resultado.", "cl": {"text": "Pruebas 3 anuncios que dicen cosas distintas (uno del precio de la valoración, otro de qué pasa en la primera cita y otro del miedo a que duela) y te quedas con el que trae más citas.", "ej": "Los 3 anuncios gastan lo mismo. El del precio trae 4 citas, el de la primera cita 9 y el del miedo 3. Te quedas con el de la primera cita."}},
 {"area": "Asistencia", "text": "Llevas la cuenta de cuántos te dicen \"sí\" y cuántos llegan o pagan. Y un día antes le recuerdas a cada uno.", "ej": "De 10 que te dicen \"sí\", apuntas cuántos llegaron a la cita o pagaron. Y un día antes les escribes: \"Te espero mañana a las 4, ¿confirmas?\" o \"Te aparto tu pedido hasta mañana a las 6, ¿lo cierro?\"", "na": true, "cl": {"text": "Llevas la cuenta de cuántos agendan y cuántos llegan. Y un día antes le recuerdas a cada paciente.", "ej": "De 10 que agendan, apuntas cuántos llegaron. Y un día antes les escribes: \"Te espero mañana a las 4, ¿confirmas?\""}},
];
const CHK2=[
 {"area": "Presupuesto", "text": "Al cierre de cada mes decides el presupuesto del siguiente con tu costo por venta (ver Métricas): si se mantuvo igual o bajó, le subes; si subió, lo dejas igual. A mitad de mes no le mueves.", "ej": "En septiembre gastaste $15 mil y cada venta te costó $500, igual que en agosto. Para octubre le subes a $18 mil. Aunque la segunda semana de octubre salga floja, no le bajas.", "cl": {"text": "Al cierre de cada mes decides el presupuesto del siguiente con tu costo por paciente nuevo (ver Métricas): si se mantuvo igual o bajó, le subes; si subió, lo dejas igual. A mitad de mes no le mueves.", "ej": "En septiembre gastaste $15 mil y cada paciente nuevo te costó $500, igual que en agosto. Para octubre le subes a $18 mil. Aunque la segunda semana de octubre salga floja, no le bajas."}},
 {"area": "Campañas", "text": "Tienes 3 anuncios prendidos, no 10, para que a cada uno le toque dinero suficiente para saber si trae ventas.", "ej": "Gastas $500 al día en 10 anuncios: a cada uno le tocan $50. Si los dejas en 3, a cada uno le tocan $166 al día. Así sabes antes cuál trae ventas.", "cl": {"text": "Tienes 3 anuncios prendidos, no 10, para que a cada uno le toque dinero suficiente para saber si trae pacientes.", "ej": "Gastas $500 al día en 10 anuncios: a cada uno le tocan $50. Si los dejas en 3, a cada uno le tocan $166 al día. Así sabes antes cuál trae pacientes."}},
 {"area": "Equipo", "text": "Tienes por escrito los pasos para contestar y vender, y quien te ayuda los sigue desde su primer día.", "ej": "Una hoja con 5 pasos: saludo, una pregunta para saber qué necesita, precio, ofrecer apartar y qué decir si contesta \"lo pienso\". Quien entre a contestar la lee y la sigue.", "cl": {"text": "Tienes por escrito los pasos para contestar y agendar, y tu recepción los sigue desde su primer día.", "ej": "Una hoja con 5 pasos: saludo, una pregunta para saber qué tratamiento le interesa, precio de la valoración o del tratamiento, ofrecer día y hora, y qué decir si contesta \"lo pienso\". Quien conteste la lee y la sigue."}},
 {"area": "Métricas", "text": "Cada semana sacas dos costos: cuánto te cuesta un mensaje (lo que gastaste entre los mensajes) y cuánto te cuesta una venta (lo que gastaste entre las ventas).", "ej": "Esta semana gastaste $3,000, te llegaron 60 mensajes y vendiste 6.\nCada mensaje te costó $50.\nCada venta te costó $500.", "cl": {"text": "Cada semana sacas dos costos: cuánto te cuesta un mensaje (lo que gastaste entre los mensajes) y cuánto te cuesta un paciente nuevo (lo que gastaste entre los pacientes que llegaron y pagaron).", "ej": "Esta semana gastaste $3,000, te llegaron 60 mensajes y llegaron 6 pacientes nuevos.\nCada mensaje te costó $50.\nCada paciente nuevo te costó $500."}},
 {"area": "Seguimiento", "text": "Tu hoja de Google (Google Sheets) tiene el estatus de cada interesado: cotizado, por decidir, apartado o pagado. Cada mañana le escribes a los que están por decidir.", "ej": "Una fila por persona: nombre, qué preguntó y su estatus. Hoy: 9 cotizados, 5 por decidir, 3 apartados, 2 pagados. A los 5 por decidir les escribes hoy.", "cl": {"text": "Tu hoja de Google (Google Sheets) tiene el estatus de cada interesado: cotizado, por decidir, agendado o pagado. Cada mañana le escribes a los que están por decidir.", "ej": "Una fila por persona: nombre, tratamiento que preguntó y su estatus. Hoy: 9 cotizados, 5 por decidir, 3 agendados, 2 pagados. A los 5 por decidir les escribes hoy."}},
 {"area": "Ventas", "text": "Tu objetivo de venta del mes tiene tres números: el mínimo, el ideal y el espectacular. Y llevas 3 meses seguidos arriba del mínimo.", "ej": "Mínimo $30 mil, ideal $45 mil, espectacular $60 mil. Si tres meses seguidos pasas de $30 mil, ya no es suerte: es un negocio que se sostiene.", "cl": {"ej": "Mínimo $30 mil, ideal $45 mil, espectacular $60 mil. Si tres meses seguidos pasas de $30 mil, ya no es suerte: es una clínica que se sostiene."}},
 {"area": "Oferta", "text": "Sabes cuál de tus productos o servicios se vende más sin regateo, y ese es el que va en tus anuncios.", "ej": "Vendes tres paquetes. Cuentas cuál se vende más seguido sin regateo, y ese es el que va en tus anuncios este mes.", "cl": {"text": "Sabes cuál de tus tratamientos se agenda más sin regateo, y ese es el que va en tus anuncios.", "ej": "Ofreces tres tratamientos. Cuentas cuál se agenda más seguido sin regateo, y ese es el que va en tus anuncios este mes."}},
 {"area": "Cliente ideal", "text": "Tus anuncios le hablan a tu mejor cliente, con las palabras que él usa cuando te escribe.", "ej": "Ya sabes que te compra la mujer de 30 a 45 que ya probó otras marcas. Tu anuncio le habla con lo que ella te escribe: \"ya probé de todo y nada me funcionó\".", "cl": {"text": "Tus anuncios le hablan a tu mejor paciente, con las palabras que usa cuando te escribe.", "ej": "Ya sabes que te elige la mujer de 35 a 50 que ya gastó en cremas y sigue igual. Tu anuncio le habla con lo que ella te escribe: \"ya gasté en cremas y sigo igual\"."}},
 {"area": "Respuesta", "text": "En tu horario se contesta en menos de 10 minutos, y cada semana revisas 10 chats para comprobarlo.", "ej": "Cada semana revisas 10 chats: a qué hora llegaron y a qué hora se contestaron. Si más de 2 pasaron de 10 minutos, se arregla esa semana.", "cl": {"ej": "Cada semana revisas 10 chats: a qué hora llegaron y a qué hora se contestaron. Si más de 2 pasaron de 10 minutos, aunque fuera por estar en consulta, se arregla esa semana."}},
 {"area": "Anuncios", "text": "Cada anuncio nuevo cambia una sola cosa de tu anuncio ganador: la foto, el título o el texto. Y anotas cuál ganó: el que trajo más apartados o pagos, no el de mensajes más baratos.", "ej": "Tu anuncio ganador es el del resultado. El nuevo es igual, pero con otra foto. Con el mismo dinero, el de la foto nueva trae 5 apartados y tu anuncio ganador 8. Te quedas con tu anuncio ganador y anotas que la foto nueva no ayudó.", "cl": {"text": "Cada anuncio nuevo cambia una sola cosa de tu anuncio ganador: la foto, el título o el texto. Y anotas cuál ganó: el que trajo más citas, no el de mensajes más baratos.", "ej": "Tu anuncio ganador es el del resultado. El nuevo es igual, pero con otra foto. Con el mismo dinero, el de la foto nueva trae 5 citas y tu anuncio ganador 8. Te quedas con tu anuncio ganador y anotas que la foto nueva no ayudó."}},
 {"area": "Asistencia", "text": "Todos los que apartan reciben recordatorio un día antes y confirmación el mismo día. A todos, no solo a los que te acuerdas.", "ej": "Ayer: \"Te espero mañana a las 4, ¿confirmas?\". Hoy en la mañana: \"Nos vemos hoy a las 4\".", "na": true, "cl": {"text": "Todos los que agendan reciben recordatorio un día antes y confirmación el mismo día. A todos, no solo a los que te acuerdas.", "ej": "Ayer: \"Te espero mañana a las 4, ¿confirmas?\". Hoy en la mañana: \"Nos vemos hoy a las 4\"."}},
];
const CHK3=[
 {area:"Presupuesto",text:"Tu presupuesto sale de tu meta de ventas: sabes cuántas ventas quieres este mes y cuánto te cuesta cada una, y de esos dos números sale cuánto meterle a anuncios. Cuando le subes, sabes cuántas ventas más esperar y en cuántos días verlas.",ej:"Quieres 60 ventas este mes y cada una te cuesta $1,000 en anuncios: metes $60 mil. Si le subes a $72 mil, esperas 12 ventas más, y las ves en las dos semanas siguientes. Si no llegan, no es el presupuesto: es otra fila de esta tabla.",cl:{text:"Tu presupuesto sale de tu meta de pacientes: sabes cuántos pacientes nuevos quieres este mes y cuánto te cuesta cada uno, y de esos dos números sale cuánto meterle a anuncios. Cuando le subes, sabes cuántos pacientes más esperar y en cuántos días verlos.",ej:"Quieres 60 pacientes nuevos este mes y cada uno te cuesta $1,000 en anuncios: metes $60 mil. Si le subes a $72 mil, esperas 12 pacientes más, y los ves en las dos semanas siguientes. Si no llegan, no es el presupuesto: es otra fila de esta tabla."}},
 {area:"Campañas",text:"Cada prueba tiene su dinero apartado: dos veces y media lo que te cuesta un cliente. No le mueves nada hasta que se gaste completo. Y la decisión de apagar o subirle se toma con los clientes que trajo, no con los mensajes ni con los días que lleva.",ej:"Un cliente te cuesta $1,000. La prueba de un anuncio nuevo son $2,500: ni un cambio hasta que los gaste. Si al gastarlos trajo 3 clientes o más, se queda y se le sube. Si trajo mensajes baratos y cero clientes, se apaga aunque el costo por mensaje se viera bonito.",cl:{text:"Cada prueba tiene su dinero apartado: dos veces y media lo que te cuesta un paciente nuevo. No le mueves nada hasta que se gaste completo. Y la decisión de apagar o subirle se toma con los pacientes que llegaron, no con los mensajes ni con los días que lleva.",ej:"Un paciente nuevo te cuesta $1,000. La prueba de un anuncio nuevo son $2,500: ni un cambio hasta que los gaste. Si al gastarlos trajo 3 pacientes o más, se queda y se le sube. Si trajo mensajes baratos y cero pacientes, se apaga aunque el costo por mensaje se viera bonito."}},
 {area:"Equipo",text:"Todos los vendedores usan el mismo guion escrito. Y cada semana ves dos números por persona: cuántos mensajes atendió y cuántas ventas cerró (su tasa de conversión). El que cierra más le enseña a los demás; el que cierra menos se corrige con su número enfrente, no con regaños.",ej:"De 50 interesados, Karla cerró 16 y Luis 6 con el mismo anuncio. Lees 5 chats de cada uno: Karla ofrece día y hora, Luis solo contesta la pregunta. Esa diferencia se vuelve regla para todos ese mismo día.",cl:{text:"Todas las de recepción usan el mismo guion escrito. Y cada semana ves dos números por persona: cuántos mensajes atendió y cuántas citas agendó que sí llegaron (su tasa de conversión). La que agenda más le enseña a las demás; la que agenda menos se corrige con su número enfrente, no con regaños.",ej:"De 50 interesadas, Karla agendó 16 y Luis 6 con el mismo anuncio. Lees 5 chats de cada uno: Karla ofrece día y hora, Luis solo contesta la pregunta. Esa diferencia se vuelve regla para todos ese mismo día."}},
 {area:"Métricas",text:"Tus métricas con nombre, y cada una con su rango: el número bueno y el número que te avisa que esa métrica va mal.\nCAC máximo: lo más que puedes pagar por una venta sin perder dinero.\nCAC por campaña: cuánto te cuesta una venta en cada campaña, comparado con tu CAC máximo.\nTasa de conversión (T.C.): de cada 100 que te escriben, cuántos compran.\nMétrica termostato: el número que revisas a diario y que se mueve antes que las ventas: cuántos interesados que sí pueden comprarte llegaron hoy y cuánto te costó cada uno.\nCosto por evento (CPE): cuánto te cuesta cada paso de tu venta: mensaje, cotización (o cita), visita y venta. Y el porcentaje que pierdes entre un paso y el siguiente.",ej:"Tu CAC máximo: $2,000.\nCampaña A: mensaje $20, cotización $60, venta $450.\nCampaña B: mensaje $12, cotización $40, venta $1,400.\nEn B, de 100 que escriben, cotizan 30 y compran 3.\nLa pérdida está entre cotizar y cerrar, no en el anuncio.\nB se acerca a tu tope: se arregla el cierre, o se apaga.",cl:{text:"Tus métricas con nombre, y cada una con su rango: el número bueno y el número que te avisa que esa métrica va mal.\nCAC máximo: lo más que puedes pagar por un paciente nuevo sin perder dinero.\nCAC por campaña: cuánto te cuesta un paciente nuevo en cada campaña, comparado con tu CAC máximo.\nTasa de conversión (T.C.): de cada 100 que te escriben, cuántos llegan y pagan.\nMétrica termostato: el número que revisas a diario y que se mueve antes que las ventas: cuántas interesadas que sí pueden pagarte llegaron hoy y cuánto te costó cada una.\nCosto por evento (CPE): cuánto te cuesta cada paso: mensaje, cita agendada, paciente que llega y paciente que paga. Y el porcentaje que pierdes entre un paso y el siguiente.",ej:"Tu CAC máximo: $2,000.\nCampaña A: mensaje $20, cita $60, paciente que paga $450.\nCampaña B: mensaje $12, cita $40, paciente que paga $1,400.\nEn B, de 100 que escriben, agendan 30 y llegan 3.\nLa pérdida está entre agendar y llegar, no en el anuncio.\nB se acerca a tu tope: se arregla la asistencia, o se apaga."}},
 {area:"Seguimiento",text:"Cada interesado está en el CRM con su estatus, y el seguimiento sale solo: los 3 Toques al que dijo \"lo pienso\" (al día siguiente, 2 días después y 3 días después) se mandan sin que nadie se acuerde. En esta etapa ya usas bot o IA, pero solo para recibir: contesta al instante, hace una o dos preguntas y pasa con una persona. Vender, lo hace la persona.",ej:"El que cotizó y dijo \"lo pienso\" recibe un mensaje al día siguiente, otro 2 días después y uno último a los 3 días, sin que tu equipo lo mande a mano. Y el bot no intenta vender solo: saluda, pregunta qué necesita y avisa en cuánto lo atienden.",cl:{text:"Cada interesada está en el CRM con su estatus, y el seguimiento sale solo: los 3 Toques a la que dijo \"lo pienso\" (al día siguiente, 2 días después y 3 días después) se mandan sin que nadie se acuerde. En esta etapa ya usas bot o IA, pero solo para recibir: contesta al instante, hace una o dos preguntas y pasa con recepción. Agendar y vender, lo hace la persona.",ej:"La que pidió precio y dijo \"lo pienso\" recibe un mensaje al día siguiente, otro 2 días después y uno último a los 3 días, sin que recepción lo mande a mano. Y el bot no intenta vender solo: saluda, pregunta qué le interesa y avisa en cuánto la atienden."}},
 {area:"Ventas",text:"Ves tus ventas todos los días, con reporte diario, semanal y mensual. Sabes cuánto vas a vender y cuántos se te van en cada paso: de los que escriben, cuántos cotizan; de los que cotizan, cuántos compran. Con esos números ya sabes qué paso ajustar para vender más, y nunca hay sorpresa.",ej:"\"Meto $60 mil, me escriben 400, cotizo a 120, cierran 40, me quedan $80 mil.\" Si puedes decir esa frase con tus números de la semana pasada, ya sabes dónde se caen: de 400 a 120 es el primer paso, de 120 a 40 el segundo.",cl:{text:"Ves tus ventas todos los días, con reporte diario, semanal y mensual. Sabes cuánto vas a vender y cuántas se te van en cada paso: de las que escriben, cuántas agendan; de las que agendan, cuántas llegan y pagan. Con esos números ya sabes qué paso ajustar para vender más, y nunca hay sorpresa.",ej:"\"Meto $60 mil, me escriben 400, agendan 60, llegan 40, me quedan $80 mil.\" Si puedes decir esa frase con tus números de la semana pasada, ya sabes dónde se caen: de 400 a 60 es el primer paso, de 60 a 40 el segundo."}},
 {area:"Oferta",text:"Sabes cuánto te deja cada servicio por separado, ya quitándole material, tiempo, comisiones y anuncios. Y con ese número decides: le metes presupuesto al que más te deja, o haces que el que más se vende te deje más (le subes el precio, negocias con tu proveedor para que el material te salga más barato, o le agregas algo que a ti te cueste poco y al cliente le valga mucho, como una garantía o una entrega más rápida).",ej:"Tu servicio más vendido te deja $400 y el otro te deja $1,800. El presupuesto se está yendo al de $400 porque \"es el que jala\". Lo mueves al de $1,800, o le subes $300 al de $400 y le agregas una garantía o una entrega más rápida que justifique el precio.",cl:{text:"Sabes cuánto te deja cada tratamiento por separado, ya quitándole insumos, tiempo de cabina, comisiones y anuncios. Y con ese número decides: le metes presupuesto al que más te deja, o haces que el que más se agenda te deje más (le subes el precio, negocias con tu proveedor para que los insumos te salgan más baratos, o le agregas algo que a ti te cueste poco y al paciente le valga mucho, como una garantía o una sesión extra).",ej:"Tu tratamiento más pedido te deja $400 y el otro te deja $1,800. El presupuesto se está yendo al de $400 porque \"es el que jala\". Lo mueves al de $1,800, o le subes $300 al de $400 y le agregas una garantía o una sesión extra que justifique el precio."}},
 {area:"Cliente ideal",text:"Tienes al menos dos tipos de cliente, y cada uno tiene su propio anuncio y su propio mensaje de venta. Y los mides por separado: cuánto te cuesta y cuánto te deja cada tipo.",ej:"A la mujer de 35 a 50 le hablas de tiempo y resultado. A la de 25 a 34 le hablas de precio y de pagos. Un anuncio para cada una, no uno para las dos. Y al mes sabes cuál de las dos te cuesta menos y te deja más.",cl:{text:"Tienes al menos dos tipos de paciente, y cada uno tiene su propio anuncio y su propio mensaje. Y las mides por separado: cuánto te cuesta y cuánto te deja cada tipo.",ej:"A la mujer de 35 a 50 le hablas de tiempo y resultado. A la de 25 a 34 le hablas de precio y de pagos. Un anuncio para cada una, no uno para las dos. Y al mes sabes cuál de las dos te cuesta menos y te deja más."}},
 {area:"Respuesta",text:"Mides el tiempo de respuesta las 24 horas, también de noche y en fin de semana, y lo revisas cada semana. Fuera de horario contesta el bot: al instante, con la información básica (qué vendes, precio o rango, cómo funciona), y le hace una o dos preguntas para saber si es un cliente que sí puede comprarte. Cuando entra tu equipo, ya sabe con quién habla y por dónde empezar.",ej:"Sacas tus últimos 20 interesados con hora de llegada y hora de respuesta. Los de horario: 8 minutos. Los de noche y fin de semana: 14 horas. Ese segundo número es el que te está costando. El bot lo baja a segundos.",cl:{text:"Mides el tiempo de respuesta las 24 horas, también de noche y en fin de semana, y lo revisas cada semana. Fuera de horario contesta el bot: al instante, con la información básica (qué tratamientos hay, precio o rango, cómo funciona la valoración), y le hace una o dos preguntas para saber si es un paciente que sí puede pagarte. Cuando entra recepción, ya sabe con quién habla y por dónde empezar.",ej:"Sacas tus últimas 20 interesadas con hora de llegada y hora de respuesta. Las de horario: 8 minutos. Las de noche y fin de semana: 14 horas. Ese segundo número es el que te está costando citas. El bot lo baja a segundos."}},
 {"area": "Anuncios", "text": "Cada anuncio sale de seis decisiones escritas, no de la ocurrencia del día:\n• A quién le habla\n• Qué le dice\n• Cómo se lo cuenta\n• En qué formato\n• Cómo se ve\n• Con qué arranca\nCuando un anuncio ganador se cansa, cambias una sola de las seis, y así sabes qué lo hacía ganar. Tu banco de anuncios ganadores guarda las seis, no solo la imagen.", "ej": "Tu anuncio ganador le habla al que ya comparó precios, dice \"te lo entrego en 48 horas\", lo cuenta como comparación, es imagen hecha con celular y arranca con una pregunta. Se cansó. Cambias solo el arranque: ahora empieza con un hecho. Si vuelve a traer clientes baratos, ya sabes que la pregunta no era lo que lo hacía ganar.", "cl": {"text": "Cada anuncio sale de seis decisiones escritas, no de la ocurrencia del día:\n• A quién le habla\n• Qué le dice\n• Cómo se lo cuenta\n• En qué formato\n• Cómo se ve\n• Con qué arranca\nCuando un anuncio ganador se cansa, cambias una sola de las seis, y así sabes qué lo hacía ganar. Tu banco de anuncios ganadores guarda las seis, no solo la imagen.", "ej": "Tu anuncio ganador le habla a la que ya comparó precios, dice \"resultado en la primera sesión\", lo cuenta como comparación, es imagen hecha con celular y arranca con una pregunta. Se cansó. Cambias solo el arranque: ahora empieza con un hecho. Si vuelve a traer pacientes baratos, ya sabes que la pregunta no era lo que lo hacía ganar."}},
 {area:"Asistencia",text:"Cada \"sí\" se asegura antes de apartar la cita, enviar el pedido o armar la cotización: anticipo o pago por adelantado, recordatorio un día antes y confirmación el mismo día, ya sea cita, entrega o cotización. Meta: que cumplan al menos 3 de cada 4 de los que dijeron que sí. Y sabes de qué anuncio vienen los que sí cumplen, para meterle presupuesto a ese anuncio y no al que solo junta \"sí quiero\".",ej:"De 20 que apartan con anticipo, cumplen 16. Sin anticipo, cumplían 9. Y al cruzarlo con el anuncio: el de la promoción fuerte junta 30 \"sí quiero\" y cumplen 12; el que explica bien junta menos y cumplen 16 de cada 20. A ese segundo anuncio le subes el presupuesto.",cl:{text:"Cada \"sí\" se asegura antes de apartar la cita: anticipo, recordatorio un día antes y confirmación el mismo día, a todas las que agendan. Meta: que lleguen al menos 3 de cada 4 de las que dijeron que sí. Y sabes de qué anuncio vienen las que sí llegan, para meterle presupuesto a ese anuncio y no al que solo junta citas.",ej:"De 20 que agendan con anticipo, llegan 16. Sin anticipo, llegaban 9. Y al cruzarlo con el anuncio: el de la promoción fuerte agenda 30 y llegan 12; el que explica bien agenda menos y llegan 16 de cada 20. A ese segundo anuncio le subes el presupuesto."},na:true}
];

/* 7.8 · "¿Por qué importa?" por fila de E3 (textos aprobados 22-23 sep, claude/E3-porque-importa-textos-aprobados-23sep.md) */
const PQ3={"Métricas": {"p": "Tu CAC global (lo que gastaste en anuncios en el mes, dividido entre los clientes nuevos que te pagaron) te dice si el mes salió bien o mal. Nada más.\n\nNo te dice cuál campaña te trajo los clientes buenos ni cuál se comió el dinero. Las dos se ven igual en el global.\n\nY en esta etapa cada semana decides varias cosas: a cuál le subes, cuál apagas, cuál pruebas. Si todas las decides con el mismo número global, decides a ciegas.\n\nLo pagas el mes siguiente: le metes más dinero a la campaña equivocada y vendes lo mismo.", "s": ["Ponle una clave a cada anuncio en el mensaje que se abre en WhatsApp: A1.1, A1.2, B2.1… La letra es la campaña, el primer número es el conjunto de anuncios y el segundo es el anuncio.", "Por cada chat, tu equipo apunta: fecha · clave · ¿compró?", "Cuando cada anuncio haya gastado su dinero de prueba (dos veces y media lo que te cuesta un cliente, lo ves en Campañas), divide lo gastado entre los clientes que trajo. Ese es tu CAC por campaña. Compáralo con tu CAC máximo: lo más que puedes pagar por un cliente sin perder dinero.", "Saca tu CAC máximo: a lo que te paga un cliente quítale material, tiempo y comisiones; eso es lo que te deja. Decide cuánto de lo que te deja quieres ganar. Lo que sobra es lo más que puedes pagar en anuncios por ese cliente: ese es tu CAC máximo."], "e": "Vendes un servicio de $5,000. Material, tiempo y comisiones: $2,500. Te deja $2,500.\nQuieres ganar $1,000 por cliente. Tu CAC máximo: $1,500.\nCampaña A: gastó $9,000, trajo 10 clientes. $900 por cliente. Súbele.\nCampaña B: gastó $9,000, trajo 4 clientes. $2,250 por cliente. Apágala.\nLas dos tenían el mensaje a $20. Sin el número por campaña, se veían iguales."}, "Presupuesto": {"p": "Hoy decides cuánto gastar en anuncios según cómo vas: si el mes va bien le subes, si va flojo le bajas. Es una apuesta, porque no sabes cuántas ventas más van a llegar ni cuándo.\n\nY en esta etapa la apuesta sale cara. Le subes, no ves resultado en una semana, le bajas, y al mes siguiente vuelves a subirle. Gastas más y vendes lo mismo.\n\nCuando el presupuesto sale de tu meta de ventas y de tu CAC (lo que te cuesta cada cliente), cada peso que metes ya sabes qué tiene que regresar y en cuántos días. Si no regresa, el problema no es el dinero, y dejas de tirarle más.", "s": ["Escribe cuántas ventas quieres este mes (mínimo, ideal y espectacular).", "Multiplica el mínimo por tu CAC (lo que te cuesta cada cliente). Ese es tu presupuesto del mes; ni más ni menos.", "Si le subes, anota cuántas ventas más esperas y en cuántos días. Si no llegan, no le subas más: busca en qué paso se te van (ver Ventas)."], "e": "Meta mínima del mes: 40 ventas. Cada cliente te cuesta $900.\nPresupuesto: 40 × $900 = $36,000.\nLe subes a $45,000: esperas 10 ventas más, en dos semanas.\nSi en dos semanas no llegaron, no le subes más: el problema no es el dinero."}, "Campañas": {"p": "Los primeros días de una campaña nueva el mensaje sale caro: $35 cuando tu promedio es $20. Ahí es donde la apagas.\n\nEl problema es que a los dos días todavía no sabes nada. No sabes si esos mensajes caros se vuelven clientes o no. Y apagarla a los dos días mata campañas que sí iban a vender.\n\nLo contrario también pasa: dejas prendida la que trae mensajes baratos, y esa nunca trae clientes. Gastas en las dos direcciones equivocadas.\n\nEn esta etapa pruebas varias campañas al mes. Si cada una la decides a los dos días, viendo solo cuánto te costó el mensaje, pruebas mucho y no aprendes nada.", "s": ["A cada campaña que pruebes, apártale su dinero de prueba: dos veces y media lo que te cuesta un cliente.", "No le muevas nada (ni presupuesto, ni anuncios, ni público) hasta que se gaste ese dinero completo.", "Cuando se lo gastó, cuenta cuántos clientes trajo y divide: eso es lo que te costó cada cliente en esa campaña. Compáralo con lo más que puedes pagar por un cliente sin perder dinero (tu CAC máximo, lo sacas en Métricas). Si está abajo, súbele. Si está arriba, apágala."], "e": "Un cliente te cuesta $900. Dinero de prueba: $2,250 por campaña.\nCampaña nueva, día 2: $600 gastados, mensajes a $35. Se ve cara. No la tocas.\nDía 9: $2,250 gastados, 3 clientes. $750 por cliente. Abajo de tu tope: súbele.\nSi la hubieras apagado el día 2, apagaste la que sí vendía."}, "Equipo": {"p": "Cuando llegaban pocos mensajes, tú alcanzabas a ver cómo vendía cada quien. Ahora llegan más, ya no alcanzas, y cada persona vende como puede.\n\nEl resultado: de cada 100 mensajes que atiende, un vendedor cierra 15 ventas y otro cierra 7. Los dos reciben a la misma gente, que llegó por el mismo anuncio. La diferencia no está en la gente ni en el anuncio: está en cómo contesta cada uno. Y esos 8 clientes que uno cierra y el otro no, ya los pagaste en anuncios.\n\nSin el número de cada persona enfrente, lo único que puedes hacer es regañar al que va abajo. Con el número, ves qué hace diferente el de arriba y se lo enseñas al de abajo. Así sube la tasa de conversión de todo tu equipo, sin gastar un peso más en anuncios.", "s": ["Saca dos números por persona: cuántos mensajes atendió y cuántas ventas cerró. Divide: esa es su tasa de conversión (de cada 100 que atendió, cuántos compraron).", "Lee diez conversaciones del que más cierra y diez del que menos, una junto a la otra. La diferencia va a saltar: un segundo mensaje al día siguiente, ofrecer apartar en vez de solo contestar, dar el precio con la garantía por delante.", "Escribe esa diferencia en el guion y que todos lo usen. Cada semana, los dos números por persona en la pared, no en la cabeza."], "e": "Laura: 120 mensajes, 18 ventas. 15 de cada 100.\nPedro: 120 mensajes, 8 ventas. 7 de cada 100. Misma gente, mismo anuncio.\nLees las conversaciones: Laura siempre manda un segundo mensaje al día siguiente. Pedro no.\nEse mensaje entra al guion. El mes siguiente Pedro cierra 13 de cada 100."}, "Seguimiento": {"p": "De cada 100 que te escriben, una parte no compra en la primera conversación. Dicen \"lo pienso\" y se van. Esos no están perdidos: están esperando que alguien les vuelva a escribir.\n\nCuando llegaban 40 mensajes al mes, tú les escribías manualmente porque tenías tiempo para hacerlo. Ahora llegan 150 y ya no alcanzas. Así que te escriben más, cierras menos y vendes igual. Los que se quedaron en \"lo pienso\" ya los pagaste en anuncios, y se van sin un segundo mensaje.\n\nEl seguimiento no puede depender de que alguien se acuerde. Tiene que salir solo. Y el bot en esta etapa recibe, no vende.", "s": ["Cada interesado entra al CRM con su estatus: nuevo, cotizado, lo pienso, apartó, pagó.", "Vas a hacer lo que le llamamos 3 Toques, programa tres mensajes automáticos para el que se quedó en \"lo pienso\": uno al día siguiente, otro 2 días después y si no contesta un último mensaje a los 3 días. Se mandan solos, vas a vender más.", "Si tienes bot, que haga solo esto: contestar al instante, dar la información básica, hacer una o dos preguntas y pasar con una persona. La venta la hace la persona."], "e": "Antes: 40 mensajes al mes, le escribías tú manualmente al que no cerraba. Cerrabas 8.\nAhora: 150 mensajes al mes. Cierras 12, pero se te fueron 60 sin un segundo mensaje.\nCon los 3 mensajes automáticos, si de esos 60 regresan 9. Son 9 ventas que ya habías pagado en anuncios."}, "Ventas": {"p": "Tu venta tiene pasos, y en cada uno se te va gente. Los pasos cambian según lo que vendes:\n\nSi cotizas: te escriben → cotizas → apartan → pagan.\nSi das citas: te escriben → agendan → llegan → pagan.\nSi vendes créditos: te escriben → precalificas → califican → firman → se entrega.\nSi vendes con entrega contra pago: te escriben → piden → reciben → pagan.\n\nLos nombres cambian, la idea no: son de 3 a 5 pasos, y en uno de ellos se te va más gente que en los otros. Ese es el paso que te está frenando.\n\nSi solo ves el total del mes, no ves ese paso. Un mes sube y otro baja y no sabes por qué. Y lo más caro: intentas arreglar el paso equivocado. Haces anuncios nuevos cuando el problema estaba en la cotización, o cambias de vendedor cuando el problema estaba en el anuncio.\n\nCon los números de cada paso a la vista todos los días, sabes dónde se van, cuántos se van y qué arreglar primero. Y si un paso empieza a caer, lo ves el mismo día que empieza, no una semana después, cuando ya te costó.", "s": ["Arma un reporte de una sola hoja con cuatro números: cuántos escribieron, cuántos cotizaron, cuántos apartaron, cuántos pagaron. Diario, semanal y mensual.", "Saca el porcentaje entre cada paso: de los que escriben, cuántos cotizan; de los que cotizan, cuántos apartan; de los que apartan, cuántos pagan.", "Busca el paso con el porcentaje más bajo. Ese es el único que arreglas este mes. Los otros déjalos en paz."], "e": "Semana: 100 escribieron, 40 cotizaron, 12 apartaron, 10 pagaron.\nEscribir → cotizar: 40 de 100. Cotizar → apartar: 12 de 40. Apartar → pagar: 10 de 12.\nLa caída grande está entre cotizar y apartar: de 40, solo 12. Ahí se trabaja, buscas nuevas formas de cotizar. El anuncio no tiene nada que ver."}, "Oferta": {"p": "En esta etapa tu oferta ya vende. La pregunta es otra: ¿te deja dinero, y aguanta crecer?\n\n**Lo primero: cuánto te deja.**\nVender el doble no sirve si te queda lo mismo. Y pasa cuando lo que más se vende es lo que menos te deja: el barato, el que jala por precio. Le metes anuncios porque \"es el que se vende\", y cada venta nueva te deja casi nada después de material, tiempo, comisiones y el anuncio que la trajo.\n\n**Lo segundo: qué tan fuerte es tu oferta.**\nCon más presupuesto, tus anuncios le llegan a gente que no te conocía y no te andaba buscando. A esa gente, una oferta normal no la mueve. Una oferta fuerte sí.\n\nOferta fuerte es agregarle algo que a ti te cueste poco y a ellos les valga mucho: una garantía, entrega más rápida o un servicio extra. Con esa oferta fuerte puedes subir el precio sin que se caiga el cierre, y venderle también al que llega frío.\n\nSaber cuánto te deja cada servicio o producto te dice a cuál meterle dinero. Hacer esa oferta más fuerte te dice cómo cobrar más por él.", "s": ["Toma tus 3 servicios o productos principales. A cada uno réstale material, tiempo, comisiones y lo que gastaste en anuncios para venderlo. Lo que queda es lo que te deja cada uno.", "Compara: fíjate si el que más se vende es el más barato y el que menos te deja.", "Decide una sola cosa este mes: mueves presupuesto al que más te deja, o haces que el que más se vende te deje más. Para eso hay tres formas: le subes el precio, negocias con tu proveedor para que el material te salga más barato, o le agregas algo que a ti te cueste poco y al cliente le valga mucho (garantía, entrega más rápida, una sesión extra)."], "e": "Servicio A: se vende a $1,500. Le quitas $900 de material, tiempo y comisiones, y $300 de anuncios. Te deja $300.\nServicio B: se vende a $4,000. Le quitas $1,800 y $500 de anuncios. Te deja $1,700.\nVendes 40 de A y 8 de B al mes. A te deja $12,000. B te deja $13,600, con cinco veces menos trabajo.\nEl presupuesto de anuncios se mueve a B.\nAl servicio B le agregas garantía y una sesión extra (te cuestan $200). Subes el precio de $4,000 a $4,800. Ahora B te deja $2,300 por venta, y sigue cerrando igual."}, "Cliente ideal": {"p": "Si todo tu presupuesto va a un solo anuncio, puede que lo estés gastando en el cliente que menos te deja. Y no te enteras, porque todos tus clientes salen revueltos en el mismo costo por cliente.\n\nEn tus ventas hay más de un tipo de cliente. Unos compran por precio, otros por rapidez, otros por confianza. Tu anuncio le habla a uno. Los otros compran aunque el anuncio no les hable a ellos.\n\nMientras todos lleguen por el mismo anuncio:\n• No sabes cuánto te cuesta traer a cada tipo de cliente.\n• No sabes cuánto te deja cada tipo de cliente.\n• Al segundo tipo no le dices por qué te compraría, y por eso te escribe menos gente como él.\n\nCon un anuncio para cada tipo de cliente, medidos por separado, ves cuál te deja más dinero. Y le metes el presupuesto al anuncio de ese cliente.", "s": ["Saca tus últimas 30 ventas y sepáralas en dos grupos por lo que los hizo comprar: precio, confianza, rapidez, resultado. Vas a ver dos grupos claros.", "A cada grupo escríbele su propio anuncio, con sus palabras y su razón de compra. Nada de un anuncio \"para todos\".", "Mídelos por separado: cuánto te cuesta un cliente de cada tipo y cuánto te deja cada uno."], "e": "Revisas tus últimas 30 ventas. Todas llegaron por anuncio.\n18 compraron por precio: preguntaron cuánto y compararon.\n12 compraron por rapidez: preguntaron \"¿para cuándo lo tienes?\" y no regatearon.\n\nTu único anuncio habla de precio. A los 12 de rapidez les llegó ese mismo anuncio y compraron a pesar de él, no gracias a él.\n\nHaces un segundo anuncio, solo para ellos: entrega en 48 horas, sin hablar de precio.\n\nAl mes, mides los dos por separado:\nCliente por precio: compra de $2,000, te quedan $1,200 después de costos. Traerlo con anuncios te costó $800. Te deja $400.\nCliente por rapidez: compra de $4,500, te quedan $2,400 después de costos. Traerlo te costó $1,100. Te deja $1,300.\n\nEl de rapidez cuesta más traerlo, pero deja tres veces más. El presupuesto se mueve al anuncio del cliente por rapidez."}, "Respuesta": {"p": "Cada mensaje que te llega ya lo pagaste en anuncios, llegue a la hora que llegue. El que llega a las 11 de la noche te costó lo mismo que el que llega a las 11 de la mañana.\n\nPero no te compran igual. El que espera tu respuesta hasta el día siguiente tiene tiempo de escribirle a otro negocio. Cuando tú contestas, ya compró en otro lado o ya se le pasaron las ganas.\n\nEsa diferencia no se ve en tus anuncios: el mensaje de noche cuesta lo mismo que el de día. Se ve cuando separas tus ventas por la hora en que llegó el mensaje.\n\nY en esta etapa cada peso que le subes al presupuesto también trae mensajes de noche y de fin de semana. Si nadie los contesta a tiempo, le estás subiendo al dinero que no se vuelve venta.", "s": ["Mide el tiempo de respuesta las 24 horas, no solo en horario: saca cuánto tardaste en contestar cada mensaje de la semana pasada, incluyendo noches y fines de semana.", "Pon un bot para fuera de horario. Solo hace tres cosas: contesta al instante, da la información básica (qué vendes, precio o rango, cómo funciona) y hace una o dos preguntas para saber si es alguien que sí puede comprarte.", "Cuando entra tu equipo, ya sabe con quién habla y por dónde empezar. Revisa el tiempo de respuesta cada semana, no cada vez que alguien se queja."], "e": "Semana: 100 mensajes. 70 llegaron en horario y se contestaron en 8 minutos.\n30 llegaron de noche o en fin de semana. Se contestaron el lunes: 40 horas después.\nDe los 70 rápidos compraron 14. De los 30 lentos compró 1.\nCon el bot, los 30 reciben respuesta al instante y una pregunta. El lunes tu equipo entra a 30 conversaciones abiertas, no a 30 mensajes fríos."}, "Anuncios": {"p": "Un anuncio se cansa cuando, con el mismo anuncio, cada cliente te sale más caro que al principio.\n\nMientras tu anuncio ganador está cansado y todavía no tienes el siguiente, cada cliente te cuesta más que cuando el anuncio era nuevo.\n\nEn esta etapa gastas más en anuncios. Con más gasto, la misma gente ve tu anuncio más veces, y tu anuncio ganador se cansa más rápido que cuando gastabas menos.\n\nY mientras buscas el siguiente anuncio ganador, el presupuesto sigue corriendo. Cada semana de búsqueda es una semana de clientes caros.\n\nCuando tienes escritas las seis cosas que hicieron ganar a tu anuncio, no empiezas de cero. Cambias una sola de esas seis y pruebas. El siguiente anuncio ganador sale de lo que ya sabes, no de adivinar.", "s": ["Agarra tu anuncio ganador y escribe estas seis cosas:\n• A quién le habla: qué tanto sabe ya de su problema y de ti.\n• Qué le dice: el ángulo, la idea principal.\n• Cómo se lo cuenta: por ejemplo paso por paso, comparación, testimonio o mito contra realidad.\n• En qué formato: imagen, carrusel o video.\n• Cómo se ve: hecho con celular, o producido como publicidad.\n• Con qué arranca: la primera frase.", "Cuando se canse, cambia una sola de esas seis cosas. Deja que el anuncio nuevo gaste su dinero de prueba completo antes de decidir (lo ves en Campañas).", "Guarda cada anuncio ganador con sus seis cosas escritas, no solo la imagen. Ese es tu banco de anuncios ganadores."], "e": "Lo más que puedes pagar por un cliente sin perder dinero: $1,000.\n\nAnuncio ganador de julio:\n• Le habla al que ya comparó precios (sabe de su problema y de ti).\n• Ángulo: \"te lo entrego en 48 horas\".\n• Contado como comparación contra la competencia.\n• Imagen.\n• Hecho con celular.\n• Arranca con: \"¿Todavía esperando tu pedido?\".\nEn julio cada cliente te costó $600.\n\nEn agosto, con el mismo anuncio, cada cliente te costó $1,050. Se cansó. Antes le cambiabas la foto.\n\nAhora cambias una sola cosa: el cómo. Mismo ángulo, misma gente, mismo formato, mismo arranque. Solo que ahora se cuenta con un testimonio.\nLe dejas gastar su dinero de prueba: $1,500.\nTrae 2 clientes. $750 por cliente, abajo de tus $1,000. Sigue prendido.\n\nYa sabes que lo que lo hacía ganar no era la comparación. Y que la foto nunca fue el problema."}, "Asistencia": {"p": "Cada persona que te dice \"sí quiero\" y luego no cumple, la pagaste dos veces.\n\nLa primera, en el anuncio que la trajo.\nLa segunda, en lo que apartaste para ella: el horario de la cita que nadie más pudo usar, el envío del paquete que regresó, el tiempo de armar una cotización que nunca contestó.\n\nY la pagas una tercera vez sin verlo. Si mides tus anuncios por cuántos \"sí quiero\" traen, le subes el presupuesto al que más junta. Ese anuncio puede ser justo el que menos cumple.\n\nEn esta etapa llegan más \"sí quiero\" cada mes. Si una parte no cumple, esa parte crece al mismo ritmo que tu presupuesto.", "s": ["Cuenta la semana pasada: cuántos dijeron \"sí quiero\" y cuántos cumplieron.\n• Dijo sí: apartó cita, pidió el pedido o pidió la cotización.\n• Cumplió: llegó a la cita, pagó el pedido o pagó la cotización.\nTu meta: que cumplan 3 de cada 4.", "Antes de apartar la cita, enviar el pedido o armar la cotización, pide un anticipo o el pago por adelantado. A todos, no solo a los que te dan desconfianza.", "Manda dos mensajes a todos los que dijeron sí: un recordatorio un día antes y una confirmación el mismo día.", "Apunta de qué anuncio viene cada \"sí quiero\" (con la clave A1.1 que ves en Métricas). Al final del mes, compara tus anuncios por cuántos cumplieron, no por cuántos dijeron sí."], "e": "Dos anuncios. Cada uno gastó $6,000 en el mes.\n\nAnuncio A1.1, la promoción fuerte:\n30 dijeron \"sí quiero\". Cumplieron 12.\nCada \"sí quiero\" te costó $200.\nCada cliente que cumplió te costó $500.\n\nAnuncio B1.1, el que explica bien el servicio:\n18 dijeron \"sí quiero\". Cumplieron 15.\nCada \"sí quiero\" te costó $333.\nCada cliente que cumplió te costó $400.\n\nSi contabas los \"sí quiero\", ganaba A1.1.\nContando los que cumplieron, gana B1.1. A B1.1 le subes el presupuesto.\nY A1.1 no llega a tu meta: de 30, cumplieron 12, menos de la mitad."}};
function pqEsc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function pqTxt(s){ return String(s).split(/\n\n+/).map(function(par){ return '<p>'+pqEsc(par).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>')+'</p>'; }).join(''); }
function pqHtml(c){
 if(CHKN()!==3) return '';
 const q=PQ3[c.area]; if(!q) return '';
 return '<details class="pq"><summary>Ver por qué importa <span class="pq-ar">↓</span></summary><div class="pq-b">'+pqTxt(q.p)+
  '<div class="pq-t">Esta semana:</div><ol>'+q.s.map(function(x){ return '<li>'+pqEsc(x).replace(/\n/g,'<br>')+'</li>'; }).join('')+'</ol>'+
  '<div class="pq-t">Ejemplo:</div><div class="pq-ej">'+pqTxt(q.e)+'</div></div></details>';
}

const CHK_BY={1:CHK1,2:CHK2,3:CHK3};
/* PRETICK[etapa][fila] = respuesta minima del quiz (0-3) que marca la fila como resuelta. null = nunca.
   Filas: Presupuesto, Campañas, Equipo, Metricas, Seguimiento, Ventas, Oferta, Cliente ideal, Respuesta, Anuncios.
   Presupuesto y Campañas nunca: sus preguntas miden monto y quien lo lleva, no la practica que pide la fila. */
const PRETICK={
 1:[null,null,3,2,1,3,2,2,2,2],
 2:[null,null,3,3,2,3,2,2,2,2],
 3:[null,null,3,3,3,3,null,3,3,3]
};
const PIDE_COVERED_BY={1:['Cliente ideal','Oferta','Anuncios'],2:['Presupuesto','Métricas','Ventas'],3:['Presupuesto','Métricas','Campañas']};
function nombreDiente(l){ if(!l) return 'lo que salió en rojo'; const cl=K()==='clinicas'; const e=(state&&state.etapa)||1; const M={'Cliente':cl?'tu paciente':'tu cliente','Venta mensual':e>=3?'de qué está hecha tu venta':'tu objetivo del mes','CAC':e===4?(cl?'cuánto te cuesta el paciente extra':'cuánto te cuesta el cliente extra'):(cl?'cuánto te cuesta un paciente':'cuánto te cuesta un cliente'),'Respuesta a leads':'tu tiempo de respuesta','Atribución':e===4?'que Meta sepa qué anuncio vende':'saber de qué anuncio salió cada venta','ROAS':'cuánto te regresa cada peso que metes','Tasa de cierre':'cuántos de los que preguntan compran','Utilidad':'cuánto te deja cada venta','Oferta':'tu oferta','Equipo de ventas':cl?'cómo agenda tu recepción':'cómo vende tu equipo','Generación de ads':'tus anuncios nuevos','Creatividades':'por qué funciona tu anuncio ganador','Automatización':'tu seguimiento'}; return M[l]||l.toLowerCase(); }
const ETAPA_GUIDE={}; // guía de la etapa cuando no es el mismo diente del bloque gratis
const ETAPA_TOOTH={1:'Cliente',2:'Venta mensual',3:'CAC'};
function nk(o,key){ const v=(K()==='clinicas'&&o&&o.cl&&o.cl[key]!=null)?o.cl[key]:(o?o[key]:undefined); return (typeof v==='string'&&v.indexOf('\n')>-1)?v.split('\n').join('<br>'):v; }
function CHKN(){ const e=(state&&state.etapa)||1; return (e===2||e===3)?e:1; }
function CHK(){ return CHK_BY[CHKN()]||CHK1; }
function chkKey(base){ try{ const b=(state&&state.B)?state.B.join(''):''; return base+(b?'_'+b:''); }catch(e){ return base; } }
function chk1Load(){
 try{ const raw=localStorage.getItem(chkKey('as_chk_'+CHKN())); const o=raw?JSON.parse(raw):{}; return (o&&typeof o==='object')?o:{}; }catch(e){ return {}; }
}
function chk1Save(o){ try{ localStorage.setItem(chkKey('as_chk_'+CHKN()), JSON.stringify(o)); }catch(e){} }
function renderChecklist1(firstAny){
 try{ window.__firstAny=firstAny; }catch(e){}
 const list=document.getElementById('chkList'), prog=document.getElementById('chkProg');
 if(!list||!prog) return;
 let stored=chk1Load();
 let picked=pideLoad();
 const startIdx=[];
 if(firstAny && firstAny.l){
  const START_AREA={'Cliente':'Cliente ideal','Venta mensual':'Ventas','CAC':'Métricas','Respuesta a leads':'Respuesta','Equipo de ventas':'Equipo','Oferta':'Oferta','Automatización':'Seguimiento','Generación de ads':'Anuncios','Creatividades':'Anuncios'};
  const fl=firstAny.l.toLowerCase(), sa=START_AREA[firstAny.l];
  CHK().forEach((c,i)=>{ if(sa ? c.area===sa : fl.indexOf(c.area.toLowerCase().slice(0,5))>=0) startIdx.push(i); });
 }
 // el momento que el dueño escogió en el espejo manda sobre la heurística
 try{ const _A=espAreas();
  if(_A.length){ startIdx.length=0; _A.forEach(function(a){ CHK().forEach((c,i)=>{ if(c.area===a && startIdx.indexOf(i)<0) startIdx.push(i); }); }); } }catch(e){}
 let tengoA=[], preguntadas=[];
 try{ if(espTengo() && espLoad().length){ tengoA=espTengoAreas(); preguntadas=(MOMENTOS[3]||[]).map(m=>m.chk); } }catch(e){}
 // lo que el dueño dijo que YA TIENE nunca es "Empieza por aquí", ni por heurística
 if(tengoA.length){ for(let k=startIdx.length-1;k>=0;k--){ const ar=(CHK()[startIdx[k]]||{}).area; if(tengoA.indexOf(ar)>=0) startIdx.splice(k,1); } }
 function isOn(i){
  if(Object.prototype.hasOwnProperty.call(stored,i)) return !!stored[i];
  if(i===10) return false;
  if(startIdx.indexOf(i)>=0) return false;   // "Empieza por aqui" y "ya lo resolviste" no caben en la misma fila
  const ar=(CHK()[i]||{}).area;
  if(tengoA.indexOf(ar)>=0) return true;          // 22 sep: el espejo de E3 dijo "ya lo tengo"
  if(preguntadas.indexOf(ar)>=0) return false;    // se preguntó y no lo marcó: no se pre-tacha
  const mn=(PRETICK[CHKN()]||[])[i];           // matriz explicita (20 sep): la heuristica "columna n+1" acertaba 1 de 10 en E1
  return mn!=null && state.B && state.B[i]!=null && state.B[i]>=mn;
 }
 function isAyuda(i){ return !!picked[i]; }
 window.chk1IsOn=isOn;
 function paint(){
  const _pqOpen=[].map.call(list.querySelectorAll('details.pq[open]'),function(d){ const r=d.closest('.it'); return r?r.dataset.i:null; });
  let n=0, nAyuda=0;
  const rank=function(i){ const p=startIdx.indexOf(i); return p>=0?p:999; };
  const order=CHK().map((c,i)=>i).sort((a,b)=>rank(a)-rank(b));
  list.innerHTML=order.map(i=>{const c=CHK()[i];
   const on=isOn(i); if(on) n++;
   const ay=isAyuda(i); if(ay) nAyuda++;
   const sPos=startIdx.indexOf(i), isStart=sPos>=0;
   const startSpan = sPos===0 ? ' <span class="chk-start">← Empieza por aquí</span>'
                   : sPos>0  ? ' <span class="chk-start alt">← Esto también lo marcaste</span>' : '';
   const stateCls=on?' tengo':(ay?' ayuda':'');
   return `<div class="it${stateCls}${isStart?' start':''}${pqHtml(c)?' has-pq':''}" data-i="${i}"><button type="button" class="c" data-act="tengo" aria-label="Ya lo resolví"></button><div class="tx"><b>${c.area}:</b> ${nk(c,'text')}${startSpan}${nk(c,'ej')?`<div class="ej"><b>Ejemplo:</b> ${nk(c,'ej')}</div>`:''}${pqHtml(c)}<div class="how-row">↖ Si esto ya lo haces${c.na?' o no aplica para tu negocio':''}, toca el círculo para marcarlo como resuelto. Si quieres ayuda con esto, toca el botón ↘</div></div><button type="button" class="act ayuda" data-act="ayuda">${ay?'✓ Ayúdame con esto':'Ayúdame con esto'}</button>${ay?((PIDE_COVERED_BY[CHKN()]||PIDE_COVERED).indexOf(c.area)>=0?`<div class="fb">Anotado. Esto viene en la guía de etapa ${CHKN()}, que todavía no sale. En cuanto la saque, te aviso a tu correo.</div>`:`<div class="fb">Anotado. En cuanto junte a los que piden esto, hago la guía y te aviso a tu correo.</div>`):''}</div>`;
  }).join('');
  _pqOpen.forEach(function(k){ if(k===null) return; const d=list.querySelector('.it[data-i="'+k+'"] details.pq'); if(d){ d.open=true; d.closest('.it').classList.add('pq-open'); } });
  try{ const _cs=document.getElementById('chkSec'); if(_cs) _cs.classList.toggle('con-pq', !!list.querySelector('.it.has-pq')); }catch(e){}
  prog.innerHTML=`Llevas <b>${n}</b> de 11 · Pediste ayuda en <b>${nAyuda}</b>`;
  const bpT=document.getElementById('bpT'), bpA=document.getElementById('bpA');
  if(bpT) bpT.textContent=n;
  if(bpA) bpA.textContent=nAyuda;
  try{ renderPide(); }catch(e){ console.warn('pide',e); }
 }
 paint();
 list.onclick=function(e){
  const sm=e.target.closest('details.pq > summary'); if(sm){ try{ const r=sm.closest('.it'); if(r && !sm.parentNode.open){ ASV&&ASV.hit('pq_'+pideSlug(CHK()[+r.dataset.i].area)); } }catch(err){} return; }
  const btn=e.target.closest('[data-act]'); if(!btn) return;
  const row=btn.closest('.it'); if(!row) return;
  const i=+row.dataset.i;
  const act=btn.dataset.act;
  if(act==='tengo'){
   const nowOn=!isOn(i);
   stored[i]=nowOn; chk1Save(stored);
   if(nowOn){ try{ASV&&ASV.hit('check_'+i)}catch(e){} }
   if(nowOn && picked[i]){ picked[i]=false; pideSave(picked); }
  } else if(act==='ayuda'){
   const nowOn=!isAyuda(i);
   picked[i]=nowOn; pideSave(picked);
   if(nowOn){ try{ASV&&ASV.hit('pide_'+pideSlug(CHK()[i].area))}catch(e){} }
   if(nowOn && isOn(i)){ stored[i]=false; chk1Save(stored); }
  }
  pideSchedule();
  paint();
 };
}
/* ---- Pide (resultado según filas marcadas "Ayúdame con esto") Etapa 1 ---- */
const PIDE_COVERED=['Cliente ideal','Oferta','Anuncios'];
function pideSlug(area){
 return area.toString().normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}
function pideLoad(){
 try{ const raw=localStorage.getItem(chkKey('as_pide_'+CHKN())); const o=raw?JSON.parse(raw):{}; return (o&&typeof o==='object')?o:{}; }catch(e){ return {}; }
}
function pideSave(o){ try{ localStorage.setItem(chkKey('as_pide_'+CHKN()), JSON.stringify(o)); }catch(e){} }
/* Envío automático a la lista: un tap en "Ayúdame con esto" basta.
   Espera 5 s tras el último cambio, manda solo si la lista cambió vs. lo último enviado,
   máximo 2 envíos por visita. También manda al salir de la página si quedó pendiente. */
let PIDE_T=null, PIDE_SENDS=0;
function pideSentGet(){ try{ return localStorage.getItem(chkKey('as_pide_sent_'+CHKN()))||''; }catch(e){ return ''; } }
function pideSentSet(v){ try{ localStorage.setItem(chkKey('as_pide_sent_'+CHKN()), v); }catch(e){} }
function pideAreasNow(){
 const picked=pideLoad();
 return CHK().map((c,i)=>i).filter(i=>!!picked[i]).map(i=>pideSlug(CHK()[i].area)).sort().join(',');
}

 const MOMENTOS={
  1:[
   {id:'M-01',  t:'Publiqué mi post y le piqué al botón azul',        chk:'Campañas'},
   {id:'M-05b', t:'Pagué anuncios y no me escribió nadie',            chk:'Anuncios'},
   {id:'M-03',  t:'Me preguntan precio y desaparecen',                chk:'Seguimiento'},
   {id:'M-04b', t:'Me escriben pero no me compra nadie',              chk:'Equipo', cl:{t:'Me escriben pero no agenda nadie'}},
   {id:'M-09',  t:'Llevo una semana con el anuncio y cero ventas',    chk:'Presupuesto', cl:{t:'Llevo una semana con el anuncio y cero citas'}}
  ],
  2:[
   {id:'M2-09', t:'Tengo 8 o 10 anuncios prendidos y no sé cuál vende',      chk:'Campañas'},
   {id:'M2-02', t:'Me pasé al administrador de anuncios y me está yendo peor',chk:'Campañas'},
   {id:'M2-10', t:'Se me olvida escribirle al que me dijo "lo pienso"',   chk:'Seguimiento'},
   {id:'M2-04', t:'Un mes vendo bien y al siguiente la mitad',               chk:'Ventas'},
   {id:'M2-05', t:'Ya no contesto yo y se me caen las ventas',               chk:'Equipo', cl:{t:'Ya no contesto yo y se me caen las citas'}},
   {id:'M2-11', t:'Llevo meses con el mismo presupuesto y no sé si subirle', chk:'Presupuesto'},
   {id:'M2-12', t:'Sé cuánto vendo, pero no cuánto me cuesta cada venta',   chk:'Métricas', cl:{t:'Sé cuántos pacientes tengo, pero no cuánto me cuesta cada uno'}},
   {id:'M2-13', t:'Cuando hago un anuncio nuevo, no sé si vendió más por la foto o por el texto', chk:'Anuncios', cl:{t:'Cuando hago un anuncio nuevo, no sé si agendó más por la foto o por el texto'}}
  ],
  3:[  // 22 sep · en E3 el espejo pregunta qué TIENES (tengo:true). Marcado = ya lo tiene (verde). Lo primero sin marcar = "Empieza por aquí".
   {id:'T3-01', chk:'Métricas',      t:'Sé cuánto me cuesta un cliente en cada campaña, y cuánto es lo más que puedo pagar por uno',
      cl:{t:'Sé cuánto me cuesta un paciente en cada campaña, y cuánto es lo más que puedo pagar por uno'},
      por:'sin este número, presupuesto, campañas y anuncios se deciden a ciegas. Por eso va primero.'},
   {id:'T3-02', chk:'Ventas',        t:'Sé en qué paso se me van: de los que escriben, cuántos cotizan; de los que cotizan, cuántos compran',
      cl:{t:'Sé en qué paso se me van: de los que escriben, cuántos agendan; de los que agendan, cuántos llegan y compran'},
      por:'esto te dice si el problema está en el anuncio o en la venta. Sin esto, arreglas el paso equivocado.'},
   {id:'T3-03', chk:'Campañas',      t:'Cada campaña tiene su dinero de prueba apartado, y no la apago ni le subo hasta que se lo gasta',
      por:'apagar antes de tiempo mata campañas que sí iban a vender. La decisión se toma con los clientes que trajo, no con los mensajes ni con los días que lleva.',
      cl:{por:'apagar antes de tiempo mata campañas que sí iban a traer pacientes. La decisión se toma con los pacientes que llegaron, no con los mensajes ni con los días que lleva.'}},
   {id:'T3-04', chk:'Cliente ideal', t:'Tengo al menos dos tipos de cliente, y cada uno tiene su propio anuncio',
      cl:{t:'Tengo al menos dos tipos de paciente, y cada uno tiene su propio anuncio', por:'con un solo mensaje para todos solo le atinas a una parte. Tu segundo tipo de paciente te deja crecer sin salir de Meta.'},
      por:'con un solo mensaje para todos solo le atinas a una parte. Tu segundo tipo de cliente te deja crecer sin salir de Meta.'},
   {id:'T3-05', chk:'Equipo',        t:'Todos venden con el mismo guion y cada semana veo la tasa de conversión de cada quien',
      cl:{t:'Todos en recepción usan el mismo guion y cada semana veo la tasa de conversión de cada quien'},
      por:'uno cierra el doble que el otro y nadie sabe qué hace diferente. El número enfrente es lo que lo arregla, no los regaños.'},
   {id:'T3-06', chk:'Oferta',        t:'Sé cuánto me deja cada servicio o producto, ya quitándole material, tiempo, comisiones y anuncios',
      cl:{t:'Sé cuánto me deja cada tratamiento, ya quitándole insumos, cabina, comisiones y anuncios', por:'le metes anuncios al tratamiento que más se vende, no al que más te deja. Esta es la que separa vender más de ganar más.'},
      por:'le metes anuncios al servicio o producto que más se vende, no al que más te deja. Esta es la que separa vender más de ganar más.'}
  ],
  4:[  // 20 sep · en E4 el momento mueve el FOCO (gratis + guia), no una fila de checklist. tooth = diente al que manda.
   {id:'M4-01', t:'Me entero de los problemas cuando un cliente se queja, no porque mi equipo o mi agencia me avisen', chk:'Métricas',      tooth:'Venta mensual'},
   {id:'M4-02', t:'Facebook, mi CRM y mi banco me dan números distintos, y ninguno cuadra',                         chk:'Métricas',      tooth:'Atribución'},
   {id:'M4-03', t:'Le subo al presupuesto y el costo por cliente se me dispara',               chk:'Presupuesto',   tooth:'CAC', cl:{t:'Le subo al presupuesto y el costo por paciente se me dispara'}},
   {id:'M4-04', t:'Vendo más que nunca y me queda cada vez menos',                             chk:'Oferta',        tooth:'Utilidad'},
   {id:'M4-05', t:'Mi anuncio ganador me dura cada vez menos, y el siguiente tarda en salir',                             chk:'Anuncios',      tooth:'Creatividades'},
   {id:'M4-06', t:'Mis clientes compran una vez y no regresan',                                chk:'Asistencia',    tooth:'Oferta', cl:{t:'Mis pacientes vienen una vez y no regresan'}},
   {id:'M4-07', t:'Mi equipo usa el mismo guion desde hace meses, y no sé en qué parte de la plática se pierden las ventas',               chk:'Equipo',        tooth:'Equipo de ventas', cl:{t:'Mi recepción usa el mismo guion desde hace meses, y no sé en qué parte de la plática se pierden las citas'}},
   {id:'M4-08', t:'Siento que Meta ya no da más, y no sé si abrir otra plaza u otro canal',              chk:'Campañas',      tooth:'Generación de ads'},
   {id:'M4-09', t:'Meta me trae gente que escribe, pero no gente que compra', chk:'Seguimiento', tooth:'Automatización', cl:{t:'Meta me trae gente que escribe, pero no pacientes que pagan'}},
   {id:'M4-10', t:'Mis ventas ya no crecen, y me da miedo probar una oferta o un precio nuevo', chk:'Ventas', tooth:'Venta mensual'}
  ]
 };

/* "Tu negocio esta en" se ajusta para medir EXACTAMENTE lo mismo que "1 de 4 etapas." */
function fitHero(){
 try{
  const h=document.querySelector('#screen-gate .hero'); if(!h) return;
  const a=h.querySelector('.hero-0'), b=h.querySelector('.hero-1'); if(!a||!b) return;
  a.style.fontSize='';                                   // vuelve a la base del CSS antes de medir
  const anchoDe=function(el){ const r=document.createRange(); r.selectNodeContents(el);
                              return r.getBoundingClientRect().width; };
  const wb=anchoDe(b), wa=anchoDe(a);
  if(!wa||!wb) return;
  const base=parseFloat(getComputedStyle(a).fontSize);
  const tope=parseFloat(getComputedStyle(b).fontSize)*0.95;   // nunca mas grande que el renglon grande
  a.style.fontSize=Math.min(base*(wb/wa), tope).toFixed(2)+'px';
 }catch(e){}
}
window.addEventListener('resize', fitHero);
if(document.fonts && document.fonts.ready) document.fonts.ready.then(fitHero);   // la fuente cambia las medidas
setTimeout(fitHero, 0); setTimeout(fitHero, 250); setTimeout(fitHero, 900);

function espKey(){ return chkKey('as_momento'); }
function espLoad(){ try{ const v=localStorage.getItem(espKey())||''; return v?v.split(','):[]; }catch(e){ return []; } }
function espSave(a){ try{ localStorage.setItem(espKey(),(a||[]).join(',')); }catch(e){} }
// devuelve los momentos escogidos EN EL ORDEN DEL FLUJO (el orden del arreglo), no en el orden en que les picó
function espPicked(){ const et=state.etapa, sel=espLoad(); return (MOMENTOS[et]||[]).filter(m=>sel.indexOf(m.id)>=0); }
// las areas del checklist que tocan sus momentos, sin repetir
function espTengo(){ return state.etapa===3; }   // 22 sep: en E3 marcar = "ya lo tengo"
function espFaltan(){ const sel=espLoad(); return (MOMENTOS[3]||[]).filter(m=>sel.indexOf(m.id)<0); }
function espAreas(){
 if(espTengo()){ const F=espFaltan(); return (espLoad().length && F.length) ? [F[0].chk] : []; }   // solo la primera que falta manda "Empieza por aquí"
 const out=[]; espPicked().forEach(function(m){ if(out.indexOf(m.chk)<0) out.push(m.chk); }); return out; }
function espTengoAreas(){ return espTengo() ? espPicked().map(m=>m.chk) : []; }

function renderEspejo(){
 const el=document.getElementById('espejo'); if(!el) return;
 const et=state.etapa, L=MOMENTOS[et];
 if(!L||!L.length){ el.innerHTML=''; el.style.display='none'; return; }
 el.style.display='';
 const sel=espLoad();
 const tengo=espTengo();
 el.classList.toggle('esp-tengo', tengo);
 let h=`<div class="esp-k">UNA ÚLTIMA COSA</div>`;
 h+= tengo ? `<h2 class="esp-h">Para saber qué te falta: ¿cuáles de estas ya tienes?</h2>`
           : `<h2 class="esp-h">Ya tienes tu tabla. Falta decidir por dónde empiezas.</h2>`;
 h+= tengo ? `<p class="esp-sub">Marca solo lo que ya tienes funcionando. Lo primero que no marques es por donde empiezas.</p>`
   : et===4
  ? `<p class="esp-sub">Marca lo que te pase. Si marcas varias, te digo cuál revisar primero.</p>`
  : `<p class="esp-sub">Marca lo que se parezca a tu semana. Si marcas varias, te digo con cuál empezar.</p>`;
 h+=`<div class="esp-l">`;
 const firstMissing = tengo && sel.length ? (espFaltan()[0]||{}).id : null;
 L.forEach(function(m){
  const tx=nk(m,'t');
  const on=sel.indexOf(m.id)>=0;
  const first = firstMissing===m.id;
  const lbl = tengo ? `<span class="esp-a">${m.chk}</span>` : '';
  const tag = first ? `<span class="esp-tag">← Empieza aquí</span>` : '';
  h+=`<button type="button" class="esp-i${on?' on':''}${first?' first':''}" data-mom="${m.id}" aria-pressed="${on}"><span class="esp-d">${on?'✓':''}</span><span class="esp-t">${lbl}${tx}</span>${tag}</button>`;
 });
 h+=`</div>`;
 if(tengo) h+=`<div class="esp-cnt">Tienes ${sel.length} de ${L.length}</div>`;
 h+=`<div class="esp-go" id="espGo" style="display:none"></div>`;
 el.innerHTML=h;
 el.querySelectorAll('.esp-i').forEach(function(b){
  b.onclick=function(){ espPick(b.getAttribute('data-mom')); };
 });
 espEcho();
}

function espPick(id){
 const et=state.etapa, m=(MOMENTOS[et]||[]).find(x=>x.id===id); if(!m) return;
 let sel=espLoad();
 const i=sel.indexOf(id);
 const added = i<0;
 if(added) sel.push(id); else sel.splice(i,1);
 espSave(sel);
 document.querySelectorAll('#espejo .esp-i').forEach(function(b){
  const on=sel.indexOf(b.getAttribute('data-mom'))>=0;
  b.classList.toggle('on',on);
  b.setAttribute('aria-pressed',on?'true':'false');
  const d=b.querySelector('.esp-d'); if(d) d.textContent=on?'✓':'';
 });
 if(et===4){
  try{ const stt=l=>{const t=(LAST_TEETH||[]).find(x=>x.l===l); return t?t.s:null;};
   const cand=espPicked().map(x=>x.tooth).filter(l=>l&&stt(l)&&stt(l)!=='g');
   state.focoOverride = cand.length ? cand[cand.length-1] : null;   // el ultimo que marco y que no trae verde
   render(buildLevels()); }catch(e){ console.warn('foco4',e); }
 } else {
  espEcho();
  try{ renderChecklist1(window.__firstAny); }catch(e){}
 }
 if(espTengo()){ renderEspejo(); }
 if(added){
  if(espTengo()){
   const F=espFaltan(), f0=F[0];
   try{ sendWebhook("momento",{etapa:et, momento_id:f0?f0.id:'T3-OK', momento:f0?('Falta: '+f0.chk):'Tiene las 6', area:f0?f0.chk:'',
        todos:espPicked().map(x=>x.id).join(','), areas:F.map(x=>x.chk).join(','), tiene:espTengoAreas().join(','), nicho:K()||''}); }catch(e){}
  } else {
  try{ sendWebhook("momento",{etapa:et, momento_id:m.id, momento:nk(m,'t'), area:m.chk,
        todos:espPicked().map(x=>x.id).join(','), areas:espAreas().join(','), nicho:K()||''}); }catch(e){}
  }
  /* 8.5: el momento ya no va a Meta (aviso: Meta no recibe areas) */
  try{ ASV&&ASV.hit('momento_'+m.id) }catch(e){}
 }
}

/* La guia de la etapa, en palabras del dueño y en filas del checklist. El espejo ENTREGA a la guia,
   no compite con ella (caso Mario, 15 sep). En E3 "Presupuesto" y "Metricas" YA SON la regla del CAC. */
const GUIA_ETAPA={
 1:{nombre:function(){ return K()==='clinicas'?'tu paciente':'tu cliente'; }, filas:['Cliente ideal']},
 2:{nombre:function(){ return 'tu objetivo del mes'; }, filas:['Ventas']},
 3:{nombre:function(){ return K()==='clinicas'?'cuánto te cuesta un paciente':'cuánto te cuesta un cliente'; }, filas:['Métricas']}
};
function espEcho(){
 const go=document.getElementById('espGo'); if(!go) return;
 const P=espPicked(), A=espAreas();
 if(!P.length){ go.style.display='none'; go.innerHTML=''; return; }
 go.style.display='';
 if(state.etapa===4){
  const stt=l=>{const t=(LAST_TEETH||[]).find(x=>x.l===l); return t?t.s:null;};
  const focoL=(window.__firstAny||{}).l;
  const first=P[P.length-1]; const firstOk = first && first.tooth && stt(first.tooth)==='g';
  let tx;
  const M408 = P.some(m=>m.id==='M4-08');   // 20 sep: "abrir plaza/canal" es una decision, no un defecto: veredicto propio, siempre al socio
  if(M408){
   go.innerHTML=`Antes de abrir otro canal, revisa lo que te falta en Meta. ¿Corres más de un objetivo, o solo mensajes? ¿Pruebas anuncios nuevos cada semana? ¿Le hablas a más de un tipo de cliente? Si alguna es "no", todavía puedes crecer sin salir de Meta. Que Meta ya no da más se comprueba con tres números de tu cuenta: alcance, frecuencia y anuncios nuevos (están en la fila de Campañas de tu tabla). Abajo te digo cómo lo vemos.<button type="button">Ver cómo lo revisamos \u2193</button>`;
   const bM=go.querySelector('button'); if(bM) bM.onclick=function(){ (document.getElementById('socio')||document.getElementById('unica')||document.getElementById('mapa')).scrollIntoView({behavior:'smooth',block:'start'}); };
   return;
  }
  if(!focoL) tx=`Eso, por tus respuestas, ya lo traes. Cuando todo sale en verde y aun así topas, lo que falta no está en el quiz: está en la cuenta. Abajo te digo cómo lo vemos.`;
  else if(P.length===1 && firstOk) tx=`Eso, por tus respuestas, ya lo traes resuelto. Lo que va primero en tu cuenta es <b>${nombreDiente(focoL)}</b>: abajo te dejo qué revisar esta semana.`;
  else if(P.length===1) tx=`Va. Lo tuyo es <b>${(first&&first.tooth)?nombreDiente(first.tooth):A[0]}</b>. A tu nivel eso no se arregla con una guía: se arregla entrando a la cuenta. Abajo te dejo qué revisar esta semana, y si quieres que lo vea contigo, ahí mismo está.`;
  else tx=`Va, marcaste ${P.length}. Empieza por <b>${focoL?nombreDiente(focoL):A[0]}</b>: abajo te dejo qué revisar esta semana.`;
  go.innerHTML=tx+`<button type="button">Ver qué revisar esta semana \u2193</button>`;
  const b4=go.querySelector('button'); if(b4) b4.onclick=function(){ const u=document.getElementById('unica'), so=document.getElementById('socio'); ((u&&u.style.display!=='none')?u:so||document.getElementById('mapa')).scrollIntoView({behavior:'smooth',block:'start'}); };
  return;
 }
 if(espTengo()){
  const F=espFaltan();
  if(!F.length){
   go.innerHTML=`Tienes las 6. Eso ya es etapa 4: lo que sigue no está en el checklist, está en la cuenta. Abajo te digo cómo lo vemos.<button type="button">Ver cómo lo revisamos \u2193</button>`;
   const bS=go.querySelector('button'); if(bS) bS.onclick=function(){ (document.getElementById('socio')||document.getElementById('chkSec')).scrollIntoView({behavior:'smooth',block:'start'}); };
   return;
  }
  const f0=F[0];
  go.innerHTML=`Te falta${F.length===1?'':'n'} ${F.length}. Empieza por <b>${f0.chk}</b>: ${nk(f0,'por')}<br>Abajo te lo dejé de primero en tu checklist, con el cómo.`;
  const bT=go.querySelector('button'); if(bT) bT.onclick=function(){
   let target=null;
   document.querySelectorAll('#chkList .it').forEach(function(r){ const lb=r.querySelector('.tx b'); if(lb&&lb.textContent.replace(':','').trim()===f0.chk) target=r; });
   (target||document.getElementById('chkSec')).scrollIntoView({behavior:'smooth',block:'center'});
   if(target){ target.classList.add('hl'); setTimeout(function(){ target.classList.remove('hl'); },2200); }
  };
  return;
 }
 const G=GUIA_ETAPA[state.etapa];
 const yaEsLaGuia = !G || A.some(function(a){ return G.filas.indexOf(a)>=0; });
 const puente = yaEsLaGuia ? '' : `<br>Una cosa antes: en tu etapa, <b>${G.nombre()}</b> va primero. Sin eso, lo que arregles en las otras áreas no se sostiene. Te lo dejo aquí abajo.`;
 const btn = yaEsLaGuia ? '' : 'Ver por dónde empezar \u2193';
 if(A.length===1){
  go.innerHTML=`Va. Lo tuyo es <b>${A[0]}</b>, y abajo te lo marqué en tu checklist.${puente}${btn?`<button type="button">${btn}</button>`:''}`;
 }else{
  const resto = A.length===2 ? 'La otra te la marqué abajo en tu checklist.' : 'Las otras te las marqué abajo en tu checklist.';
  go.innerHTML=`Va, marcaste ${P.length}. Empieza por <b>${A[0]}</b>. ${resto}${puente}${btn?`<button type="button">${btn}</button>`:''}`;
 }
 const bt=go.querySelector('button');
 if(bt) bt.onclick=function(){
  if(!yaEsLaGuia){ const u=document.getElementById('unica'); if(u){ u.scrollIntoView({behavior:'smooth',block:'start'}); return; } }
  let target=null;
  document.querySelectorAll('#chkList .it').forEach(function(r){ const lb=r.querySelector('.tx b'); if(lb&&lb.textContent.replace(':','').trim()===A[0]) target=r; });
  (target||document.getElementById('chkSec')).scrollIntoView({behavior:'smooth',block:'center'});
  if(target){ target.classList.add('hl'); setTimeout(function(){ target.classList.remove('hl'); },2200); }
 };
}

function pideFlush(final){
 if(PIDE_T){ clearTimeout(PIDE_T); PIDE_T=null; }
 const areas=pideAreasNow();
 if(!areas || areas===pideSentGet() || PIDE_SENDS>=(final?3:2)) return;
 PIDE_SENDS++; pideSentSet(areas);
 sendWebhook("waitlist",{producto:"paquete", areas:areas});
 try{ASV&&ASV.hit('paquete_'+areas.split(',').length)}catch(e){}
 try{ track("Waitlist",{}); }catch(e){}
}
function pideSchedule(){ if(PIDE_T) clearTimeout(PIDE_T); PIDE_T=setTimeout(pideFlush,5000); }
document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='hidden' && PIDE_T) pideFlush(true); });
window.addEventListener('pagehide',function(){ if(PIDE_T) pideFlush(true); });
function renderPide(){
 const resEl=document.getElementById('pideRes');
 if(!resEl) return;
 let picked=pideLoad();
 const marked=CHK().map((c,i)=>i).filter(i=>!!picked[i]);
 if(!marked.length){ resEl.innerHTML=''; return; }
 const COV=marked.filter(i=>(PIDE_COVERED_BY[CHKN()]||PIDE_COVERED).indexOf(CHK()[i].area)>=0);
 const OTR=marked.filter(i=>(PIDE_COVERED_BY[CHKN()]||PIDE_COVERED).indexOf(CHK()[i].area)<0);
 const n=marked.length;
 const goHtml='';
 function wireGo(){ const go=resEl.querySelector('.pide-go'); if(go) go.onclick=function(e){ e.preventDefault(); const u=document.getElementById('guia'); if(u) u.scrollIntoView({behavior:'smooth'}); }; }
 const otrNames=OTR.map(i=>CHK()[i].area).join(', ');
 if(COV.length>0 && OTR.length===0){
  resEl.innerHTML=`<p class="pide-ok">${COV.length===1?'Lo que pediste viene':'Las '+COV.length+' que pediste vienen'} en la guía de etapa ${CHKN()}, que todavía no sale. En cuanto la saque, te aviso a tu correo. No tienes que hacer nada más.</p>${goHtml}`;
  wireGo(); return;
 }
 if(COV.length){
  resEl.innerHTML=`<p class="pide-ok">De las ${n} que pediste, ${COV.length===1?'una viene':COV.length+' vienen'} en la guía de etapa ${CHKN()}, que todavía no sale. ${OTR.length===1?'La otra':'Las otras '+OTR.length} (${otrNames}) ya ${OTR.length===1?'quedó anotada':'quedaron anotadas'}. Te aviso a tu correo en cuanto salga cada guía.</p>${goHtml}`;
  wireGo();
 } else {
  resEl.innerHTML=`<p class="pide-ok">${n===1?'Anotado':'Anotadas'}: ${otrNames}. Te aviso a tu correo en cuanto ${n===1?'salga':'salgan'}. No tienes que hacer nada más.</p>`;
 }
}
function render(levels){
 const real=TEETH.map((t,i)=>({...t,s:statusFor(levels[i])}));
 LAST_TEETH=real; // para la pantalla de detalle
 const locked=LOCKED.map(t=>({...t,s:'locked'}));
 const byGear=[0,1,2].map(gi=>real.filter(t=>t.g===gi).concat(locked.filter(t=>t.g===gi)));
 renderHero(byGear);
 const tg=real.filter(t=>t.s==='g').length,ty=real.filter(t=>t.s==='y').length,tr=real.filter(t=>t.s==='r').length;
 const et=state.etapa;
 let es;
 if(tr===0){ es=`Tu motor está afinado: aquí ya no es arreglar, es <b>escalar sin romperlo</b>.`; }
 else if(et<4){ es = tg>0
   ? `Ya tienes <b>${tg} cosa${tg>1?'s':''} sólida${tg>1?'s':''}</b>. Arreglando tus focos rojos saltas a <b>Etapa ${et+1}</b>.`
   : `Estás empezando: normal a esta altura. Arreglando estos focos, uno por uno, saltas a <b>Etapa ${et+1}</b>.`; }
 else { es=`Estás arriba, pero tu motor tiene <b>${tr} fuga${tr>1?'s':''}</b> que te frena${tr>1?'n':''}. Ciérra${tr>1?'las':'la'} y despegas.`; }
 document.getElementById('lectura').innerHTML=`<div class="av">A</div><div class="lx"><div class="lk2">🔎 Mi lectura</div><div class="lt">${laLectura(real,tg,tr)} <span style="opacity:.55;font-weight:600">· Anwar</span></div></div>`;
 const PAUTA=["Menos de $10 mil/mes en anuncios","$10 a $40 mil/mes en anuncios","$40 a $150 mil/mes en anuncios","Más de $150 mil/mes en anuncios"];
 let steps='';
 for(let i=1;i<=4;i++){const cls=i<et?'done':i===et?'cur':i===et+1?'next':'';const pill=i===et?'<span class="epill">ESTÁS AQUÍ</span>':i===et+1?'<span class="epill nx">SIGUIENTE</span>':'';
  steps+=`<div class="er ${cls}"><div class="ec1"><span class="ek">ETAPA ${i}</span><span class="en">${STAGES[i-1]}</span>${pill}</div><div class="ec2"><span class="ed">"${STAGE_COPY[i].dolor}"</span></div></div>`;
  if(i<4) steps+=`<div class="earrow ${i===et?'hot':''}">↓</div>`;}
 document.getElementById('etapa').innerHTML=`<div class="etab">${steps}</div>`;
 document.getElementById('etTop').innerHTML=`<div class="et-k">TU DIAGNÓSTICO</div><h1 class="et-h1">Estás en la etapa ${et} de 4: <span class="et-nm">${STAGES[et-1]}</span></h1>${(et===1||et===2||et===3)?`<p class="mail-note">Ya te mandé tu mapa por correo. Si no llega en 2 minutos, revisa Promociones o Spam y muévelo a Principal.</p>`:''}`;
 const SC=STAGE_COPY[et];
 const atribOk = real.some(t=>t.l==='Atribución' && t.s==='g');
 const dentroTx = (et===4 && atribOk) ? SC.dentro.slice(0,3).concat(['Ya sabes de qué anuncio sale cada venta.']) : SC.dentro;
 document.getElementById('porDentro').innerHTML=`<div class="k">Así se ve por dentro</div><ul class="dentro">${dentroTx.map(x=>`<li>${x}</li>`).join('')}</ul>`;
 const frenaLead = (et===4 && atribOk) ? 'Meta no sabe quién te compró.' : SC.frenaLead;
 const frenaTx   = (et===4 && atribOk) ? 'Si no le regresas a Meta cada venta cerrada, no puede buscarte más gente como la que te compra.<br><br>Y si revisas tus ventas por anuncio una vez al mes, te enteras tarde: el anuncio que trae mensajes pero no ventas ya se llevó un mes de presupuesto.' : SC.frena;
 document.getElementById('frena').innerHTML=`<div class="k">Lo que frena a los de tu etapa</div><p><b class="frena-lead">${frenaLead}</b> ${frenaTx}</p>`;
 document.getElementById('paraPasar').innerHTML=`<div class="k">${SC.pasarTit}</div><ul class="pasar">${SC.pasar.map(x=>`<li>${x}</li>`).join('')}</ul>${SC.nota?`<p class="nota">${SC.nota}</p>`:''}`;
 const PRI=priority();
 const firstRed=PRI.map(l=>real.find(t=>t.l===l)).find(t=>t&&t.s==='r');
 let firstAny=firstRed||PRI.map(l=>real.find(t=>t.l===l)).find(t=>t&&t.s==='y');
 if(ETAPA_TOOTH[state.etapa]){ firstAny=real.find(t=>t.l===ETAPA_TOOTH[state.etapa])||firstAny; } // TEMPORAL: una sola guía por etapa (E1 Cliente, E2 Respuesta)
 if(et===4 && state.focoOverride){ const o=real.find(t=>t.l===state.focoOverride); if(o && o.s!=='g') firstAny=o; }  // 20 sep: en E4 el espejo mueve el foco
 try{ window.__firstAny=firstAny; }catch(e){}   // disponible en todas las etapas (antes solo lo fijaba el checklist de E1-E3)
 const di=document.getElementById('desgIntro'); if(di) di.innerHTML=`Aquí está todo. Es mucha información a propósito: son todas las áreas que reviso cuando entro a un negocio, la estructura de tu empresa, la de tus campañas y los números que amarran las dos. No intentes arreglarlas todas${firstAny?`: empieza por <b>${nombreDiente(firstAny.l)}</b>, que es lo que te marqué arriba, y regresa aquí cuando esté resuelto`:''}.`;
 const u=document.getElementById('unica');
 const g=document.getElementById('guia');
 let hayGuia=false;
 if(firstAny){ const t=firstAny; const full=t.ofFull||(t.ofPrice?t.ofPrice*2-1:0);
  let h=`<div class="k">Gratis, de esta semana</div><h2 class="unica-h">Lo primero que toca en tu etapa: ${nombreDiente(t.l)}</h2>`;
  const uDef = defE(t,et); if(uDef) h+=`<div class="u-row"><div class="u-k">Qué es</div><div class="u-t">${uDef}</div></div>`;
  const e3v = (et===3 && t.why34 && t.pasos34);  // 24 sep: en E3 el gratis es la version por anuncio (el global ya lo tienen desde E2)
  const v4  = (et===4 && t.why34 && t.pasos34);  // 24 sep (bloque F): en E4 el gratis es la version de E4 (o la de E3/E4), no la de E1/E2
  const uWhy = v4 ? (nk(t,'why4')||nk(t,'why34')) : e3v ? nk(t,'why34') : nk(t,'why');
  const uHoy = v4 ? '' : e3v ? (K()==='clinicas'?'Saca cuánto te cuesta un paciente en cada anuncio:':'Saca cuánto te cuesta un cliente en cada anuncio:') : (nk(t,'hoy')||'');
  if(uWhy) h+=`<div class="u-row"><div class="u-k">Por qué te frena</div><div class="u-t">${uWhy}</div></div>`;
  h+=`<div class="u-row"><div class="u-k">Qué hacer esta semana, gratis</div>${uHoy?`<div class="u-t">${uHoy}</div>`:''}`;
  const hp = v4 ? (nk(t,'pasos4')||nk(t,'pasos34')) : e3v ? nk(t,'pasos34') : nk(t,'hoyPasos'); if(hp&&hp.length) h+=`<ol class="u-pasos">${hp.map(x=>`<li>${x}</li>`).join('')}</ol>`;
  const uReto = v4 ? (nk(t,'reto4')||nk(t,'reto34')) : ''; if(uReto) h+=`<p class="u-reto">${uReto}</p>`;
  h+=`</div>`;
  let tg=(ETAPA_GUIDE[et]&&real.find(x=>x.l===ETAPA_GUIDE[et]))||t;
  if(!tg.ofName){ const alt=PRI.map(l=>real.find(x=>x.l===l)).find(x=>x&&x.s!=='g'&&x.ofName); if(alt) tg=alt; } // 20 sep: Respuesta a leads no tiene guia
 if(et===4 && document.getElementById('socio')) h+=`<p class="u-bridge">Eso lo puedes revisar tú hoy. Si prefieres que lo vea contigo en tu cuenta, abajo está.</p>`;
 else if(tg.ofName) h+=`<p class="u-bridge">${tg===t?'¿Quieres ver cómo le hago yo? Abajo está la guía.':'Eso es gratis y de hoy. Abajo está la guía de tu etapa.'}</p>`;
  u.innerHTML=h; u.style.display='';
  if(tg.ofName && et!==4){  // 8.5: en E4 la oferta es la revision de cuenta, no la guia de $50
   const full=tg.ofFull||(tg.ofPrice?tg.ofPrice*2-1:0);
   const bullets=(nk(tg,'ofBullets')||[]).map(x=>{
    let ic='✓';
    if(/^Dos videos/.test(x)) ic='🎥'; else if(/^El prompt/.test(x)) ic='🤖'; else if(/^La ficha|^La hoja/.test(x)) ic='📄';
    return `<li class="g-stack-row"><span class="g-stack-ic">${ic}</span><span class="g-stack-tx">${x}</span></li>`;
   }).join('');
   let gh=`<div class="g-card"><div class="g-tag">LA GUÍA DE ETAPA ${et}</div><div class="g-cover"><span class="g-cover-t">${nk(tg,'ofName')}</span></div>`;
   if(nk(tg,'ofHook')) gh+=`<p class="g-hook">${nk(tg,'ofHook')}</p>`;
   // El CTA de arriba salio (15 sep): pedia apartar lugar antes de que supiera que es.
   // El de abajo se queda, ya con todo el contenido leido.
   if(nk(tg,'ofWin')) gh+=`<div class="g-callout"><div class="g-k">Qué vas a poder hacer</div><p class="g-tx">${nk(tg,'ofWin')}</p></div>`;
   if(tg.ofFor||tg.ofTime){
    gh+=`<div class="g-two">`;
    if(nk(tg,'ofFor')) gh+=`<div class="g-mini"><div class="g-k">Para quién es</div><p class="g-tx-sm">${nk(tg,'ofFor')}</p></div>`;
    if(nk(tg,'ofTime')) gh+=`<div class="g-mini"><div class="g-k">Cuánto tardas</div><p class="g-tx-sm">${nk(tg,'ofTime')}</p></div>`;
    gh+=`</div>`;
   }
   if(tg.ofOut){
    gh+=`<div class="g-k">Con qué sales</div>`;
    const ol=nk(tg,'ofOutList'); if(ol&&ol.length) gh+=`<p class="g-tx">Cuatro cosas que vas a tener escritas al terminar:</p><ul class="g-out">${ol.map(x=>`<li>${x}</li>`).join('')}</ul>`;
    else gh+=`<p class="g-tx">${tg.ofOut}</p>`;
   }
   gh+=`<div class="g-k">${tg.ofOut?'Qué trae':'Trae video, hoja y el prompt listo para usar'}</div><ul class="g-stack">${bullets}</ul>`;
   gh+=`<div class="g-price"><span class="g-reg">Precio regular: $${full} pesos</span><span class="g-now-big">$${tg.ofPrice} pesos</span><span class="g-now-sub">Precio especial de lanzamiento para la lista de espera</span></div>`;
   gh+=`<div class="g-gar-row"><span class="g-gar-ic">🛡️</span><p class="g-gar">Si la ves y no te sirve, me escribes y te regreso tus $${tg.ofPrice} pesos.</p></div>`;
   gh+=`<button class="lq ${tg.s} g-btn" data-wl="${slug(tg.l)}">Apartar mi lugar en la lista →</button>`;
   gh+=`<p class="g-nopay">Hoy no pagas nada. Cuando salga, te aviso a tu correo y ahí decides.</p><p class="g-status">Las guías salen una por una, en el orden que la lista de espera decide: tu lugar cuenta para que la tuya salga antes.</p></div>`;
   g.innerHTML=gh; g.style.display=''; hayGuia=true;
  } else { g.innerHTML=''; g.style.display='none'; }
 } else { u.innerHTML=''; u.style.display='none'; g.innerHTML=''; g.style.display='none'; }
 // SOCIO (20 sep): E4 sin rojos no tenia a donde ir, y un E3/E4 socio veia la misma guia de $50 que un volumen.
 try{ const so=document.getElementById('socio');
  if(so){ const muestra = (et===4 && (tr===0 || !hayGuia)) || (et>=3 && bandaSocio()) || (et===4 && typeof espPicked==='function' && espPicked().some(m=>m.id==='M4-08'));
   if(muestra){
    so.innerHTML=`<div class="k">Si quieres que lo vea contigo</div><h2>Revisar tu cuenta campaña por campaña, en 20 minutos, sin costo.</h2><p>Es lo que hago con mis clientes: entrar a la cuenta, ver de dónde sale cada venta y decirte qué apagar, qué dejar y a qué subirle. Déjame tu lugar y yo te escribo. Si no aplica para tu caso, también te lo digo.</p><button class="lq" data-wl="revision-cuenta" data-ok="✓ Listo. Yo te escribo.">Quiero que revises mi cuenta →</button><p class="fine">Sin costo y sin compromiso. Solo para negocios que ya invierten $40 mil o más al mes en anuncios.</p>`;
    so.style.display='';
    if(state.wl&&state.wl['revision-cuenta']){ const bq=so.querySelector('[data-wl]'); if(bq){ bq.classList.add('done'); bq.textContent='✓ Listo. Yo te escribo.'; } }
   } else { so.innerHTML=''; so.style.display='none'; }
  } }catch(e){}
 const et1=(et===1||et===2||et===3);
 const mapaA=document.querySelector('#mapa .mapa-img'), mapaI=document.querySelector('#mapa img'); if(mapaA){ const tsuf=(K()==='clinicas'&&(et===1||et===2))?'-clinicas':''; mapaA.href='tabla-etapa-'+et+tsuf+'.jpg'; } if(mapaI){ const tsuf=(K()==='clinicas'&&(et===1||et===2))?'-clinicas':''; mapaI.src='tabla-etapa-'+et+tsuf+'.jpg'; mapaI.alt='Tabla completa de la etapa '+et+': qué te frena y qué necesitas en cada área'; }
 const chkH=document.querySelector('#chkSec .chk-h'); if(chkH) chkH.textContent='Tu checklist para pasar a la etapa '+(et+1);
 ['porDentro','frena','paraPasar'].forEach(function(id){ const el=document.getElementById(id); if(el) el.style.display=et1?'none':''; });
 // En E1-E3 la tabla va ANTES del espejo: primero le damos lo que vino a buscar,
 // y hasta entonces le pedimos una respuesta mas. E4 conserva su orden.
 try{ if(et1){ const mp=document.getElementById('mapa'), ep=document.getElementById('espejo');
  if(mp && ep && ep.parentNode) ep.parentNode.insertBefore(mp, ep); } }catch(e){}
 const vdBtn=document.getElementById('verDesglose'); if(vdBtn) vdBtn.style.display=et1?'none':'';
 const dgEl=document.getElementById('desglose'); if(dgEl && et1) dgEl.classList.add('hidden');
 const mapaEl=document.getElementById('mapa'), chkSecEl=document.getElementById('chkSec');
 if(mapaEl) mapaEl.style.display='';          // 20 sep: E4 tambien ve su tabla (era la unica etapa sin ella)
 if(chkSecEl) chkSecEl.style.display=et1?'':'none';
 const exbEl=document.getElementById('exportbar');
 if(exbEl){
  exbEl.classList.toggle('et1', et1);
  const inner=exbEl.querySelector('.inner');
  if(inner){
   if(et1){
    inner.innerHTML=`<button type="button" class="bar-prog" id="barProg" onclick="document.getElementById('chkSec').scrollIntoView({behavior:'smooth',block:'start'})"><span class="bp-k">Tu checklist</span><span class="bp-v">Llevas <b id="bpT">0</b> de 11 · Ayuda en <b id="bpA">0</b></span></button><button class="btn-red bar-cta" onclick="(function(){var u=document.getElementById('unica'),s=document.getElementById('socio');var t=(u&&u.style.display!=='none')?u:(s&&s.style.display!=='none')?s:document.getElementById('engrane-root');t.scrollIntoView({behavior:'smooth',block:'center'});})()">Empieza aquí →</button>`;
   } else {
    inner.innerHTML=`<div class="left"><div style="line-height:1.3;max-width:520px"><div style="font-weight:700;font-size:15px;color:var(--navy)">Ya te mandé tu mapa por correo.</div><div style="font-size:13px;color:#5A6B7D;margin-top:2px">Si no llega en 2 minutos, revisa Promociones o Spam y muévelo a Principal.</div></div></div><button class="btn-red" style="font-size:14px;padding:12px 20px" onclick="(function(){var u=document.getElementById('unica'),s=document.getElementById('socio');var t=(u&&u.style.display!=='none')?u:(s&&s.style.display!=='none')?s:document.getElementById('engrane-root');t.scrollIntoView({behavior:'smooth',block:'center'});})()">Empieza aquí →</button>`;
   }
  }
 }
 if(et1){ try{ renderChecklist1(firstAny); }catch(e){ console.warn('chk1',e); } try{ renderEspejo(); }catch(e){ console.warn('esp',e); } }
 else { try{ renderEspejo(); }catch(e){ console.warn('esp4',e); }
  try{ const ep=document.getElementById('espejo'), un=document.getElementById('unica'); if(ep&&un&&un.parentNode) un.parentNode.insertBefore(ep,un); }catch(e){}   // E4: mapa → espejo → gratis
  try{ const so=document.getElementById('socio'), gg=document.getElementById('guia'); if(so&&gg&&gg.parentNode) gg.parentNode.insertBefore(so,gg); }catch(e){}  // E4: la revision antes que la guia de $50
 }
 document.getElementById('grid').innerHTML=[0,1,2].map(gi=>{
  const g=byGear[gi],realN=g.filter(t=>t.s!=='locked').length,gc=g.filter(t=>t.s==='g').length,anchor=gi===2?' anchor':'';
  const rows=g.map(t=>{const st=ST[t.s];
   if(t.s==='locked') return `<div class="row locked" id="row-${slug(t.l)}"><span class="ch" style="background:${st.hex}">${iconSVG('lock','#fff',13)}</span><span class="txt"><span class="lb">${t.l}</span><span class="sub2">${t.x}</span></span><span class="lk">🔒 En tu Auditoría</span></div>`;
   const adv = bandaSocio() && t.why34;                           // banda SOCIO: pre-read corto + pantalla de detalle
   const act = t.s==='g' ? `<span class="st">Lo tienes</span>`
             : adv       ? `<button class="lq ${t.s}" data-det="${t.l}">Ver detalle →</button>`
                         : (t.ofName?`<button class="lq ${t.s}" data-det="${t.l}">Ver qué trae y cuánto cuesta →</button>`:``);
   const four=et===4;
   const hi=et>=3; const W=hi?(pre34(t.l)||nk(t,'why34')):nk(t,'why'), H=hi?((four&&t.hoy4mini)||nk(t,'hoy34')):nk(t,'hoy');  // 8.5: texto por etapa, no por banda
   const vm=W?`<button class="vermas" type="button">¿Por qué importa? ↓</button>`:``;
   const det=adv?`<button class="btn-det" type="button" data-det="${t.l}">Ver detalle →</button>`:``;
   const deep=W?`<div class="deep hidden"><p>${W}</p><div class="hoy"><b>⚡ Hazlo hoy:</b> ${H}</div>${det}</div>`:``;
   const foco=firstAny&&t.l===firstAny.l;
   return `<div class="row${foco?' foco':''}" id="row-${slug(t.l)}"><span class="ch" style="background:${st.hex}">${iconSVG(st.icon,st.ink,15)}</span><span class="txt"><span class="lb">${t.l}${foco?' <span class="foco-chip">🎯 TU FOCO</span>':''}</span><span class="sub2">${t.x}</span>${vm}</span>${act}${deep}</div>`;}).join('');
  return `<div class="col${anchor}"><div class="col-h"><span class="nm">${GEARS_META[gi].short}</span><span class="sc"><b>${gc}</b>/${realN} ok</span></div>${rows}</div>`;
 }).join('');
 let sm;
 const okTxt=`<span class="ok">${tg} sólida${tg!==1?'s':''}</span>`;
 if(tr===0){ sm=`<b>${okTxt} · ${ty} por mejorar · 0 críticas.</b> Lo que sigue es mover las amarillas, una por una.`; }
 else { const worst=[0,1,2].map(gi=>({n:GEARS_META[gi].short,r:byGear[gi].filter(t=>t.s==='r').length})).sort((a,b)=>b.r-a.r)[0];
  sm=`<b>${okTxt} · ${ty} por mejorar · <span class="cr">${tr} crítica${tr>1?'s':''}</span>.</b> La columna con más rojo es <b>${worst.n}</b>.`; }
 document.getElementById('summary').innerHTML=sm;
}
/* ¿Por qué importa? (expander in-place) */
document.addEventListener('click',function(e){
 const v=e.target.closest('.vermas'); if(!v)return;
 const r=v.closest('.row'); const d=r?r.querySelector('.deep'):null; if(!d)return;
 const open=d.classList.toggle('hidden');
 v.textContent = open ? '¿Por qué importa? ↓' : 'Ver menos ↑';
 if(!open && !r.dataset.clHit){ r.dataset.clHit='1'; try{ if(window.clarity){ const lb=r.querySelector('.lb'); clarity('event','area_abierta'); if(lb) clarity('set','area', lb.textContent.replace(/🎯.*$/,'').trim()); } }catch(err){} }
 if(!open){ setTimeout(function(){ d.scrollIntoView({block:'nearest',behavior:'smooth'}); },60); } // que el remate no nazca oculto bajo la barra
});
/* ---- Pantalla de detalle por área ---- */
let LAST_TEETH=[];
function paras(t){const s=t.split('. ');const out=[];for(let i=0;i<s.length;i+=2){let ch=s.slice(i,i+2).join('. ');if(!/[.!?…»")]$/.test(ch))ch+='.';out.push('<p>'+ch+'</p>');}return out.join('');}
function openDetalle(l){
 const t=LAST_TEETH.find(x=>x.l===l); if(!t||!t.why34)return;
 const four=state.etapa===4, low=(state.etapa||1)<=2;  // 8.5: el texto sigue a la etapa (E1/E2 veian el de E3/E4)
 const dW=low?nk(t,'why'):((four&&nk(t,'why4'))||nk(t,'why34')), dP=low?nk(t,'hoyPasos'):((four&&nk(t,'pasos4'))||nk(t,'pasos34')), dR=low?'':((four&&nk(t,'reto4'))||nk(t,'reto34')), dH=low?nk(t,'hoy'):((four&&nk(t,'hoy4'))||nk(t,'hoy34'));  // 24 sep: lee version clinica
 const st=ST[t.s]||ST.r;
 const vurl=(CONFIG.VIDEO_AREA_URLS||{})[slug(l)];
 let h=`<span class="det-chip" style="background:${st.hex};color:${st.ink}">${iconSVG(st.icon,st.ink,13)} ${st.word.toUpperCase()}</span>`;
 h+=`<h2>${t.l}</h2><p class="det-sub">${defE(t,state.etapa)||t.x}</p>`;
 if(vurl)h+=`<div class="det-vslot"><iframe src="${vurl}" loading="lazy" allowfullscreen title="${t.l}"></iframe></div>`;
 h+=paras(dW);
 const EXd=(K()==='clinicas'&&EXAMPLES_CL[t.l])||EXAMPLES[t.l]; if(EXd)h+=EXd;
 if(t.s!=='g' && (t.ofBullets||t.puente34)){
  const gnm=t.ofName||('La guía de '+t.l);
  h+=`<div class="det-early">🛠️ Estoy armando <b>${gnm}</b>: el paso a paso completo de esta área. <button class="lq ${t.s}" data-wl="${slug(t.l)}">Avísame cuando esté lista →</button></div>`;
 }
 if(dP){
  h+=`<div class="hoy"><b>⚡ Si esta semana solo haces UNA cosa:</b><ol class="hoy-ol">`+dP.map(x=>`<li>${x}</li>`).join('')+`</ol>${dR?`<p class="hoy-reto">${dR}</p>`:''}</div>`;
 } else {
  h+=`<div class="hoy"><b>⚡ Si esta semana solo haces UNA cosa:</b> ${dH}</div>`;
 }
 if(t.s!=='g' && (t.ofBullets||t.puente34)){
  const name=t.ofName||('La guía de '+t.l);
  h+=`<div class="det-offer"><div class="of-k">El siguiente paso: hacerlo sistema</div>`;
  h+=`<p class="of-int">Para eso estoy armando <b>${name}</b>, paso a paso:</p>`;
  if(t.ofBullets){ h+=`<ul class="of-ul">`+t.ofBullets.map(x=>`<li>${x}</li>`).join('')+`</ul>`; if(t.ofMid){ h+=`<p class="of-mid">${t.ofMid}</p>`; } }
  else { h+=`<p>${t.puente34}</p>`; }
  h+=`<p class="of-status">🛠️ Las guías salen una por una, en el orden que la lista de espera decide: tu lugar cuenta para que la tuya salga antes.${t.ofPrice?` Precio regular: <b>$${t.ofFull||(t.ofPrice*2-1)} pesos</b>. Precio especial de lanzamiento para la lista de espera: <b>$${t.ofPrice} pesos</b>.`:''}</p>`;
  h+=`<button class="lq ${t.s}" data-wl="${slug(t.l)}">Avísame cuando esté lista →</button>`;
  h+=`<p class="of-f">Anotarte en la lista no cuesta nada. La guía es de pago, con precio especial de lanzamiento para quien está en la lista.</p></div>`;
 }
 $("detCard").innerHTML=h;
 if(state.wl){ document.querySelectorAll('#detCard [data-wl]').forEach(function(x){ if(state.wl[x.dataset.wl]){ x.classList.add('done'); x.textContent='✓ Ya estás en la lista'; } }); }
 $("screen-detalle").classList.remove('hidden');
 $("screen-detalle").scrollTop=0;
 document.body.style.overflow='hidden';
 try{ history.pushState({dx:1},'',location.pathname+location.search+'#a-'+slug(l)); }catch(e){}
 track('DetalleView',{});
 state.dv=state.dv||{}; if(!state.dv[slug(l)]){ state.dv[slug(l)]=1; sendWebhook("detalle_view",{area:slug(l)}); }
}
function closeDetalle(){
 $("screen-detalle").classList.add('hidden');
 document.body.style.overflow='';
 // limpia hash residual #a-... (caso: recarga/URL compartida con el hash colgado) sin tocar el stack
 if(location.hash.indexOf('#a-')===0){ try{ history.replaceState(history.state,'',location.pathname+location.search); }catch(e){} }
}
/* botón atrás del teléfono / gesto iOS: cierra el detalle en vez de matar la página */
window.addEventListener('popstate',function(){
 const sd=$("screen-detalle");
 if(sd && !sd.classList.contains('hidden')) closeDetalle();
});
document.addEventListener('keydown',function(e){
 if(e.key==='Escape'){ const sd=$("screen-detalle"); if(sd && !sd.classList.contains('hidden')) history.back(); }
});
document.addEventListener('click',function(e){
 const b=e.target.closest('[data-det]'); if(!b)return;
 openDetalle(b.dataset.det);
});
document.addEventListener('click',function(e){
 const b=e.target.closest('[data-goto]'); if(!b)return;
 const row=document.getElementById('row-'+b.dataset.goto); if(!row)return;
 const d=row.querySelector('.deep'), v=row.querySelector('.vermas');
 if(d&&d.classList.contains('hidden')){ d.classList.remove('hidden'); if(v)v.textContent='Ver menos ↑'; }
 row.scrollIntoView({behavior:'smooth',block:'center'});row.classList.add('flash');setTimeout(function(){row.classList.remove('flash');},1400);
});
document.addEventListener('click',function(e){
  const b=e.target.closest('#verDesglose'); if(!b) return;
  const d=document.getElementById('desglose'); if(!d) return;
  const abrir=d.classList.contains('hidden');
  d.classList.toggle('hidden',!abrir);
  b.textContent=abrir?'Ocultar el desglose ↑':'¿Quieres el desglose área por área? →';
  if(abrir && !b.dataset.hit){ b.dataset.hit='1'; try{ if(window.ASV&&ASV.hit) ASV.hit('desglose'); }catch(err){} try{ if(window.clarity) clarity('event','desglose_abierto'); }catch(err){} }
  if(abrir) d.scrollIntoView({behavior:'smooth',block:'start'});
});
/* tocar diente -> baja a su fila, la resalta y ABRE su detalle */
if(document.getElementById('hero')){
 document.getElementById('hero').addEventListener('click',function(e){const g=e.target.closest('.tooth');if(!g)return;
  const row=document.getElementById('row-'+slug(g.dataset.l));if(!row)return;
  const d=row.querySelector('.deep'), v=row.querySelector('.vermas');
  if(d&&d.classList.contains('hidden')){ d.classList.remove('hidden'); if(v)v.textContent='Ver menos ↑'; }
  row.scrollIntoView({behavior:'smooth',block:'center'});row.classList.add('flash');setTimeout(function(){row.classList.remove('flash');},1400);
 });
}

