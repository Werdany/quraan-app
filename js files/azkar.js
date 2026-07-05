async function getAzkar() {
  const response = await fetch("./azkar_obj.json");

  const data = await response.json();

  console.log(data);
}

getAzkar();
