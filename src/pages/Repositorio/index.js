import React, { useState, useEffect } from 'react'
import { Container } from './styles'
import api from '../../services/api'

// decodeURIComponent(match.params.repo)
function Respositorio({ match }) {
  const [repositorio,setRepositorio] = useState({})
  const [issues,setIssues] = useState([])
  const [loaing,setLoading] = useState(true)
  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repo)
      console.log(nomeRepo)
      const [repoData,repoIssues] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`,{
          params: {
            state:'open',
            per_page:5
          }
        })
      ])
      console.log(repoData.data)
      console.log(repoIssues.data)
      setRepositorio(repoData.data)
      setIssues(repoIssues.data)
      setLoading(false)
    }
    load()
  }, [match.params.repo])

  return (
    <Container>

    </Container>
  )
}

export default Respositorio