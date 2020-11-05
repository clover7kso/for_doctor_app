import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Touchable = styled.TouchableHighlight``;

const Container = styled.View`
    background:#CBCBCB;
    flex-direction:row
    align-items:center
    margin-left: 10px;
`;

const Text = styled.Text`
    font-family:WandocleanseaR
    margin-left:20px;
    margin-right:20px;
    padding-top: 12px;
    padding-bottom: 10px;
    color: #34766e;
    font-size: 22px;
`;
const Circle = styled.View`
    zIndex: 1
    margin-left:-7px
    width:14px;
    height:14px;
    border: 2px solid white;
    border-radius: 300px;
    background:#CBCBCB;
`
const PressedContainer = styled.View`
    background:#4CA493;
    flex-direction:row
    align-items:center
    margin-left: 10px;
`;
const PressedText = styled.Text`
  font-family:NotoSansCJKkr_Regular font-family:NotoSansCJKkr_Regular;
    margin-left:20px;
    margin-right:20px;
    padding-top: 12px;
    padding-bottom: 10px;
    color: white;
    font-size: 22px;
`;
const PressedCircle = styled.View`
    zIndex: 1
    margin-left:-7px
    width:14px;
    height:14px;
    border: 2px solid white;
    border-radius: 300px;
    background:#4A7768;
`
const PressedLine = styled.View`
  border-radius: 300px;
  background-color: white;
  flex:1
  padding: 0.5px;
`;


class HomeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            text: props.text,
            onPress:props.onPress.bind(this)
        };
        this.setSelected = this.setSelected.bind(this)
    }
    setSelected(press) {
        this.setState({ 
            selected: press,
        })
    }
    
    render() {
        return(
            <Touchable onPress={this.state.onPress}
                underlayColor={null}
                onShowUnderlay={() => this.setSelected(true)}
                onHideUnderlay={() => this.setSelected(false)}>
                    {this.state.selected ? 
            (<PressedContainer>
                <PressedCircle/>
                <PressedText>{this.state.text}</PressedText>
                <PressedLine/>
            </PressedContainer>) : 
            (<Container>
                <Circle/>
                <Text>{this.state.text}</Text>
            </Container>)}
            </Touchable>
        )
    }
};

HomeButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default HomeButton;
