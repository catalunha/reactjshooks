import React, { useState, useCallback, useEffect } from 'react'
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa'
import { Container, Form, SubmitButton, List, DeleteButton } from './styles'
import api from '../../services/api'

export default function Main() {
  const [newRepo, setNewRepo] = useState('')
  const [repositorios, setRepositorios] = useState([])
  const [loading, setLoading] = useState(false)
  const [alerta, setAlerta] = useState(null)
  //DidMount - buscar
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos')
    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage))
    }
  }, [])
  //DidUpDate - salvar
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios))
  }, [repositorios])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setLoading(true)
    setAlerta(null)
    async function submit() {
      try {
        if (newRepo === '') {
          throw new Error('Você precisa indicar um repositorio !')
        }
        const response = await api.get(`repos/${newRepo}`)
        const hasRepo = repositorios.find(repo => repo.name === newRepo)
        if (hasRepo) {
          throw new Error('Repositorio duplicado !')
        }
        const data = { name: response.data.full_name }
        setRepositorios([...repositorios, data])
        setNewRepo('')
      } catch (error) {
        setAlerta(true)
        console.log(error)

      } finally {
        setLoading(false)
      }
    }
    submit()
  }, [newRepo, repositorios])

  // async function handleSubmit(e) {
  //   e.preventDefault()
  //   const response = await api.get(`repos/${newRepo}`)
  //   // console.log(response.data)
  //   const data = { name: response.data.full_name }
  //   setRepositorios([...repositorios,data])
  //   setNewRepo('')
  // }
  function handleInputChange(e) {
    setNewRepo(e.target.value)
    setAlerta(null)
  }

  const handleDelete = useCallback((repo) => {
    const find = repositorios.filter((r) => r.name !== repo)
    setRepositorios(find)
  }, [repositorios])

  return (
    <Container>
      <FaGithub size={25} />
      <h1>Meus repositorios</h1>
      <Form onSubmit={handleSubmit} error={alerta}>
        <input
          type='text'
          placeholder='Adicionar repositorio'
          value={newRepo}
          onChange={handleInputChange}
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {
            loading
              ? (<FaSpinner color='#FFF' size={14} />)
              : (<FaPlus color='#FFF' size={14} />)
          }
        </SubmitButton>
      </Form>
      <List>

        {repositorios.map((repo) => (
          <li key={repo.name}>
            <DeleteButton onClick={() => handleDelete(repo.name)}>
              <FaTrash size={14} />
            </DeleteButton>
            <span>{repo.name}</span>
            <a href=''><FaBars size={20} /></a>
          </li>
        ))}
      </List>

    </Container>
  )
}
