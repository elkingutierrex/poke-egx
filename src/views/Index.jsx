import { Container, Row, Col, InputGroup, InputGroupText, Input } from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { PokeCard } from "../components/PokeCard";

export const Index = () => {
  const [ pokemons, setPokemons ] = useState([]);
  const [ offSet, setOffset ] = useState(0);
  const [ limit, setLimit ] = useState(20);

  useEffect(() => {
    getPokemons(offSet);
  }, [offSet]); // Puedes agregar `offSet` como dependencia si esperas que cambie

  const getPokemons = async (startNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offSet}`;
    axios.get(url).then(async (response) => {
      const resp = response.data.results;
      setPokemons(resp)
      console.log(resp);
    });
  };

  return (
    <>
      <Container className="shadow bg-danger mt-3 mb-3 p-2">
        <Row>
          <Col>
            <InputGroup className="shadow">
              <InputGroupText>
                <i className="fa-solid fa-search"></i>
              </InputGroupText>
              <Input placeholder="Buscar Pokemon"></Input>
            </InputGroup>
          </Col>
        </Row>

        <Row className="mt-3">
          {
            pokemons.map((pokemon, i) => (
              <PokeCard key={i} pokemon={pokemon} />
       
            )
          )}
        </Row>
      </Container>
    </>
  );
};