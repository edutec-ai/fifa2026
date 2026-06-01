var BASE    = 'https://server.sion.hysintegrar.com/fifa2026/vERP_2_dat_dat/v1';
var BASE_V2 = 'https://server.sion.hysintegrar.com/fifa2026/vERP_2_dat_dat/v2';
var KEY     = 'SuzvTp4qwXQtAVFJbdzP';
var NOMBRES_USUARIOS = { '1': 'Henry', '3': 'Héctor' };

let callbackFrontpage = null;

export function configurarLogin(fnCargarFrontpage) {
  const form = document.getElementById('formLogin');
  const btnRegresar = document.getElementById('btnRegresar');
  const chkRecordar = document.getElementById('chkRecordar');
  const inputUsuario = document.getElementById('inputUsuario');

  callbackFrontpage = fnCargarFrontpage;

  // AJUSTE ESTRICTO DE PIEL: Logo a escala 2x y Título en color blanco nítido (#ffffff)
  const estiloLocalLogin = document.createElement('style');
  estiloLocalLogin.textContent = `
    .logo-login-card { 
      width: 128px !important; 
      height: auto !important; 
      margin-bottom: 20px !important; 
    }
    #loginForm h2 {
      color: #ffffff !important; /* Retorno al color Blanco Limpio para máxima legibilidad */
      font-weight: 700 !important;
      letter-spacing: -0.5px !important;
    }
  `;
  document.head.appendChild(estiloLocalLogin);

  // Mantenemos el texto personalizado solicitado
  const tituloLogin = document.querySelector('#loginForm h2');
  if (tituloLogin) {
    tituloLogin.textContent = 'Polla Mundialista 2026';
  }

  if (localStorage.getItem('polla_recordar') === '1') {
    if (inputUsuario) inputUsuario.value = localStorage.getItem('polla_usuario') || '';
    if (chkRecordar) chkRecordar.checked = true;
  }

  if (chkRecordar) {
    chkRecordar.addEventListener('change', () => {
      if (!chkRecordar.checked && inputUsuario) {
        localStorage.removeItem('polla_recordar');
        localStorage.removeItem('polla_usuario');
        inputUsuario.value = '';
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      ejecutarAutenticacion();
    });
  }

  if (btnRegresar) {
    btnRegresar.addEventListener('click', () => {
      const loginCard = document.getElementById('loginForm');
      const cuentascCard = document.getElementById('cuentasForm');
      
      document.getElementById('inputPassword').value = '';
      document.getElementById('cuenta-list').innerHTML = '<div class="loader">⟳ Consultando Velneo...</div>';
      
      if (chkRecordar && !chkRecordar.checked && inputUsuario) {
        inputUsuario.value = '';
      }
      
      if (cuentascCard && loginCard) {
        cuentascCard.classList.add('login-retirado');
        setTimeout(() => {
          cuentascCard.classList.remove('login-activo', 'login-retirado');
          loginCard.classList.add('login-activo');
        }, 400);
      }
    });
  }
}

function ejecutarAutenticacion() {
  var usuario = document.getElementById('inputUsuario').value.trim().toLowerCase();
  var pass    = document.getElementById('inputPassword').value.trim();
  var errEl   = document.getElementById('loginError');
  var btn     = document.getElementById('btnIngresar');
  var chkRecordar = document.getElementById('chkRecordar');
  
  if (errEl) errEl.style.display = 'none';
  if (btn) { btn.disabled = true; btn.textContent = 'Verificando...'; }
  
  var hashCompleto = (typeof sha3_256 !== 'undefined') ? sha3_256(pass) : btoa(pass);
  var hash50 = hashCompleto.substring(0, 50);
  
  fetch(BASE_V2 + '/_process/API_VLD_USR?api_key=' + KEY, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ USR_NOM: usuario, HASH: hash50 })
  })
  .then(r => r.json())
  .then(data => {
    if (btn) { btn.disabled = false; btn.textContent = 'Ingresar'; }
    
    var usrId = data.ID || data.usr || data.USR || data.id || null;
    if (!usrId) {
      if (errEl) {
        errEl.textContent = '⚠️ Usuario o contraseña incorrectos';
        errEl.style.display = 'block';
      }
      return;
    }
    
    if (chkRecordar && chkRecordar.checked) {
      localStorage.setItem('polla_recordar', '1');
      localStorage.setItem('polla_usuario', usuario);
    }
    
    var nombre = NOMBRES_USUARIOS[String(usrId)] || usuario;
    document.getElementById('cuenta-saludo').textContent = '¡Hola, ' + nombre + '!';
    
    const loginCard = document.getElementById('loginForm');
    const cuentascCard = document.getElementById('cuentasForm');
    
    if (loginCard && cuentascCard) {
      loginCard.classList.add('login-retirado');
      setTimeout(() => {
        loginCard.classList.remove('login-activo', 'login-retirado');
        cuentascCard.classList.add('login-activo');
        renderizarCardsCuentas(Number(usrId));
      }, 400);
    }
  })
  .catch(() => {
    if (btn) { btn.disabled = false; btn.textContent = 'Ingresar'; }
    if (errEl) {
      errEl.textContent = '⚠️ Error de conexión con Velneo';
      errEl.style.display = 'block';
    }
  });
}

