import React, { useState } from "react";
import { Box, SimpleGrid, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { deleteDataFromCart, edit } from "../Redux/ProductMgt/action";
import { useDispatch } from "react-redux";
import { getData } from "../Redux/Sorting/action";

function DisplayProducts({ data }) {
  const [active, setActive] = useState(true);
  const dispatch = useDispatch();
  const status = (id) => {
    setActive((pre) => !pre);
    let payload = active;
    dispatch(edit(id, { available: payload })).then(() => dispatch(getData()));
  };
  
  return (
    <div style={{ width: "100%", marginLeft: "300px" }}>
      {" "}
      <SimpleGrid
        minChildWidth="250px"
        spacing="40px"
        marginTop="30px"
        textAlign="center"
        padding="2%"
      >
        {data && data.map((item) => (
          <Box boxSize={"xsm"} height="300px" >
            <Image w={"100%"} src={item.img1} h="200px" />{" "}
            <h2>{item.title}</h2>
            <h4>{item.brand}</h4>
            <h3>{item.price}</h3>
            
            <Box display={"flex"} justifyContent={"space-evenly"}>
              <Link to={`/product/${item.id}`}>
                <Button
                  color={"white"}
                  bg={"teal"}
                  _hover={{
                    bg: "#F9F5EB",
                    color: "teal",
                    border: "2px solid teal ",
                  }}
                >
                  {" "}
                  Edit
                </Button>
              </Link>
              <Box onClick={() => status(item.id)}>
                {item.available ? (
                  <Button
                    _hover={{
                      bg: "#F9F5EB",
                      color: "green",
                      border: "2px solid green ",
                    }}
                    bg="green"
                    color={"white"}
                    ml="50px"
                  >
                    active
                  </Button>
                ) : (
                  <Button bg="red.400" ml="50px">
                    Inactive
                  </Button>
                )}
              </Box>
              <Button
                bg="red"
                color={"white"}
                
                _hover={{
                  bg: "#F9F5EB",
                  color: "red",
                  border: "2px solid red ",
                }}
                onClick={() =>
                  dispatch(deleteDataFromCart(item.id)).then(() =>
                    dispatch(getData())
                  )
                }
                ml="30px"
              >
                Delete
              </Button>
            </Box>
          </Box>
          
        ))}
      </SimpleGrid>
      
    </div>
  );
}

export default DisplayProducts;