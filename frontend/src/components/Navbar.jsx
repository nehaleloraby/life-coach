import React from 'react'
import {
  Box, Flex, HStack, Link, IconButton, Text, useDisclosure, Stack, MenuItem, Menu, MenuList, MenuButton, ButtonGroup
} from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { GiFlowerTwirl } from 'react-icons/gi'

const NavLink = ({ path, children }) => (
  <Link as={ReactLink} to={path} px='2' py='2' fontWeight='semibold' _hover={{ textDecoration: 'none', bg: 'pink.100' }}>
    {children}
  </Link>
)

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Box bg='#f4c2c2' px={4} fontFamily='Open Sans, sans-serif'>
      <Flex h='16' alignItems='center' justifyContent='space-between'>
        <IconButton
          bg='transparent'
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <Flex alignItems='center' justifyContent='space-between' flex='1'>
          <HStack spacing={4}>
            <Link as={ReactLink} to='/' style={{ textDecoration: 'none' }}>
              <Flex alignItems='center'>
                <GiFlowerTwirl color='white' />
                <Text fontWeight='extrabold' color='white' ml={2}>
                  Free Spirited Latina
                </Text>
              </Flex>
            </Link>
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              <NavLink path="/about">About</NavLink>
              <Menu>
                <MenuButton fontWeight='semibold' p='2' _hover={{ bg: 'pink.100' }}>
                  1:1 Coaching
                </MenuButton>
                <MenuList>
                  <MenuItem as={ReactLink} to="/discovery-calls">Discovery Calls</MenuItem>
                  <MenuItem as={ReactLink} to="/full-sessions">Full Sessions</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton fontWeight='semibold' p='2' _hover={{ bg: 'pink.100' }}>
                  Resources
                </MenuButton>
                <MenuList>
                  <MenuItem as={ReactLink} to="/videos">Videos</MenuItem>
                  <MenuItem as={ReactLink} to="/books">Recommended Books</MenuItem>
                  <MenuItem as={ReactLink} to="/podcasts">Recommended Podcasts</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
          
          <ButtonGroup spacing={4} variant='ghost'>
            <IconButton 
              as='a' 
              href='https://www.instagram.com/freespiritedlatina/?hl=en' 
              target='_blank' 
              rel='noopener noreferrer' 
              icon={<FaInstagram fontSize='1.25rem' color='white' />} 
            />
            <IconButton 
              as='a' 
              href='https://www.tiktok.com/@freespiritedlatina?lang=en' 
              target='_blank' 
              rel='noopener noreferrer' 
              icon={<FaTiktok fontSize='1.25rem' color='white' />} 
            />
          </ButtonGroup>
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ base: 'flex', md: 'none' }} flexDirection='column' alignItems='start'>
          <Stack as='nav' spacing={4} width='full'>
            <NavLink path="/about" width='full' textAlign='left'>About</NavLink>
            <Menu width='full'>
              <MenuButton fontWeight='semibold' p='2' _hover={{ bg: 'pink.100' }} width='full' textAlign='left' mt='3'>1:1 Coaching</MenuButton>
              <MenuList width='full'>
                <MenuItem as={ReactLink} to="/discovery-calls" width='full' textAlign='left'>Discovery Calls</MenuItem>
                <MenuItem as={ReactLink} to="/full-sessions" width='full' textAlign='left'>Full Sessions</MenuItem>
              </MenuList>
            </Menu>
            <Menu width='full'>
              <MenuButton fontWeight='semibold' p='2' _hover={{ bg: 'pink.100' }} width='full' textAlign='left' mt='3'>Resources</MenuButton>
              <MenuList width='full'>
                <MenuItem as={ReactLink} to="/videos" width='full' textAlign='left'>Videos</MenuItem>
                <MenuItem as={ReactLink} to="/books" width='full' textAlign='left'>Recommended Books</MenuItem>
                <MenuItem as={ReactLink} to="/podcasts" width='full' textAlign='left'>Recommended Podcasts</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default Navbar

