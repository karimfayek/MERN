import { useEffect, useState } from 'react'
import { fetchCategories, createCategory } from '../api';

const WorkoutForm = () => {
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await fetchCategories();
      setCategories(data);
    };
    getCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory({ name, parentId });
    setName('');
    setParentId('');
    const { data } = await fetchCategories();
    setCategories(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Parent Category:</label>
        <select 
          value={parentId} 
          onChange={(e) => setParentId(e.target.value)}
        >
          <option value="">None</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default WorkoutForm