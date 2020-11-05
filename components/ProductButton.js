import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Touchable = styled.TouchableHighlight``;

const Container = styled.View`
    align-items:center
    border-radius:300px
    border: 1px solid white;
    width: ${constants.width / 1.23};
`;

const Text = styled.Text`
    font-family:WandocleanseaR
    padding-top:10px;
    padding-bottom:10px
    align-items:center;
    color: white;
    font-size: 20px;
`;
const PressedContainer = styled.View`
    background:white;
    padding-top:10px;
    padding-bottom:10px
    align-items:center
    border-radius:300px
    border: 1px solid white;
    width: ${constants.width / 1.2};
`;
const PressedText = styled.Text`
    font-family:WandocleanseaB 
    align-items:center;
    color: #4CA493;
    font-size: 20px;
`;

const Divider = styled.View``

class HomeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            text: props.text,
            onPress:props.onPress.bind(this),
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
            <Touchable 
                onPress={this.state.onPress}
                underlayColor={null}
                onShowUnderlay={() => this.setSelected(true)}
                onHideUnderlay={() => this.setSelected(false)}>
                    {this.state.selected ? 
                (<PressedContainer>
                    <PressedText>{this.state.text}</PressedText>
                </PressedContainer>) : 
                (<Container>
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
