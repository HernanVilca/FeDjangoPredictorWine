import React from "react";

import { Button } from "@mui/material";
// import searchIcon from "@/assets/k2/icons/ic_search.svg";
// import addIcon from "@/assets/k2/icons/ic_more_black.svg";
// import leftBackIcon from "@/assets/k2/icons/ic_left_back.svg";
// import filterIcon from "@/assets/k2/icons/ic_filter.svg";
// import previousIcon from "@/assets/k2/icons/ic_previous.svg";
// import nextIcon from "@/assets/k2/icons/ic_next.svg";
import styled from "styled-components";
import { theme } from "../../AppStyles";

interface Props {
  typeButton?:
    | "search"
    | "filter"
    | "add"
    | "leftBack"
    | "previous"
    | "next"
    | "";
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  height?: string;
  width?: string;
  disabled?: boolean;
  dataCy?: string;
  border?: boolean;
  type?: "button" | "submit" | "reset";
}

const ButtomSearchFilter = ({
  onClick,
  height = "4.5rem",
  width,
  typeButton = "search",
  disabled = false,
  text = "",
  dataCy = "cy-buttom-search-filter",
  border = true,
  type = "button",
}: Props) => {
  //   const getIconImage = () => {
  //     switch (typeButton) {
  //       case "search":
  //         return searchIcon;
  //       case "filter":
  //         return filterIcon;
  //       case "add":
  //         return addIcon;
  //       case "leftBack":
  //         return leftBackIcon;
  //       case "previous":
  //         return previousIcon;
  //       case "next":
  //         return nextIcon;
  //       default:
  //         return searchIcon;
  //     }
  //   };

  return (
    <div>
      <Button
        data-cy={dataCy}
        type={type}
        disabled={disabled}
        onClick={onClick}
        sx={{
          display: "flex",
          height: height,
          padding: "1.2rem 2rem 1.2rem 2rem",
          justifyContent: "center",
          alignItems: "center",
          width: width,
          background: theme.colors.white,
          opacity: disabled && 0.4,
          color: "#2C2F32",
          border: border ? "0.1rem solid #E5E7E8" : "none",
          fontFamily: theme.fontFamilies.primaryFont,
          fontSize: "1.4rem",
          borderRadius: "0.8rem",
          textTransform: "none",
          "&:hover": {
            background: "#f2f2f2",
            border: border ? "0.1rem solid #C8CACB" : "none",
          },
        }}
      >
        <ContainerContent>
          {/* <ImgIcon src={getIconImage()} alt="Icon search" /> */}
          {text && <TextButtom>{text}</TextButtom>}
        </ContainerContent>
      </Button>
    </div>
  );
};
export default ButtomSearchFilter;
const TextButtom = styled.div`
  ${(props) => `
    font-family: ${props.theme.fontFamilies.primaryFont};
    color: ${props.theme.colors.secondaryNegative};
  `}
  text-align: center;
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.5rem;
  margin-left: 0.6rem;
`;
const ImgIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const ContainerContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
