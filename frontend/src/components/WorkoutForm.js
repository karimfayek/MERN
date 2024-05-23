import { useEffect, useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()

  const [title, setTitle] = useState('')
  const [catTitle, setCatTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null)
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(
    () => {
      const fetchCats = async () => {
        const cats = await fetch('http://localhost:4000/api/categories')
        const Catsjson = await cats.json()
        if (cats.ok) {
          setCategories(Catsjson)
        }
      }

      fetchCats()
    }, []
  )
  const onsubmitCatForm = async (e) => {
    e.preventDefault()
    const name = { catTitle }

    const response = await fetch('http://localhost:4000/api/categories', {
      method: 'POST',
      body: JSON.stringify(name),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  const onsubmitForm = async (e) => {
    e.preventDefault()
    const workout = { title, price, description, categories }

    const response = await fetch('http://localhost:4000/api/products', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })

    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      console.log('product created ' , json)
      setTitle('')
      setPrice('')
      setDescription('')
      setError(null)
      dispatch({ type: 'CREATE_WORKOUT', payload: json })
    }
  }
  return (
    <>
      <h1>Categories</h1>

      {categories && categories.map((cat) => (
        <div key={cat._id}>
          <p>{cat.name}</p>
          {cat.products && cat.products.map((pr) => (
            <p key={pr._id}>{pr.title}</p>
          ))}
        </div>
      ))}

      <form onSubmit={onsubmitForm}>
        <h2>Add New Product</h2>
        {error &&
          <p className='error'>{error}</p>}
          <input type="file" name="image" onChange={handleFileChange} />
        <label>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <label>Price</label>
        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <label>Description</label>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
        <select onChange={(e) => setCategories(e.target.value.split(','))}>
          <option>choose</option>
          {categories && categories.map((cat) => (
            <option value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <input type="text" value={categories} placeholder="Categories (comma-separated)" onChange={(e) => setCategories(e.target.value.split(','))} />
        <button type='submit' value='submit'>Submit</button>
      </form>
      <form onSubmit={onsubmitCatForm}>
        <h2>Add New Cat</h2>
        <label>Title</label>
        <input
          type='text'
          value={catTitle}
          onChange={(e) => setCatTitle(e.target.value)} />

        <button type='submit' value='submit'>Submit</button>
      </form>
      <form onSubmit={onsubmitForm}>
        <h2>Add New WorkOut</h2>
        {error &&
          <p className='error'>{error}</p>}
        <label>Title</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
        <label>Price</label>
        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <label>Description</label>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Categories (comma-separated)" onChange={(e) => setCategories(e.target.value.split(','))} />
        <button type='submit' value='submit'>Submit</button>
      </form>
      
    </>
  )
}

export default WorkoutForm