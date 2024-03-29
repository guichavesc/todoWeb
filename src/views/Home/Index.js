import React, { useState, useEffect } from 'react';
import * as S from './styles'
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom'
import isConnect from '../../utils/isConnected'
//Components
import Header from '../../Components/Header/index';
import Footer from '../../Components/Footer/index';
import FilterCard from '../../Components/FilterCard';
import TaskCard from '../../Components/TaskCard/index'
import isConnected from '../../utils/isConnected';

function Home() {
  const [filterActived, setFilterActived] = useState('all');
  const [tasks, setTasks] = useState([]);
  const [redirect, setRedirect] = useState(false);

  async function loadTasks() {
    await api.get(`/task/filter/${filterActived}/${isConnected}`)
    .then(response => {
      setTasks(response.data)
    })
  }

  

  function Notification(){
    setFilterActived('late');
  }

  useEffect(() => {
    loadTasks()
    if(!isConnected)
    setRedirect(true)
  }, [filterActived])

  return (
    <S.Container>
      {redirect && <Redirect to="/qrcode"/>}
      <Header clickNotification={Notification}/>
        <S.FilterArea>
          <button type="button" onClick={() => setFilterActived("all")}>
            <FilterCard title="Todos" actived={filterActived == 'all'} />
          </button>
          <button type="button" onClick={() => setFilterActived("today")}>
            <FilterCard title="Hoje" actived={filterActived == 'today'}  />
          </button>
          <button type="button" onClick={() => setFilterActived("week")}>
            <FilterCard title="Semana" actived={filterActived == 'week'}  />  
          </button>
          <button type="button"  onClick={() => setFilterActived("month")}>
            <FilterCard title="Mês" actived={filterActived == 'month'} />
          </button>
          <button type="button" onClick={() => setFilterActived("year")}>
            <FilterCard title="Ano" actived={filterActived == 'year'}  />
          </button>
        </S.FilterArea>

        <S.Title>
          <h3>{filterActived == 'late' ? 'Tarefas Atrasadas' : 'Tarefas'}</h3>
        </S.Title>

        <S.Content>
          {
            tasks.map(t => (
              <Link to={`/task/${t._id}`}>
                <TaskCard type={t.type} title={t.title} when={t.when} done={t.done}/>
              </Link>
            ))
          }
        </S.Content>

      <Footer />
    </S.Container>
  )
}

export default Home;
