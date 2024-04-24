import './App.css'
import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useEffect, useState } from 'react';
import { PieChart } from '@mantine/charts';

const meh = [
  {
    "value": "bascell_cell_carcinoma",
    "score": 0.8892521262168884
  },
  {
    "value": "vascular",
    "score": 0.05678176507353783
  },
  {
    "value": "melanoma",
    "score": 0.040835775434970856
  },
  {
    "value": "actinic_keratosis",
    "score": 0.007202680688351393
  },
  {
    "value": "nevus",
    "score": 0.0028028576634824276
  },
  {
    "value": "benign_keratosis",
    "score": 0.0014897574437782168
  },
  {
    "value": "dermatofibroma",
    "score": 0.0016350882942788303,
    "color": "orange.1"
  }
]
function App() {
  const [processing, setProcessing] = useState(false);
  const [file, setFile] = useState(null);
  const [inference, setInference] = useState();

  const bruh = [
    {
      "name": "bascell_cell_carcinoma", // dermatofibroma
      "fullName": "Basal Cell Carcinoma",
      color: "red.8"
    },
    {
      "name": "vascular",
      "fullName": "Vascular Lesion",
      color: "blue.8"
    },
    {
      "name": "melanoma",
      "fullName": "Melanoma",
      color: "green.8"
    },
    {
      "name": "actinic_keratosis",
      "fullName": "Actinic Keratosis",
      color: "yellow.8"
    },
    {
      "name": "nevus",
      "fullName": "Melanocytic Nevi",
      color: "purple.8"
    },
    {
      "name": "benign_keratosis",
      "fullName": "Benign Keratosis like lesion",
      color: "pink.8"
    },
    {
      "name": "eczema",
      "fullName": "Eczema",
    },
    {
      "name": "acne_rosacea",
      "fullName": "Acne Rosacea",
    },
    {
      "name": 'dermatofibroma',
      "fullName": 'Dermatofibroma',
      color: "orange.8"
    }
  ]

    // useEffect(()=>{
    //   setInference(meh.map((tag, i)=>{
    //     return {name: tag.value, value: tag.score, color: bruh.find(
    //       m=>m.name == tag.value
    //     ).color};
    //     }));
    //   },[])

  const processFiles = (files) => {
    console.log('accepted files', files);
    setProcessing(true);
    setInference(null);

    // upload file using multipart/form-data fetch post
    const formData = new FormData();
    formData.append('file', files[0]);
    setFile(files[0]);

    fetch('/api', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setProcessing(false);

        // set inference result
        const ezema = data.standardInference.tags.find((tag) => tag.value === 'eczema');
        const acne_rosacea = data.standardInference.tags.find((tag) => tag.value === 'acne_rosacea');

        const dermatofibroma = {
          value: 'dermatofibroma',
          score: ezema.score + acne_rosacea.score,
          color:"orange.1"
        };

        // delete ezema and acne 
        
      const tags = data.standardInference.tags.filter((tag) => tag.value !== 'eczema' && tag.value !== 'acne_rosacea')
      tags.push(dermatofibroma);

      console.log(tags)

      setInference(meh.map((tag, i)=>{
        return {name: tag.value, value: tag.score, color: bruh.find(
          m=>m.name == tag.value
        ).color};
        }));
      })
      .catch((error) => {
        console.error('Error:', error);
        setProcessing(false);
      });
  };


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'var(--mantine-color-gray-1)',
      
    }}>
    <Dropzone
      loading={processing}
      onDrop={processFiles}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>

    <div  style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {file && <img src={URL.createObjectURL(file)} alt="preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />}
    </div>
t 
    {inference && <Text size="xl">
      Predication Results:  
    </Text>}
    

    {inference && <PieChart style={{height: 500, width: 500, margin:'auto'}} withLabels={true} labelsType='percent' withLabelsLine={false}  size={400} data={inference} withTooltip  
    labelsPosition='outside'/>}
    </div>
  )
}

export default App
