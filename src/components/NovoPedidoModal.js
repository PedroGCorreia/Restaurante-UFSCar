import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import './NovoPedidoModal.css';

function NovoPedidoModal({ isOpen, onClose, onSubmit }) {

  const [mesa, setMesa] = useState('');
  const [items, setItems] = useState([{ item: '', quantidade: 1 }]);

  if (!isOpen) {
    return null;
  }

  const handleMesaChange = (e) => {
    setMesa(e.target.value);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { item: '', quantidade: 1 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ mesa, items });
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setMesa('');
    setItems([{ item: '', quantidade: 1 }]);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Novo Pedido</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="mesa">Mesa:</label>
            <input
              type="text"
              id="mesa"
              value={mesa}
              onChange={handleMesaChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Itens:</label>
            {items.map((itemObj, index) => (
              <div key={index} className="item-group">
                <input
                  type="text"
                  placeholder="Item"
                  value={itemObj.item}
                  onChange={(e) =>
                    handleItemChange(index, 'item', e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Quantidade"
                  value={itemObj.quantidade}
                  onChange={(e) =>
                    handleItemChange(index, 'quantidade', e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="add-item-button"
              onClick={handleAddItem}
            >
              <FaPlus /> <span>Adicionar</span>
            </button>
          </div>

          <button type="submit" className="submit-button">
            Adicionar Pedido
          </button>

          <button type="button" className="close-button" onClick={handleClose}>
            Fechar
          </button>
        </form>
      </div>
    </div>
  );
}

NovoPedidoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NovoPedidoModal;