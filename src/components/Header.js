import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: afamsimon@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/AfamO",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/okonkwo-afam-14103b84/",
  },
  {
    icon: faMedium,
    url: "https://medium.com/AfamO",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com/users/2067675/afamo",
  },
];

const Header = () => {
  const handleClick = (anchor) => (e) => {
    e.preventDefault();
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const socialLinks = socials.map((social,index)=>{
    return(<a key ={social.link} href ={social.url}><FontAwesomeIcon icon= {social.icon} size = {"2x"}/></a>);
  });

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      translateY={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
          <HStack spacing ={3}>
          {socialLinks}
          </HStack>
          </nav>
          <nav>
            <HStack spacing={8}>
              {/* Add links to Projects and Contact me section */}
              <a href ={"/#projects"} onClick ={handleClick("projects")} >Projects</a>
              <a href = {"/#contact-me"} onClick = {handleClick("contactme")}>Contact Me</a>
            </HStack> 
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};
export default Header;
