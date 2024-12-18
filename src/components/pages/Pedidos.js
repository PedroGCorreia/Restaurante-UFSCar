import React, { useState } from 'react';
import { FaPlus, FaBoxOpen, FaCheckCircle } from 'react-icons/fa';

import Card from '../Card';
import NovoPedidoModal from '../NovoPedidoModal';
import DetalhesModal from '../DetalhesModal';

import './Pedidos.css';

function Pedidos() {

  const [isNovoPedidoModalOpen, setIsNovoPedidoModalOpen] = useState(false);
  const [isDetalhesModalOpen, setIsDetalhesModalOpen] = useState(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  const [pedidosAbertos, setPedidosAbertos] = useState([
    {
      id: 1,
      titulo: 'Pedido #1',
      aberto: true,
      mesa: 'Mesa 1',
      items: [
        { item: 'Café', quantidade: 2 },
        { item: 'Suco', quantidade: 1 },
      ],
    },
    {
      id: 2,
      titulo: 'Pedido #2',
      aberto: true,
      mesa: 'Mesa 2',
      items: [
        { item: 'Chá', quantidade: 3 },
      ],
    },
    {
      id: 3,
      titulo: 'Pedido #3',
      aberto: true,
      mesa: 'Mesa 3',
      items: [
        { item: 'Água', quantidade: 4 },
        { item: 'Refrigerante', quantidade: 2 },
      ],
    },
  ]);

  const [pedidosConcluidos, setPedidosConcluidos] = useState([
    {
      id: 4,
      titulo: 'Pedido #4',
      aberto: false,
      mesa: 'Mesa 4',
      items: [
        { item: 'Vinho', quantidade: 1 },
      ],
    },
    {
      id: 5,
      titulo: 'Pedido #5',
      aberto: false,
      mesa: 'Mesa 5',
      items: [
        { item: 'Cerveja', quantidade: 2 },
        { item: 'Pão', quantidade: 3 },
      ],
    },
    {
      id: 6,
      titulo: 'Pedido #6',
      aberto: false,
      mesa: 'Mesa 6',
      items: [
        { item: 'Salada', quantidade: 1 },
      ],
    },
  ]);

  const handleDetails = (pedidoId) => {
    const pedidoAberto = pedidosAbertos.find((pedido) => pedido.id === pedidoId);
    const pedidoConcluido = pedidosConcluidos.find((pedido) => pedido.id === pedidoId);
    const pedido = pedidoAberto || pedidoConcluido;

    if (pedido) {
      setPedidoSelecionado(pedido);
      setIsDetalhesModalOpen(true);
    }
  };

  const handleComplete = (pedidoId) => {
    // Atualizar o estado para mover o pedido para concluídos
    const pedidoIndex = pedidosAbertos.findIndex((pedido) => pedido.id === pedidoId);
    if (pedidoIndex !== -1) {
      const pedido = pedidosAbertos[pedidoIndex];
      const updatedAbertos = [...pedidosAbertos];
      updatedAbertos.splice(pedidoIndex, 1);
      setPedidosAbertos(updatedAbertos);
      setPedidosConcluidos([...pedidosConcluidos, { ...pedido, aberto: false }]);
      alert(`Pedido ${pedidoId} Concluído`);
    }
  };

  const handleNewPedido = () => {
    setIsNovoPedidoModalOpen(true);
  };

  const handleCloseNovoPedidoModal = () => {
    setIsNovoPedidoModalOpen(false);
  };

  const handleSubmitPedido = (newPedido) => {
    const newId = pedidosAbertos.length + pedidosConcluidos.length + 1;
    const novoPedido = {
      id: newId,
      titulo: `Pedido #${newId}`,
      aberto: true,
      mesa: newPedido.mesa,
      items: newPedido.items,
    };
    setPedidosAbertos([...pedidosAbertos, novoPedido]);
    setIsNovoPedidoModalOpen(false);
    alert('Pedido adicionado com sucesso!');
  };

  const handleCloseDetalhesModal = () => {
    setIsDetalhesModalOpen(false);
    setPedidoSelecionado(null);
  };

  return (
    <div className="pedidos-container">
      <section className="pedidos-section">
        <h2 className="section-title">
          <FaBoxOpen className="section-icon" />
          Pedidos Abertos
        </h2>
        <div className="card-container">
          {pedidosAbertos.map((pedido) => (
            <Card
              key={pedido.id}
              width="300px"
              height="200px"
              title={pedido.titulo}
              onDetailsClick={() => handleDetails(pedido.id)}
              onCompleteClick={() => handleComplete(pedido.id)}
              isOpen={pedido.aberto}
            />
          ))}
        </div>
      </section>

      <section className="pedidos-section">
        <h2 className="section-title">
          <FaCheckCircle className="section-icon" />
          Pedidos Concluídos
        </h2>
        <div className="card-container">
          {pedidosConcluidos.map((pedido) => (
            <Card
              key={pedido.id}
              width="300px"
              height="200px"
              title={pedido.titulo}
              onDetailsClick={() => handleDetails(pedido.id)}
              onCompleteClick={() => handleComplete(pedido.id)}
              isOpen={pedido.aberto}
            />
          ))}
        </div>
      </section>

      <button className="novo-pedido-button" onClick={handleNewPedido}>
        <FaPlus className="novo-pedido-icon" />
        <span>Novo Pedido</span>
      </button>

      <NovoPedidoModal
        isOpen={isNovoPedidoModalOpen}
        onClose={handleCloseNovoPedidoModal}
        onSubmit={handleSubmitPedido}
      />

      <DetalhesModal
        isOpen={isDetalhesModalOpen}
        onClose={handleCloseDetalhesModal}
        pedido={pedidoSelecionado}
      />
    </div>
  );
}

export default Pedidos;