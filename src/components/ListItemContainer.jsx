import styled from "styled-components"

export default function ListItemContainer({description, value, type, day}){
    return(
        <Container>
            <div>
              <span>{day}</span>
              <strong>{description}</strong>
            </div>
            <Value color={type}>{value.replace(".",",")}</Value>
        </Container>
    )
}

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;   
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`