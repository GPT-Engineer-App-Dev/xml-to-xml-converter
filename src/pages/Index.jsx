import { Box, Button, Input, Text, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';

const Index = () => {
  const [xmlContent, setXmlContent] = useState('');
  const [modification, setModification] = useState('');
  const [modifiedXml, setModifiedXml] = useState('');
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setXmlContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const applyModification = () => {
    // Placeholder for modification logic
    const updatedXml = xmlContent.replace(/<\/?[^>]+(>|$)/g, modification);
    setModifiedXml(updatedXml);
    toast({
      title: 'Modification Applied',
      description: 'Your XML has been modified.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const downloadModifiedXml = () => {
    const element = document.createElement("a");
    const file = new Blob([modifiedXml], {type: 'text/xml'});
    element.href = URL.createObjectURL(file);
    element.download = "modifiedXml.xml";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Text fontSize="2xl">XML Modifier</Text>
        <Input type="file" accept=".xml" onChange={handleFileChange} />
        <Input placeholder="Enter your modification" value={modification} onChange={(e) => setModification(e.target.value)} />
        <Button colorScheme="blue" onClick={applyModification}>Modify XML</Button>
        {modifiedXml && (
          <>
            <Button colorScheme="green" onClick={downloadModifiedXml}>Download Modified XML</Button>
            <Text mt={2}>Preview:</Text>
            <Text fontSize="sm">{modifiedXml}</Text>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Index;