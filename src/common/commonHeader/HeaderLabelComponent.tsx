// import { theme } from "@/AppStyles";
import styled from "styled-components";
import { theme } from "../../AppStyles";

interface IProps {
  title: string;
  color?: string;
  marginBottom?: string;
  marginTop?: string;
  required?: boolean;
  borderColor?: string;
  onClear?: () => void;
  dataCy?: string;
}
const HeaderLabelComponent = ({
  marginBottom = "0.7rem",
  marginTop = "0rem",
  color = "#000",
  title,
  required = false,
  borderColor = "#e7e7ea",
  onClear,
  dataCy = "cy-header-label",
}: IProps) => {
  return (
    <div
      style={{
        marginBottom: title ? marginBottom : "0rem",
        marginTop: marginTop,
        fontSize: "1.4rem",
        display: "flex",
        justifyContent: "space-between",
        fontFamily: theme.fontFamilies.primaryFont,
      }}
    >
      <ContainerLabel
        data-cy={`${dataCy}-label`}
        style={{
          color: borderColor === theme.colors.red ? borderColor : color,
        }}
      >
        {title} {required && "(*)"}
      </ContainerLabel>
      {onClear && (
        <ContainerCleaning
          style={{
            cursor: "pointer",
          }}
          onClick={onClear}
        >
          Limpiar
        </ContainerCleaning>
      )}
    </div>
  );
};
export default HeaderLabelComponent;
const ContainerLabel = styled.label`
  ${(props) => `
  font-family: ${props.theme.fontFamilies.primaryFont};
  color: ${props.theme.colors.primaryLabel};

  `}
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.7rem;
`;

const ContainerCleaning = styled.div`
  ${(props) => `
  font-family: ${props.theme.fontFamilies.primaryFont};
  color: ${props.theme.colors.primarySurface};

  `}
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
`;
