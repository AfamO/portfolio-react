
import {useSate} from "react";
import React, {useEffect} from "react";

import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
    initialValues: {
        firstName:"",
        email:"",
        type:"",
        comment:""
    },
    validationSchema: Yup.object({
          firstName:Yup.string().required("Required"),
          email: Yup.string().email("Invalid Email Address").required("Required"),
          type: Yup.string().required("Optional"),
          comment: Yup.string().min(25,"Must be at least 25 characters").required("Required")
        }),
    onSubmit:  (values,{setSubmitting,resetForm}) => {

          handleSubmit(values,setSubmitting,resetForm);

    },
  });

  const handleSubmit = async (values,setSubmitting,resetForm) =>{
    setSubmitting(true);
    await submit("https://graded-assessment.afamokonkwo.repl.co/",values)
    setSubmitting(false);
    resetForm();
  }
  useEffect(()=>{
   console.log("Formik Object =="+JSON.stringify(formik));
  if(response != null){
        if(response.type == "success")
           {
                onOpen(response.type,formik.values.firstName+" "+response.message);

           }
           else
           {
                console.log("Error-Response  =="+JSON.stringify(response));
                onOpen(response.type,response.message);
           }
  }

  },[response,isLoading]);
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
          <form onSubmit={formik.handleSubmit }>
            <VStack spacing={4}>
              <FormControl isInvalid={(formik.touched.firstName && formik.errors.firstName)? true:false}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  value = {formik.values.firstName}
                  {...formik.getFieldProps("firstName")}
                />

               <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>

              </FormControl>
              <FormControl isInvalid={(formik.touched.email && formik.errors.email)? true:false}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value ={formik.values.email}
                  {...formik.getFieldProps("email")}

                />

               <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" value ={formik.values.type} {...formik.getFieldProps("type")}>
                  <option value="hireMe">Freelance project proposal</option>
                  <option value="openSource">
                    Open source consultancy session
                  </option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={(formik.touched.comment && formik.errors.comment)? true:false}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  value ={formik.values.comment}
                  {...formik.getFieldProps("comment")}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button  type="submit" colorScheme="purple" width="full">
                {(isLoading)? "Loading...": "Submit"}
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
