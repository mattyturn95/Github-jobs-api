import React, { useState } from 'react';
import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import Job from './Job';
import JobsPagination from './JobsPagination';
import SearchForm from './SearchForm';



function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, error, HasNextPage } = useFetchJobs(params, page)

  function handleParamChange(e) {
    const param = e.target.name
    const value = e.target.value
    setPage(1)
    setParams(prevParams => {
      return {...prevParams, [param]: value}
    })
  }

  return (
    <Container className="my-4">
      <h1 className="text-white mb-4 text-center">Github Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange}/>
      <JobsPagination page={page} setPage={setPage} HasNextPage={HasNextPage} />
      {loading && <h1>loading...</h1>}
      {error && <h1>Error. Try Refreshing</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job={job} />


      })}
      <JobsPagination page={page} setPage={setPage} HasNextPage={HasNextPage} />
    </Container>
  );
}

export default App;
