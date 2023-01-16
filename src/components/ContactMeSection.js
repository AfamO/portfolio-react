
import {useSate} from "react";
import React, {useEffect} from "react";

import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext"; 

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {firstName:"",
                   email:"",
                   type:"",
                   comment:""},
    onSubmit: (values) => {
       useEffect(()=>{
      submit("https://graded-assessment.afamokonkwo.repl.co/",values);
    },[values]);
    },
    validationSchema: Yup.object({
      firstName:Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      type: Yup.string().required("Required"),
      comment: Yup.string().required("Required")
    }),
  });
const[fieldProps,setFieldProps] = React.useState({
  name:"",
  value:"",
  onChange: null,
  onBlur:null,
});

  const handleChange = (e) =>{
    setFieldProps({
      ...formik.getFieldProps
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    formik.handleSubmit;
    if(response == "success"){
      onOpen(response.type,formik.values.firstName+" "+response.message);
      formik.resetForm();
    }
    else{
      onOpen(response.type,response.message);
    }
    }
   
  }
  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit =  {handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={false}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value = {formik.values.firstName}
                  onChange = {handleChange}
                  {...formik.getFieldProps("firstName")}
                />
                <FormErrorMessage>
                  {formik.touched.firstName && formik.error.firstName}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={false}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value ={formik.values.email}
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>
                {formik.touched.eamil && formik.error.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" value ={formik.values.firstName} {...formik.getFieldProps("type")}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={false}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value ={formik.values.comment}
                  onChange ={handleChange}                {...formik.getFieldProps("comment")}
                />
                <FormErrorMessage>
                  {formik.touched.comment && formik.error.comment}
                </FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
