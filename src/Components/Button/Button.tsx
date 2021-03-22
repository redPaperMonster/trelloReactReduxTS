
import styled from 'styled-components';
interface ButtonProps {
  onClick: () => void,
  text: string,
  customStyles?: string,
  submit?: boolean
}

type ButtonStyleProps = {
  customStyle: string;
};

const CommonButton = styled.button<ButtonStyleProps>`
padding: 3px 5px;
max-height: 50px;
font-size: 1em;
border: none;
border-radius: 3px;
outline:none;
${(props) => props.customStyle};
&:hover {
    background-color: lightgray;}`

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  customStyles,
  submit }) => {

  return (
    <CommonButton
      customStyle={customStyles || ""}
      onClick={onClick}
      type={submit ? "submit" : "button"}>{text}</CommonButton>
  )
}

export default Button;