// const fetchDepartments = async (ref) => {
//   try {
//     const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         apiKey: "f579aac88b980dff3f819958ce1cbca6",
//         modelName: "Address",
//         calledMethod: "getWarehouses",
//         methodProperties: {
//           CityRef: ref,
//         },
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const warehouses = data.data;

//       return warehouses;
//     } else {
//       console.error("Error fetching Nova Poshta departments");
//     }
//   } catch (error) {
//     console.error("Error fetching Nova Poshta departments", error);
//   }
// };
// export default fetchDepartments;
const fetchDepartments = async (ref) => {
  try {
    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: "f579aac88b980dff3f819958ce1cbca6",
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityRef: ref,
        },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const warehouses = data.data;

      if (Array.isArray(warehouses)) {
        return warehouses;
      } else {
        console.error("Data received from Nova Poshta is not an array");
        return [];
      }
    } else {
      console.error("Error fetching Nova Poshta departments");
    }
  } catch (error) {
    console.error("Error fetching Nova Poshta departments", error);
    return [];
  }
};

export default fetchDepartments;
