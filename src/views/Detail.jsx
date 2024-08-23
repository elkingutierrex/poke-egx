import { Container,  Row, Col, Card, CardBody, CardText} from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Detail = () => {
  const {id} = useParams();
  const [ pokemon, setPokemon ] = useState([]);
  const [ species, setSpecies ] = useState([]);
  const [ habitat, setHabitat ] = useState([]);
  const [ types, setTypes ] = useState([]);
  const [ description, setDescription ] = useState([]);
  const [ cardClass, setCardClass ] = useState('d-none');
  const [ loadClass, setLoadClass ] = useState('');
  const [ imagen, setImagen ] = useState('');
  const [ t, i18n ] = useTranslation("global");


  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  

  useEffect(()=>{
    getPokemon()
  },[])

  const getPokemon = async() => {
    axios.get(url).then(async (response) => {
      const resp = response.data;
      setPokemon(resp);
      if(resp.sprites.other.dream_world.front_default != null){
        setImagen(resp.sprites.other.dream_world.front_default);
      }else{
        setImagen(resp.sprites.other['official-artwork'].front_default)
      }
      await getTypes(resp.types);
      await getSpecie(resp.species.name);
      setCardClass('');
      setLoadClass('d-none')
      console.log('detail', resp);
    });

  }

  const getTypes = async(typ)=> {
    let listTypes = [];
    typ.forEach((item) =>{
      axios.get(item.type.url).then(async (response) => {
        listTypes.push(response.data.names[5].name);
        setTypes(listTypes);
      });

    })

    console.log('types', types);
  }

  const getSpecie = async(specie) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${specie}`;
    axios.get(url).then(async (response) => {
      const resp = response.data;
      setSpecies(resp);
      if( resp.habitat != null  ){
        await getHabitat(resp.habitat.url)
      }
      await getDescription(resp.flavor_text_entries);
  
    });


  }

  const getHabitat = async(habitat) => {
    axios.get(habitat).then(async (response) => {
      const resp = response.data.names[1].name;
      setHabitat(resp)
    });


  }

  const getDescription = async(desc) => {
    let text = "";
    desc.forEach((value) => {
      if(value.language.name == 'es'){
        text = value.flavor_text;
      }
      if(text == '' && desc.length > 0){
        text = desc[0].flavor_text;;
      }
    })
    setDescription(text);



  }

  
  return (
    <Container className="bg-danger mt-3">
      <Row>
        <Col>
          <Card className="shadow mt-3 mb-3">
            <CardBody className="mt-3">
              <Row>
                <Col>
                <Link to="/" className="btn btn-warning"> 
                  <i className="fa-solid fa-home"> {t("txt.home")} </i>
                </Link>
                </Col>
              </Row>

              <Row className={loadClass}>
                <Col className="md-12">
                  <img src="./../../public/img/loading.gif" className="w-100"></img>
                </Col>
              </Row>
              <Row className={cardClass}>
                <Col>
                  <CardText className="h1 text-capitalize"> {pokemon.name} </CardText>
                  <CardText className="fs-3 text-capitalize"> {description} </CardText>
                  <CardText className="fs-5"> 
                  {t("txt.height")}  <strong> {(pokemon.height)/10} m </strong>
                  {t("txt.weight")} : <strong> {(pokemon.weight)/10} kg</strong>
                  </CardText>
                
                  <CardText className="f5"> Habitat: <strong className="text-capitalize"> {habitat}</strong> </CardText>
                 
                </Col>
                <Col md="6">
                  <img src={imagen} className="img-fluid"></img>
                </Col>
    

              </Row>

            </CardBody>

          </Card>
        </Col>
      </Row>
    
    </Container>
  )
}




