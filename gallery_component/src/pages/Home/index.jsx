import {
  Box,
  Center,
  Image,
  Text,
  useMediaQuery,
  HStack,
  VStack,
  Flex,
  Link,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { CardGaleria } from "../../components/Galery";

export const Home = () => {
  const [data, setData] = useState([]);

  const [selectedCats, setSelectedCats] = useState([]);

  const [isOnSelected, setIsOnSelected] = useState(false);

  useEffect(() => {
    fetch("./images.json", {
      headers: {
        Accept: "application.json",
      },
    })
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const TakeId = (id) => {
    console.log(id);
  };

  function RemoveCat(id) {
    const index = selectedCats.findIndex((cat) => cat.id === id);
    const removedCat = selectedCats.splice(index, 1);
    setSelectedCats([...selectedCats]);
  }

  const AddandRemovetoSelectedCat = (url, title, image_id) => {
    if (!selectedCats.some((cat) => cat.id === image_id)) {
      setSelectedCats([
        ...selectedCats,
        { url: url, title: title, id: image_id, selected: true },
      ]);
    } else if (selectedCats.some((cat) => cat.id === image_id)) {
      RemoveCat(image_id);
    }
  };

  console.log(selectedCats);

  const LookSelecteds = () => {
    setIsOnSelected(true);
  };

  const LookAll = () => {
    setIsOnSelected(false);
  };

  return (
    <>
      <Box width="95vw">
        <Box
          as="button"
          color="primary.main"
          bg="primary.main1"
          w="200px"
          h="70px"
          onClick={() => LookAll()}
          border="1px"
          borderColor={"primary.main"}
        >
          Ver todos
        </Box>

        <Box
          as="button"
          color="primary.main"
          bg="primary.main1"
          w="200px"
          h="70px"
          onClick={() => LookSelecteds()}
          border="1px"
          borderColor={"primary.main"}
        >
          Ver selecionados
        </Box>

        {isOnSelected ? (
          <>
            {" "}
            {/* section selecteds*/}
            <Text>
              Confira aqui os gatinhos selecionados, para remover dê um clique
              no gatinho escolhido.
            </Text>
            <Flex
              flexDirection="row"
              flexWrap={"wrap"}
              justifyContent="space-around"
              position="relative"
              top="70px"
              ml="22px"
            >
              {selectedCats &&
                selectedCats.map((cat) => (
                  <Box as="button" onClick={() => RemoveCat(cat.image_id)}>
                    <CardGaleria
                      as="button"
                      image={cat.url}
                      tittle={cat.title}
                      image_id={cat.image_id}
                      data={data}
                      selected={isOnSelected}
                    />
                  </Box>
                ))}
            </Flex>
          </>
        ) : (
          /* section All */
          <>
            <Text>
              Confira aqui todos os gatinhos, para selecionar dê um clique no
              gatinho escolhido e para tirar a seleção dê um clique nos gatinhos
              detacados
            </Text>
            <Flex
              flexDirection="row"
              flexWrap={"wrap"}
              justifyContent="space-around"
              position="relative"
              top="70px"
              ml="22px"
            >
              {data &&
                data.map((cat) => (
                  <Box
                    as="button"
                    onClick={() =>
                      AddandRemovetoSelectedCat(
                        cat.url,
                        cat.title,
                        cat.image_id
                      )
                    }
                  >
                    <CardGaleria
                      as="button"
                      image={cat.url}
                      tittle={cat.title}
                      image_id={cat.image_id}
                      data={data}
                      selected={isOnSelected}
                    />
                  </Box>
                ))}
            </Flex>
          </>
        )}
      </Box>
    </>
  );
};
