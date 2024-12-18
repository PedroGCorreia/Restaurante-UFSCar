import React, { useState, useEffect } from 'react';
import { FaUtensils, FaHistory, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import ReservaCard from '../ReservaCard';
import NovaReservaModal from '../NovaReservaModal';

import './Reservas.css';

function Reservas() {

  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    
    const dadosReservas = [
      {
        cliente: 'João Silva',
        quantidadePessoas: 4,
        data: '25/12/2024',
        horario: '19:30',
      },
      {
        cliente: 'Maria Oliveira',
        quantidadePessoas: 2,
        data: '31/12/2024',
        horario: '20:00',
      },
      {
        cliente: 'Pedro Santos',
        quantidadePessoas: 6,
        data: '15/01/2025',
        horario: '18:45',
      },
      {
        cliente: 'Ana Paula',
        quantidadePessoas: 3,
        data: '10/01/2025',
        horario: '17:00',
      },
      {
        cliente: 'Carlos Mendes',
        quantidadePessoas: 5,
        data: '05/01/2025',
        horario: '20:30',
      },
      {
        cliente: 'Lucia Pereira',
        quantidadePessoas: 2,
        data: '20/12/2024',
        horario: '19:00',
      },
      
    ];

    // Ordenar as reservas pela data mais próxima ao dia atual
    const hoje = new Date();
    const reservasOrdenadas = dadosReservas
      .map(reserva => ({
        ...reserva,
        dataObj: parseDate(reserva.data),
      }))
      .sort((a, b) => a.dataObj - b.dataObj)
      .filter(reserva => reserva.dataObj >= hoje)
      .slice(0, 6)
      .map(({ dataObj, ...rest }) => rest);

    setReservas(reservasOrdenadas);
  }, []);

  // Função para converter a string de data "DD/MM/AAAA" para um objeto Date
  const parseDate = (dataStr) => {
    const [dia, mes, ano] = dataStr.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
  };

  const handleHistorico = () => {
    navigate('/reservas/historico');
  };

  const handleNovaReserva = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFinalizarReserva = (novaReserva) => {
    setReservas(prevReservas => [...prevReservas, novaReserva]);
    setIsModalOpen(false);
    navigate('/reservas');
    alert('Tudo ocorreu com sucesso!');
  };

  return (
    <div className="reservas-container">
      <div className="reservas-header">
        <h2 className="reservas-title">
          <FaUtensils className="reservas-icon" aria-hidden="true" />
          Reservas em aberto
        </h2>
        <div className="reservas-buttons">
          <button className="historico-button" onClick={handleHistorico}>
            <FaHistory className="button-icon" aria-hidden="true" />
            Histórico de reservas
          </button>
          <button className="nova-reserva-button-header" onClick={handleNovaReserva}>
            <FaPlus className="button-icon" aria-hidden="true" />
            Nova Reserva
          </button>
        </div>
      </div>
      <div className="reservas-card-container">
        {reservas.map((reserva, index) => (
          <ReservaCard
            key={index}
            width="300px"
            height="180px"
            cliente={reserva.cliente}
            quantidadePessoas={reserva.quantidadePessoas}
            data={reserva.data}
            horario={reserva.horario}
          />
        ))}
      </div>

      {/* Modal para Nova Reserva */}
      <NovaReservaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFinalizarReserva}
        existingReservas={reservas}
      />
    </div>
  );
}

export default Reservas;