import React from 'react'
import { FaGithub, FaPlus } from 'react-icons/fa'
import { Container, Form, SubmitButton } from './styles'
export default function Main() {
  return (
    <Container>
      <FaGithub size={25} />
      <h1>Meus repositorios3</h1>
      <Form>
        <input type='text' placeholder='Adicionar repositorio' />
        <SubmitButton>
          <FaPlus color='#FFF' size={14} />
        </SubmitButton>
      </Form>
    </Container>
  )
}
