import React, { FC, useState } from "react";

export const Home = () => {
  // const [formData, setFormData] = useState({
  //   fixed_acidity: "",
  //   volatile_acidity: "",
  //   citric_acid: "",
  //   residual_sugar: "",
  //   chlorides: "",
  //   free_sulfur_dioxide: "",
  //   total_sulfur_dioxide: "",
  //   density: "",
  //   pH: "",
  //   sulphates: "",
  //   alcohol: "",
  // });

  const [formData, setFormData] = useState({
    fixed_acidity: "7.4",
    volatile_acidity: "0.70",
    citric_acid: "0.00",
    residual_sugar: "1.9",
    chlorides: "0.076",
    free_sulfur_dioxide: "11.0",
    total_sulfur_dioxide: "34.0",
    density: "0.9978",
    pH: "3.51",
    sulphates: "0.56",
    alcohol: "9.4",
  });

  // Valores predeterminados del Caso 5
  // const [formData, setFormData] = useState({
  //   fixed_acidity: "6.0",
  //   volatile_acidity: "0.31",
  //   citric_acid: "0.47",
  //   residual_sugar: "3.6",
  //   chlorides: "0.039",
  //   free_sulfur_dioxide: "50.0",
  //   total_sulfur_dioxide: "150.0",
  //   density: "0.9912",
  //   pH: "3.12",
  //   sulphates: "0.35",
  //   alcohol: "13.1",
  // });

  //   const [formData, setFormData] = useState({
  //     fixed_acidity: "10.5",
  //     volatile_acidity: "0.24",
  //     citric_acid: "0.47",
  //     residual_sugar: "2.1",
  //     chlorides: "0.066",
  //     free_sulfur_dioxide: "6.0",
  //     total_sulfur_dioxide: "24.0",
  //     density: "0.9978",
  //     pH: "3.15",
  //     sulphates: "0.9",
  //     alcohol: "11.0",
  //   });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enviar datos al backend
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     // const response = await axios.get('http://localhost:8000/api/predictorsvm/predict/', {
  //     //   params: formData  // Enviamos los datos como parámetros en la URL
  //     // });
  //     // setPrediction(response.data.quality);

  //     const response = await fetch(
  //       "http://localhost:8000/api/predictor/predictsvm/?fixed_acidity=7.4&volatile_acidity=0.70&citric_acid=0.00&residual_sugar=1.9&chlorides=0.076&free_sulfur_dioxide=11.0&total_sulfur_dioxide=34.0&density=0.9978&pH=3.51&sulphates=0.56&alcohol=9.4&quality=5"
  //       // "http://localhost:8000/api/predictor/predictsvm/?fixed_acidity=7.4&volatile_acidity=0.70&citric_acid=0.00&residual_sugar=1.9&chlorides=0.076&free_sulfur_dioxide=11.0&total_sulfur_dioxide=34.0&density=0.9978&pH=3.51&sulphates=0.56&alcohol=9.4&quality=5"
  //       // "http://localhost:8000/api/predictor/predictsvm/?fixed_acidity=7.4&volatile_acidity=0.70&citric_acid=0.00&residual_sugar=1.9&chlorides=0.076&free_sulfur_dioxide=11.0&total_sulfur_dioxide=34.0&density=0.9978&pH=3.51&sulphates=0.56&alcohol=9.4&quality=5"
  //     );

  //     const jsonData = await response.json();
  //     setPrediction(jsonData.quality);

  //     setError(""); // Limpiar cualquier error previo
  //   } catch (error) {
  //     console.error("Error al obtener la predicción:", error);
  //     setError(
  //       "Error al obtener la predicción. Verifica que todos los campos estén llenos y que el backend esté funcionando."
  //     );
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams({
        fixed_acidity: formData.fixed_acidity,
        volatile_acidity: formData.volatile_acidity,
        citric_acid: formData.citric_acid,
        residual_sugar: formData.residual_sugar,
        chlorides: formData.chlorides,
        free_sulfur_dioxide: formData.free_sulfur_dioxide,
        total_sulfur_dioxide: formData.total_sulfur_dioxide,
        density: formData.density,
        pH: formData.pH,
        sulphates: formData.sulphates,
        alcohol: formData.alcohol,
      });

      const response = await fetch(
        `http://localhost:8000/api/predict/predictor/?${queryParams.toString()}`
      );

      const jsonData = await response.json();
      setPrediction(jsonData.quality);

      setError(""); // Limpiar cualquier error previo
    } catch (error) {
      console.error("Error al obtener la predicción:", error);
      setError(
        "Error al obtener la predicción. Verifica que todos los campos estén llenos y que el backend esté funcionando."
      );
    }
  };

  return (
    <div>
      <div>
        <h1>Predicción de Calidad del Vino</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fixed_acidity"
            placeholder="Acidez Fija"
            value={formData.fixed_acidity}
            onChange={handleChange}
          />
          <input
            type="text"
            name="volatile_acidity"
            placeholder="Acidez Volátil"
            value={formData.volatile_acidity}
            onChange={handleChange}
          />
          <input
            type="text"
            name="citric_acid"
            placeholder="Ácido Cítrico"
            value={formData.citric_acid}
            onChange={handleChange}
          />
          <input
            type="text"
            name="residual_sugar"
            placeholder="Azúcar Residual"
            value={formData.residual_sugar}
            onChange={handleChange}
          />
          <input
            type="text"
            name="chlorides"
            placeholder="Cloruros"
            value={formData.chlorides}
            onChange={handleChange}
          />
          <input
            type="text"
            name="free_sulfur_dioxide"
            placeholder="Dióxido de Azufre Libre"
            value={formData.free_sulfur_dioxide}
            onChange={handleChange}
          />
          <input
            type="text"
            name="total_sulfur_dioxide"
            placeholder="Dióxido de Azufre Total"
            value={formData.total_sulfur_dioxide}
            onChange={handleChange}
          />
          <input
            type="text"
            name="density"
            placeholder="Densidad"
            value={formData.density}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pH"
            placeholder="pH"
            value={formData.pH}
            onChange={handleChange}
          />
          <input
            type="text"
            name="sulphates"
            placeholder="Sulfatos"
            value={formData.sulphates}
            onChange={handleChange}
          />
          <input
            type="text"
            name="alcohol"
            placeholder="Alcohol"
            value={formData.alcohol}
            onChange={handleChange}
          />
          <button type="submit">Predecir Calidad</button>
        </form>

        {prediction && (
          <h2>Predicción de la calidad del vino para el Caso: {prediction}</h2>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
