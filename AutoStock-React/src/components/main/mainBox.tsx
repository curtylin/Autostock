import { Flex, Spacer, Center, Square, Text, VStack } from "@chakra-ui/react"
import * as React from "react"
import * as mainBoxStyles from "./mainBox.module.css"

const MainBox = () => {
  return (
    <Flex className={mainBoxStyles.flexContainer}>
      <Center w="35%" h="500px">
        <VStack align="stretch">
          <Text fontSize="6xl" color="black">
            AutoStock
          </Text>
          <Text fontSize="4xl" color="black">
            An algo trading platform
          </Text>
        </VStack>
      </Center>
      <Square bg="blue.500" h="500px" size="65%"></Square>
    </Flex>
  )
}

export default MainBox
