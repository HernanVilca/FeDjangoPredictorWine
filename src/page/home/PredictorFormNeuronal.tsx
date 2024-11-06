import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";

import InputTextFieldCommon from "../../common/InputTextFieldCommon";
import ButtomSearchFilter from "../../common/Bottom/ButtomSearchFilter";
import { DecimalRegex } from "../../utils/Constant";
import HeaderLabelComponent from "../../common/commonHeader/HeaderLabelComponent";
import { getBorderColorFormik } from "../../utils/utils";

type ExecutionStatus =
  | "RETRYING"
  | "WAITING"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED"
  | "CANCELLED"
  | "";
export const PredictorFormNeuronal = () => {
  const [statusAsync, setStatusAsync] = useState<ExecutionStatus>("");

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

  // const [initialValues, setInitialValues] = useState({
  //   fixed_acidity: "7.4",
  //   volatile_acidity: "0.70",
  //   citric_acid: "0.00",
  //   residual_sugar: "1.9",
  //   chlorides: "0.076",
  //   free_sulfur_dioxide: "11.0",
  //   total_sulfur_dioxide: "34.0",
  //   density: "0.9978",
  //   pH: "3.51",
  //   sulphates: "0.56",
  //   alcohol: "9.4",
  // });

  // Valores predeterminados del Caso 6
  const [initialValues, setInitialValues] = useState({
    fixed_acidity: "6.0",
    volatile_acidity: "0.31",
    citric_acid: "0.47",
    residual_sugar: "3.6",
    chlorides: "0.039",
    free_sulfur_dioxide: "50.0",
    total_sulfur_dioxide: "150.0",
    density: "0.9912",
    pH: "3.12",
    sulphates: "0.35",
    alcohol: "13.1",
  });

  // const [initialValues, setInitialValues] = useState({
  //   fixed_acidity: "10.5",
  //   volatile_acidity: "0.24",
  //   citric_acid: "0.47",
  //   residual_sugar: "2.1",
  //   chlorides: "0.066",
  //   free_sulfur_dioxide: "6.0",
  //   total_sulfur_dioxide: "24.0",
  //   density: "0.9978",
  //   pH: "3.15",
  //   sulphates: "0.9",
  //   alcohol: "11.0",
  // });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    fixed_acidity: Yup.string().required("El campo es obligatorio"),
    volatile_acidity: Yup.string().required("El campo es obligatorio"),
    citric_acid: Yup.string().required("El campo es obligatorio"),
    residual_sugar: Yup.string().required("El campo es obligatorio"),
    chlorides: Yup.string().required("El campo es obligatorio"),
    free_sulfur_dioxide: Yup.string().required("El campo es obligatorio"),
    total_sulfur_dioxide: Yup.string().required("El campo es obligatorio"),
    density: Yup.string().required("El campo es obligatorio"),
    pH: Yup.string().required("El campo es obligatorio"),
    sulphates: Yup.string().required("El campo es obligatorio"),
    alcohol: Yup.string().required("El campo es obligatorio"),
  });

  const fetchPrediction = (values) => {
    setStatusAsync("PROCESSING");
    const queryParams = new URLSearchParams({
      fixed_acidity: values.fixed_acidity,
      volatile_acidity: values.volatile_acidity,
      citric_acid: values.citric_acid,
      residual_sugar: values.residual_sugar,
      chlorides: values.chlorides,
      free_sulfur_dioxide: values.free_sulfur_dioxide,
      total_sulfur_dioxide: values.total_sulfur_dioxide,
      density: values.density,
      pH: values.pH,
      sulphates: values.sulphates,
      alcohol: values.alcohol,
    });

    const url = `http://localhost:8000/api/predictredneuronalppppv3/predictorredneuronalxxv3/?${queryParams.toString()}`;

    return ajax.getJSON(url).pipe(
      map((response: any) => response.quality),
      catchError((error) => {
        setStatusAsync("FAILED");
        console.error("Error al obtener la predicción:", error);
        setError(`${error.response.error}`);

        return of(null);
      })
    );
  };

  return (
    <div>
      <h1>Predicción de Calidad del Vino</h1>
      <Formik
        data-cy="cy-event-form"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setInitialValues({ ...values });

          const subscription = fetchPrediction(values).subscribe({
            next: (quality) => {
              if (quality !== null) {
                setStatusAsync("SUCCESS");
                setPrediction(quality);
                setError("");
              }
            },
            error: (err) => {
              setStatusAsync("FAILED");
              console.error("Error en la suscripción:", err);
              setError(
                "Error al obtener la predicción. Verifica que todos los campos estén llenos y que el backend esté funcionando."
              );
            },
            complete: () => {},
          });

          return () => subscription.unsubscribe();
        }}
        enableReinitialize={true}
      >
        {({
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          dirty,
          handleBlur,
          handleChange,
        }) => {
          const borderColorFixedAcidity = getBorderColorFormik(
            "fixed_acidity",
            dirty,
            errors,
            touched
          );
          const borderColorVolatileAcidity = getBorderColorFormik(
            "volatile_acidity",
            dirty,
            errors,
            touched
          );
          const borderColorCitricAcid = getBorderColorFormik(
            "citric_acid",
            dirty,
            errors,
            touched
          );
          const borderColorResidualSugar = getBorderColorFormik(
            "residual_sugar",
            dirty,
            errors,
            touched
          );

          const borderColorChlorides = getBorderColorFormik(
            "chlorides",
            dirty,
            errors,
            touched
          );

          const borderColorFreeSulfurDioxide = getBorderColorFormik(
            "free_sulfur_dioxide",
            dirty,
            errors,
            touched
          );
          const borderColorTotalSulfurDioxide = getBorderColorFormik(
            "total_sulfur_dioxide",
            dirty,
            errors,
            touched
          );
          const borderColorDensity = getBorderColorFormik(
            "density",
            dirty,
            errors,
            touched
          );
          const borderColorPh = getBorderColorFormik(
            "pH",
            dirty,
            errors,
            touched
          );

          const borderColorSulphates = getBorderColorFormik(
            "sulphates",
            dirty,
            errors,
            touched
          );
          const borderColorAlcohol = getBorderColorFormik(
            "alcohol",
            dirty,
            errors,
            touched
          );

          return (
            <Form onSubmit={handleSubmit}>
              <div style={{ padding: "0rem 2rem 0rem 2rem" }}>
                <Box>
                  <Grid
                    {...{
                      container: true,
                      rowSpacing: 3,
                      columnSpacing: "14px",
                      sx: {
                        px: "1rem",
                        my: "1rem",
                      },
                    }}
                  >
                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-document"
                          labelInput="acidez fija"
                          placeholder="Introduce la acidez fija"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              fixed_acidity: value.target.value,
                            });
                            setFieldValue("fixed_acidity", value.target.value);
                          }}
                          value={values.fixed_acidity}
                          name="fixed_acidity"
                          regex={DecimalRegex}
                          borderColor={borderColorFixedAcidity}
                        />
                        <ErrorMessage
                          name="fixed_acidity"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-full-name"
                          labelInput="acidez volátil"
                          placeholder="Introduce la acidez volátil"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              volatile_acidity: value.target.value,
                            });
                            setFieldValue(
                              "volatile_acidity",
                              value.target.value
                            );
                          }}
                          value={values.volatile_acidity}
                          name="volatile_acidity"
                          maxLength={100}
                          // regex={/^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/}
                          borderColor={borderColorVolatileAcidity}
                        />
                        <ErrorMessage
                          name="volatile_acidity"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>

                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-full-name"
                          labelInput="ácido cítrico"
                          placeholder="Introduce el acido cítrico"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              citric_acid: value.target.value,
                            });
                            setFieldValue("citric_acid", value.target.value);
                          }}
                          value={values.citric_acid}
                          name="citric_acid"
                          borderColor={borderColorCitricAcid}
                        />
                        <ErrorMessage
                          name="citric_acid"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-full-name"
                          labelInput="azúcar residual"
                          placeholder="Introduce el azúcar residual"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              residual_sugar: value.target.value,
                            });
                            setFieldValue("residual_sugar", value.target.value);
                          }}
                          value={values.residual_sugar}
                          name="residual_sugar"
                          borderColor={borderColorResidualSugar}
                        />
                        <ErrorMessage
                          name="residual_sugar"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-full-name"
                          labelInput="cloruros"
                          placeholder="Introduce el cloruros"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              chlorides: value.target.value,
                            });
                            setFieldValue("chlorides", value.target.value);
                          }}
                          value={values.chlorides}
                          name="chlorides"
                          borderColor={borderColorChlorides}
                        />
                        <ErrorMessage
                          name="chlorides"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-full-name"
                          labelInput="dióxido de azufre libre"
                          placeholder="Introduce el dióxido de azufre libre"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              free_sulfur_dioxide: value.target.value,
                            });
                            setFieldValue(
                              "free_sulfur_dioxide",
                              value.target.value
                            );
                          }}
                          value={values.free_sulfur_dioxide}
                          name="free_sulfur_dioxide"
                          borderColor={borderColorFreeSulfurDioxide}
                        />
                        <ErrorMessage
                          name="free_sulfur_dioxide"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-full-name"
                          labelInput="dióxido de azufre total"
                          placeholder="Introduce el dióxido de azufre total"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              total_sulfur_dioxide: value.target.value,
                            });
                            setFieldValue(
                              "total_sulfur_dioxide",
                              value.target.value
                            );
                          }}
                          value={values.total_sulfur_dioxide}
                          name="total_sulfur_dioxide"
                          borderColor={borderColorTotalSulfurDioxide}
                        />
                        <ErrorMessage
                          name="total_sulfur_dioxide"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-full-name"
                          labelInput="densidad"
                          placeholder="Introduce la densidad"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              density: value.target.value,
                            });
                            setFieldValue("density", value.target.value);
                          }}
                          value={values.density}
                          name="density"
                          borderColor={borderColorDensity}
                        />

                        <ErrorMessage
                          name="density"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-full-name"
                          labelInput="pH"
                          placeholder="Introduce el pH"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              pH: value.target.value,
                            });
                            setFieldValue("pH", value.target.value);
                          }}
                          value={values.pH}
                          name="pH"
                          borderColor={borderColorPh}
                        />
                        <ErrorMessage
                          name="pH"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-full-name"
                          labelInput="sulfatos"
                          placeholder="Introduce los sulfatos"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              sulphates: value.target.value,
                            });
                            setFieldValue("sulphates", value.target.value);
                          }}
                          value={values.sulphates}
                          name="sulphates"
                          borderColor={borderColorSulphates}
                        />
                        <ErrorMessage
                          name="sulphates"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>
                    <Grid item xs={6} sm={3} md={3} lg={3}>
                      <div>
                        <InputTextFieldCommon
                          dataCy="cy-qualification-search-full-name"
                          labelInput="alcohol"
                          placeholder="Introduce el alcohol"
                          onChange={(value) => {
                            setInitialValues({
                              ...values,
                              alcohol: value.target.value,
                            });
                            setFieldValue("alcohol", value.target.value);
                          }}
                          value={values.alcohol}
                          name="alcohol"
                          borderColor={borderColorAlcohol}
                        />
                        <ErrorMessage
                          name="alcohol"
                          component="div"
                          className="isErrorForm"
                        />
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={3} md={3} lg={3}>
                      <div style={{ textAlign: "center" }}>
                        <HeaderLabelComponent
                          title={"Predecir"}
                          color="white"
                        />

                        <div>
                          <div style={{ marginLeft: "0.5rem" }}>
                            <ButtomSearchFilter
                              dataCy="cy-event-search"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSubmit();
                              }}
                              height="5rem"
                              type="submit"
                              text="Predicir Calidad de Vino"
                              width="100%"
                            />
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </Form>
          );
        }}
      </Formik>

      {statusAsync === "SUCCESS" && (
        <>
          {prediction && (
            <h2>Predicción de la calidad del vino es : {prediction}</h2>
          )}
        </>
      )}
      {statusAsync === "PROCESSING" && <div>Procesando</div>}
      {statusAsync === "FAILED" && (
        <>
          {error && (
            <div style={{ fontSize: "2rem", fontWeight: 700 }}>{error}</div>
          )}
        </>
      )}
    </div>
  );
};
