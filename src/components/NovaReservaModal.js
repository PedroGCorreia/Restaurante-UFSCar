import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NovaReservaModal.css';
import { FaTimes } from 'react-icons/fa';

function NovaReservaModal({ isOpen, onClose, onSubmit, existingReservas }) {

  const [cliente, setCliente] = useState('');
  const [quantidadePessoas, setQuantidadePessoas] = useState(1);
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [error, setError] = useState('');

  // Função para limpar os campos do formulário
  const limparFormulario = () => {
    setCliente('');
    setQuantidadePessoas(1);
    setData('');
    setHorario('');
    setError('');
  };

  // Quando o modal for fechado, limpar o formulário
  useEffect(() => {
    if (!isOpen) {
      limparFormulario();
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar se todos os campos estão preenchidos
    if (!cliente || !quantidadePessoas || !data || !horario) {
      setError('Por favor, preencha todos os campos.');
      limparFormulario(); // Limpar o formulário mesmo com erro
      return;
    }

    // Verificar formato da data (DD/MM/AAAA)
    const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dataRegex.test(data)) {
      setError('Por favor, insira a data no formato DD/MM/AAAA.');
      limparFormulario(); // Limpar o formulário mesmo com erro
      return;
    }

    // Verificar formato do horário (HH:MM)
    const horarioRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    if (!horarioRegex.test(horario)) {
      setError('Por favor, insira o horário no formato HH:MM.');
      limparFormulario(); // Limpar o formulário mesmo com erro
      return;
    }

    // Verificar se já existe uma reserva na mesma data e horário
    const duplicate = existingReservas.find(
      (reserva) => reserva.data === data && reserva.horario === horario
    );

    if (duplicate) {
      setError('Já temos uma reserva nesse horário, por favor altere a data ou o horário.');
      limparFormulario(); // Limpar o formulário mesmo com erro
      return;
    }

    // Se tudo estiver ok, enviar os dados
    onSubmit({ cliente, quantidadePessoas, data, horario });

    // Limpar o formulário e erros após a submissão bem-sucedida
    limparFormulario();
  };

  // Se o modal não estiver aberto, não renderizar nada
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="nova-reserva-modal">
        <div className="modal-header">
          <h2 className="modal-title">Nova reserva</h2>
          <button className="close-button-reserva" onClick={onClose} aria-label="Fechar">
            <FaTimes />
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cliente">Cliente:</label>
            <input
              type="text"
              id="cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantidadePessoas">Quantidade de pessoas:</label>
            <input
              type="number"
              id="quantidadePessoas"
              value={quantidadePessoas}
              onChange={(e) => setQuantidadePessoas(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="data">Data (DD/MM/AAAA):</label>
            <input
              type="text"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="Ex: 25/12/2024"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="horario">Horário (HH:MM):</label>
            <input
              type="text"
              id="horario"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              placeholder="Ex: 19:30"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="finalizar-button">
            Finalizar reserva
          </button>
        </form>
      </div>
    </div>
  );
}

NovaReservaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  existingReservas: PropTypes.arrayOf(
    PropTypes.shape({
      cliente: PropTypes.string.isRequired,
      quantidadePessoas: PropTypes.number.isRequired,
      data: PropTypes.string.isRequired,
      horario: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NovaReservaModal;