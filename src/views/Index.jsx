import { Container, Row, Col, InputGroup, InputGroupText, Input, CardImg, CardHeader } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { PokeCard } from "../components/PokeCard";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useTranslation } from "react-i18next";



export const Index = () => {
  const [ itemsPerPage, setItemsPerPage]  = useState(8)
  const [ pokemons, setPokemons ]         = useState([]);
  const [ allPokemons, setAllPokemons ]   = useState([]);
  const [ list, setList ]                 = useState([]);
  const [ filter, setFilter ]             = useState('');
  const [ offSet, setOffset ]             = useState(0);
  const [ limit, setLimit ]               = useState(itemsPerPage);
  const [ total, setTotal ]               = useState(itemsPerPage);
  const { t, i18n } = useTranslation('global');



  useEffect(() => {
    getPokemons(offSet);
    getAllPokemons();
  }, []);
  
  const getPokemons = async (startNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${startNumber}`;
    axios.get(url).then(async (response) => {
      const resp = response.data.results;
      setTotal(response.data.count);
      setPokemons(resp);
      setList(resp);
    
      console.log(resp);
    });
  };

  const getAllPokemons = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=1000000&offset=0`;
    axios.get(url).then(async (response) => {
      const resp = response.data.results;
      setAllPokemons(resp);
      console.log(resp);
    });
  };

  const searchPokemon = async (e) => {
    if(e.keyCode === 13 ){
      setList([]);

      setTimeout( () => {
        setList(filter.trim() !== ''? allPokemons.filter(pokemon => pokemon.name.includes(filter)) : pokemons);
      },300)
    }
  }

  const goPage  = async(page) =>{
    setList([]);
    const x = ( (page == 1 )? 0 : ((page-1)*itemsPerPage));
    console.log( x, page );
    await getPokemons( x );
    setOffset(page)
  }

  return (
    <>
    <div className="ar">
     <button onClick={() => i18n.changeLanguage("es") }>ES</button>
     <button onClick={() => i18n.changeLanguage("en")}>EN</button>
    </div>
        <Container className="shadow bg-danger mt-3 mb-3 p-2">
          <Row>
            <Col>
              <InputGroup className="shadow">
                <InputGroupText>
                  <i className="fa-solid fa-search"></i>
                </InputGroupText>
                <Input placeholder="Buscar Pokemon"
                      value={filter}
                      onChange={(e) => {setFilter(e.target.value)}}
                      onKeyUpCapture={searchPokemon}></Input>
              </InputGroup>
            </Col>
          </Row>

          <Row className="mt-3">
            {
              list.map((pokemon, i) => (
                <PokeCard key={i} pokemon={pokemon} />
        
              )
            )}

            <PaginationControl last={true} 
                              limit={limit} 
                              total={total} 
                              page={offSet} 
                              changePage={p => goPage(p)}/>



          </Row>
        </Container>
     
    </>
  );
};