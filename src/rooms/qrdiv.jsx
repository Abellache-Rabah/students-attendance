import React from "react";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
export default function Qrdiv({ qrCode }) {
	const canvasRef = useRef();
	useEffect(() => {
		QRCode.toCanvas(
			canvasRef.current,
			// QR code doesn't work with an empty string
			// so we are using a blank space as a fallback
			qrCode || " ",
			(error) => error && console.error(error)
		);
	}, []);
	return (
		<div
			className={`absolute  right-1/2 translate-x-1/2 top-0 flex justify-center items-center  w-full h-screen bg-black opacity-90 shadow-md`}
		>
			<canvas className="qr" ref={canvasRef} />
		</div>
	);
}
