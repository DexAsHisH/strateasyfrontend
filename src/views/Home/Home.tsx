import { Button, Card, Icon, ListItem, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Popup from 'reactjs-popup';
import './Home.scss'
import { useCallback, useEffect, useState } from 'react'; 
import axios from 'axios';


interface IStrategyItem {
    id : number;
    name : string;
}




const getStrategies = async () => {
    return axios.get<IStrategyItem[]>('http://localhost:8000/strategies')
 }

 const getActiveStrategies = async () => {
     return axios.get<IStrategyItem[]>('http://localhost:8000/activeStrategies')
  }

 const addStrategy = async (item : IStrategyItem) => {
     return axios.post<IStrategyItem[]>('http://localhost:8000/addStrategy' , item)
 }
 const delStrategy = async (id : number) => {
     return axios.delete<IStrategyItem[]>('http://localhost:8000/deleteStrategy', {params : { id }})
 }
 const srtStrategy = async (id : number) => {
     return axios.post<IStrategyItem[]>('http://localhost:8000/startStrategy',  {id} )
 }

 const stpStrategy = async (id : number) => {
     return axios.post<IStrategyItem[]>('http://localhost:8000/stopStrategy',  {id} )
 }

export const Home = () => {

    const [strategies, setStrategies] = useState<IStrategyItem[]>([])
    const [activeStrategies, setActiveStrategies] = useState<IStrategyItem[]>([])

    useEffect( () => {
        getStrategies().then((strat) => {
            console.log(strat.data)
            setStrategies(strat.data)
        })
        getActiveStrategies().then((strat) => {
            console.log(strat.data)
            setActiveStrategies(strat.data)
        })
    }, [])


    const createStrategy = useCallback((item ?: IStrategyItem) => {

        const newStrat = item || { id : strategies.length + 1, name : 'NEW STR'}

        addStrategy(newStrat).then((res) => {
            setStrategies(res.data)
        })
        // setStrategies( (prevStrat) => {
        //     return [...prevStrat , {
        //     id: prevStrat.length + 1,
        //     name: 'HDFC',
        // }] })
    }, [strategies])


    const deleteStrategy = (id: number) => {
    //    const filteredStrat =  strategies.filter((item) =>{
    //         return item.id !== id;
    //     })
    delStrategy(id).then((res) => {
        setStrategies(res.data)
    })
      
    }
    const formStrategy = () => (
        
        createStrategy()
      );

    const startStrategy = (item: IStrategyItem) =>{
        
        srtStrategy(item.id).then((res) => {
            setActiveStrategies(res.data)
            deleteStrategy(item.id)
        })
        
        //console.log("play");
        //setActiveStrategies((prev) => {
        //    return [...prev,item ]
        //})

        //deleteStrategy(item.id)
    }

    const stopStrategy = (item: IStrategyItem) =>{
        stpStrategy(item.id).then((res) =>{
            setActiveStrategies(res.data)
            createStrategy(item)
        })
    }

    return <div className="home">
        <div className="home__strategies">
            <Typography variant='h5'>My strategies</Typography>
            <div className="home__strategies--item-container">
            <div className='home__strategies--item-new' onClick={() => formStrategy()}><AddIcon /></div>
                {
                    strategies.map((item) => {
                        return <div className='home__strategies--item' key={item.id}><div onClick={() => deleteStrategy(item.id)}><DeleteIcon /></div><div><Button onClick={() => startStrategy(item)}>play</Button></div>{item.name}</div>
    
                    })
                
                }
                
            
            </div>
        </div>
        <div className='home__activeStrategies'>
        <Typography variant='h5'>Active strategies</Typography>
        <TableContainer component={Paper}>
            <Table>
            <TableHead>
               {activeStrategies.map((item) => {

                return (<TableRow>
                    <TableCell >{item.name}</TableCell>
                    <TableCell><Button onClick={() => stopStrategy(item)}>stop</Button></TableCell>
                </TableRow>)
                
                })}
            </TableHead>
            </Table>
        </TableContainer>
        </div>

    </div>
}