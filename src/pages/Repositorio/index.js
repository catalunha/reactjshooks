import React, { useState, useEffect } from 'react'
import { Container, Owner, Loading, BackButton, IssuesList, PageActions, FilterList } from './styles'
import { FaArrowLeft } from 'react-icons/fa'
import api from '../../services/api'

// decodeURIComponent(match.params.repo)
function Respositorio({ match }) {
  const [repositorio, setRepositorio] = useState({})
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState([
    { state: 'all', label: 'Todas', active: true },
    { state: 'open', label: 'Abertas', active: false },
    { state: 'closed', label: 'Fechadas', active: false },
  ])
  const [filterIndex, setFilterIndex] = useState(0)

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repo)
      console.log(nomeRepo)
      const [repoData, repoIssues] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: filters.find((item) => item.active).state,
            per_page: 5
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
  useEffect(() => {
    async function loadIssue() {
      const nomeRepo = decodeURIComponent(match.params.repo)
      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page: page,
          per_page: 5,
        }
      })
      setIssues(response.data)
      console.log(filterIndex)

    }
    loadIssue()
  }, [match.params.repo, page, filterIndex, filters])
  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1)
  }
  function handleFilter(index) {
    setFilterIndex(index)
  }
  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }
  return (
    <Container>
      <BackButton to='/'>
        <FaArrowLeft color='#000' size={35} />

      </BackButton>
      <Owner>
        <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
        <h1>
          {repositorio.name}
        </h1>
        <p>{repositorio.description}</p>
      </Owner>
      <FilterList active={filterIndex}>
        {filters.map((item, index) => (
          <button
            type='button'
            key={item.label}
            onClick={() => { handleFilter(index) }}
          // onClick={setFilterIndex(index)}
          >{item.label}</button>
        ))}
      </FilterList>
      <IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
      <PageActions>
        <button type='button' onClick={() => handlePage('back')} disabled={page < 2}>Voltar</button>
        <button type='button' onClick={() => handlePage('next')}>Proxima</button>
      </PageActions>
    </Container>
  )
}

export default Respositorio