function renderizarCardsCuentas(usrId) {
  var listEl = document.getElementById('cuenta-list');
  var subEl  = document.getElementById('cuenta-sub');
  
  fetch(BASE + '/fifa_jug?api_key=' + KEY)
    .then(r => r.json())
    .then(data => {
      var todos = data.fifa_jug || [];
      var cuentas = todos.filter(j => Number(j.usr) === usrId && j.off !== true);
      var colores = ['#f0a500', '#34c759', '#af52de', '#007aff', '#ff3b30'];
      
      if (!cuentas.length) {
        if (subEl) subEl.textContent = 'No tienes cuentas configuradas.';
        if (listEl) listEl.innerHTML = '<div class="loader">Sin registros</div>';
        return;
      }
      
      if (subEl) subEl.textContent = 'Tienes ' + cuentas.length + ' cuenta' + (cuentas.length > 1 ? 's' : '') + ' asignada(s).';
      if (listEl) {
        listEl.innerHTML = '';
        cuentas.forEach((c, i) => {
          var iniciales = (c.name || 'X').split(' ').map(w => w[0]).join('').toUpperCase().substring(0,2);
          var card = document.createElement('div');
          
          card.className = 'cuenta-item-static';
          card.style.cursor = 'pointer';
          card.style.transition = 'background 0.2s, transform 0.1s';
          
          card.innerHTML = `
            <div class="cuenta-avatar" style="background:${colores[i % colores.length]};color:#fff;">${iniciales}</div>
            <div class="cuenta-info">
              <div class="cuenta-nombre">${c.name || '—'}</div>
              <div class="cuenta-tag">Cuenta ${i+1} · ID: ${c.id}</div>
            </div>
            <div class="cuenta-pts">${c.ptr || c.pun || 0} pts</div>
          `;
          
          card.onmousedown = () => card.style.transform = 'scale(0.97)';
          card.onmouseup = () => card.style.transform = 'scale(1)';
          
          card.onclick = () => {
            const cuentascCard = document.getElementById('cuentasForm');
            const frontpageCard = document.getElementById('frontpageForm');
            
            if (cuentascCard && frontpageCard) {
              cuentascCard.classList.add('login-retirado');
              setTimeout(() => {
                cuentascCard.classList.remove('login-activo', 'login-retirado');
                frontpageCard.classList.add('login-activo');
                if (typeof callbackFrontpage === 'function') {
                  callbackFrontpage(c);
                }
              }, 400);
            }
          };
          listEl.appendChild(card);
        });
      }
    })
    .catch(() => {
      if (subEl) subEl.textContent = 'Error de sincronización.';
      if (listEl) listEl.innerHTML = '<div class="loader" style="color:#ff453a;">⚠️ Error de datos</div>';
    });
}