import React from "react";
import styles from '../../../css/ColorInput.module.css';


class ColorInput extends React.Component {

    constructor(props) {
        super();

        this.state = {
            color: '#000000',
            sliderValue: '#f00',
            canvasMarkerPos: { x: 0, y: 0 },
            sliderMarkerY: 0
        }

        this.props = props;
        this.handleChange = this.props.onChange;
        this.handleBlur = this.handleBlur.bind(this);
        this.handleCanvasClick = this.handleCanvasClick.bind(this);
        this.handleSliderClick = this.handleSliderClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateValue = this.updateValue.bind(this);
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

        console.log('mount');
        if (this.props.value !== this.state.color) {
            //this.handleChange(this.state.color);
        }

        const canvas = document.querySelector('canvas#color-picker');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

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

        const sliderCanvas = document.querySelector('canvas#color-slider');
        const sliderCtx = sliderCanvas.getContext('2d', { willReadFrequently: true });
        // red, yellow, green, cyan, blue, magenta, red
        // 0.14
        const colors = [
            'red', 'yellow', '#00ff00', 'cyan', 'blue', 'magenta', 'red'
        ]
        let sGradient = ctx.createLinearGradient(0, 0, 0, sliderCtx.canvas.height);
        for (const i in colors) {
            sGradient.addColorStop((i * (1 / 7)), colors[i]);
        }
        sliderCtx.fillStyle = sGradient;
        sliderCtx.fillRect(0, 0, sliderCtx.canvas.width, sliderCtx.canvas.height);


        const canvasCtx = document.querySelector('canvas#color-picker').getContext('2d', { willReadFrequently: true })
        const markerPos = this.state.canvasMarkerPos;
        const colorAtMarker = this.getCanvasAt(markerPos.x, markerPos.y, canvasCtx);

        if (this.state.color !== colorAtMarker) {
            this.setState({
                color: colorAtMarker
            })
        }
    }

    updateValue() {
        this.handleChange(this.state.color);
    }

    handleCanvasClick(e) {

        const canvas = document.querySelector('canvas#color-picker');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.setState({
            color: this.getCanvasAt(x, y, ctx),
            canvasMarkerPos: {
                x: (x - (canvasMarker.offsetWidth / 2)),
                y: (y - (canvasMarker.offsetHeight / 2))
            }
        }, () => {
            // this.componentDidMount();
            this.updateValue();
        });
    }

    getCanvasAt(x, y, ctx) {
        const pixel = ctx.getImageData(x, y, 1, 1)['data'];
        const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 0)`;
        const hex = this.RGBAToHexA(rgb, true);
        return hex;
    }

    handleSliderClick(e) {
        const slider = document.querySelector('canvas#color-slider');
        const ctx = slider.getContext('2d', { willReadFrequently: true });

        const rect = slider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const canvasCtx = document.querySelector('canvas#color-picker').getContext('2d', { willReadFrequently: true })

        const sliderColor = this.getCanvasAt(x, y, ctx);

        this.setState({
            sliderValue: sliderColor,
            sliderMarkerY: y
        }, () => {
            //this.componentDidMount();
            this.updateValue();
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
            <div className={`${styles.colorInput}`} onClick={this.handleOpen} onBlur={this.handleBlur} tabIndex="0" role={'button'} name={this.props.name} >
                <div className={styles.input}>
                    <span className={styles.colorText}>{this.state.color}</span>
                    <div className={styles.showColor} style={{ backgroundColor: this.state.color }}></div>
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
                    <input className={styles.textInput} placeholder={'#000000'} value={this.state.color} onChange={this.handleInputChange} />
                    <div className={styles.presets}>
                        {/* TODO: add preset pastel colors */}
                    </div>
                </div>
            </div>
        )
    }
}

export default ColorInput;