import React from 'react'

function Respositorio({match}) {
  return (
    <h1 style={{ color: '#FFF' }}>
      Repositorio: 
      {decodeURIComponent(match.params.repo)}
      </h1>
  )
}

export default Respositorio