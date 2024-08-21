
import React, { useState } from 'react';

const ListItems = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const onChange = (e) => {
    setNewItem(e.target.value)
  }
const addItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
        setItems([...items, newItem]);
        setNewItem('');
      }
}
  return (
    <div className='form'>
      <h2>Items List</h2>
      <form onSubmit={addItem}>
        <input
          type="text"
          value={newItem}
          onChange={onChange}
          placeholder="add a new item"
        />
        <button type="submit">add new Item</button>
      </form>
      <ul>

        {items.map((item, index) => (
            <li key = {index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
