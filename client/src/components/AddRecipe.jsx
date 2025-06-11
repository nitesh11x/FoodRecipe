import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AddRecipe () {
  // const navigate = useNavigate()
  const { addRecipe } = useContext(AppContext)
  const [formData, setFormData] = useState({
    title: '',
    ist: '',
    ing1: '',
    ing2: '',
    ing3: '',
    ing4: '',
    qty1: '',
    imgUrl: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { title, ist, ing1, ing2, ing3, ing4, qty1, imgUrl } = formData
    const result = await addRecipe(
      title,
      ist,
      ing1,
      ing2,
      ing3,
      ing4,
      qty1,
      imgUrl
    )

    toast(result.data.message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce
    })
    setTimeout(() => {
      navigate('/')
    }, 100)
  }

  return (
    <div className='container mt-5'>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Bounce}
      />
      <div className='card shadow'>
        <div className='card-header bg-primary text-white'>
          <h3 className='mb-0'>Add New Recipe</h3>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Title</label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                className='form-control'
                required
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Instructions</label>
              <textarea
                name='ist'
                value={formData.ist}
                onChange={handleChange}
                className='form-control'
                rows='3'
                required
              />
            </div>

            <div className='row'>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Ingredient 1</label>
                <input
                  type='text'
                  name='ing1'
                  value={formData.ing1}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Ingredient 2</label>
                <input
                  type='text'
                  name='ing2'
                  value={formData.ing2}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Ingredient 3</label>
                <input
                  type='text'
                  name='ing3'
                  value={formData.ing3}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>
              <div className='col-md-6 mb-3'>
                <label className='form-label'>Ingredient 4</label>
                <input
                  type='text'
                  name='ing4'
                  value={formData.ing4}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>
            </div>

            <div className='mb-3'>
              <label className='form-label'>Quantity Info</label>
              <input
                type='text'
                name='qty1'
                value={formData.qty1}
                onChange={handleChange}
                className='form-control'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Image URL</label>
              <input
                type='url'
                name='imgUrl'
                value={formData.imgUrl}
                onChange={handleChange}
                className='form-control'
              />
            </div>

            <button type='submit' className='btn btn-success w-100'>
              Submit Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddRecipe
