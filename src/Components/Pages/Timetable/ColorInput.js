import React from "react";
import styles from '../../../css/ColorInput.module.css';


class ColorInput extends React.Component {

    constructor(props) {
        super();

        this.state = {
            color: '#000000',
            sliderValue: '#f00'
        }

        this.props = props;
        this.handleChange = this.props.onChange;
        this.handleBlur = this.handleBlur.bind(this);
        this.handleCanvasClick = this.handleCanvasClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleOpen() {
        const element = document.querySelector(`.${styles.colorInput}`);
        element.classList.add(styles.open);
    }

    handleClose() {
        const element = document.querySelector(`.${styles.colorInput}`);
        element.classList.remove(styles.open);
    }

    handleBlur(e) {
        const element = e.currentTarget;
        requestAnimationFrame(() => {
            if (!element.contains(document.activeElement)) {
                this.handleClose();
            }
        })
    }

    componentDidMount() {


        // Set canvas value

        const canvas = document.querySelector('canvas#color-picker');
        const ctx = canvas.getContext('2d');

        let gradientH = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, this.state.sliderValue);
        ctx.fillStyle = gradientH;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


        let gradientV = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, '#000');
        ctx.fillStyle = gradientV;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // https://dev.to/bhaskar95460442/create-an-html-color-picker-using-javascript-3obm

        // Set slider value

    }

    handleCanvasClick(e) {

        const canvas = document.querySelector('canvas#color-picker');
        const ctx = canvas.getContext('2d');

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const canvasMarker = document.querySelector('#canvasMarker');
        canvasMarker.style.top = (y - (canvasMarker.offsetHeight / 2)) + 'px';
        canvasMarker.style.left = (x - (canvasMarker.offsetWidth / 2)) + 'px';

        const pixel = ctx.getImageData(x, y, 1, 1)['data'];
        const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 0)`;
        const hex = this.RGBAToHexA(rgb, true);
        this.setState({
            color: hex
        });
    }

    handleInputChange(e) {
        const color = e.target.value;
        this.setState({
            color: color
        });
    }

    RGBAToHexA(rgba, forceRemoveAlpha = false) {
        return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
            .split(',') // splits them at ","
            .filter((string, index) => !forceRemoveAlpha || index !== 3)
            .map(string => parseFloat(string)) // Converts them to numbers
            .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
            .map(number => number.toString(16)) // Converts numbers to hex
            .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
            .join("") // Puts the array to togehter to a string
    }


    render() {
        return (
            <div className={`${styles.colorInput}`} onClick={this.handleOpen} onBlur={this.handleBlur} tabIndex="0" role={'button'} >
                <div className={styles.input}>
                    <span className={styles.colorText}>{this.state.color}</span>
                    <div className={styles.showColor} style={{ backgroundColor: this.state.color }}></div>
                </div>
                <div className={styles.popup}>
                    <div className={styles.colorPickers}>
                        <div className={styles.colorCanvas}>
                            <canvas id="color-picker" onMouseDown={this.handleCanvasClick} width={200} height={200} ></canvas>
                            <span className={styles.marker} id={'canvasMarker'}></span>
                        </div>
                        <div className={styles.colorSlider}>
                            <canvas id="color-slider"></canvas>
                        </div>
                    </div>
                    <input className={styles.textInput} placeholder={'#000000'} value={this.state.color} onChange={this.handleInputChange} />
                    <div className={styles.presets}></div>
                </div>
            </div>
        )
    }

}

export default ColorInput;