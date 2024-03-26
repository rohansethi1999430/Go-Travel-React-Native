import axios from 'axios';

export const dataForLikes = async () => {
  try {
    const data= await axios.get('http://192.168.2.35:3000/getData');
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
 
};


export const savingLikedData = function saveDataToMongoDB(data) {
  console.log(data)
  fetch('http://192.168.2.35:3000/saveData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: [JSON.stringify(data)] }), // Modified here
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}



  
  
  



