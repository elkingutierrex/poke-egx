import { Container, Row, Col, InputGroup, InputGroupText, Input } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { PokeCard } from "../components/PokeCard";

export const Index = () => {
  const [ pokemons, setPokemons ]         = useState([]);
  const [ allPokemons, setAllPokemons ]   = useState([]);
  const [ list, setList ]                 = useState([]);
  const [ filter, setFilter ]             = useState('');
  const [ offSet, setOffset ]             = useState(0);
  const [ limit, setLimit ]               = useState(20);

  useEffect(() => {
    getPokemons(offSet);
    getAllPokemons();
  }, [offSet]); // Puedes agregar `offSet` como dependencia si esperas que cambie

  const getPokemons = async (startNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offSet}`;
    axios.get(url).then(async (response) => {
      const resp = response.data.results;
      setPokemons(resp);
      setList(resp);
      console.log(resp);
    });
  };

  const getAllPokemons = async (startNumber) => {
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

  return (
    <>
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
        </Row>
      </Container>
    </>
  );
};