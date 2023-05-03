import React from "react";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
export default function Qrdiv() {
	const [text, setText] = useState("");
	const canvasRef = useRef();
	useEffect(() => {
       setText(randomise());
    }, []);
	let randomise = function () {
		const x = Math.ceil(Math.random() * 10000);
		const y = x.toString();
        console.log(y);
        return y
	};
      useEffect(() => {
				QRCode.toCanvas(
					canvasRef.current,
					// QR code doesn't work with an empty string
					// so we are using a blank space as a fallback
					text || " ",
					(error) => error && console.error(error)
				);
			}, [text]);

	return (
		<div className={`md:w-fit w-fit  bg-gray-50 shadow-md z-50   `}>
			<canvas ref={canvasRef} />
		</div>
	);
}
