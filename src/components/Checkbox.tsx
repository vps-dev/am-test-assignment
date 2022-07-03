import { FC } from "react";
import styled from "@emotion/styled";

type Props = {
  name: string;
  value: string;
  label?: string;
  onChange: (value: string) => void;
};

export const Checkbox: FC<Props> = ({ name, value, label, onChange }) => {
  return (
    <Container>
      <CheckboxInput
        data-testid={`checkbox-${value}`}
        type="checkbox"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {label ? <Label>{label}</Label> : null}
    </Container>
  );
};

const Label = styled.div``;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16px auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  & + & {
    margin-top: ${({ theme }) => theme.spacing()};
  }
`;

const CheckboxInput = styled.input`
  position: relative;
  appearance: none;
  height: 14px;
  border-radius: 2px;
  width: 14px;
  border: 1px solid;
  padding: 2px;
  cursor: pointer;

  &:before {
    content: "";
    background: ${({ theme }) => theme.colors.primary};
    position: absolute;
    left: 2px;
    right: 2px;
    top: 2px;
    bottom: 2px;
    transition: opacity 0.3s;
    opacity: 0;
  }

  &:checked&:before {
    opacity: 1;
  }
`;
