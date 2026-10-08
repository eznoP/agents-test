/* HealthCare — Funcionalidades principais */

function agendarConsulta(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const especialidade = document.getElementById('especialidade').value;
  const data = document.getElementById('data').value;
  const obs = document.getElementById('observacoes').value.trim();

  if (!nome || !email || !telefone || !especialidade || !data) return;

  const consulta = {
    id: Date.now(),
    nome, email, telefone, especialidade, data, observacoes: obs,
    status: 'Confirmada',
    criadaEm: new Date().toISOString()
  };

  const existentes = JSON.parse(localStorage.getItem('consultas-healthcare') || '[]');
  existentes.push(consulta);
  localStorage.setItem('consultas-healthcare', JSON.stringify(existentes));

  // Mostrar mensagem
  const msg = document.getElementById('msg-agendamento');
  msg.style.display = 'block';
  msg.textContent = `✅ Consulta agendada, ${nome}! Confirmação enviada por e-mail.`;
  document.getElementById('form-consulta').reset();

  renderCalendario();
}

function renderCalendario() {
  const tbody = document.getElementById('tbody-consultas');
  const existentes = JSON.parse(localStorage.getItem('consultas-healthcare') || '[]');

  if (existentes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="color:var(--cinza); text-align:center; padding:1.5rem;">Nenhuma consulta agendada ainda.</td></tr>';
    return;
  }

  tbody.innerHTML = existentes.map(c => `
    <tr>
      <td><strong>${escaparHTML(c.nome)}</strong></td>
      <td>${escaparHTML(c.especialidade)}</td>
      <td>${formatarData(c.data)}</td>
      <td><span style="background:var(--verde-claro);color:var(--verde-escuro);padding:0.25rem 0.75rem;border-radius:20px;font-size:0.85rem;font-weight:600;">${escaparHTML(c.status)}</span></td>
    </tr>
  `).join('');
}

function formatarData(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function escaparHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Inicializa
renderCalendario();
