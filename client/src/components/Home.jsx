import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const Home = () => {
  const { recipe, saveRecipeById } = useContext(AppContext)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setVisible(true)
  }, [])

  if (!recipe || recipe.length === 0) {
    return (
      <div className='container text-center mt-5'>
        <h4>No recipes found.</h4>
      </div>
    )
  }

  const saved = async id => {
    const result = await saveRecipeById(id)
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
  }

  return (
    <main className='bg-light min-vh-100 py-5'>
      <ToastContainer />

      <div className='container'>
        <h2 className='text-center mb-5 text-primary fw-bold'>
          Our Delicious Recipes
        </h2>
        <div className='row g-4'>
          {recipe.map((data, index) => (
            <div
              key={data._id}
              className={`col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible
                  ? 'translateY(0) scale(1)'
                  : 'translateY(40px) scale(0.95)',
                transitionProperty: 'opacity, transform',
                transitionDuration: '600ms',
                transitionTimingFunction: 'ease-out',
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className='card shadow-sm border-0 w-100 rounded-3 hover-scale transition-transform'>
                <img
                  src={data.imgUrl || 'https://via.placeholder.com/300x200'}
                  className='card-img-top rounded-top'
                  alt={data.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className='card-body d-flex flex-column'>
                  <h5 className='card-title text-primary'>{data.title}</h5>
                  <p className='card-text small text-muted flex-grow-1'>
                    {data.ist?.slice(0, 100) || 'No instructions available.'}
                  </p>
                  <a
                    onClick={() => navigate(`/${data._id}`)}
                    href='#'
                    className='btn btn-outline-primary mt-auto btn-transition'
                  >
                    View Recipe
                  </a>
                  <a
                  
                    className='btn btn-outline-primary mt-auto btn-transition '
                    onClick={()=>saved(data._id)}
                  >
                    save
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Home
