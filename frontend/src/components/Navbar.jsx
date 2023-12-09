import { Box, Flex, HStack, Link, IconButton, Text, useDisclosure, Stack, MenuItem, Menu, MenuList, MenuButton, ButtonGroup } from '@chakra-ui/react'
import { Link as ReactLink } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { FaInstagram, FaTiktok } from 'react-icons/fa'
import { GiFlowerTwirl } from 'react-icons/gi'
import { useState } from 'react'

const links = [
  { linkName: 'About', path: '/about' },
  { linkName: '1:1 Coaching', path: '/coaching' }
]

const blogLinks = [
  { linkName: 'Videos', category: 'videos' },
  { linkName: 'Recommended Books', category: 'books' },
  { linkName: 'Recommended Podcasts', category: 'podcasts' }
]

const NavLink = ({ path, children }) => (
  <Link as={ReactLink} to={path} px='2' py='2' fontWeight='semibold' _hover={{ textDecoration: 'none', bg: 'pink.100' }}>
    {children}
  </Link>
)

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [logoHover, setLogoHover] = useState(false)

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
            <Link 
              as={ReactLink} 
              to='/' 
              style={{ textDecoration: 'none' }} 
              onMouseEnter={() => setLogoHover(true)} 
              onMouseLeave={() => setLogoHover(false)}
            >
              <Flex alignItems='center'>
                <GiFlowerTwirl color='white' />
                <Text fontWeight='extrabold' color='white' ml={2}>
                  Free Spirited Latina
                </Text>
              </Flex>
            </Link>
            <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
              {links.map((link) => (
                <NavLink key={link.linkName} path={link.path}>
                  {link.linkName}
                </NavLink>
              ))}
              <Menu>
                <MenuButton fontWeight='semibold' p='2' _hover={{ bg: 'pink.100' }}>
                  Resources
                </MenuButton>
                <MenuList>
                  {blogLinks.map((link) => (
                    <MenuItem key={link.linkName} as={ReactLink} to={`/blog/${link.category}`}>
                      {link.linkName}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
          
          <ButtonGroup spacing={4} variant='ghost'>
            <IconButton as='a' href='#' icon={<FaInstagram fontSize='1.25rem' color='white' />} />
            <IconButton as='a' href='#' icon={<FaTiktok fontSize='1.25rem' color='white' />} />
          </ButtonGroup>
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ base: 'flex', md: 'none' }} flexDirection='column' alignItems='start'>
          <Stack as='nav' spacing={4} width='full'>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path} width='full' textAlign='left'>
                {link.linkName}
              </NavLink> 
            ))}
          </Stack>
          <Menu width='full'>
            <MenuButton fontWeight='semibold' p='2' _hover={{ bg: 'pink.100' }} width='full' textAlign='left' mt='3'>
              Resources
            </MenuButton>
            <MenuList width='full'>
              {blogLinks.map((link) => (
                <MenuItem key={link.linkName} as={ReactLink} to={`/blog/${link.category}`} width='full' textAlign='left'>
                  {link.linkName}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>    
  )
}

export default Navbar
