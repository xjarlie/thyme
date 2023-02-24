import React from "react";
import styles from '../../../css/ColorInput.module.css';

class ColorInput extends React.Component {
    constructor(props) {
        super();

        this.props = props;

        this.state = {
            color: this.props.value,
            sliderValue: '#f00',
            canvasMarkerPos: { x: 0, y: 0 },
            sliderMarkerY: 0
        }

        this.handleChange = this.props.onChange;
        this.outsideHandleBlur = this.props.onBlur;
        this.handleBlur = this.handleBlur.bind(this);
        this.handleCanvasClick = this.handleCanvasClick.bind(this);
        this.handleSliderClick = this.handleSliderClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePresetChange = this.handlePresetChange.bind(this);

    }

    componentDidMount() {

        this.updateCanvasGradient(this.state.sliderValue);

        this.createSliderGradient();

    }

    handleOpen() {
        const element = document.querySelector(`.${styles.colorInput}`);
        element.classList.add(styles.open);
    }

    handleClose() {
        const element = document.querySelector(`.${styles.colorInput}`);
        element.classList.remove(styles.open);

        this.outsideHandleBlur();
    }

    handleBlur(e) {
        const element = e.currentTarget;
        requestAnimationFrame(() => {
            if (!element.contains(document.activeElement)) {
                this.handleClose();
            }
        })
    }

    handleInputChange(e) {
        const color = e.target.value;
        this.handleChange(color);
    }

    handlePresetChange(e) {
        const color = e.target.dataset.value.toLowerCase();
        requestAnimationFrame(() => {
            this.handleClose();
            this.handleChange(color);
        })
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

    getCanvasAt(x, y, ctx) {
        const pixel = ctx.getImageData(x, y, 1, 1)['data'];
        const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 0)`;
        const hex = this.RGBAToHexA(rgb, true);
        return hex;
    }

    createSliderGradient() {
        const canvas = document.querySelector('canvas#color-slider');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        // red, yellow, green, cyan, blue, magenta, red
        // 0.14
        const colors = [
            'red', 'yellow', '#00ff00', 'cyan', 'blue', 'magenta', 'red'
        ]
        let sGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        for (const i in colors) {
            sGradient.addColorStop((i * (1 / 7)), colors[i]);
        }
        ctx.fillStyle = sGradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    updateCanvasGradient(color) {

        const canvas = document.querySelector('canvas#color-picker');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        let gradientH = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, color);
        ctx.fillStyle = gradientH;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        let gradientV = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, '#000');
        ctx.fillStyle = gradientV;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    }

    handleSliderClick(e) {

        const slider = document.querySelector('canvas#color-slider');
        const ctx = slider.getContext('2d', { willReadFrequently: true });

        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const sliderColor = this.getCanvasAt(x, y, ctx);
        this.updateCanvasGradient(sliderColor);

        const canvasCtx = document.querySelector('canvas#color-picker').getContext('2d', { willReadFrequently: true });

        const canvasColor = this.getCanvasAt(this.state.canvasMarkerPos.x, this.state.canvasMarkerPos.y, canvasCtx);

        const sliderMarker = document.querySelector('#sliderMarker');

        this.setState({
            sliderMarkerY: (y - (sliderMarker.offsetHeight / 2))
        }, () => {
            this.handleChange(canvasColor);
        });
    }

    handleCanvasClick(e) {

        const canvas = document.querySelector('canvas#color-picker');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const color = this.getCanvasAt(x, y, ctx);
        const canvasMarker = document.querySelector('#canvasMarker');
        this.setState({
            canvasMarkerPos: {
                x: (x - (canvasMarker.offsetWidth / 2)),
                y: (y - (canvasMarker.offsetHeight / 2))
            }
        }, () => {
            this.handleChange(color);
        });
    }

    render() {

        const presetColors = ['#C34D4D', '#712828', '#F35D5D', '#3F823E', '#59BB54', '#4DAEC3', '#403E8E', '#7A4DC3', '#AC3AA0', '#C3A94D']

        return (
            <div className={`${styles.colorInput}`} onClick={this.handleOpen} onBlur={this.handleBlur} tabIndex="0" role={'button'} name={this.props.name} >
                <div className={styles.input} role='input'>
                    <span className={styles.colorText}>{this.props.value}</span>
                    <div className={styles.showColor} style={{ backgroundColor: this.props.value }}></div>
                </div>
                <div className={styles.popup}>
                    <div className={styles.colorPickers}>
                        <div className={styles.colorCanvas}>
                            <canvas id="color-picker" onMouseDown={this.handleCanvasClick} width={200} height={200} ></canvas>
                            <span className={styles.marker} id={'canvasMarker'} style={{ top: this.state.canvasMarkerPos.y + 'px', left: this.state.canvasMarkerPos.x + 'px' }} ></span>
                        </div>
                        <div className={styles.colorSlider}>
                            <canvas id="color-slider" onMouseDown={this.handleSliderClick} width={30} height={200}></canvas>
                            <span className={styles.marker} id={'sliderMarker'} style={{ top: this.state.sliderMarkerY }}></span>
                        </div>
                    </div>
                    <input className={styles.textInput} placeholder={'#000000'} value={this.props.value} onChange={this.handleInputChange} />
                    <div className={styles.presets}>
                        {presetColors.map((i) => {
                            return <span key={i} className={styles.presetColor} style={{ backgroundColor: i }} data-value={i} role='button' onClick={this.handlePresetChange} ></span>
                        })}
                    </div>
                </div>
            </div>
        )
    }

}

export default ColorInput;